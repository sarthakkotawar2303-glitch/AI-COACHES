# AI COACHES

> An intelligent, production-ready preparation platform that parses resumes, analyzes target role alignment, and generates customized study roadmaps using Google Gemini AI.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![React Version](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com)

[🌐 Live Demo Link](https://your-live-demo-url.com) | [📽️ Video Walkthrough](https://your-video-link.com)

---

## <img src="https://api.iconify.design/lucide:lightbulb.svg?color=%238E75C2" width="22" height="22" align="center" /> Overview

### What is it?
- A full-stack, AI-driven preparation cockpit that helps candidates evaluate their profile fit against target job roles.
- Acts as a digital coaching companion that parses uploaded resumes and cross-references them with specific job descriptions.
- Employs Google Gemini AI models to perform semantic matching, extracting key technical strengths, behavioral alignments, and core discrepancies.
- Renders an interactive dashboard with a comprehensive alignment score widget, severity-ranked skill gaps, and interactive preparation resources.

### What problem does it solve?
- **Application Mismatch**: Job applicants often fail to align their keywords and skills with target postings, leading to high automated rejection rates by Applicant Tracking Systems (ATS).
- **Lack of Direction**: Candidates rarely have a personalized, structured study roadmap to address their role-specific technical and behavioral skill gaps.
- **Unstructured Mock Prep**: Most practice tools provide generic prep questions rather than custom prompts targeting a candidate's actual resume experience relative to the target role.
- **Session Friction**: Securing and resuming personal resume analysis histories is often friction-heavy, requiring simple, persistent session states.

### Why was it built?
- To empower job seekers by instantly generating customized daily study plans, contextual technical questions, and structured behavioral prompt templates tailored to their exact profile gaps.
- Built to replace generic, static preparation guides with a responsive, high-performance coaching companion.
- Designed to showcase modern web technologies—integrating React 19, Vite, and Tailwind CSS v4 with a robust Node.js backend.
- Intended to offer users a visually premium dark-theme interface with smooth micro-animations and zero interaction latency.

---

## <img src="https://api.iconify.design/lucide:sparkles.svg?color=%238E75C2" width="22" height="22" align="center" /> Key Features

- **<img src="https://api.iconify.design/lucide:bot.svg?color=%238E75C2" width="16" height="16" align="center" /> Profile Alignment Analysis**: Automatically uploads and extracts raw text from PDF resumes to compute an instant match readiness score against job targets.
- **<img src="https://api.iconify.design/lucide:calendar.svg?color=%238E75C2" width="16" height="16" align="center" /> Dynamic Timelines**: Delivers an automated, day-wise study timeline explicitly tailored around identified profile deficiencies.
- **<img src="https://api.iconify.design/lucide:target.svg?color=%238E75C2" width="16" height="16" align="center" /> Contextual Preparation**: Generates mock technical coding questions and behavioral response templates using the structured **STAR method**.
- **<img src="https://api.iconify.design/lucide:lock.svg?color=%238E75C2" width="16" height="16" align="center" /> Secure Authentication & Mailers**: Restricts dashboard access using custom JWT-based middleware, validates data schemas via **Zod**, and manages secure password resets through an asynchronous NodeMailer pipeline.
- **<img src="https://api.iconify.design/lucide:palette.svg?color=%238E75C2" width="16" height="16" align="center" /> Modern Dark UI**: Incorporates modern glassmorphism UI panels, harmonious color gradients, and animated loading components.

---

## <img src="https://api.iconify.design/lucide:cpu.svg?color=%238E75C2" width="22" height="22" align="center" /> Tech Stack

### Frontend
- **Library**: [![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://react.dev) Core UI Framework
- **Build Tool**: [![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite)](https://vite.dev) Fast Frontend Bundler
- **Styles**: [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com) Utility-First Styling & Sass
- **Routing**: [![React Router](https://img.shields.io/badge/React_Router-v7.0-CA4245?style=flat-square&logo=react-router)](https://reactrouter.com) Declarative Routing

### Backend & Core Services
- **Runtime**: [![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org) JavaScript Server Runtime
- **Framework**: [![Express](https://img.shields.io/badge/Express-REST_API-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com) REST API Engine
- **Cognitive Engine**: [![Google Gemini](https://img.shields.io/badge/Google_Gemini-Cognitive_Engine-8E75C2?style=flat-square&logo=google-gemini)](https://deepmind.google) Cognitive Parsing Engine (`@google/genai`)
- **Database**: [![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com) Persistent Storage via Mongoose ODM

### Cloud Integrations & Utilities
- **Storage**: Cloudinary & Multer (File upload pipeline)
- **Parser**: pdf-parse (Text extraction)
- **Email Engine**: Nodemailer
- **Validation**: Zod Schema Validation

---

## <img src="https://api.iconify.design/lucide:folder-tree.svg?color=%238E75C2" width="22" height="22" align="center" /> Architecture Directory Structure

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

## <img src="https://api.iconify.design/lucide:rocket.svg?color=%238E75C2" width="22" height="22" align="center" /> Getting Started

### Prerequisites

Ensure you have the following environments configured locally:
- **Node.js**: Version 18.0 or higher
- **MongoDB**: An active database instance (Local Daemon or MongoDB Atlas Cluster)
- **Cloudinary Account**: For profile and document assets
- **Google Gemini API Key**: Acquired via Google AI Studio

---

### Setup and Installation

#### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/resume-builder.git
cd ResumeBuilder
```

#### Step 2: Install Dependencies
Install the required packages for both sub-environments:
```bash
# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../Frontend/resume_ai
npm install
```

#### Step 3: Configure Environment Variables
Create a `.env` file inside the `Backend/` directory:
```env
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

##### Variable Definitions
- `PORT`: The local server port (defaults to `3000`).
- `MONGO_URI`: The MongoDB connection string.
- `JWT_SECRET`: Random string for JWT encryption.
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud identifier.
- `CLOUDINARY_API_KEY`: Cloudinary access key.
- `CLOUDINARY_API_SECRET`: Cloudinary secure credential.
- `GEMINI_API_KEY`: Google AI Studio API token.
- `EMAIL_USER`: NodeMailer sender email address.
- `EMAIL_PASS`: App-specific email password.

#### Step 4: Run the Application
1. Start the Backend API server:
   ```bash
   cd Backend
   npm run dev
   ```
2. In a separate terminal instance, boot the Frontend interface:
   ```bash
   cd Frontend/resume_ai
   npm run dev
   ```
3. Open your environment browser and navigate to:
   ```text
   http://localhost:5173
   ```

---

## <img src="https://api.iconify.design/lucide:file-text.svg?color=%238E75C2" width="22" height="22" align="center" /> Code Documentation Standard

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

[![GitHub Stats](https://img.shields.io/badge/GitHub-Stats-181717?style=flat-square&logo=github)](https://github.com/sarthakkotawar2303-glitch)

---

## <img src="https://api.iconify.design/lucide:scale.svg?color=%238E75C2" width="22" height="22" align="center" /> License

Distributed under the MIT License. See `LICENSE` for more information.
