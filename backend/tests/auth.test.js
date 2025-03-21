import request from 'supertest';
import express from 'express';
import authRoutes from '../routes/authRoutes.js';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth Routes', () => {
  const user = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'password123',
    role: 'JOB_SEEKER',
  };

  afterAll(async () => {
    await prisma.user.delete({ where: { email: user.email } });
    await prisma.$disconnect();
  });

  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send(user);
    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe(user.email);
  });

  it('should login an existing user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: user.email,
      password: user.password,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
