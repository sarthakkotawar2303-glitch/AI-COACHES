import { useState, useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useInterview } from "../hook/useInterview";
import InterviewReport from "./interviewReport";

// Import modular subcomponents
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import FileUploadZone from "../components/FileUploadZone";
import ReportHistoryList from "../components/ReportHistoryList";

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

  // Form State Inputs
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  // Flow Statuses: idle, loading, success, error
  const [status, setStatus] = useState("idle"); 
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingTipIndex, setLoadingTipIndex] = useState(0);
  const [viewMode, setViewMode] = useState("dashboard");

  // Dynamic KPI Calculations
  const averageReadiness = reportList && reportList.length > 0
    ? Math.round(reportList.reduce((acc, curr) => acc + curr.matchScore, 0) / reportList.length)
    : 0;

  const latestReport = reportList && reportList.length > 0 ? reportList[0] : null;
  const gapCount = latestReport && latestReport.skillGap ? latestReport.skillGap.length : 0;
  const recommendedTarget = latestReport && latestReport.skillGap && latestReport.skillGap.length > 0
    ? latestReport.skillGap[0].skill
    : "Algorithms Basics";

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Fetch past reports when page loads
  useEffect(() => {
    getReports();
  }, [getReports]);

  // Rotate helpful loading tips during AI analysis
  useEffect(() => {
    if (status !== "loading") return;
    const interval = setInterval(() => {
      setLoadingTipIndex((prev) => (prev + 1) % LOADING_TIPS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [status]);

  // Handle new report generation submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) return alert("Please upload your PDF resume first.");

    setStatus("loading");
    setErrorMessage("");
    setLoadingTipIndex(0);

    const result = await generateReport(jobDescription, resumeFile, selfDescription);

    if (result.success) {
      setStatus("success");
      getReports(); // Refresh recent history list in sidebar
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong while generating the report.");
    }
  };

  // Reset page state to go back to the submission form
  const handleReset = () => {
    setReport(null);
    setStatus("idle");
    setErrorMessage("");
    setViewMode("dashboard");
  };

  // Select and retrieve a past report by database ID
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
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-300">
      {/* Navbar component */}
      <Navbar user={user} onLogout={handleLogout} onBrandClick={handleReset} />

      {/* Main Container Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
        
        {/* Form Submission Dashboard State */}
        {status === "idle" && (
          <>
            {viewMode === "dashboard" ? (
              <div className="space-y-8">
                {/* Hero Panel - Card Container */}
                <section className="relative bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 p-8 rounded-2xl shadow-xl text-left overflow-hidden opacity-0 animate-fade-up">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>
                  <div className="relative z-10 max-w-3xl">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                      Accelerate Your Software Engineering Career
                    </h1>
                    <p className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed max-w-2xl">
                      Optimize your technical stack, practice behavioral frameworks, and close your engineering skill gaps
                      with tailored AI simulations.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-4">
                      <Button
                        onClick={() => setViewMode("form")}
                        variant="primary"
                        className="gap-2 hover-glow"
                      >
                        + Start New AI Analysis
                      </Button>
                      <Button
                        onClick={() => {
                          if (reportList && reportList.length > 0) {
                            handleSelectReport(reportList[0]._id);
                          } else {
                            alert("Please generate a report first to view metrics.");
                          }
                        }}
                        variant="secondary"
                      >
                        View Sample Metrics
                      </Button>
                    </div>
                  </div>
                </section>

                {/* KPI Cards Row - Individual Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left opacity-0 animate-fade-up delay-100">
                  <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 p-5 rounded-xl shadow-lg flex flex-col justify-between min-h-[110px] hover:border-zinc-700/50 transition-colors duration-205">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Average Readiness</div>
                    <div className="text-2xl font-black text-white mt-2 flex items-baseline gap-2">
                      {averageReadiness}% 
                      <span className={`text-[10px] font-bold ${averageReadiness >= 80 ? "text-emerald-400" : averageReadiness >= 50 ? "text-amber-400" : "text-red-400"}`}>
                        {averageReadiness >= 80 ? "▲ Solid" : averageReadiness >= 50 ? "▲ Mod" : "▼ Train"}
                      </span>
                    </div>
                  </div>

                  <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 p-5 rounded-xl shadow-lg flex flex-col justify-between min-h-[110px] hover:border-zinc-700/50 transition-colors duration-205">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Simulations Run</div>
                    <div className="text-2xl font-black text-white mt-2">
                      {reportList ? reportList.length : 0} <span className="text-xs font-normal text-zinc-400">{reportList && reportList.length === 1 ? "Session" : "Sessions"}</span>
                    </div>
                  </div>

                  <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 p-5 rounded-xl shadow-lg flex flex-col justify-between min-h-[110px] hover:border-zinc-700/50 transition-colors duration-205">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Core Stack Gaps</div>
                    <div className="text-2xl font-black text-amber-400 mt-2">
                      {gapCount} <span className="text-xs font-normal text-zinc-400">Identified</span>
                    </div>
                  </div>

                  <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 p-5 rounded-xl shadow-lg flex flex-col justify-between min-h-[110px] overflow-hidden hover:border-zinc-700/50 transition-colors duration-205">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Recommended Target</div>
                    <div className="text-sm font-bold text-purple-400 mt-2 truncate">
                      {recommendedTarget}
                    </div>
                  </div>
                </div>

                {/* Body Activity Columns Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 opacity-0 animate-fade-up delay-200">
                  {/* Saved Reports Card Column */}
                  <div className="lg:col-span-2 bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-xl space-y-4">
                    <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-purple-500 rounded-sm"></span>
                      Saved Interview Reports
                    </h2>

                    {reportList && reportList.length > 0 ? (
                      <div className="divide-y divide-zinc-800/40">
                        {reportList.map((item) => (
                          <div
                            key={item._id}
                            className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 first:pt-2 last:pb-2"
                          >
                            <div className="flex items-center gap-4 text-left">
                              <div className={`px-2.5 py-1.5 rounded-lg font-bold text-xs shadow-inner shrink-0 ${
                                item.matchScore >= 80 ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/15" : item.matchScore >= 50 ? "bg-amber-500/10 text-amber-400 border border-amber-500/15" : "bg-red-500/10 text-red-400 border border-red-500/15"
                              }`}>
                                {item.matchScore}%
                              </div>
                              <div>
                                <h3 className="text-xs sm:text-sm font-bold text-white">
                                  {item.title || "Interview Readiness Report"}
                                </h3>
                                <p className="text-[10px] text-zinc-500 mt-0.5">
                                  {item.matchScore >= 80 ? "Strong Core Alignment" : "Preparation Required"} • Evaluated {formatDate(item.createdAt)}
                                </p>
                              </div>
                            </div>
                            <Button
                              onClick={() => handleSelectReport(item._id)}
                              variant="secondary"
                              className="w-full sm:w-auto px-4 py-2"
                            >
                              Open Report
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-8 border border-dashed border-zinc-800 rounded-xl bg-zinc-950/20 text-center animate-fade-scale">
                        <span className="text-2xl mb-1.5 opacity-60">📁</span>
                        <p className="text-xs font-bold text-zinc-400">No past reports found</p>
                        <p className="text-[10px] text-zinc-500 mt-0.5">
                          Your generated guides will appear here
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Active Tracks Card Column */}
                  <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-xl space-y-4">
                    <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-purple-500 rounded-sm"></span>
                      Active Practice Tracks
                    </h2>

                    <div className="space-y-5 text-left pt-2">
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[11px] font-bold text-zinc-300">Data Structures & Algorithms</span>
                          <span className="text-[10px] font-medium text-zinc-500">8 / 12 Clean runs</span>
                        </div>
                        <div className="w-full bg-zinc-950 rounded-full h-1">
                          <div className="bg-purple-600 h-1 rounded-full" style={{ width: "66%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[11px] font-bold text-zinc-300">STAR Behavioral Delivery</span>
                          <span className="text-[10px] font-medium text-zinc-500">4 / 5 Clean runs</span>
                        </div>
                        <div className="w-full bg-zinc-950 rounded-full h-1">
                          <div className="bg-purple-500 h-1 rounded-full" style={{ width: "80%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[11px] font-bold text-zinc-300">System Architecture Basics</span>
                          <span className="text-[10px] font-medium text-zinc-500">1 / 6 Clean runs</span>
                        </div>
                        <div className="w-full bg-zinc-950 rounded-full h-1">
                          <div className="bg-purple-400 h-1 rounded-full" style={{ width: "16%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Column: Form Card Section */}
                <div className="lg:col-span-2 bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 opacity-0 animate-slide-left">
                  <section className="text-left flex justify-between items-center pb-4 border-b border-zinc-800/60">
                    <div>
                      <h1 className="text-2xl font-extrabold text-white tracking-tight mb-1">
                        Elevate Your Interview Readiness
                      </h1>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        Provide your details and resume to build your custom preparation coach roadmap.
                      </p>
                    </div>
                    <Button variant="secondary" onClick={() => setViewMode("dashboard")}>
                      ← Back
                    </Button>
                  </section>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Job Description Input Field */}
                      <div className="flex flex-col text-left opacity-0 animate-fade-up delay-100">
                        <label htmlFor="job-desc" className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                          Job Description
                        </label>
                        <textarea
                          id="job-desc"
                          className="w-full h-44 p-3 bg-zinc-950 border border-zinc-800/80 text-zinc-100 rounded-lg text-xs leading-relaxed focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 resize-none transition-all hover:border-zinc-700"
                          placeholder="Paste the target job description (responsibilities, requirements, skills...)"
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                          required
                        />
                      </div>

                      {/* Career/Self Description Input Field */}
                      <div className="flex flex-col text-left opacity-0 animate-fade-up delay-100">
                        <label htmlFor="self-desc" className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                          Self Description
                        </label>
                        <textarea
                          id="self-desc"
                          className="w-full h-44 p-3 bg-zinc-950 border border-zinc-800/80 text-zinc-100 rounded-lg text-xs leading-relaxed focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 resize-none transition-all hover:border-zinc-700"
                          placeholder="Briefly summarize your experience, achievements, and strengths matching this role..."
                          value={selfDescription}
                          onChange={(e) => setSelfDescription(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* PDF Resume File Uploader Subcomponent */}
                    <div className="opacity-0 animate-fade-up delay-200">
                      <FileUploadZone
                        selectedFile={resumeFile}
                        onFileSelected={setResumeFile}
                        onFileRemoved={() => setResumeFile(null)}
                      />
                    </div>

                    {/* Submission Action Controllers */}
                    <div className="flex flex-wrap justify-center gap-4 pt-2 opacity-0 animate-fade-up delay-300">
                      <Button
                        type="submit"
                        variant="primary"
                        className="hover-glow"
                        disabled={!resumeFile || !jobDescription || !selfDescription}
                      >
                        ⚡ Generate Prep Guide
                      </Button>
                    </div>
                  </form>
                </div>

                {/* Right Column: History List inside card */}
                <div className="lg:col-span-1 opacity-0 animate-slide-right delay-100">
                  <ReportHistoryList
                    reports={reportList}
                    onSelectReport={handleSelectReport}
                  />
                </div>
              </div>
            )}
          </>
        )}

        {/* Loading / Generating Report State - Centered Glass Card */}
        {status === "loading" && (
          <div className="flex flex-col items-center justify-center py-16 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl text-center shadow-2xl min-h-[420px] max-w-lg mx-auto animate-fade-scale">
            <div className="relative w-16 h-16 mb-8 flex items-center justify-center">
              {/* Spinning Ring Loaders */}
              <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
              <div className="absolute inset-1 border-4 border-transparent border-r-indigo-500 rounded-full animate-spin duration-700"></div>
            </div>
            
            <h2 className="text-xl font-extrabold text-white tracking-tight mb-2 animate-pulse">
              Analyzing Profile Alignment
            </h2>
            <p className="text-sm text-zinc-400 max-w-sm px-6 h-12 leading-relaxed">
              {LOADING_TIPS[loadingTipIndex]}
            </p>
            
            <div className="w-48 h-1 bg-zinc-850 rounded-full overflow-hidden mt-6">
              <div className="w-1/3 h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}

        {/* Backend Generation Failure / Error State - Centered Card */}
        {status === "error" && (
          <div className="flex flex-col items-center justify-center py-16 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl text-center shadow-2xl min-h-[420px] max-w-lg mx-auto px-6 animate-fade-scale">
            <span className="text-4xl text-red-500 mb-3">⚠️</span>
            <h2 className="text-xl font-extrabold text-red-500 tracking-tight mb-2">
              Generation Failed
            </h2>
            <p className="text-sm text-zinc-400 max-w-md mb-6 leading-relaxed">
              {errorMessage}
            </p>
            <Button variant="danger" onClick={handleReset} className="bg-red-650 hover:bg-red-600">
              Try Again
            </Button>
          </div>
        )}

        {/* Success / Report Display State */}
        {status === "success" && report && (
          <div className="opacity-0 animate-fade-up">
            <InterviewReport report={report} onBack={handleReset} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
