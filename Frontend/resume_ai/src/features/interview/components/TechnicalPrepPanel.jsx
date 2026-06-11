import { useState } from "react";

const TechnicalPrepPanel = ({ questions = [] }) => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="space-y-4">
      <p className="text-xs text-zinc-400 mb-2">
        Click on any query card below to view recommended answers and core objectives:
      </p>

      {questions && questions.length > 0 ? (
        questions.map((q, idx) => {
          const id = `tech-${idx}`;
          const isOpen = expandedId === id;
          return (
            <div
              key={idx}
              className={`bg-zinc-900/30 border rounded-xl overflow-hidden transition-all duration-200 ${
                isOpen ? "border-purple-500 bg-zinc-900" : "border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <div
                onClick={() => setExpandedId(isOpen ? null : id)}
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-zinc-900/20 transition-all"
              >
                <div className="flex gap-2.5 items-start pr-2 text-left">
                  <span className="text-xs font-mono font-bold text-purple-400 shrink-0 pt-0.5">
                    Q{idx + 1}.
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-zinc-200 leading-relaxed">
                    {q.question}
                  </span>
                </div>
                <span className={`text-[10px] text-zinc-500 transform transition-transform shrink-0 ml-2 ${isOpen ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </div>

              {isOpen && (
                <div className="p-5 border-t border-zinc-800 space-y-4 text-xs sm:text-sm leading-relaxed bg-zinc-950/40 text-left">
                  <div className="p-3.5 bg-zinc-900 border-l-2 border-purple-500 rounded-r-lg">
                    <p className="font-bold text-purple-400 uppercase tracking-wider text-[9px] font-mono">
                      Assessment Objective
                    </p>
                    <p className="text-zinc-300 mt-1 italic">{q.intension}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-zinc-400 uppercase tracking-wider text-[9px] font-mono">
                      Recommended Answer Guide
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
          <p className="text-xs text-zinc-500">No technical questions suggested.</p>
        </div>
      )}
    </div>
  );
};

export default TechnicalPrepPanel;
