# 🚀 AI Cold Mail Generator

An AI-powered Full Stack MERN application that helps users generate professional cold emails, LinkedIn connection messages, and follow-up emails using AI.

The application includes secure authentication with OTP verification, AI-powered email generation using Groq, email history management, and a modern responsive dashboard.

---

# 🌟 Features

## 🤖 AI Email Generation
- Generate professional cold emails instantly
- AI-powered by Groq LLM
- Supports:
  - Cold Emails
  - Follow-up Emails
  - LinkedIn Messages
- Copy generated emails with one click

---

## 🔐 Authentication

- User Signup
- Login
- Email OTP Verification
- JWT Authentication
- Protected Routes
- Password Encryption using bcrypt

---

## 📧 Email Verification

- Beautiful HTML OTP Emails
- OTP expires in 10 minutes
- Email delivery powered by Brevo API
- Verified sender support

---

## 📜 Email History

- Stores every generated email
- History stored securely in MongoDB
- User-specific history
- Each user can only access their own generated emails

---

## 👤 User Profile

- View account details
- Logout securely
- Protected Dashboard

---

## 🎨 Modern UI

- Responsive Design
- React + Vite
- Tailwind CSS
- Toast Notifications
- Beautiful Dashboard Layout

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Groq API
- Brevo Email API

---

# 📂 Project Structure

```
AI-Cold-Mail-Generator
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   └── server.js
│
├── package.json
└── README.md
```

---

# ⚙️ Environment Variables

## Server (.env)

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GROQ_API_KEY=your_groq_api_key

BREVO_API_KEY=your_brevo_api_key

EMAIL_USER=your_verified_sender_email

FRONTEND_URL=http://localhost:5173
```

---

## Client (.env)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/Vanshjain8929/Ai-Cold-Mail-Generator.git
```

Move inside the project

```bash
cd Ai-Cold-Mail-Generator
```

Install all dependencies

```bash
npm run install:all
```

---

# ▶️ Run Locally

Start both frontend and backend simultaneously

```bash
npm run dev
```

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

---

# 🤖 AI Workflow

```
User Prompt
      │
      ▼
Frontend
      │
      ▼
Express Backend
      │
      ▼
Groq AI API
      │
      ▼
Generated Email
      │
      ▼
Stored in MongoDB
      │
      ▼
Displayed in Dashboard & History
```

---

# 🔒 Authentication Flow

```
Register
    │
    ▼
Generate OTP
    │
    ▼
Send OTP via Brevo
    │
    ▼
Verify OTP
    │
    ▼
Generate JWT
    │
    ▼
Access Dashboard
```

---

# 🌐 Deployment

## Backend

Hosted on **Render**

Environment Variables Required

- MONGODB_URI
- JWT_SECRET
- GROQ_API_KEY
- BREVO_API_KEY
- EMAIL_USER
- FRONTEND_URL

Build Command

```bash
npm install
```

Start Command

```bash
node server.js
```

---

## Frontend

Hosted on **Vercel**

Environment Variable

```env
VITE_API_BASE_URL=https://your-render-backend-url/api
```

---

# 📸 Application Screens

- Landing Page
- Login
- Signup
- OTP Verification
- Dashboard
- AI Email Generator
- Email History
- User Profile

---

# 🔐 Security Features

- Password Hashing (bcrypt)
- JWT Authentication
- Protected Routes
- User-specific History
- Secure Environment Variables
- Input Validation

---

# ✨ Future Improvements

- Resend OTP
- Forgot Password
- Dark Mode
- Export Emails
- Delete History
- AI Tone Selection
- Email Templates
- Analytics Dashboard

---

# 👨‍💻 Author

**Vansh Jain**

GitHub

https://github.com/Vanshjain8929

LinkedIn

www.linkedin.com/in/vansh-jain-3b3444289

---

# ⭐ If you like this project

Please consider giving the repository a ⭐ on GitHub.
