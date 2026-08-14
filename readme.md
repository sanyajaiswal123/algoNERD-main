# algoNERD

algoNERD is a developer-focused Data Structures and Algorithms learning platform built with React and Vite. It provides structured explanations, step-by-step algorithm breakdowns, dry run visualizations, and optimized implementations in C++, Java, and Python to help learners build strong problem-solving skills.

The platform encourages users to solve problems in their preferred local IDE while using algoNERD as a companion resource for learning concepts and understanding implementations.

---

## Features

- Structured curriculum covering 19 DSA topics
- 135+ coding problems organized by category
- Solutions in C++, Java, and Python
- Step-by-step algorithm explanations
- Dry run visualizations for better understanding
- Browser-based progress tracking using LocalStorage
- Responsive user interface
- Terminal-inspired developer-focused design
- Fast client-side navigation
- Serverless architecture with static JSON datasets

---

## Tech Stack

### Frontend

- React 19
- Vite
- JavaScript (ES6)
- React Router
- Tailwind CSS v4
- Framer Motion
- GSAP
- Tabler Icons

### Data Layer

- JSON
- Browser LocalStorage

### Deployment

- Vercel

---

## Project Structure

```
algoNERD/
│
├── backend/
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    │   └── data/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── css/
    │   ├── lib/
    │   ├── App.jsx
    │   └── main.jsx
    │
    ├── package.json
    ├── vite.config.js
    └── vercel.json
```

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/sanyajaiswal123/algoNERD.git
```

### Navigate to the frontend

```bash
cd algoNERD/frontend
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## Architecture

The project follows a serverless client-side architecture.

```
Browser
    │
    ▼
React + Vite SPA
    │
    ▼
Static JSON Files
    │
    ▼
Dynamic Rendering
    │
    ▼
LocalStorage Progress Tracking
```

There is no active backend API or database. All educational content is stored as structured JSON files and loaded dynamically at runtime.

---

## Core Functionality

### Curriculum

Questions are grouped into categories such as:

- Pattern Printing
- Arrays
- Strings
- Linked Lists
- Stacks
- Queues
- Trees
- Graphs
- Dynamic Programming
- Greedy Algorithms
- Backtracking
- And more

### Question View

Each question contains:

- Problem statement
- Theory
- Concept explanation
- Algorithm walkthrough
- Dry run
- Time and Space Complexity
- Multi-language solutions
- Test cases

### Progress Tracking

Completed questions are stored locally using the browser's LocalStorage, allowing users to continue learning without creating an account.

---

## Design Goals

- Encourage coding inside a local IDE rather than a browser editor
- Focus on conceptual understanding rather than memorization
- Provide detailed explanations instead of only optimized code
- Maintain fast loading through a static architecture
- Deliver a responsive and accessible learning experience

---

## Future Improvements

- Complete remaining DSA categories
- Add search and filtering
- Online code execution
- Authentication
- Cloud-based progress synchronization
- Discussion section for each problem
- Bookmarking and favorites
- Performance analytics dashboard

---

## License

This project is licensed under the ISC License.

---
