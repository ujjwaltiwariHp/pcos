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

router.get('/assessments/export', async (req, res) => {
  try {
    const allAssessments = await db.query.assessments.findMany({
      orderBy: [desc(assessments.createdAt)],
    });

    // Simple CSV generation
    const headers = ['ID', 'User ID', 'Risk Score', 'Risk Level', 'Created At'];
    const rows = allAssessments.map(a => [
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
