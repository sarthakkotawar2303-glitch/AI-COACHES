

const ScoreWidget = ({ score }) => {
  const getScoreStroke = (s) => (s >= 80 ? "#10b981" : s >= 50 ? "#f59e0b" : "#ef4444");
  const getScoreDesc = (s) => 
    s >= 85 ? "Strong Profile Alignment" : 
    s >= 70 ? "Moderate Profile Alignment" : 
    s >= 50 ? "Needs Preparation" : "Significant Training Required";

  const dash = 2 * Math.PI * 24;

  return (
    <div className="flex items-center gap-4 select-none">
      <div className="relative w-14 h-14 flex items-center justify-center">
        <svg className="w-14 h-14 transform -rotate-90">
          <circle className="stroke-zinc-800 fill-none" cx="28" cy="28" r="24" strokeWidth="4" />
          <circle 
            className="fill-none transition-all duration-1000" 
            cx="28" 
            cy="28" 
            r="24" 
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={dash}
            strokeDashoffset={dash * (1 - score / 100)}
            stroke={getScoreStroke(score)}
          />
        </svg>
        <span className="absolute text-sm font-bold font-mono text-zinc-100">{score}%</span>
      </div>
      <div className="text-left">
        <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Readiness Score</p>
        <p className="text-xs font-extrabold text-zinc-200 mt-0.5">{getScoreDesc(score)}</p>
      </div>
    </div>
  );
};

export default ScoreWidget;
