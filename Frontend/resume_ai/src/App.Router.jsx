import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import Home from "./features/interview/pages/Home";
import { Protected } from "./features/auth/components/protected";
import InterviewReport from "./features/interview/pages/interviewReport";
import ForgotPassword from "./features/auth/pages/forgotPassword";
import ResetPassword from "./features/auth/pages/resetPassword";

const router = createBrowserRouter([
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />
    },
    {
        path: "/reset-password/:token",
        element: <ResetPassword />
    },
    {
        path: "/",
        element: <Protected>
            <Home />
        </Protected>
    },{
        path:'/report',
        element:<InterviewReport/>
    }
])
export default router;