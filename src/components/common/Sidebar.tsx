import React from 'react';
import {
  LayoutDashboard,
  MapPin,
  Share2,
  TrendingUp,
  FolderKanban,
  BellRing,
  Database,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
  Cpu,
} from 'lucide-react';
import { PageView } from '../../types';

interface SidebarProps {
  activeView: PageView;
  setActiveView: (view: PageView) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  onOpenReportModal: () => void;
  onOpenIngestionModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  collapsed,
  setCollapsed,
  onOpenReportModal,
  onOpenIngestionModal,
}) => {
  const navItems = [
    { id: 'overview' as PageView, label: 'Executive Overview', icon: LayoutDashboard, badge: 'Live' },
    { id: 'geointelligence' as PageView, label: 'Geo-Intelligence Map', icon: MapPin, badge: 'GIS' },
    { id: 'network' as PageView, label: 'Network & Link Analysis', icon: Share2, badge: 'D3' },
    { id: 'predictive' as PageView, label: 'Predictive & Risk Scoring', icon: TrendingUp, badge: 'AI' },
    { id: 'cases' as PageView, label: 'Case & FIR Repository', icon: FolderKanban, badge: '1,248' },
    { id: 'alerts' as PageView, label: 'Intelligence Alerts', icon: BellRing, badge: '4 New' },
    { id: 'admin' as PageView, label: 'Legacy Data Ingestion', icon: Database },
    { id: 'settings' as PageView, label: 'Platform Security Settings', icon: Settings },
  ];

  return (
    <aside
      className={`relative z-20 flex flex-col bg-[#0F1420] border-r border-slate-800/80 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-5 w-6 h-6 rounded-full bg-blue-600 border border-blue-400 text-white flex items-center justify-center hover:bg-blue-500 shadow-md transition-all z-30"
        title={collapsed ? 'Expand Navigation' : 'Collapse Navigation'}
      >
        {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>

      {/* Navigation List */}
      <div className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        <div className={`px-3 py-1 mb-2 ${collapsed ? 'hidden' : 'block'}`}>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
            Strategic Command Views
          </span>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-900/80 to-blue-800/40 text-blue-300 border border-blue-500/40 shadow-md font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-transform ${
                  isActive ? 'text-blue-400 scale-110' : 'text-slate-400 group-hover:text-slate-200'
                }`}
              />

              {!collapsed && (
                <div className="flex-1 text-left flex items-center justify-between">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        item.badge === 'Live' || item.badge === '4 New'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
                          : item.badge === 'AI'
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick Action Buttons */}
      {!collapsed && (
        <div className="p-3 border-t border-slate-800/80 bg-[#121826]/60 space-y-2">
          <button
            onClick={onOpenReportModal}
            className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Activity className="w-3.5 h-3.5" />
            Generate Intel Report
          </button>

          <button
            onClick={onOpenIngestionModal}
            className="w-full py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono flex items-center justify-center gap-1.5 border border-slate-700 transition-all"
          >
            <Database className="w-3 h-3 text-amber-400" />
            Ingest Legacy Data
          </button>
        </div>
      )}

      {/* System Health Footer */}
      <div className="p-3 border-t border-slate-800/80 text-[10px] font-mono text-slate-400 flex items-center justify-between">
        {!collapsed ? (
          <>
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>SCRB Net • v4.2</span>
            </div>
            <span className="text-emerald-400 font-bold">99.98% Sync</span>
          </>
        ) : (
          <div className="w-full flex justify-center" title="System Status: 99.98% Live Sync">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
        )}
      </div>
    </aside>
  );
};
