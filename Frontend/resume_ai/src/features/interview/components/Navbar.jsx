

const Navbar = ({ user, onLogout, onBrandClick }) => {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 shadow-md">
      <div 
        onClick={onBrandClick}
        className="flex items-center gap-2 cursor-pointer select-none group"
      >
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent transform transition-transform duration-300 group-hover:scale-120 group-hover:rotate-12">
          ⚡
        </span>
        <span className="text-lg font-extrabold text-zinc-100 tracking-tight group-hover:text-purple-400 transition-colors duration-200">
          AI COACHES
        </span>
      </div>
      
      <div className="flex items-center gap-4 text-sm">
        {user && (
          <span className="text-zinc-400 hidden sm:inline animate-fade-down">
            Welcome, <span className="font-semibold text-zinc-100 border-b border-dashed border-purple-400 pb-0.5">{user.userName || user.email}</span>
          </span>
        )}
        <button
          onClick={onLogout}
          className="px-4 py-2 text-xs font-semibold text-zinc-200 bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer hover:bg-purple-950/20 hover:border-purple-400 hover:text-purple-300 active:scale-95 transition-all duration-200"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
