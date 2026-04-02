# Job Application Tracker

A full-stack MERN web app to track job applications during your job search.

## Features

- User authentication (signup/login with JWT)
- Add, edit, delete job applications
- Track status — Applied, Interview, Offer, Rejected
- Filter by status and search by company or role
- Follow-up deadline tracking with color alerts
- Resume upload per job application (PDF)
- Application source tracking with job posting link
- Dark mode with persistent preference
- Stats bar showing application counts by stage

## Tech Stack

- **Frontend:** React.js, Vite, Axios, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose
- **Auth:** JWT, bcryptjs
- **File Upload:** Multer
- **Deploy:** Vercel (frontend), Render (backend)

## Live Demo

- Frontend: YOUR_VERCEL_LINK
- Backend: YOUR_RENDER_LINK

## Run Locally

### Backend
cd backend
npm install
npm run dev

### Frontend
cd frontend
npm install
npm run dev
```

---

## Step 2 — Prepare Frontend for Deployment

Right now your frontend points to `http://localhost:5000`. Before deploying you need to make this dynamic.

Create a file called `.env` inside your `frontend` folder:
```
VITE_API_URL=http://localhost:5000/api