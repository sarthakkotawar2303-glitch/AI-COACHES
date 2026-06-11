import { useContext, useCallback } from "react"
import InterviewContext from "../state/interviewContext"
import { generateInterviewReport, interviewReports, interviewReportById } from "../services/interview.api"

export const useInterview = () => {
    const context = useContext(InterviewContext)

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reportList, setReportList } = context

    const generateReport = useCallback(async (jobDescription, resume, selfDescription) => {
        try {
            setLoading(true)
            const response = await generateInterviewReport({ selfDescription, jobDescription, resumeFile: resume })

            if (response?.success) {
                const reportData = response.data?.data || response.data;
                setReport(reportData)
                return { success: true, data: reportData }
            } else {
                return { success: false, error: response?.error || "Failed to generate report" }
            }
        } catch (error) {
            console.error(error)
            return { success: false, error: error.message }
        } finally {
            setLoading(false)
        }
    }, [setLoading, setReport])

    const getById = useCallback(async (id) => {
        try {
            setLoading(true)
            const response = await interviewReportById(id)

            if (response?.success) {
                // response.data is { success: true, data: interviewReport }
                const reportData = response.data?.data || response.data;
                setReport(reportData)
                return { success: true, data: reportData }
            } else {
                return { success: false, error: response?.error || "Failed to fetch report" }
            }
        } catch (error) {
            console.error(error)
            return { success: false, error: error.message }
        } finally {
            setLoading(false)
        }
    }, [setLoading, setReport])

    const getReports = useCallback(async () => {
        try {
            setLoading(true)
            const response = await interviewReports()

            if (response?.success) {
                // response.data is { success: true, data: [reports...] }
                const listData = response.data?.data || response.data?.interviewReports || response.data || [];
                setReportList(listData)
                return { success: true, data: listData }
            } else {
                return { success: false, error: response?.error || "Failed to fetch report history" }
            }
        } catch (error) {
            console.error(error)
            return { success: false, error: error.message }
        } finally {
            setLoading(false)
        }
    }, [setLoading, setReportList])

    return {
        generateReport,
        getById,
        getReports,
        loading,
        report,
        reportList,
        setReportList,
        setReport,
    }
}