import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export const register = async ({ userName, email, password }) => {
    try {
        const response = await api.post("/api/auth/register", {
            userName,
            email,
            password,
        }, {
            withCredentials: true
        })
        return { success: true, data: response.data }
    } catch (error) {
        return { success: false, error: error.response?.data?.message || error.message || "An error occurred" }
    }
}

export const login = async ({ email, password }) => {
    try {
        const response = await api.post("/api/auth/login", {
            email,
            password,
        }, {
            withCredentials: true
        })
        return { success: true, data: response.data }
    } catch (error) {
        return { success: false, error: error.response?.data?.message || error.message || "An error occurred" }
    }
}

export const logout = async () => {
    try {
        const response = await api.post("/api/auth/logout", null, {
            withCredentials: true
        })
        return { success: true, data: response.data }
    } catch (error) {
        return { success: false, error: error.response?.data?.message || error.message || "An error occurred" }
    }
}

export const GetMe = async () => {
    try {
        const response = await api.get("/api/auth/getme", {
            withCredentials: true
        })
        return { success: true, data: response.data }
    } catch (error) {
        return { success: false, error: error.response?.data?.message || error.message || "An error occurred" }
    }
}

export const forgotPassword = async (email) => {
    try {
        const response = await api.post("/api/auth/forgot-password", {
            email
        })
        return { success: true, data: response.data }
    } catch (error) {
        return { success: false, error: error.response?.data?.message || error.message || "An error occurred" }
    }
}

export const resetPassword = async (token, password) => {
    try {
        const response = await api.post(`/api/auth/reset-password/${token}`, {
            password
        })
        return { success: true, data: response.data }
    } catch (error) {
        return { success: false, error: error.response?.data?.message || error.message || "An error occurred" }
    }
}
