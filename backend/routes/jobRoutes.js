import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const jobs = await prisma.job.findMany({
    include: { company: true, applications: true },
  });
  res.json(jobs);
});

router.get('/:id', async (req, res) => {
  const job = await prisma.job.findUnique({
    where: { id: req.params.id },
    include: { company: true },
  });
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
});

router.post('/', authenticate, authorize('COMPANY'), async (req, res) => {
  const { title, description } = req.body;
  const job = await prisma.job.create({
    data: {
      title,
      description,
      companyId: req.user.userId,
    },
  });
  req.app.get('io').emit('job_posted', job);
  res.status(201).json(job);
});

router.post('/:id/apply', authenticate, authorize('JOB_SEEKER'), async (req, res) => {
  const { resumeUrl } = req.body;
  const application = await prisma.application.create({
    data: {
      jobId: req.params.id,
      userId: req.user.userId,
      resumeUrl,
    },
  });
  res.status(201).json(application);
});

export default router;
