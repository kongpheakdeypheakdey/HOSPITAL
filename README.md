# Luang Mè Hospital — Full-Stack Web Application

A complete, production-ready full-stack hospital management and public website application built for **Luang Mè Hospital**, matching the Figma design at [https://flip-stunt-74340392.figma.site](https://flip-stunt-74340392.figma.site).

---

## 01 — Architecture Overview

```text
              FIGMA VISUAL SOURCE OF TRUTH
                           │
                           ▼
                  ┌─────────────────┐
                  │ React + Vite    │
                  │ TypeScript      │
                  │ Tailwind CSS    │
                  └────────┬────────┘
                           │
                           │ REST API
                           ▼
                  ┌─────────────────┐
                  │ Express.js      │
                  │ TypeScript      │
                  │ Auth & Security │
                  └────────┬────────┘
                           │
                           │ Prisma ORM
                           ▼
                  ┌─────────────────┐
                  │ SQLite          │
                  │ dev.db          │
                  └─────────────────┘
```

---

## 02 — Technology Stack

### Frontend
- **React 18**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Router v6**
- **TanStack Query (React Query v5)**
- **React Hook Form + Zod**
- **Axios**
- **Lucide React**

### Backend
- **Node.js**
- **Express.js**
- **TypeScript**
- **Bcrypt.js** (Password hashing)
- **JSON Web Token (JWT)** & **Cookie-Parser** (HTTP-only Session Security)
- **Express Rate Limit**

### Database
- **SQLite** (`prisma/dev.db`)
- **Prisma ORM**

---

## 03 — Development Access

Development accounts are created by the seed script. Use unique credentials for local testing, and never reuse development credentials in production.

---

## 04 — Project Structure

```text
project/
│
├── frontend/
│   ├── src/
│   │   ├── api/          # Axios instance with credentials
│   │   ├── components/   # Reusable UI (Button, Input, Modal, Dialog, Toast, etc.)
│   │   ├── contexts/     # AuthContext & LanguageContext (EN/KM)
│   │   ├── hooks/        # Custom hooks (useDebounce)
│   │   ├── pages/        # Public pages & Admin Management System Dashboard
│   │   ├── routes/       # App routing table
│   │   ├── types/        # TypeScript models
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/       # Environment & server config
│   │   ├── controllers/  # Auth, User, Doctor, Dept, Appt, Bed, Contact, Audit controllers
│   │   ├── middleware/   # Auth, RateLimiter (SQLite logging), ErrorHandler
│   │   ├── routes/       # Express API routes
│   │   ├── utils/        # Prisma client & Audit logger
│   │   ├── validators/   # Zod validation schemas
│   │   ├── app.ts
│   │   └── server.ts
│   └── package.json
│
├── prisma/
│   ├── schema.prisma     # SQLite Prisma models
│   ├── seed.js           # Database seed script
│   └── dev.db            # SQLite database file
│
├── uploads/              # Static file storage
├── docs/                 # Documentation
├── .env                  # Environment variables
├── .env.example
├── .gitignore
└── README.md
```

---

## 05 — Getting Started & Development

### 1. Database Setup & Seeding

```bash
# Push schema and apply SQLite migrations
cd backend
DATABASE_URL="file:../prisma/dev.db" npx prisma db push --schema=../prisma/schema.prisma

# Seed initial hospital data
DATABASE_URL="file:../prisma/dev.db" NODE_PATH=node_modules node ../prisma/seed.js
```

### 2. Start Backend API Server

```bash
cd backend
npm run dev
# Server will start on http://localhost:4000
```

### 3. Start Frontend Development Client

```bash
cd frontend
npm run dev
# App will start on http://localhost:5173
```

---

## 06 — Database Backup Strategy

Since SQLite is a file-based database, backups can be performed cleanly:

```bash
mkdir -p backups
cp prisma/dev.db backups/dev-$(date +%Y-%m-%d-%H%M%S).db
```

---

## 07 — Production Build

```bash
# Build Backend
cd backend
npm run build

# Build Frontend
cd frontend
npm run build
```

---

## 08 — Key Features Implemented

1. **Bilingual Support (English & Khmer)**:
   - Header language toggle (`EN` / `ខ្មែរ`).
2. **24/7 Emergency Hotline & Real-time Bed Tracker**:
   - Live bed occupancy updates from SQLite database.
3. **Doctor & Specialty Directory**:
   - Server-side debounced search, department filtering, and schedule availability.
4. **Interactive Appointment Booking**:
   - Real-time submission, Zod form validation, reference ID confirmation.
5. **Full Hospital Management System Dashboard (`/admin`)**:
   - Real-time metric cards (Total Patients, Active Doctors, Bed Occupancy %, Unread Inquiries).
   - Appointments CRUD (Status changes, Delete confirmation).
   - Doctors CRUD (Add Doctor Modal, Edit Doctor, Delete Doctor).
   - Ward Beds Manager (Toggle Available / Occupied).
   - Inquiries Inbox (View message, Quick Reply modal).
   - User Account Manager & Security Audit Trail.
