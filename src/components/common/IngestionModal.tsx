import React, { useState } from 'react';
import {
  X,
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ArrowRight,
  Database,
  Layers,
} from 'lucide-react';

interface IngestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IngestionModal: React.FC<IngestionModalProps> = ({ isOpen, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [summary, setSummary] = useState<{
    totalRows: number;
    validRows: number;
    duplicates: number;
    missingGpsAutoFilled: number;
    mappedColumns: number;
  } | null>(null);

  if (!isOpen) return null;

  const handleSimulatedUpload = (selectedFile: File) => {
    setFile(selectedFile);
    setUploading(true);
    setProgress(0);
    setSummary(null);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setSummary({
            totalRows: 1482,
            validRows: 1420,
            duplicates: 38,
            missingGpsAutoFilled: 24,
            mappedColumns: 14,
          });
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl bg-[#0F1420] border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-[#161E2E] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold font-display text-white">
              Legacy Crime Data Ingestion Pipeline (Excel / CSV)
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-xs text-slate-200">
          <div className="p-3 bg-amber-950/30 border border-amber-800/50 rounded-lg text-slate-300">
            <span className="font-bold text-amber-400 font-mono">Transitioning Beyond Offline Spreadsheets:</span>{' '}
            Automated schema mapper parses legacy station Excel logs, detects duplicates, geocodes police station beats, and validates IPC/IT Act section mappings.
          </div>

          {/* Drag and Drop Zone */}
          {!file ? (
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-xl cursor-pointer bg-[#161E2E] hover:bg-slate-800/50 transition-all">
              <Upload className="w-8 h-8 text-blue-400 mb-2" />
              <span className="text-xs font-semibold text-slate-200">
                Click or Drag & Drop Police Station Excel / CSV Log
              </span>
              <span className="text-[11px] font-mono text-slate-400 mt-1">
                Supports .xlsx, .xls, .csv (e.g. KSP_Crime_Log_2025_2026.xlsx)
              </span>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleSimulatedUpload(e.target.files[0]);
                  }
                }}
              />
            </label>
          ) : (
            <div className="p-4 bg-[#161E2E] border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="font-bold text-white text-xs font-mono">{file.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {(file.size / 1024).toFixed(1)} KB • Police Log Dataset
                    </div>
                  </div>
                </div>

                {!uploading && (
                  <button
                    onClick={() => {
                      setFile(null);
                      setSummary(null);
                    }}
                    className="text-xs text-slate-400 hover:text-white font-mono underline"
                  >
                    Select Another
                  </button>
                )}
              </div>

              {/* Progress Bar */}
              {uploading && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Parsing rows & geocodes...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Summary Stats after parsing */}
              {summary && (
                <div className="pt-3 border-t border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" /> Data Quality Pipeline Ingestion Complete
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-center">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Total Rows</div>
                      <div className="text-sm font-bold text-white mt-0.5">{summary.totalRows}</div>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Valid Ingested</div>
                      <div className="text-sm font-bold text-emerald-400 mt-0.5">{summary.validRows}</div>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Duplicates Flagged</div>
                      <div className="text-sm font-bold text-amber-400 mt-0.5">{summary.duplicates}</div>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Auto GPS Mapped</div>
                      <div className="text-sm font-bold text-blue-400 mt-0.5">{summary.missingGpsAutoFilled}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#161E2E] border-t border-slate-800 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Close
          </button>
          {summary && (
            <button
              onClick={() => {
                alert('Legacy dataset successfully committed to SCRB Central Firestore Database!');
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" /> Commit to Database
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
