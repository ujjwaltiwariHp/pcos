import { Router } from 'express';
import { db, assessments } from 'db';
import { eq, desc } from 'drizzle-orm';
import { z } from 'zod';
import { authenticate } from '../middleware/authenticate';
import { analyzeAssessment } from '../services/ai.service';

const router = Router();

const assessmentSchema = z.object({
  personalData: z.object({
    age: z.number(),
    height: z.number(),
    weight: z.number(),
    bmi: z.number(),
  }),
  symptomsData: z.record(z.string(), z.boolean()),
  hormonalData: z.record(z.string(), z.string().or(z.number())).optional(),
  lifestyleData: z.object({
    diet: z.number(),
    exercise: z.number(),
    stress: z.number(),
    sleep: z.number(),
  }),
});

router.post('/', authenticate, async (req, res) => {
  try {
    const data = assessmentSchema.parse(req.body);
    
    // Call AI Service
    const aiAnalysis = await analyzeAssessment(data);

    // Save to DB
    const [newAssessment] = await db.insert(assessments).values({
      userId: req.user!.userId,
      personalData: data.personalData,
      symptomsData: data.symptomsData,
      hormonalData: data.hormonalData,
      lifestyleData: data.lifestyleData,
      aiAnalysis: aiAnalysis,
      riskScore: aiAnalysis.riskScore,
      riskLevel: aiAnalysis.riskLevel,
    }).returning();

    res.status(201).json({ assessment: newAssessment });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.flatten() });
    }
    console.error(error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

router.get('/', authenticate, async (req, res) => {
  try {
    const userAssessments = await db.query.assessments.findMany({
      where: eq(assessments.userId, req.user!.userId),
      orderBy: [desc(assessments.createdAt)],
    });

    res.json({ assessments: userAssessments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const assessmentId = req.params.id as string;
    const assessment = await db.query.assessments.findFirst({
      where: eq(assessments.id, assessmentId),
      with: {
        user: {
          columns: {
            name: true,
            email: true,
          }
        }
      }
    });

    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    // Security check: only the owner or an admin can see the assessment
    if (assessment.userId !== req.user!.userId && req.user!.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.json({ assessment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const id = req.params.id as string;
    
    // Security check: ensure user owns the assessment
    const assessment = await db.query.assessments.findFirst({
      where: eq(assessments.id, id),
    });

    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    if (assessment.userId !== req.user!.userId) {
      return res.status(403).json({ message: 'Forbidden: You do not own this assessment' });
    }

    const [deletedAssessment] = await db.delete(assessments)
      .where(eq(assessments.id, id))
      .returning();

    res.json({ message: 'Assessment deleted successfully', assessment: deletedAssessment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
