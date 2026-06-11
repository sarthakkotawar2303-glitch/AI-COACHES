import { Plus, BarChart2, Clock, FileText, FolderOpen } from "lucide-react";

const DashboardView = ({ averageReadiness, reportsCount, reports, onStartNew, onSelectReport, formatDate }) => {
  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Hero / Action Header Card */}
      <section className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl shadow-md">
        <div className="max-w-3xl space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
            AI Interview Readiness Coach
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Evaluate your candidate profile against any software engineering position. Upload your resume in PDF format, provide the target job requirements, and get detailed coaching insights including key engineering questions, STAR response guides, and a day-wise roadmap.
          </p>
          <div className="pt-4">
            <button
              onClick={onStartNew}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              <Plus size={14} /> Start New Analysis
            </button>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Average Readiness</span>
            <div className="text-2xl font-bold text-zinc-100 mt-1">
              {averageReadiness}%
            </div>
          </div>
          <BarChart2 size={24} className="text-zinc-600" />
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Analyses Run</span>
            <div className="text-2xl font-bold text-zinc-100 mt-1">
              {reportsCount} <span className="text-xs font-normal text-zinc-400">{reportsCount === 1 ? "Session" : "Sessions"}</span>
            </div>
          </div>
          <Clock size={24} className="text-zinc-500" />
        </div>
      </div>

      {/* Saved Reports Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-zinc-100 tracking-tight flex items-center gap-2">
          <FileText size={16} className="text-zinc-400" />
          Saved Analyses & History
        </h2>

        {reports && reports.length > 0 ? (
          <div className="divide-y divide-zinc-800">
            {reports.map((item) => (
              <div
                key={item._id}
                className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 first:pt-1 last:pb-1"
              >
                <div className="flex items-center gap-4">
                  <div className={`text-xs font-mono font-bold shrink-0 min-w-[36px] ${
                    item.matchScore >= 80 ? "text-emerald-400" : item.matchScore >= 50 ? "text-amber-400" : "text-red-400"
                  }`}>
                    {item.matchScore}%
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-zinc-200">
                      {item.title || "Interview Readiness Report"}
                    </h3>
                    <p className="text-[10px] text-zinc-500 mt-0.5">
                      {item.matchScore >= 80 ? "Strong Core Alignment" : "Preparation Required"} • Evaluated {formatDate(item.createdAt)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onSelectReport(item._id)}
                  className="w-full sm:w-auto px-4 py-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-zinc-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Open Report
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 border border-dashed border-zinc-800 rounded-lg bg-zinc-950/10 text-center">
            <FolderOpen size={24} className="text-zinc-600 mb-1.5" />
            <p className="text-xs font-semibold text-zinc-400">No past reports found</p>
            <p className="text-[10px] text-zinc-500 mt-0.5">
              Your generated readiness guides will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardView;
