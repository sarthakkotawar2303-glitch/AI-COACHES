const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cloudinary = require('cloudinary');
const cookieParser = require('cookie-parser');
const connectDb = require('./Config/db');
const authRoutes=require('./Routes/auth.routes');
const cors=require('cors')
const interviewRouter = require('./Routes/interview.routes');


const app = express();

//db connection
connectDb();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const allowedOrigin = process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL
    : (process.env.CLIENT_URL || "http://localhost:5173");

app.use(cors({
    origin: allowedOrigin,
    credentials: true
}));

//routes
app.use("/api/auth",authRoutes);
app.use("/api/interview",interviewRouter)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});