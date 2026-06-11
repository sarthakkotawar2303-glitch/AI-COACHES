import { Zap } from "lucide-react";

const Navbar = ({ user, onLogout, onBrandClick }) => {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 shadow-md">
      <div 
        onClick={onBrandClick}
        className="flex items-center gap-2 cursor-pointer select-none group"
      >
        <Zap size={18} className="text-zinc-300 group-hover:text-zinc-100 transition-colors duration-200" />
        <span className="text-base font-bold text-zinc-100 tracking-tight transition-colors duration-200">
          AI COACHES
        </span>
      </div>
      
      <div className="flex items-center gap-4 text-sm">
        {user && (
          <span className="text-zinc-400 hidden sm:inline">
            Welcome, <span className="font-semibold text-zinc-100 border-b border-dashed border-zinc-700 pb-0.5">{user.userName || user.email}</span>
          </span>
        )}
        <button
          onClick={onLogout}
          className="px-4 py-2 text-xs font-semibold text-zinc-200 bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer hover:bg-zinc-800 hover:border-zinc-700 hover:text-zinc-100 active:scale-95 transition-all duration-200"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
