A fullstack job platform where companies can post jobs and seekers can apply.

## 🚀 Features
- User authentication (JWT)
- Role-based access (Admin, Company, Seeker)
- Post, list, and apply for jobs
- Resume file upload
- Real-time job updates via WebSocket
- Dark mode UI with Tailwind CSS

## 🧰 Tech Stack
- Frontend: Next.js, Tailwind CSS, Zustand
- Backend: Express.js, Prisma, PostgreSQL
- Auth: JWT
- Realtime: Socket.IO

## 🛠️ Setup
```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npx prisma migrate dev
node server.js
```

## 🔐 Env Vars
```
# Backend .env
DATABASE_URL=postgresql://...
JWT_SECRET=...
```

## ✅ Tests
Unit tests using Jest (`backend/tests/auth.test.js`, `job.test.js`)

## 📦 Deployment
- Frontend: [Vercel](https://vercel.com)
- Backend: [Render](https://render.com)

## 🧪 Reflection

### ✅ What’s Working
- Fully working auth and role-based access
- Companies can post jobs, seekers can apply with resume upload
- Realtime job updates with WebSocket
- Fully responsive and dark mode friendly UI

### ⏳ What Could Be Improved with More Time
- Admin role management panel
- Advanced search and filters for jobs
- Pagination and loading states
- CI/CD + Test coverage reports
- Enhanced error messages and validation UX
