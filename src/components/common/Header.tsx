import React, { useState } from 'react';
import {
  Shield,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  UserCheck,
  AlertTriangle,
  FileText,
  X,
  CheckCircle2,
} from 'lucide-react';
import { PageView, AlertNotification } from '../../types';
import { MOCK_ALERTS, KARNATAKA_DISTRICTS } from '../../data/mockData';

interface HeaderProps {
  activeView: PageView;
  setActiveView: (view: PageView) => void;
  selectedDistrict: string;
  setSelectedDistrict: (districtId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onSelectIntel: (data: any) => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedDistrict,
  setSelectedDistrict,
  searchQuery,
  setSearchQuery,
  darkMode,
  setDarkMode,
  onSelectIntel,
}) => {
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [alerts, setAlerts] = useState<AlertNotification[]>(MOCK_ALERTS);

  const unreadCount = alerts.filter((a) => !a.isRead).length;

  const markAllRead = () => {
    setAlerts(alerts.map((a) => ({ ...a, isRead: true })));
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0F1420]/90 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-6 flex items-center justify-between shadow-lg">
      {/* Left Branding */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 via-blue-900 to-slate-900 border border-amber-500/40 shadow-inner">
          <Shield className="w-6 h-6 text-amber-400 drop-shadow-md" />
          <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-slate-900"></span>
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-bold text-base md:text-lg tracking-tight text-white flex items-center gap-1.5">
              KARNATAKA STATE POLICE
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800/60 uppercase">
                SCRB
              </span>
            </h1>
          </div>
          <p className="text-xs text-slate-400 hidden sm:block font-mono">
            State Crime Records Bureau • Strategic Intelligence Hub
          </p>
        </div>
      </div>

      {/* Middle Controls: Global Search & District Selector */}
      <div className="flex items-center gap-3 max-w-xl w-full mx-4">
        {/* District Selector */}
        <div className="relative hidden md:block min-w-[200px]">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full appearance-none bg-[#161E2E] text-slate-200 text-xs font-medium pl-3 pr-8 py-2 rounded-lg border border-slate-700/70 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
          >
            <option value="ALL">ALL KARNATAKA STATE (31 Districts)</option>
            {KARNATAKA_DISTRICTS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name.toUpperCase()} ({d.code})
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
        </div>

        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search FIR#, Suspect name, Alias, Police Station..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#161E2E] text-slate-100 text-xs pl-9 pr-4 py-2 rounded-lg border border-slate-700/70 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right Action Bar */}
      <div className="flex items-center gap-3">
        {/* Live Ticker Alert Bell */}
        <div className="relative">
          <button
            onClick={() => setAlertsOpen(!alertsOpen)}
            className="relative p-2 rounded-lg bg-[#161E2E] text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/70 transition-all"
            title="Live Crime Intelligence Alerts"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white font-mono animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Alerts Popover Dropdown */}
          {alertsOpen && (
            <div className="absolute right-0 mt-2 w-80 md:w-96 bg-[#0F1420] border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
              <div className="p-3 bg-[#161E2E] border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold text-xs text-white uppercase tracking-wider font-display">
                    Emerging Trend Alerts
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[11px] text-blue-400 hover:underline flex items-center gap-1 font-mono"
                    >
                      <CheckCircle2 className="w-3 h-3" /> Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setAlertsOpen(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    onClick={() => {
                      onSelectIntel({
                        type: 'anomaly',
                        title: alert.title,
                        subtitle: `${alert.district} • ${alert.policeStation}`,
                        data: alert,
                      });
                      setAlertsOpen(false);
                    }}
                    className={`p-3 hover:bg-slate-800/50 cursor-pointer transition-colors ${
                      !alert.isRead ? 'bg-blue-950/20' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span
                        className={`px-1.5 py-0.5 text-[10px] font-mono font-bold rounded ${
                          alert.severity === 'CRITICAL'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : alert.severity === 'HIGH'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}
                      >
                        {alert.severity}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {alert.timestamp}
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">
                      {alert.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                      {alert.description}
                    </p>

                    {alert.aiConfidence && (
                      <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                        <span>AI Confidence: {alert.aiConfidence}%</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={() => {
            setDarkMode(!darkMode);
            document.documentElement.classList.toggle('dark');
          }}
          className="p-2 rounded-lg bg-[#161E2E] text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/70 transition-all"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
        </button>

        {/* User Profile Badge */}
        <div className="hidden lg:flex items-center gap-2.5 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-blue-900/80 border border-blue-500/50 flex items-center justify-center text-blue-300 font-bold text-xs font-mono">
            ADGP
          </div>
          <div className="text-left">
            <div className="text-xs font-semibold text-slate-200 flex items-center gap-1">
              R. Chandrasekhar, IPS
              <UserCheck className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Chief Analyst • SCRB HQ
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
