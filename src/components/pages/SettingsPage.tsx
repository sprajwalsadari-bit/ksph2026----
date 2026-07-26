import React from 'react';
import { Settings, Shield, Key, Lock, UserCheck, Server, Eye } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="p-4 rounded-2xl bg-[#0F1420] border border-slate-800 shadow-xl">
        <h2 className="text-base font-bold font-display text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-400" />
          Platform Security & Encryption Configuration
        </h2>
        <p className="text-xs text-slate-400 font-mono mt-0.5">
          Karnataka State Crime Records Bureau • Strategic Security Guidelines
        </p>
      </div>

      <div className="p-5 rounded-2xl bg-[#0F1420] border border-slate-800 space-y-4 text-xs font-mono text-slate-200">
        <div className="flex items-center justify-between p-3 bg-[#161E2E] rounded-xl border border-slate-800">
          <div>
            <div className="font-bold text-white">Role-Based Access Control (RBAC)</div>
            <div className="text-slate-400 text-[11px]">Enforcing ADGP / Commissioner Level Security clearance</div>
          </div>
          <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px]">
            ACTIVE
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-[#161E2E] rounded-xl border border-slate-800">
          <div>
            <div className="font-bold text-white">Biometric & Fingerprint Encryption</div>
            <div className="text-slate-400 text-[11px]">AFIS (Automated Fingerprint Identification System) database linkage</div>
          </div>
          <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px]">
            ENCRYPTED AES-256
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-[#161E2E] rounded-xl border border-slate-800">
          <div>
            <div className="font-bold text-white">Gemini Pro AI Model Endpoint</div>
            <div className="text-slate-400 text-[11px]">Server-side proxy execution (Zero browser key leakage)</div>
          </div>
          <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/40 text-[11px]">
            SECURE ROUTE /api/gemini
          </span>
        </div>
      </div>
    </div>
  );
};
