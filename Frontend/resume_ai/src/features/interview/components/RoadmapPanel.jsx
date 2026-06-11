

const RoadmapPanel = ({ plan = [] }) => {
  return (
    <div className="space-y-4">
      <p className="text-xs text-zinc-400 text-left">
        Progressive preparation syllabus to build confidence:
      </p>

      {plan && plan.length > 0 ? (
        <div className="relative border-l border-zinc-800/80 pl-5 space-y-6 py-2 ml-2.5 text-left">
          {[...plan]
            .sort((a, b) => a.day - b.day)
            .map((step, idx) => (
              <div key={idx} className="relative">
                {/* Timeline Bullet Dot */}
                <span className="absolute -left-[26px] top-2.5 w-3 h-3 rounded-full bg-purple-600 border-2 border-purple-400"></span>

                <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-xl p-4 space-y-1 hover:border-zinc-700 transition-colors shadow-md">
                  <span className="text-[9px] font-bold text-purple-400 tracking-wider uppercase font-mono bg-zinc-900 border border-purple-900/60 px-2 py-0.5 rounded">
                    Day {step.day}
                  </span>
                  <h6 className="text-xs sm:text-sm font-bold text-zinc-100 pt-1">
                    {step.content}
                  </h6>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                    {step.focus}
                  </p>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-xl">
          <p className="text-xs text-zinc-500">No plan steps generated.</p>
        </div>
      )}
    </div>
  );
};

export default RoadmapPanel;
