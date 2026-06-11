import { useState, useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useInterview } from "../hook/useInterview";
import InterviewReport from "./interviewReport";
import { AlertTriangle } from "lucide-react";

import Navbar from "../components/Navbar";
import DashboardView from "../components/DashboardView";
import AnalysisForm from "../components/AnalysisForm";

const LOADING_TIPS = [
  "Uploading your resume securely...",
  "Parsing PDF content and extracting skills...",
  "Analyzing job requirements and target keywords...",
  "Evaluating profile alignment and calculating match score...",
  "Formulating targeted technical questions based on gaps...",
  "Crafting behavioral prompts using the STAR method...",
  "Synthesizing a step-by-step preparation roadmap...",
  "Finalizing your personalized coaching dashboard..."
];

const getCleanErrorMessage = (err) => {
  if (!err) return "Something went wrong while generating the report. Please try again.";
  try {
    const trimmed = err.trim();
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      const parsed = JSON.parse(trimmed);
      return parsed.error?.message || parsed.message || err;
    }
  } catch (e) {
  }
  return err;
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const Home = () => {
  const { user, handleLogout } = useAuth();
  const {
    generateReport,
    getById,
    getReports,
    report,
    reportList,
    setReport
  } = useInterview();

  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingTipIndex, setLoadingTipIndex] = useState(0);
  const [viewMode, setViewMode] = useState("dashboard");

  const averageReadiness = reportList && reportList.length > 0
    ? Math.round(reportList.reduce((acc, curr) => acc + curr.matchScore, 0) / reportList.length)
    : 0;

  useEffect(() => {
    getReports();
  }, [getReports]);

  useEffect(() => {
    if (status !== "loading") return;
    const interval = setInterval(() => {
      setLoadingTipIndex((prev) => (prev + 1) % LOADING_TIPS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [status]);

  const handleGenerate = async ({ jobDescription, selfDescription, resumeFile }) => {
    setStatus("loading");
    setErrorMessage("");
    setLoadingTipIndex(0);

    const result = await generateReport(jobDescription, resumeFile, selfDescription);

    if (result.success) {
      setStatus("success");
      getReports();
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong while generating the report.");
    }
  };

  const handleReset = () => {
    setReport(null);
    setStatus("idle");
    setErrorMessage("");
    setViewMode("dashboard");
  };

  const handleSelectReport = async (id) => {
    setStatus("loading");
    setErrorMessage("");
    setLoadingTipIndex(0);
    
    const result = await getById(id);
    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Failed to load the selected report.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-300 antialiased font-sans">
      <Navbar user={user} onLogout={handleLogout} onBrandClick={handleReset} />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
        {status === "idle" && (
          <>
            {viewMode === "dashboard" ? (
              <DashboardView
                averageReadiness={averageReadiness}
                reportsCount={reportList ? reportList.length : 0}
                reports={reportList}
                onStartNew={() => setViewMode("form")}
                onSelectReport={handleSelectReport}
                formatDate={formatDate}
              />
            ) : (
              <AnalysisForm
                onSubmit={handleGenerate}
                onBack={() => setViewMode("dashboard")}
                reportList={reportList}
                onSelectReport={handleSelectReport}
              />
            )}
          </>
        )}

        {status === "loading" && (
          <div className="flex flex-col items-center justify-center py-16 bg-zinc-900 border border-zinc-800 rounded-xl text-center shadow-md min-h-[380px] max-w-md mx-auto px-6 animate-fade-scale">
            <div className="w-10 h-10 border-2 border-zinc-800 border-t-purple-600 rounded-full animate-spin mb-6"></div>
            <h2 className="text-lg font-bold text-zinc-200 mb-2">Analyzing Profile Alignment</h2>
            <p className="text-xs text-zinc-400 h-12 leading-relaxed max-w-xs">{LOADING_TIPS[loadingTipIndex]}</p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center justify-center py-16 bg-zinc-900 border border-red-900/30 rounded-xl text-center shadow-md min-h-[380px] max-w-md mx-auto px-6 animate-fade-scale">
            <AlertTriangle size={32} className="text-red-500 mb-4" />
            <h2 className="text-lg font-bold text-red-500 mb-2">Generation Failed</h2>
            <p className="text-xs text-zinc-400 mb-6 leading-relaxed max-w-xs">{getCleanErrorMessage(errorMessage)}</p>
            <button 
              type="button" 
              onClick={handleReset} 
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {status === "success" && report && (
          <div className="animate-fade-in">
            <InterviewReport report={report} onBack={handleReset} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
