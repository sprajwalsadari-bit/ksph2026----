import React from 'react';
import {
  X,
  User,
  Shield,
  FileText,
  MapPin,
  AlertTriangle,
  Clock,
  Briefcase,
  Layers,
  Award,
  DollarSign,
  Building,
  CheckCircle,
  Phone,
  ExternalLink,
} from 'lucide-react';
import { IntelDrawerData } from '../../types';

interface IntelDrawerProps {
  intel: IntelDrawerData | null;
  onClose: () => void;
}

export const IntelDrawer: React.FC<IntelDrawerProps> = ({ intel, onClose }) => {
  if (!intel) return null;

  const { type, title, subtitle, data } = intel;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-[#0F1420] border-l border-slate-700/80 shadow-2xl flex flex-col transition-all transform duration-300 ease-out">
      {/* Drawer Header */}
      <div className="p-4 bg-[#161E2E] border-b border-slate-800 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-blue-900/80 text-blue-300 border border-blue-700/60 uppercase">
              INTEL BRIEFING • {type.toUpperCase()}
            </span>
            {data?.repeatOffenderRank && data.repeatOffenderRank !== 'NONE' && (
              <span
                className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded flex items-center gap-1 ${
                  data.repeatOffenderRank === 'GOLD'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : data.repeatOffenderRank === 'SILVER'
                    ? 'bg-slate-400/20 text-slate-300 border border-slate-400/40'
                    : 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                }`}
              >
                <Award className="w-3 h-3" />
                {data.repeatOffenderRank} RANK OFFENDER
              </span>
            )}
          </div>

          <h2 className="text-lg font-bold font-display text-white line-clamp-1">{title}</h2>
          {subtitle && <p className="text-xs text-slate-400 font-mono mt-0.5">{subtitle}</p>}
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Body - Scrollable Content */}
      <div className="flex-1 p-5 overflow-y-auto space-y-5 text-slate-200 text-xs">
        {/* TYPE 1: SUSPECT INTEL */}
        {type === 'suspect' && (
          <div className="space-y-5">
            {/* Suspect Profile Card */}
            <div className="flex gap-4 p-4 rounded-xl bg-[#161E2E] border border-slate-800">
              {data.photoUrl ? (
                <img
                  src={data.photoUrl}
                  alt={data.name}
                  className="w-20 h-20 rounded-lg object-cover border border-slate-700 shadow-md"
                />
              ) : (
                <div className="w-20 h-20 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500">
                  <User className="w-10 h-10" />
                </div>
              )}

              <div className="flex-1 space-y-1">
                <div className="text-sm font-bold text-white">{data.name}</div>
                <div className="text-slate-400 text-xs font-mono">Alias: {data.alias || 'N/A'}</div>
                <div className="text-xs text-blue-400 font-medium">{data.category}</div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                  <MapPin className="w-3 h-3 text-slate-500" /> Primary Base: {data.district}
                </div>
              </div>
            </div>

            {/* Offender Metrics */}
            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-3 rounded-lg bg-[#161E2E] border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Recorded Incidents</div>
                <div className="text-lg font-bold text-amber-400 mt-0.5">{data.incidentCount || 1} FIRs</div>
              </div>
              <div className="p-3 rounded-lg bg-[#161E2E] border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">SCRB Biometric ID</div>
                <div className="text-xs font-bold text-slate-200 mt-1">BIO-KSP-9924-X</div>
              </div>
            </div>

            {/* Modus Operandi Tag Cloud */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono mb-2">
                Modus Operandi (MO) Signature
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {(data.modusOperandiTags || ['Night Burglary', 'Cyber Fraud', 'Interstate Movement']).map(
                  (tag: string, i: number) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-blue-950/60 text-blue-300 border border-blue-800/80 text-[11px] font-mono"
                    >
                      #{tag}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Criminal History Timeline */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono mb-2">
                Prior Offences & Linked FIRs
              </h3>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-[#161E2E] border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center text-[11px] font-mono">
                    <span className="font-bold text-blue-400">FIR-2026-BLR-0481</span>
                    <span className="text-slate-400">24 July 2026</span>
                  </div>
                  <div className="text-slate-300 text-xs">Digital Arrest Scam (IT Act 66D / IPC 420)</div>
                  <div className="text-[10px] text-slate-500 font-mono">Koramangala PS • Koramangala Beat 4</div>
                </div>

                <div className="p-3 rounded-lg bg-[#161E2E] border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center text-[11px] font-mono">
                    <span className="font-bold text-amber-400">FIR-2026-BLR-0512</span>
                    <span className="text-slate-400">21 July 2026</span>
                  </div>
                  <div className="text-slate-300 text-xs">Gated Villa Night Burglary (IPC 380 / 457)</div>
                  <div className="text-[10px] text-slate-500 font-mono">Indiranagar PS • Indiranagar Beat 1</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TYPE 2: CASE / FIR INTEL */}
        {type === 'case' && (
          <div className="space-y-4">
            {/* Case Details Box */}
            <div className="p-4 rounded-xl bg-[#161E2E] border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-slate-400">FIR Number:</span>
                <span className="font-mono font-bold text-white text-sm">{data.firNumber || data.id}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Status:</span>
                <span
                  className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded ${
                    data.status === 'OPEN'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : data.status === 'UNDER INVESTIGATION'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  {data.status}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Act & IPC Sections:</span>
                <span className="font-mono text-amber-300 text-xs text-right max-w-[220px] line-clamp-2">
                  {data.actSection}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Est. Financial Loss:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  ₹{(data.estimatedLossINR || 0).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Description & MO */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                Modus Operandi
              </h3>
              <div className="p-3 rounded-lg bg-[#161E2E] border border-slate-800 text-slate-300 text-xs">
                {data.modusOperandi}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                Case Synopsis
              </h3>
              <p className="p-3 rounded-lg bg-[#161E2E] border border-slate-800 text-slate-300 text-xs leading-relaxed">
                {data.description}
              </p>
            </div>

            {/* Officer in Charge */}
            <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-800/60 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-blue-400 font-mono uppercase">Investigating Officer</div>
                <div className="font-bold text-white text-xs">{data.investigatingOfficer}</div>
                <div className="text-[11px] text-slate-400">{data.officerRank}</div>
              </div>
              <Phone className="w-4 h-4 text-blue-400 cursor-pointer hover:text-white" />
            </div>
          </div>
        )}

        {/* TYPE 3: DISTRICT INTEL */}
        {type === 'district' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-3 rounded-lg bg-[#161E2E] border border-slate-800">
                <div className="text-[10px] text-slate-400">MTD Crime Volume</div>
                <div className="text-lg font-bold text-white mt-1">{data.crimeCountMTD}</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">YoY: +{data.yoyChange}%</div>
              </div>

              <div className="p-3 rounded-lg bg-[#161E2E] border border-slate-800">
                <div className="text-[10px] text-slate-400">AI Risk Score</div>
                <div className="text-lg font-bold text-red-400 mt-1">{data.riskScore} / 100</div>
                <div className="text-[10px] text-slate-400 mt-0.5">High Severity Zone</div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono mb-2">
                Top Crime Types Breakdown
              </h3>
              <div className="space-y-2">
                {(data.crimeBreakdown || []).map((cat: any, i: number) => (
                  <div key={i} className="p-2.5 rounded-lg bg-[#161E2E] border border-slate-800 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-200 font-medium">{cat.category}</span>
                      <span className="font-mono text-slate-400 font-bold">{cat.count} cases</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${Math.min(100, (cat.count / data.crimeCountMTD) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Police Station HQ */}
            <div className="p-3 rounded-lg bg-[#161E2E] border border-slate-800 space-y-1">
              <div className="text-[10px] text-slate-400 font-mono uppercase">Jurisdiction HQ</div>
              <div className="text-xs font-bold text-white">{data.headquarters}</div>
              <div className="text-[11px] text-slate-400">{data.policeStationsCount} Active Police Stations</div>
            </div>
          </div>
        )}

        {/* TYPE 4: ANOMALY INTEL */}
        {type === 'anomaly' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-red-950/30 border border-red-700/50 space-y-2">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
                CRIME SPIKE ANOMALY DETECTED
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">{data.description || data.reason}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-3 rounded-lg bg-[#161E2E] border border-slate-800">
                <div className="text-[10px] text-slate-400">Deviation vs Avg</div>
                <div className="text-lg font-bold text-red-400 mt-1">+{data.deviationPercent || 310}%</div>
              </div>
              <div className="p-3 rounded-lg bg-[#161E2E] border border-slate-800">
                <div className="text-[10px] text-slate-400">AI Confidence</div>
                <div className="text-lg font-bold text-emerald-400 mt-1">{data.aiConfidence || 94.2}%</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#161E2E] border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-white uppercase font-mono">Recommended Police Action</h4>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                <li>Deploy Special Mobile Patrol Unit to Beat 2 corridor.</li>
                <li>Issue inter-station alert to adjacent district SP offices.</li>
                <li>Initiate AI-driven surveillance match on recorded suspect SIMs.</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Drawer Footer Actions */}
      <div className="p-4 bg-[#161E2E] border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
        >
          Close Briefing
        </button>

        <button
          onClick={() => {
            alert(`Briefing dossier exported for ${title}`);
          }}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
        >
          <ExternalLink className="w-3.5 h-3.5" /> Export Dossier
        </button>
      </div>
    </div>
  );
};
