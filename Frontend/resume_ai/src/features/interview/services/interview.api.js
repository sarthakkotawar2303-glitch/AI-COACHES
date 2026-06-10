import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    withCredentials: true
});

export const generateInterviewReport = async ({ resumeFile, selfDescription, jobDescription }) => {
    try {
        const formData = new FormData();
        formData.append("resume", resumeFile);
        formData.append("selfDescription", selfDescription);
        formData.append("jobDescription", jobDescription);

        const response = await api.post("/api/interview", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data?.message || error.message };
    }
};

/**
 * 
 * @Description get interview reports
 */

export const interviewReports=async()=>{
    try {
        const response=await api.get("/api/interview")
        return {success:true,data:response.data}
    } catch (error) {
        return {success:false,error:error.response?.data?.message || error.message}
    }
}

/**
 * 
 * @Description get reports using id
 */
export const interviewReportById=async(id)=>{
    try {
        const response=await api.get("/api/interview/"+id)
        return {success:true,data:response.data}
    } catch (error) {
        return {success:false,error:error.response?.data?.message || error.message}
    }
}
