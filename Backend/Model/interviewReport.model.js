const mongoose = require("mongoose");


/**
 * - job description
 * - resume text
 * - self description
 * - 
 * 
 * 
 * - Match score : Number
 * 
 * - Technical Question:[{
 *      question,intension,answer}]
 * -  Behaviour questions:[{
 *      question,intension,answer}]
 * -  skill gaps:[{
 *      skill,severity enum[low,medium,high]]
 *         }]
 * 
 * - preparation plan:[{
 * day:number,
 * focus:String,
 * content:String}]
 * 
 * 
 * 
 */
const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"],
        trim: true,
    },
    intension: {
        type: String,
        required: [true, "Intension is required"],
    },
    answer: {
        type: String,
        required: [true, "Answer is required"],
        trim: true,
    }
}, {
    _id: false
})

const behaveioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"],
        trim: true,
    },
    intension: {
        type: String,
        required: [true, "Intension is required"],
    },
    answer: {
        type: String,
        required: [true, "Answer is required"],
        trim: true,
    }
}, {
    _id: false
})

const skillGapsSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"],
        trim: true,
    },
    severity: {
        type: String,
        required: [true, "Severity is required"],
        enum: ["low", "medium", "high"],
    }
}, {
    _id: false
})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is required"],
    },
    focus: {
        type: String,
        required: [true, "Focus is required"],
    },
    content: {
        type: String,
        required: [true, "Content is required"],
    }
}, {
    _id: false
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job Description is required"],
        trim: true,
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        required: [true, "Matchscore  is required"],
    },
    technicalQuestions: [technicalQuestionSchema],
behavioralQuestions: [behaveioralQuestionSchema],
skillGap: [skillGapsSchema],
preparationPlan: [preparationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    }
}, {
    timestamps: true
})

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema)

module.exports = interviewReportModel