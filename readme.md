# algoNERD (Full Stack MERN)

algoNERD is a developer-focused Data Structures and Algorithms learning platform converted to a full-stack MERN application. It provides structured explanations, step-by-step algorithm breakdowns, dry run visualizations, and multi-language code solutions (C++, Java, Python) with cloud-backed user progress tracking.

---

## MERN Features

- 🔐 **JWT Authentication**: Register, Login, Logout with HTTP-only Cookies & Bearer Tokens
- 🛡️ **Protected Routes**: Shielded User Profile and state-aware navigation
- 📊 **MongoDB Progress Synchronization**: Cloud progress tracking synced across devices
- ⚡ **Express + Node.js Backend**: Layered architecture (Controllers, Services, Models, Routes, Validators)
- 🎯 **Security & Validation**: Helmet HTTP headers, CORS configuration, Express Validator payloads
- 🎨 **Responsive Dark UI**: Glassmorphic styling, framer-motion micro-animations, theme harmony

---

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB & Mongoose ORM
- JWT (`jsonwebtoken`) & `bcryptjs`
- `express-validator`, `helmet`, `cors`, `cookie-parser`, `morgan`

### Frontend
- React 19 & Vite
- React Router DOM
- Framer Motion & Tailwind CSS v4
- Axios API client with request/response interceptors

---

## Project Structure

```
algoNERD/
├── backend/
│   ├── src/
│   │   ├── config/ (database connection)
│   │   ├── controllers/ (auth & progress controllers)
│   │   ├── middlewares/ (auth & error middlewares)
│   │   ├── models/ (User & Progress schemas)
│   │   ├── routes/ (auth & progress API routes)
│   │   ├── services/ (business logic)
│   │   ├── utils/ (ApiError, ApiResponse, jwt)
│   │   └── validators/ (express-validator rules)
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── api/ (axios client & endpoint handlers)
    │   ├── components/ (Navbar, ProtectedRoute)
    │   ├── contexts/ (AuthContext)
    │   ├── css/ (Auth & page styling)
    │   ├── hooks/ (useAuth)
    │   ├── pages/ (Landing, Syllabus, Login, Register, Profile, Questions)
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

---

## Getting Started

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env # Configure MONGO_URI, JWT_SECRET, PORT
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to access the application.

---

## License

This project is licensed under the ISC License.
