const pdfParse = require("pdf-parse");
const interviewReportModel = require("../Model/interviewReport.model");
const generateInterviewReport = require("../Service/ai.service");

/**
 * @description controller to get the interview report
 * @route /api/interview/report
 * @method POST
 * @access private
 */
async function generateInterviewReportController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a PDF resume."
            });
        }

        const pdfData = await pdfParse(req.file.buffer);
        const resumeContent = pdfData.text;

        const { selfDescription, jobDescription } = req.body;

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent,
            selfDescription,
            jobDescription
        });

        console.log(interviewReportByAi);

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent,
            selfDescription,
            jobDescription,
            ...interviewReportByAi
        });

        return res.status(201).json({
            success: true,
            message: "Interview report generated successfully",
            data: interviewReport
        });

    } catch (error) {
        console.error("Controller Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

/**
 * @description controller to get the interview report
 * @route /api/interview/:id
 * @method GET
 * @access private
 */
async function getInterviewReportByIdController(req, res) {
    try {
        const interviewReport = await interviewReportModel.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!interviewReport) {
            return res.status(404).json({
                success: false,
                message: "Interview report not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Interview report fetched successfully",
            data: interviewReport
        });
    } catch (error) {
        console.error("Get report by id error:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

/**
 * @description controller to get all interview reports of the logged in user
 * @route /api/interview
 * @method GET
 * @access private
 */
async function getInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select("-resume -selfDescription -jobDescription -technicalQuestions -behavioralQuestions -preparationPlan");
            
        return res.status(200).json({
            success: true,
            message: "Interview reports fetched successfully.",
            data: interviewReports
        });
    } catch (error) {
        console.error("Get reports error:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    generateInterviewReportController,
    getInterviewReportsController,
    getInterviewReportByIdController
};