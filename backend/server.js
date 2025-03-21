import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { PrismaClient } from '@prisma/client';
import rateLimit from 'express-rate-limit';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
dotenv.config();
const prisma = new PrismaClient();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

// Resume uploads
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });
app.post('/api/upload', upload.single('resume'), (req, res) => {
  res.json({ resumeUrl: \`/uploads/\${req.file.filename}\` });
});
app.use('/uploads', express.static(uploadDir));

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

// WebSocket
io.on('connection', socket => {
  console.log('New client connected');
});
app.set('io', io); // To use in routes

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
