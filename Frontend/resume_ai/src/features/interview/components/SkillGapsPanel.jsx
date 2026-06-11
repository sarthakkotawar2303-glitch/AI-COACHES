

import { CheckCircle2 } from "lucide-react";

const SkillGapsPanel = ({ gaps = [] }) => {
  return (
    <div className="space-y-4">
      <p className="text-xs text-zinc-400 text-left">
        Essential skills or qualifications missing or underrepresented in your profile:
      </p>

      {gaps && gaps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {gaps.map((gap, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-4 bg-zinc-900/30 border border-zinc-800/60 rounded-xl hover:border-zinc-700/80 transition-all duration-200 shadow-md"
            >
              <span className="text-xs font-bold text-zinc-200 pr-2 truncate">
                {gap.skill}
              </span>
              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase shrink-0 font-mono ${
                  gap.severity === "high"
                    ? "text-red-400 border-red-500/20 bg-red-500/10"
                    : gap.severity === "medium"
                    ? "text-amber-400 border-amber-500/20 bg-amber-500/10"
                    : "text-blue-400 border-blue-500/20 bg-blue-500/10"
                }`}
              >
                {gap.severity}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 border border-dashed border-emerald-500/20 rounded-xl bg-emerald-500/5 text-emerald-400 text-center max-w-md mx-auto">
          <CheckCircle2 size={32} className="text-emerald-500 mb-2" />
          <p className="text-xs font-bold">Alignment Matches Cleanly!</p>
          <p className="text-[10px] text-emerald-500/70 mt-1">
            Your qualifications cover the target requirements.
          </p>
        </div>
      )}
    </div>
  );
};

export default SkillGapsPanel;
