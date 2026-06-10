import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";



export const Protected=({children})=>{
    const {user,loading}=useAuth();
    
    if(loading){
        return (
            <main className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-zinc-300 relative overflow-hidden">
                {/* Glowing background orbs */}
                <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse"></div>
                <div className="relative z-10 flex flex-col items-center animate-fade-scale">
                    <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
                        <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 border-b-purple-500 rounded-full animate-spin duration-1000"></div>
                        <div className="absolute inset-2 border-4 border-transparent border-l-indigo-400 border-r-indigo-400 rounded-full animate-spin duration-700 reverse"></div>
                        <div className="text-purple-400 text-xl font-bold animate-pulse">⚡</div>
                    </div>
                    <h2 className="text-lg font-extrabold text-zinc-100 tracking-wide animate-pulse">Securing Session</h2>
                    <p className="text-xs text-zinc-500 mt-2">Checking authorization credentials...</p>
                </div>
            </main>
        );
    }
    if(!user){
        return <Navigate to="/login" replace />
    }
    return children;
}