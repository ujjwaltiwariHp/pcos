import { Router } from 'express';
import { db, users, assessments } from 'db';
import { eq, desc, sql, count } from 'drizzle-orm';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';

const router = Router();

// Apply admin role check to all routes in this router
router.use(authenticate, authorize(['admin']));

router.get('/stats', async (req, res) => {
  try {
    const [userCount] = await db.select({ value: count() }).from(users);
    const [assessmentCount] = await db.select({ value: count() }).from(assessments);

    const riskDistribution = await db.select({
      level: assessments.riskLevel,
      count: count(),
    }).from(assessments).groupBy(assessments.riskLevel);

    const recentActivity = await db.query.assessments.findMany({
      limit: 10,
      orderBy: [desc(assessments.createdAt)],
      with: {
        // Need to set up relations in Drizzle schema for this to work
        // user: true,
      },
    });

    // Since relations might not be set up, I'll fetch manually or just return assessments
    res.json({
      totalUsers: userCount.value,
      totalAssessments: assessmentCount.value,
      riskDistribution,
      recentActivity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const allUsers = await db.query.users.findMany({
      orderBy: [desc(users.createdAt)],
    });
    res.json({ users: allUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.patch('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { role, name, email } = req.body;
    
    const [updatedUser] = await db.update(users)
      .set({ 
        ...(role && { role }), 
        ...(name && { name }), 
        ...(email && { email }),
        updatedAt: new Date()
      })
      .where(eq(users.id, id))
      .returning();

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [deletedUser] = await db.delete(users)
      .where(eq(users.id, id))
      .returning();

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/assessments', async (req, res) => {
  try {
    const allAssessments = await db.query.assessments.findMany({
      orderBy: [desc(assessments.createdAt)],
    });
    res.json({ assessments: allAssessments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/assessments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [deletedAssessment] = await db.delete(assessments)
      .where(eq(assessments.id, id))
      .returning();

    if (!deletedAssessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    res.json({ message: 'Assessment deleted successfully', assessment: deletedAssessment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/assessments/export', async (req, res) => {
  try {
    const allAssessments = await db.query.assessments.findMany({
      orderBy: [desc(assessments.createdAt)],
    });

    // Simple CSV generation
    const headers = ['ID', 'User ID', 'Risk Score', 'Risk Level', 'Created At'];
    const rows = allAssessments.map((a: any) => [
      a.id,
      a.userId,
      a.riskScore,
      a.riskLevel,
      a.createdAt.toISOString(),
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=assessments.csv');
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
