import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Users,
  Shield,
  FileText,
  MapPin,
  Flame,
  Activity,
  ArrowUpRight,
  ChevronRight,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from 'recharts';
import {
  KARNATAKA_DISTRICTS,
  CRIME_CATEGORIES_STATS,
  MOCK_ALERTS,
  QUARTERLY_FORECAST_DATA,
} from '../../data/mockData';
import { IntelDrawerData } from '../../types';

interface ExecutiveOverviewProps {
  selectedDistrict: string;
  onSelectIntel: (intel: IntelDrawerData) => void;
  onNavigatePage: (page: any) => void;
}

export const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({
  selectedDistrict,
  onSelectIntel,
  onNavigatePage,
}) => {
  // Filter districts if selectedDistrict !== 'ALL'
  const districts =
    selectedDistrict === 'ALL'
      ? KARNATAKA_DISTRICTS
      : KARNATAKA_DISTRICTS.filter((d) => d.id === selectedDistrict);

  const activeDistrictObj = KARNATAKA_DISTRICTS.find((d) => d.id === selectedDistrict);

  // Animated counters state
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [activeCases, setActiveCases] = useState(0);
  const [riskZones, setRiskZones] = useState(0);
  const [repeatOffenders, setRepeatOffenders] = useState(0);

  useEffect(() => {
    const targetIncidents = activeDistrictObj ? activeDistrictObj.crimeCountMTD : 4892;
    const targetCases = activeDistrictObj ? activeDistrictObj.activeCases : 1248;
    const targetZones = activeDistrictObj ? (activeDistrictObj.isHotspotAlert ? 1 : 0) : 14;
    const targetOffenders = activeDistrictObj ? 32 : 382;

    let frame = 0;
    const totalFrames = 25;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setTotalIncidents(Math.floor(targetIncidents * progress));
      setActiveCases(Math.floor(targetCases * progress));
      setRiskZones(Math.floor(targetZones * progress));
      setRepeatOffenders(Math.floor(targetOffenders * progress));

      if (frame >= totalFrames) clearInterval(timer);
    }, 25);

    return () => clearInterval(timer);
  }, [selectedDistrict]);

  return (
    <div className="space-y-6">
      {/* Live Ticker Strip */}
      <div className="bg-[#0F1420] border border-amber-500/30 rounded-xl p-2.5 flex items-center gap-3 overflow-hidden shadow-md">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-amber-500/20 text-amber-400 font-mono text-[11px] font-bold shrink-0 border border-amber-500/40">
          <Flame className="w-3.5 h-3.5 animate-bounce" />
          <span>LIVE INTEL TICKER</span>
        </div>

        <div className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-6 text-xs font-mono">
          {MOCK_ALERTS.map((alert) => (
            <div
              key={alert.id}
              onClick={() =>
                onSelectIntel({
                  type: 'anomaly',
                  title: alert.title,
                  subtitle: `${alert.district} • ${alert.timestamp}`,
                  data: alert,
                })
              }
              className="inline-flex items-center gap-2 cursor-pointer hover:text-blue-400 transition-colors shrink-0"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  alert.severity === 'CRITICAL' ? 'bg-red-500 animate-ping' : 'bg-amber-400'
                }`}
              ></span>
              <span className="text-slate-400">[{alert.district}]</span>
              <span className="text-slate-200 font-medium">{alert.title}</span>
              <span className="text-[10px] text-slate-400">({alert.timestamp})</span>
              <span className="text-slate-700">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* KPI Strip (Animated Counters) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
        {/* KPI 1 */}
        <div className="p-4 rounded-xl bg-[#0F1420] border border-slate-800 shadow-md space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase">
            <span>Total Incidents (MTD)</span>
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
            {totalIncidents.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+3.2% YoY Delta</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-4 rounded-xl bg-[#0F1420] border border-slate-800 shadow-md space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase">
            <span>Active Cases</span>
            <FileText className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400">
            {activeCases.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-amber-300">
            <span>Under Investigation</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-4 rounded-xl bg-[#0F1420] border border-slate-800 shadow-md space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase">
            <span>High-Risk Hotspots</span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-red-400">
            {riskZones}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-red-400">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>Active Anomaly Flags</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-4 rounded-xl bg-[#0F1420] border border-slate-800 shadow-md space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase">
            <span>Repeat Offenders</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-purple-300">
            {repeatOffenders}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
            <span>Ranked Gold / Silver</span>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="p-4 rounded-xl bg-[#0F1420] border border-slate-800 shadow-md space-y-1 col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase">
            <span>Resolution Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">
            81.4%
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+2.8% vs Prev Month</span>
          </div>
        </div>
      </div>

      {/* Main Canvas Grid: Map & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Choropleth Map Card */}
        <div className="lg:col-span-7 bg-[#0F1420] border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  Karnataka State Crime Density & Emerging Hotspot Map
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  District-level MTD density shading • Pulsing red rings indicate emerging anomaly alerts
                </p>
              </div>

              <button
                onClick={() => onNavigatePage('geointelligence')}
                className="px-3 py-1.5 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-blue-300 text-xs font-mono font-semibold border border-blue-700/60 flex items-center gap-1"
              >
                Full GIS Map <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Custom Interactive Karnataka District Grid Map */}
            <div className="relative w-full h-80 bg-[#0B0F19] rounded-xl border border-slate-800 p-4 overflow-hidden flex flex-col justify-between">
              {/* Background Subtle Grid Texture */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>

              {/* District Cards Overlay */}
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-2.5 h-full overflow-y-auto pr-1">
                {districts.map((d) => (
                  <div
                    key={d.id}
                    onClick={() =>
                      onSelectIntel({
                        type: 'district',
                        title: d.name,
                        subtitle: `${d.headquarters} • Code: ${d.code}`,
                        data: d,
                      })
                    }
                    className={`relative p-3 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between ${
                      d.isHotspotAlert
                        ? 'bg-red-950/30 border-red-600/60 hover:border-red-500 glow-red'
                        : d.riskScore > 70
                        ? 'bg-amber-950/20 border-amber-600/40 hover:border-amber-400'
                        : 'bg-[#161E2E]/80 border-slate-800 hover:border-blue-500/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white group-hover:text-blue-300 font-display truncate">
                          {d.name}
                        </span>
                        {d.isHotspotAlert && (
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5 line-clamp-1">
                        {d.topCrimeType}
                      </div>
                    </div>

                    <div className="mt-2 flex items-end justify-between font-mono">
                      <div>
                        <div className="text-[9px] text-slate-500 uppercase">MTD Cases</div>
                        <div className="text-xs font-bold text-slate-200">{d.crimeCountMTD}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] text-slate-500 uppercase">Risk Index</div>
                        <div
                          className={`text-xs font-bold ${
                            d.riskScore > 80
                              ? 'text-red-400'
                              : d.riskScore > 65
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          {d.riskScore}/100
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Color Intensity: High Density (Dark Red) → Low Density (Dark Slate)</span>
            <span className="text-blue-400">Click any district for Intel Briefing</span>
          </div>
        </div>

        {/* Right Column: Donut Breakdown + Trend Chart */}
        <div className="lg:col-span-5 space-y-6">
          {/* Crime Category Donut Chart */}
          <div className="bg-[#0F1420] border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold font-display text-white">
                Crime Category Breakdown
              </h3>
              <span className="text-xs font-mono text-slate-400">MTD Share %</span>
            </div>

            <div className="h-52 w-full flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CRIME_CATEGORIES_STATS}
                    dataKey="count"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {CRIME_CATEGORIES_STATS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#0F1420" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F1420',
                      borderColor: 'rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend Grid */}
            <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-slate-800 text-[11px] font-mono">
              {CRIME_CATEGORIES_STATS.map((item) => (
                <div key={item.category} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-sm shrink-0"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className="text-slate-300 truncate">{item.category}</span>
                  <span className="text-slate-400 font-bold ml-auto">{item.sharePercent}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Predictive Trend Line Chart */}
          <div className="bg-[#0F1420] border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold font-display text-white">
                  12-Month Historical vs AI Forecast
                </h3>
                <p className="text-[11px] text-slate-400 font-mono">
                  Dotted extension shows quarterly predictive trajectory
                </p>
              </div>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={QUARTERLY_FORECAST_DATA}>
                  <defs>
                    <linearGradient id="colorCyber" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorProperty" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
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
                    stroke="#8B5CF6"
                    fillOpacity={1}
                    fill="url(#colorCyber)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="PropertyTheft"
                    stroke="#2563EB"
                    fillOpacity={1}
                    fill="url(#colorProperty)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
