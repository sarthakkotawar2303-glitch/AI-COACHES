# AI-Powered Resume Builder

A full-stack web application designed to help users create, manage, and optimize their resumes using the power of Google Gemini AI.

## 🌟 Features

- **AI-Powered Resume Generation**: Leverage Google's Gemini AI (`@google/genai`) to generate professional resume content, summaries, and bullet points.
- **User Authentication**: Secure signup, login, password reset, and forgot password functionality using JWT and `bcrypt`.
- **Email Integration**: Automated emails for password resets and notifications using `nodemailer`.
- **File Management**: Upload profile pictures and parse existing PDF resumes with `cloudinary`, `multer`, and `pdf-parse`.
- **Modern User Interface**: Responsive and beautiful frontend built with React, Vite, and Tailwind CSS.
- **RESTful API**: Robust backend built on Node.js, Express, and MongoDB.

## 💻 Tech Stack

### Frontend
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS & Sass
- **Routing**: React Router v7
- **Icons**: Lucide React
- **API Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **AI Integration**: Google GenAI SDK
- **Authentication**: JSON Web Tokens (JWT) & bcrypt
- **File Uploads**: Multer & Cloudinary
- **Emails**: Nodemailer
- **Validation**: Zod

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB instance
- Cloudinary account
- Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/resume-builder.git
   cd resume-builder
   ```

2. **Setup the Backend**
   ```bash
   cd Backend
   npm install
   ```
   Create a `.env` file in the `Backend` directory and add your environment variables:
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
   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Setup the Frontend**
   ```bash
   cd ../Frontend/resume_ai
   npm install
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```

## 📝 License

This project is licensed under the ISC License.
