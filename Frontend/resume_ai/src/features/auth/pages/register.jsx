import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Lock, UserPlus, Eye, EyeOff } from 'lucide-react';

const Register = () => {
    const { loading, handleRegister } = useAuth();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleRegister({ userName, email, password });
    };

    if (loading) {
        return (
            <main className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-zinc-300 relative overflow-hidden">
                {/* Decorative glow orbs */}
                <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse"></div>
                <div className="relative z-10 flex flex-col items-center animate-fade-scale">
                    <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
                        <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 border-b-purple-500 rounded-full animate-spin duration-1000"></div>
                        <div className="absolute inset-2 border-4 border-transparent border-l-indigo-400 border-r-indigo-400 rounded-full animate-spin duration-700 reverse"></div>
                        <div className="text-purple-400 text-xl font-bold animate-pulse">⚡</div>
                    </div>
                    <h2 className="text-lg font-extrabold text-zinc-100 tracking-wide animate-pulse">Creating Account</h2>
                    <p className="text-xs text-zinc-500 mt-2">Setting up your profile...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen bg-zinc-950 text-zinc-300 overflow-hidden">
            {/* Left Column: Intro Panel */}
            <div className="hidden md:flex md:w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden bg-zinc-950 border-r border-zinc-900 animate-slide-left">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-4000"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-3000"></div>

                <div className="relative z-10 max-w-md space-y-6 text-left">
                    <div className="flex items-center gap-3 animate-fade-down">
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                            ⚡
                        </div>
                        <span className="text-2xl font-extrabold text-zinc-100 tracking-tight">AI COACHES</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-zinc-100 tracking-tight leading-tight opacity-0 animate-fade-up delay-100">
                        An artificial intelligence replica of yourself to serve as a coaching companion for clients.
                    </h2>
                    <p className="text-sm text-zinc-400 leading-relaxed opacity-0 animate-fade-up delay-200">
                        Analyze your resume, discover hidden skill gaps, and get step-by-step coaching preparation plans generated instantly by our advanced AI model.
                    </p>
                </div>
            </div>

            {/* Right Column: Form Panel */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden bg-zinc-950 animate-slide-right">
                <div className="absolute md:hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="w-full max-w-md z-10 space-y-8">
                    <div className="space-y-6">
                        
                        <div className="flex flex-col items-center text-center space-y-3 opacity-0 animate-fade-up">
                            <h1 className="text-2xl font-extrabold text-zinc-100 tracking-tight">Create Account</h1>
                            <p className="text-xs text-zinc-400">Get started with your AI Interview Prep Guide</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-4">
                                <div className="flex flex-col text-left opacity-0 animate-fade-up delay-100">
                                    <div className="relative">
                                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                                        <input 
                                            type="text" 
                                            onChange={(e) => setUserName(e.target.value)} 
                                            value={userName} 
                                            placeholder="Username" 
                                            name="username" 
                                            id="username"
                                            className="w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-xl text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 hover:border-zinc-700 transition-all duration-200"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col text-left opacity-0 animate-fade-up delay-150">
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                                        <input 
                                            type="email" 
                                            onChange={(e) => setEmail(e.target.value)} 
                                            value={email} 
                                            placeholder="Email Address" 
                                            name="email" 
                                            id="email"
                                            className="w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-xl text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 hover:border-zinc-700 transition-all duration-200"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col text-left opacity-0 animate-fade-up delay-200">
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                            value={password} 
                                            placeholder="Password" 
                                            name="password" 
                                            id="password"
                                            className="w-full pl-11 pr-11 py-3 bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-xl text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 hover:border-zinc-700 transition-all duration-200"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none cursor-pointer"
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2 opacity-0 animate-fade-up delay-300">
                                <button 
                                    type="submit" 
                                    className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm rounded-xl hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] active:scale-[0.98] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/40 flex items-center justify-center gap-2"
                                >
                                    <UserPlus size={14} /> Register
                                </button>
                            </div>
                            
                            <p className="text-xs text-zinc-500 text-center pt-2 opacity-0 animate-fade-up delay-400">
                                Already have an account? 
                                <Link to="/login" className="text-purple-400 hover:text-purple-300 font-bold transition-all ml-1">
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Register;