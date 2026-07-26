import React from 'react';
import { Database, UploadCloud, CheckCircle2, Shield, FileSpreadsheet, Server } from 'lucide-react';

interface AdminIngestionProps {
  onOpenIngestionModal: () => void;
}

export const AdminIngestionPage: React.FC<AdminIngestionProps> = ({ onOpenIngestionModal }) => {
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl bg-[#0F1420] border border-slate-800 flex items-center justify-between shadow-xl">
        <div>
          <h2 className="text-base font-bold font-display text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-amber-400" />
            Admin & Legacy Data Ingestion Management
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Bulk parse station spreadsheets, validate schema mappings, and synchronize with SCRB Firestore Database
          </p>
        </div>

        <button
          onClick={onOpenIngestionModal}
          className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md"
        >
          <UploadCloud className="w-4 h-4" /> Launch Ingestion Pipeline
        </button>
      </div>

      {/* System Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-[#0F1420] border border-slate-800 space-y-2">
          <div className="text-slate-400">DATABASE SYNC STATUS</div>
          <div className="text-lg font-bold text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> 100% OPERATIONAL
          </div>
          <p className="text-slate-500 text-[11px]">Last full sync: 12 minutes ago (Hubballi PS Batch)</p>
        </div>

        <div className="p-4 rounded-xl bg-[#0F1420] border border-slate-800 space-y-2">
          <div className="text-slate-400">INGESTED FIR LOGS (YTD)</div>
          <div className="text-lg font-bold text-white">48,920 RECORDS</div>
          <p className="text-slate-500 text-[11px]">38 duplicates automatically deduplicated</p>
        </div>

        <div className="p-4 rounded-xl bg-[#0F1420] border border-slate-800 space-y-2">
          <div className="text-slate-400">GEOCODING ACCURACY</div>
          <div className="text-lg font-bold text-blue-400">99.4% MATCH</div>
          <p className="text-slate-500 text-[11px]">Beat boundaries mapped via GIS layer</p>
        </div>
      </div>
    </div>
  );
};
