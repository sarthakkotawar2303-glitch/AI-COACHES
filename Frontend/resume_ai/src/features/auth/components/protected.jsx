import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Loading from "../../../components/Loader/Loading";

export const Protected=({children})=>{
    const {user,loading}=useAuth();
    
    if(loading){
        return (
            <Loading 
                variant="fullscreen" 
                title="Securing Session" 
                subtitle="Checking authorization credentials..." 
            />
        );
    }
    if(!user){
        return <Navigate to="/login" replace />
    }
    return children;
}