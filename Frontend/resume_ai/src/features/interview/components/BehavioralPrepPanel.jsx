import { useState } from "react";

const BehavioralPrepPanel = ({ questions = [] }) => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="space-y-4">
      <p className="text-xs text-zinc-400 mb-2">
        Prepare behavioral responses structured using the Situation, Task, Action, and Result (STAR) framework:
      </p>

      {questions && questions.length > 0 ? (
        questions.map((q, idx) => {
          const id = `behave-${idx}`;
          const isOpen = expandedId === id;
          return (
            <div
              key={idx}
              className={`bg-zinc-900/30 border rounded-xl overflow-hidden transition-all duration-200 ${
                isOpen ? "border-indigo-500/60 shadow-lg shadow-indigo-500/5 bg-zinc-900/40" : "border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <div
                onClick={() => setExpandedId(isOpen ? null : id)}
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-zinc-900/20 transition-all"
              >
                <div className="flex gap-3 items-start pr-2 text-left">
                  <span className="text-[10px] font-bold tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-1 border border-indigo-500/15 rounded font-mono shrink-0">
                    B{idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-zinc-205 leading-relaxed">
                    {q.question}
                  </span>
                </div>
                <span className={`text-[10px] text-zinc-500 transform transition-transform shrink-0 ml-2 ${isOpen ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </div>

              {isOpen && (
                <div className="p-5 border-t border-zinc-850/60 space-y-4 text-xs sm:text-sm leading-relaxed bg-zinc-950/40 text-left">
                  <div className="p-3.5 bg-indigo-500/5 border-l-2 border-indigo-500 rounded-r-lg">
                    <p className="font-bold text-indigo-400 uppercase tracking-wider text-[9px] font-mono">
                      Soft Skill Objective
                    </p>
                    <p className="text-zinc-300 mt-1 italic">{q.intension}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-zinc-400 uppercase tracking-wider text-[9px] font-mono">
                      Recommended Response Guide (STAR format)
                    </p>
                    <p className="text-zinc-300 mt-1 pl-1 whitespace-pre-line">{q.answer}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="text-center py-8 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-xl">
          <p className="text-xs text-zinc-500">No behavioral questions suggested.</p>
        </div>
      )}
    </div>
  );
};

export default BehavioralPrepPanel;
