import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { forgotPassword } from '../services/auth.api';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        const res = await forgotPassword(email);
        if (res.success) {
            setMessage("A password reset link has been sent to your email.");
        } else {
            setError(res.error || "Failed to send reset email");
        }
        setLoading(false);
    };

    return (
        <main className="flex min-h-screen bg-zinc-950 text-zinc-300 overflow-hidden items-center justify-center p-6 relative">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-4000"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-3000"></div>

            <div className="w-full max-w-md z-10 space-y-8 bg-zinc-900/30 p-8 rounded-2xl border border-zinc-800 backdrop-blur-xl">
                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/20 mb-2">
                        <Mail className="text-purple-400" size={24} />
                    </div>
                    <h1 className="text-2xl font-extrabold text-zinc-100 tracking-tight">Forgot Password</h1>
                    <p className="text-xs text-zinc-400">Enter your email address and we'll send you a link to reset your password.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {message && <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-xs text-center">{message}</div>}
                    {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs text-center">{error}</div>}

                    <div className="flex flex-col text-left">
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-purple-400" size={16} />
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                placeholder="Email Address"
                                required
                                className="w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-xl text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 hover:border-zinc-700 transition-all duration-200"
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            {loading ? "Sending..." : <><Send size={14} /> Send Reset Link</>}
                        </button>
                    </div>

                    <div className="flex justify-center pt-2">
                        <Link to="/login" className="text-xs text-zinc-500 hover:text-zinc-300 font-semibold transition-all flex items-center gap-1">
                            <ArrowLeft size={12} /> Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default ForgotPassword;
