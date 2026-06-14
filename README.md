# AI COACHES

> An intelligent, production-ready preparation platform that parses resumes, analyzes target role alignment, and generates customized study roadmaps using Google Gemini AI.

![License: MIT](https://shields.io)
![Node.js Version](https://shields.io>=18.0.0-green?style=flat-square&logo=node.js)
![React Version](https://shields.io)
![MongoDB](https://shields.io)

[🌐 Live Demo Link](https://your-live-demo-url.com) | [📽️ Video Walkthrough](https://your-video-link.com)

---

## 💡 Overview

### What is it?
A full-stack, AI-driven preparation cockpit that helps candidates evaluate their profile fit against target job roles.

### What problem does it solve?
* **Application Mismatch:** Job applicants often fail to align their keywords and skills with target postings, leading to high automated rejection rates.
* **Lack of Direction:** Candidates rarely have a personalized, structured study roadmap to address their role-specific technical and behavioral skill gaps.

### Why was it built?
To empower job seekers by instantly generating customized daily study plans, contextual technical questions, and structured behavioral prompt templates tailored to their exact profile gaps.

---

## ✨ Key Features

* **🤖 Profile Alignment Analysis:** Automatically uploads and extracts raw text from PDF resumes to compute an instant match readiness score against job targets.
* **📅 Dynamic Timelines:** Delivers an automated, day-wise study timeline explicitly tailored around identified profile deficiencies.
* **🎯 Contextual Preparation:** Generates mock technical coding questions and behavioral response templates using the structured **STAR method**.
* **🔒 Secure Authentication & Mailers:** Restricts dashboard access using custom JWT-based middleware, validates data schemas via **Zod**, and manages secure password resets through an asynchronous NodeMailer pipeline.
* **🎨 Modern Dark UI:** Incorporates modern glassmorphism UI panels, harmonious color gradients, and animated loading components.

---

## 🛠️ Tech Stack

### Frontend
* ![React](https://shields.io) Core UI Framework
* ![Vite](https://shields.io) Fast Frontend Bundler
* ![Tailwind CSS](https://shields.io) Utility-First Styling & Sass
* ![React Router](https://shields.io) Declarative Routing

### Backend & Core Services
* ![Node.js](https://shields.ioRuntime-339933?style=flat-square&logo=node.js&logoColor=white) JavaScript Server Runtime
* ![Express](https://shields.io) REST API Engine
* ![Google Gemini](https://shields.io) Cognitive Parsing Engine (`@google/genai`)
* ![MongoDB](https://shields.io) Persistent Storage via Mongoose ODM

### Cloud Integrations & Utilities
* **Storage:** Cloudinary & Multer (File upload pipeline)
* **Parser:** pdf-parse (Text extraction)
* **Email Engine:** Nodemailer
* **Validation:** Zod Schema Validation

---

## 📂 Architecture Directory Structure

```text
ResumeBuilder/
├── Backend/                 # Express backend API & models
│   ├── config/              # Cloudinary, Database connections
│   ├── controllers/         # Auth, AI analysis handlers
│   ├── middleware/          # JWT auth validation gates
│   ├── models/              # User, Report schema models
│   └── routes/              # Express endpoint routers
└── Frontend/
    └── resume_ai/           # Vite React frontend SPA
        ├── public/          # Static assets
        └── src/
            ├── components/  # Shared layouts, grids, loaders
            ├── features/    # Modular functional domains
            │   ├── auth/    # Login, signup, password resets
            │   └── interview/# Reports, charts, timelines, file uploads
            └── index.css    # Core design styles & transitions
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following environments configured locally:
* **Node.js**: Version 18.0 or higher
* **MongoDB**: An active database instance (Local Daemon or MongoDB Atlas Cluster)
* **Cloudinary Account**: For profile and document assets
* **Google Gemini API Key**: Acquired via Google AI Studio

### Setup and Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com
   cd ResumeBuilder
   ```

2. **Install Dependencies:**
   Install the required packages for both sub-environments:
   ```bash
   # Install backend dependencies
   cd Backend
   npm install

   # Install frontend dependencies
   cd ../Frontend/resume_ai
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file inside the `Backend/` directory:
   ```bash
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   GEMINI_API_KEY=your_gemini_api_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ```

4. **Run the Application:**
   Start the Backend server first:
   ```bash
   cd Backend
   npm run dev
   ```
   In a separate terminal instance, boot the Frontend interface:
   ```bash
   cd Frontend/resume_ai
   npm run dev
   ```
   Open your environment browser and navigate to: `http://localhost:5173`

---

## 📝 Code Documentation Standard

This codebase uses strict inline documentation practices. All public endpoints, validation middleware routes, and database abstraction layers are fully annotated utilizing **JSDoc parameters**.

Example of our method documentation standard:
```javascript
/**
 * Express middleware to validate inbound JWT tokens.
 * @param {Object} req - Inbound Express request object.
 * @param {Object} res - Outbound Express response object.
 * @param {Function} next - Express next middleware validation gate.
 * @throws {UnauthorizedError} If authorization header is missing or token is invalid.
 */
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
