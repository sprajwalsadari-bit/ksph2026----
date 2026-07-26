import React, { useState } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  Flame,
  Brain,
  Sliders,
  Sparkles,
  Layers,
  ArrowUpRight,
  ShieldAlert,
  BarChart2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';
import {
  RISK_LEADERBOARD,
  ANOMALIES_LIST,
  SOCIOLOGICAL_CORRELATIONS,
  QUARTERLY_FORECAST_DATA,
} from '../../data/mockData';
import { IntelDrawerData } from '../../types';

interface PredictiveProps {
  onSelectIntel: (intel: IntelDrawerData) => void;
}

export const PredictiveDashboard: React.FC<PredictiveProps> = ({ onSelectIntel }) => {
  const [selectedIndicator, setSelectedIndicator] = useState<'unemployment' | 'urbanization' | 'density'>('unemployment');

  return (
    <div className="space-y-6">
      {/* Top Banner: Predictive AI Motor */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 via-[#0F1420] to-blue-950/60 border border-purple-500/30 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-900/40 border border-purple-500/40 text-purple-400">
            <Brain className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base font-bold font-display text-white flex items-center gap-2">
              Predictive Spatiotemporal & Sociological Intelligence Engine
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                AI Model v3.8
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Correlating socio-economic datasets (NSSO, Census, APMC) with SCRB crime logs to predict quarterly crime velocity.
            </p>
          </div>
        </div>
      </div>

      {/* Grid Row 1: Risk Leaderboard & Anomaly Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: AI Risk Leaderboard */}
        <div className="lg:col-span-7 bg-[#0F1420] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-400" />
                District & Beat Risk Score Leaderboard (0–100)
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Gradient risk bars derived from incident frequency, density & repeat offender density
              </p>
            </div>
          </div>

          {/* Risk Leaderboard Rows */}
          <div className="space-y-3">
            {RISK_LEADERBOARD.map((item) => (
              <div
                key={item.rank}
                onClick={() =>
                  onSelectIntel({
                    type: 'district',
                    title: item.district,
                    subtitle: `${item.headquarters} • Rank #${item.rank}`,
                    data: item,
                  })
                }
                className="p-3.5 rounded-xl bg-[#161E2E] border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold border border-slate-700">
                      #{item.rank}
                    </span>
                    <span className="font-bold text-white text-xs group-hover:text-blue-300">
                      {item.district}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 hidden sm:inline">{item.primaryFactor}</span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                        item.riskLevel === 'CRITICAL'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : item.riskLevel === 'HIGH'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {item.riskScore} / 100
                    </span>
                  </div>
                </div>

                {/* Gradient Bar */}
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.riskScore > 80
                        ? 'bg-gradient-to-r from-amber-500 to-red-500'
                        : item.riskScore > 65
                        ? 'bg-gradient-to-r from-blue-500 to-amber-500'
                        : 'bg-gradient-to-r from-emerald-500 to-blue-500'
                    }`}
                    style={{ width: `${item.riskScore}%` }}
                  ></div>
                </div>

                <div className="mt-2 flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Spike Index: +{item.monthlySpike}%</span>
                  <span>{item.beatsAtRisk} Beats At Risk</span>
                  <span>Resolution Efficiency: {item.resolutionEfficiency}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: AI Anomaly Detection Panel */}
        <div className="lg:col-span-5 bg-[#0F1420] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                Active Anomaly Detection Flags
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                AI flagged deviation from historical 6-month baseline
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {ANOMALIES_LIST.map((anomaly) => (
              <div
                key={anomaly.id}
                onClick={() =>
                  onSelectIntel({
                    type: 'anomaly',
                    title: `Anomaly Flag: ${anomaly.crimeCategory}`,
                    subtitle: `${anomaly.district} • ${anomaly.beat}`,
                    data: anomaly,
                  })
                }
                className="p-3.5 rounded-xl bg-red-950/20 border border-red-800/40 hover:border-red-600/60 transition-all cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-red-500/20 text-red-400 border border-red-500/40 uppercase">
                    {anomaly.severity} SEVERITY
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{anomaly.detectedAt}</span>
                </div>

                <div>
                  <h4 className="font-bold text-xs text-white">{anomaly.crimeCategory}</h4>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {anomaly.district} • {anomaly.beat}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-[#0F1420]/80 p-2 rounded-lg border border-slate-800">
                  <span className="font-bold text-amber-400 font-mono">Why Flagged: </span>
                  {anomaly.reason}
                </p>

                <div className="flex items-center justify-between text-[10px] font-mono text-red-400 font-bold">
                  <span>Deviation: +{anomaly.deviationPercent}%</span>
                  <span>Curr Rate: {anomaly.currentCount} vs Avg {anomaly.historicalAverage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Row 2: Scatter Plot & Horizon Stream Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scatter Plot */}
        <div className="lg:col-span-6 bg-[#0F1420] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold font-display text-white">
                Socio-Economic Indicator Correlation Scatter
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Evaluating crime rate against socio-economic factors across Karnataka
              </p>
            </div>

            <select
              value={selectedIndicator}
              onChange={(e) => setSelectedIndicator(e.target.value as any)}
              className="bg-[#161E2E] text-slate-200 text-xs p-1.5 rounded-lg border border-slate-700 font-mono"
            >
              <option value="unemployment">Unemployment Rate %</option>
              <option value="urbanization">Urbanization %</option>
              <option value="density">Population Density</option>
            </select>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  type="number"
                  dataKey={selectedIndicator}
                  name={selectedIndicator}
                  stroke="#64748b"
                  fontSize={10}
                  fontStyle="mono"
                />
                <YAxis
                  type="number"
                  dataKey="crimeRate"
                  name="Crime Rate"
                  stroke="#64748b"
                  fontSize={10}
                  fontStyle="mono"
                />
                <ZAxis type="number" dataKey="cyberShare" range={[50, 400]} name="Cybercrime Share %" />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{
                    backgroundColor: '#0F1420',
                    borderColor: 'rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Scatter name="Districts" data={SOCIOLOGICAL_CORRELATIONS} fill="#3B82F6" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Horizon Stream Forecast Chart */}
        <div className="lg:col-span-6 bg-[#0F1420] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div>
            <h3 className="text-sm font-bold font-display text-white">
              Emerging Crime Typology Horizon Forecast (2025-2026)
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Fading gradient bands indicate AI prediction confidence intervals
            </p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={QUARTERLY_FORECAST_DATA}>
                <defs>
                  <linearGradient id="cyberGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="gangGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="quarter" stroke="#64748b" fontSize={10} fontStyle="mono" />
                <YAxis stroke="#64748b" fontSize={10} fontStyle="mono" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F1420',
                    borderColor: 'rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="Cybercrime"
                  stackId="1"
                  stroke="#8B5CF6"
                  fill="url(#cyberGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="Narcotics"
                  stackId="1"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.4}
                />
                <Area
                  type="monotone"
                  dataKey="ViolentCrime"
                  stackId="1"
                  stroke="#EF4444"
                  fill="url(#gangGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
