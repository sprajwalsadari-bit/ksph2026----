import React, { useState } from 'react';
import { X, FileText, Download, Shield, CheckCircle2, RefreshCw } from 'lucide-react';
import { KARNATAKA_DISTRICTS } from '../../data/mockData';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [district, setDistrict] = useState('ALL');
  const [reportType, setReportType] = useState('CRIME_INTELLIGENCE');
  const [timeframe, setTimeframe] = useState('LAST_30_DAYS');
  const [classification, setClassification] = useState('CONFIDENTIAL');
  const [generating, setGenerating] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setGenerating(true);
    setDownloaded(false);
    setTimeout(() => {
      setGenerating(false);
      setDownloaded(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-[#0F1420] border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-[#161E2E] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold font-display text-white">
              SCRB Intelligence Report Generator
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-4 text-xs text-slate-200">
          <div className="p-3 bg-blue-950/40 border border-blue-800/60 rounded-lg text-slate-300">
            Generate an official police intelligence dossier formatted for SP Office, Commissionerates, and Director General of Police (DGP) review.
          </div>

          <div>
            <label className="block text-slate-400 font-mono text-[11px] uppercase mb-1">
              Select Jurisdiction Scope
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full bg-[#161E2E] text-slate-200 p-2.5 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 font-mono"
            >
              <option value="ALL">ALL KARNATAKA STATE (Comprehensive SCRB Summary)</option>
              {KARNATAKA_DISTRICTS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.code})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-mono text-[11px] uppercase mb-1">
                Report Template
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full bg-[#161E2E] text-slate-200 p-2.5 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 font-mono"
              >
                <option value="CRIME_INTELLIGENCE">Strategic Crime Analysis</option>
                <option value="HOTSPOT_THREAT">Hotspot Threat & Forecast</option>
                <option value="REPEAT_OFFENDERS">Repeat Offender Network</option>
                <option value="CYBER_ANOMALIES">Cybercrime & Scam Dossier</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-mono text-[11px] uppercase mb-1">
                Timeframe
              </label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-full bg-[#161E2E] text-slate-200 p-2.5 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 font-mono"
              >
                <option value="LAST_7_DAYS">Last 7 Days</option>
                <option value="LAST_30_DAYS">Month to Date (MTD)</option>
                <option value="LAST_QUARTER">Quarter to Date (QTD)</option>
                <option value="YEAR_TO_DATE">Year to Date (YTD 2026)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-mono text-[11px] uppercase mb-1">
              Classification Seal
            </label>
            <div className="flex gap-2">
              {['CONFIDENTIAL', 'SECRET - LAW ENFORCEMENT', 'INTERNAL USE'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setClassification(c)}
                  className={`flex-1 py-2 px-2 rounded-lg text-[10px] font-mono font-bold border transition-all ${
                    classification === c
                      ? 'bg-blue-600 text-white border-blue-400 shadow-sm'
                      : 'bg-[#161E2E] text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Generated State Confirmation */}
          {downloaded && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-600/50 rounded-lg text-emerald-300 flex items-center justify-between font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Dossier Compiled Successfully! (SCRB_Report_2026.pdf)</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#161E2E] border-t border-slate-800 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md disabled:opacity-50"
          >
            {generating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Compiling PDF Data...
              </>
            ) : downloaded ? (
              <>
                <Download className="w-4 h-4" /> Download PDF Dossier
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" /> Generate Intelligence Dossier
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
