import { useState } from "react";
import { ArrowLeft, Zap } from "lucide-react";
import FileUploadZone from "./FileUploadZone";
import ReportHistoryList from "./ReportHistoryList";

const AnalysisForm = ({ onSubmit, onBack, reportList, onSelectReport }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resumeFile) return alert("Please upload your PDF resume first.");
    onSubmit({ jobDescription, selfDescription, resumeFile });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start animate-fade-in">
      {/* Left Column: Form Section */}
      <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
        <section className="text-left flex justify-between items-center pb-4 border-b border-zinc-800">
          <div>
            <h2 className="text-lg font-bold text-zinc-100 tracking-tight">
              Generate Preparation Guide
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
              Fill in your career details and job role parameters.
            </p>
          </div>
          <button 
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-zinc-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft size={12} /> Back
          </button>
        </section>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Description */}
            <div className="flex flex-col text-left">
              <label htmlFor="job-desc" className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2 font-mono">
                Job Description
              </label>
              <textarea
                id="job-desc"
                className="w-full h-44 p-3 bg-zinc-950 border border-zinc-800 text-zinc-200 rounded-lg text-xs leading-relaxed focus:outline-none focus:border-zinc-700 resize-none"
                placeholder="Paste the target job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
              />
            </div>

            {/* Career/Self Description */}
            <div className="flex flex-col text-left">
              <label htmlFor="self-desc" className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2 font-mono">
                Self Description
              </label>
              <textarea
                id="self-desc"
                className="w-full h-44 p-3 bg-zinc-950 border border-zinc-800 text-zinc-200 rounded-lg text-xs leading-relaxed focus:outline-none focus:border-zinc-700 resize-none"
                placeholder="Briefly describe your experience and core stack..."
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                required
              />
            </div>
          </div>

          {/* PDF Resume Uploader */}
          <div>
            <FileUploadZone
              selectedFile={resumeFile}
              onFileSelected={setResumeFile}
              onFileRemoved={() => setResumeFile(null)}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={!resumeFile || !jobDescription || !selfDescription}
              className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-800 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              <Zap size={14} /> Generate Guide
            </button>
          </div>
        </form>
      </div>

      {/* Right Column: History List inside card */}
      <div className="lg:col-span-1 text-left">
        <ReportHistoryList
          reports={reportList}
          onSelectReport={onSelectReport}
        />
      </div>
    </div>
  );
};

export default AnalysisForm;
