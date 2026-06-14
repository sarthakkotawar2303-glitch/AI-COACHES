import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Mail, Lock, LogIn, Eye, EyeOff, Zap } from 'lucide-react';
import BackgroundGrid from '../../../components/Background/BackgroundGrid';
import Loading from '../../../components/Loader/Loading';

const Login = () => {
    const { loading, handleLogin } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const res = await handleLogin({ email, password });
        if (res && !res.success) {
            setError(res.error);
        }
    };

    if (loading) {
        return (
            <Loading 
                variant="fullscreen" 
                title="Authenticating..." 
                subtitle="Connecting to secure servers" 
            />
        );
    }

    return (
        <BackgroundGrid>
            <div className="flex-1 flex min-h-screen overflow-hidden">
                {/* Left Column: Intro Panel */}
                <div className="hidden md:flex md:w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden bg-zinc-950/30 animate-slide-left">
                    <div className="relative z-10 max-w-md space-y-6 text-left">
                        <div className="flex items-center gap-3 animate-fade-down">
                            <Zap size={24} className="text-purple-500" />
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
                <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden bg-transparent animate-slide-right">
                    <div className="w-full max-w-md z-10 space-y-8">
                        <div className="space-y-6">
                            
                            <div className="flex flex-col items-center text-center space-y-3 opacity-0 animate-fade-up">
                                <h1 className="text-2xl font-extrabold text-zinc-100 tracking-tight">Sign In</h1>
                                <p className="text-xs text-zinc-400">Enter your email and password to Sign In</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {error && (
                                    <div className="p-3 bg-red-950 border border-red-900 text-red-400 rounded-xl text-xs text-center opacity-0 animate-fade-up">
                                        {error}
                                    </div>
                                )}
                                <div className="space-y-4">
                                    <div className="flex flex-col text-left opacity-0 animate-fade-up delay-100">
                                        <div className="relative">
                                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-purple-400" size={16} />
                                            <input 
                                                type="email" 
                                                onChange={(e) => setEmail(e.target.value)} 
                                                value={email} 
                                                placeholder="Email Address" 
                                                name="email" 
                                                id="email"
                                                className="w-full pl-11 pr-4 py-3 bg-zinc-950/60 border border-zinc-800 text-zinc-100 rounded-xl text-sm placeholder:text-zinc-650 focus:outline-none focus:border-purple-500 hover:border-zinc-700 transition-all duration-200"
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
                                                className="w-full pl-11 pr-11 py-3 bg-zinc-950/60 border border-zinc-800 text-zinc-100 rounded-xl text-sm placeholder:text-zinc-650 focus:outline-none focus:border-purple-500 hover:border-zinc-700 transition-all duration-200"
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

                                <div className="flex justify-end pt-1 opacity-0 animate-fade-up delay-200">
                                    <Link to="/forgot-password" className="text-xs text-purple-400 hover:text-purple-300 font-semibold transition-all">
                                        Forgot Password ?
                                    </Link>
                                </div>

                                <div className="opacity-0 animate-fade-up delay-300">
                                    <button 
                                        type="submit" 
                                        className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl active:scale-[0.98] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-600 flex items-center justify-center gap-2"
                                    >
                                        <LogIn size={14} /> Sign In
                                    </button>
                                </div>
                                
                                <p className="text-xs text-zinc-500 text-center pt-2 opacity-0 animate-fade-up delay-400">
                                    Don't have an account? 
                                    <Link to="/register" className="text-purple-400 hover:text-purple-300 font-bold transition-all ml-1">
                                        Register
                                    </Link>
                                </p>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </BackgroundGrid>
    );
};

export default Login;