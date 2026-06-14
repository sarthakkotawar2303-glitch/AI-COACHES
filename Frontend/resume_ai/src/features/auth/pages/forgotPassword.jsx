import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { forgotPassword } from '../services/auth.api';
import BackgroundGrid from '../../../components/Background/BackgroundGrid';
import Loading from '../../../components/Loader/Loading';

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
        <BackgroundGrid>
            <div className="flex-1 flex items-center justify-center p-6 relative">
                <div className="w-full max-w-md z-10 space-y-8 bg-zinc-900/40 p-8 rounded-2xl border border-zinc-800/80 backdrop-blur-xl">
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
                                    className="w-full pl-11 pr-4 py-3 bg-zinc-950/60 border border-zinc-800 text-zinc-100 rounded-xl text-sm placeholder:text-zinc-650 focus:outline-none focus:border-purple-500 hover:border-zinc-700 transition-all duration-200"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                {loading ? <Loading variant="button" title="Sending..." /> : <><Send size={14} /> Send Reset Link</>}
                            </button>
                        </div>

                        <div className="flex justify-center pt-2">
                            <Link to="/login" className="text-xs text-zinc-500 hover:text-zinc-300 font-semibold transition-all flex items-center gap-1">
                                <ArrowLeft size={12} /> Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </BackgroundGrid>
    );
};

export default ForgotPassword;
