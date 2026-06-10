const express=require('express')
const { authMiddleware } = require('../Middleware/auth.middleware')
const upload = require('../Middleware/file.middleware')
const { generateInterviewReportController,getInterviewReportsController,getInterviewReportByIdController } = require('../Controllers/interview.controller')
const interviewRouter=express.Router()

/**
 * @route post/api/interview
 * @description generate new interview report on the basis on resume self description and job description
 * @access private
 * */
interviewRouter.post("/",authMiddleware,upload.single("resume"),generateInterviewReportController)

/**
 * @route get/api/interview
 * @description get all interview reports of the logged in user
 * @access private
 * */
interviewRouter.get("/",authMiddleware,getInterviewReportsController)

/**
 * @route get/api/interview/:id
 * @description get interview report by id
 * @access private
 * */
interviewRouter.get("/:id",authMiddleware,getInterviewReportByIdController)
 

module.exports=interviewRouter