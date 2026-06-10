import { useState, useRef } from "react";

const FileUploadZone = ({ selectedFile, onFileSelected, onFileRemoved }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e, isActive) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(isActive);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSelectFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSelectFile(e.target.files[0]);
    }
  };

  const validateAndSelectFile = (file) => {
    if (file.type === "application/pdf") {
      onFileSelected(file);
    } else {
      alert("Please upload a PDF file only.");
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 Bytes";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + " " + ["Bytes", "KB", "MB"][i];
  };

  return (
    <div className="w-full">
      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 text-left">
        Upload Resume (PDF)
      </label>
      
      <div
        onDragEnter={(e) => handleDrag(e, true)}
        onDragOver={(e) => handleDrag(e, true)}
        onDragLeave={(e) => handleDrag(e, false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 min-h-[160px] ${
          dragActive
            ? "border-purple-500 bg-purple-500/5 shadow-md shadow-purple-500/10"
            : "border-zinc-800 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900/10"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleChange}
          className="hidden"
        />

        {!selectedFile ? (
          <div className="text-center">
            <div className="text-3xl mb-2 animate-bounce">📄</div>
            <p className="text-xs sm:text-sm font-semibold text-zinc-200">
              Drag & Drop Resume PDF here
            </p>
            <p className="text-[10px] sm:text-xs text-zinc-500 mt-1">
              or click to browse local files (PDF only)
            </p>
          </div>
        ) : (
          <div
            className="flex items-center justify-between w-full max-w-md p-3.5 bg-zinc-900/50 border border-purple-500/30 rounded-xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📕</span>
              <div className="text-left max-w-[200px] sm:max-w-[280px]">
                <p className="text-xs font-bold text-zinc-200 truncate">
                  {selectedFile.name}
                </p>
                <p className="text-[10px] font-mono text-zinc-500 mt-0.5">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => {
                onFileRemoved();
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="p-1.5 text-red-400 bg-red-400/10 rounded-full hover:bg-red-500 hover:text-white transition-all cursor-pointer text-xs"
              title="Remove file"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadZone;
