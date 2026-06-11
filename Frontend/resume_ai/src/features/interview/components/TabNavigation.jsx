
import { LayoutDashboard, Code2, HeartHandshake, Target, Calendar } from "lucide-react";

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={14} /> },
    { id: "technical", label: "Technical Prep", icon: <Code2 size={14} /> },
    { id: "behavioral", label: "Behavioral", icon: <HeartHandshake size={14} /> },
    { id: "gaps", label: "Skill Gaps", icon: <Target size={14} /> },
    { id: "roadmap", label: "Roadmap", icon: <Calendar size={14} /> }
  ];

  return (
    <div className="flex border-b border-zinc-800 overflow-x-auto pb-px gap-1 scrollbar-none">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs cursor-pointer border-b-2 transition-all shrink-0 ${
            activeTab === tab.id
              ? "text-purple-400 border-purple-500"
              : "text-zinc-500 border-transparent hover:text-zinc-300"
          }`}
        >
          <span>{tab.icon}</span> {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
