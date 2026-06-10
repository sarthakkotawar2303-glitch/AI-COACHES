

const ReportHistoryList = ({ reports = [], onSelectReport }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getScoreColorClasses = (score) => {
    if (score >= 80) return "border-emerald-500/30 text-emerald-400 bg-emerald-500/5";
    if (score >= 50) return "border-amber-500/30 text-amber-400 bg-amber-500/5";
    return "border-red-500/30 text-red-400 bg-red-500/5";
  };

  return (
    <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/60 rounded-2xl p-5 shadow-xl w-full">
      <h3 className="text-base font-extrabold text-white tracking-tight text-left">
        Recent Analyses
      </h3>
      <p className="text-xs text-zinc-400 mt-0.5 mb-4 text-left">
        Click on any report to load your roadmap dashboard
      </p>

      {reports && reports.length > 0 ? (
        <div className="flex flex-col gap-2 max-h-[480px] overflow-y-auto pr-1">
          {reports.map((item) => (
            <div
              key={item._id}
              onClick={() => onSelectReport(item._id)}
              className="flex justify-between items-center p-3 bg-zinc-950/40 border border-zinc-800 rounded-xl cursor-pointer hover:border-purple-500/40 hover:bg-zinc-900/20 transition-all duration-200 shadow-sm"
            >
              <div className="flex flex-col gap-0.5 overflow-hidden text-left pr-2">
                <span className="text-xs sm:text-sm font-bold text-zinc-200 truncate">
                  {item.title || "Interview Report"}
                </span>
                <span className="text-[10px] text-zinc-500">
                  {formatDate(item.createdAt)}
                </span>
              </div>
              
              <span
                className={`text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded-md border ${getScoreColorClasses(
                  item.matchScore
                )}`}
              >
                {item.matchScore}%
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 border border-dashed border-zinc-800 rounded-xl bg-zinc-950/20 text-center">
          <span className="text-2xl mb-1.5 opacity-60">📁</span>
          <p className="text-xs font-bold text-zinc-400">No past reports found</p>
          <p className="text-[10px] text-zinc-600 mt-0.5">
            Your generated guides will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default ReportHistoryList;
