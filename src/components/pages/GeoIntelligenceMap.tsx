import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Layers,
  MapPin,
  Flame,
  Clock,
  Filter,
  Eye,
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { KARNATAKA_DISTRICTS, MOCK_FIRS, HOURLY_CRIME_DISTRIBUTION } from '../../data/mockData';
import { IntelDrawerData } from '../../types';

interface GeoIntelligenceProps {
  selectedDistrict: string;
  setSelectedDistrict: (districtId: string) => void;
  onSelectIntel: (intel: IntelDrawerData) => void;
}

export const GeoIntelligenceMap: React.FC<GeoIntelligenceProps> = ({
  selectedDistrict,
  setSelectedDistrict,
  onSelectIntel,
}) => {
  // Time slider state (00:00 to 23:00)
  const [currentHourIndex, setCurrentHourIndex] = useState<number>(6); // Default 12:00 PM
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Map Layer Toggles
  const [showHotspots, setShowHotspots] = useState(true);
  const [showFIRs, setShowFIRs] = useState(true);
  const [showCCTV, setShowCCTV] = useState(false);
  const [selectedCrimeCategory, setSelectedCrimeCategory] = useState<string>('ALL');

  // Drilldown Breadcrumb state
  const [drillLevel, setDrillLevel] = useState<'State' | 'District' | 'PoliceStation' | 'Beat'>('State');
  const [activeStation, setActiveStation] = useState<string>('Koramangala PS');

  const currentHourData = HOURLY_CRIME_DISTRIBUTION[currentHourIndex];

  // Play animation timer
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentHourIndex((prev) => (prev + 1) % HOURLY_CRIME_DISTRIBUTION.length);
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const activeDistricts =
    selectedDistrict === 'ALL'
      ? KARNATAKA_DISTRICTS
      : KARNATAKA_DISTRICTS.filter((d) => d.id === selectedDistrict);

  return (
    <div className="relative w-full h-[calc(100vh-100px)] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-[#0B0F19] flex flex-col">
      {/* Top Floating Glass Breadcrumb Bar */}
      <div className="absolute top-4 left-4 z-20 glass-panel px-4 py-2.5 rounded-xl border border-slate-700/80 flex items-center gap-3 text-xs font-mono text-slate-200">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-400" />
          <span className="font-bold text-white uppercase font-display">GIS Jurisdiction Depth:</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400">
          <button
            onClick={() => {
              setDrillLevel('State');
              setSelectedDistrict('ALL');
            }}
            className={`hover:text-blue-300 ${drillLevel === 'State' ? 'text-blue-400 font-bold' : ''}`}
          >
            Karnataka State
          </button>
          <ChevronRight className="w-3 h-3" />
          <button
            onClick={() => setDrillLevel('District')}
            className={`hover:text-blue-300 ${
              drillLevel === 'District' ? 'text-blue-400 font-bold' : ''
            }`}
          >
            {selectedDistrict === 'ALL' ? '31 Districts' : selectedDistrict}
          </button>
          <ChevronRight className="w-3 h-3" />
          <button
            onClick={() => setDrillLevel('PoliceStation')}
            className={`hover:text-blue-300 ${
              drillLevel === 'PoliceStation' ? 'text-blue-400 font-bold' : ''
            }`}
          >
            {activeStation}
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-emerald-400 font-bold">Beat 4</span>
        </div>
      </div>

      {/* Floating Map Layer Toggles Card (Right Side) */}
      <div className="absolute top-4 right-4 z-20 glass-panel p-3.5 rounded-xl border border-slate-700/80 w-64 space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2 font-bold font-display text-white">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>GIS Map Overlays</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">v2.4</span>
        </div>

        {/* Category Filter Dropdown */}
        <div>
          <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
            Filter Crime Category
          </label>
          <select
            value={selectedCrimeCategory}
            onChange={(e) => setSelectedCrimeCategory(e.target.value)}
            className="w-full bg-[#161E2E] text-slate-200 text-xs p-2 rounded-lg border border-slate-700 font-mono"
          >
            <option value="ALL">ALL CATEGORIES</option>
            <option value="Property Theft">Property Theft</option>
            <option value="Cybercrime">Cybercrime & Scams</option>
            <option value="Violent Crime">Violent Crime</option>
            <option value="Narcotics">Narcotics & Drugs</option>
            <option value="Organized Gang">Organized Gangs</option>
          </select>
        </div>

        {/* Toggle Switches */}
        <div className="space-y-2 font-mono text-[11px]">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-slate-300">Density Heatmap Blobs</span>
            <input
              type="checkbox"
              checked={showHotspots}
              onChange={(e) => setShowHotspots(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-0"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-slate-300">Active FIR Incident Pins</span>
            <input
              type="checkbox"
              checked={showFIRs}
              onChange={(e) => setShowFIRs(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-0"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-slate-300">Live ANPR / CCTV Grid</span>
            <input
              type="checkbox"
              checked={showCCTV}
              onChange={(e) => setShowCCTV(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-0"
            />
          </label>
        </div>
      </div>

      {/* Main Map Container Canvas */}
      <div className="relative flex-1 w-full bg-[#0B0F19] overflow-hidden p-6 flex items-center justify-center">
        {/* Background Radial Topo Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none"></div>

        {/* Interactive District Clusters Layout Canvas */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl w-full">
          {activeDistricts.map((district) => (
            <div
              key={district.id}
              onClick={() => {
                setDrillLevel('District');
                setSelectedDistrict(district.id);
                onSelectIntel({
                  type: 'district',
                  title: district.name,
                  subtitle: `${district.headquarters} • ${district.code}`,
                  data: district,
                });
              }}
              className={`relative p-4 rounded-xl border transition-all cursor-pointer group hover:scale-[1.02] shadow-xl ${
                district.isHotspotAlert
                  ? 'bg-red-950/40 border-red-600/80 glow-red'
                  : 'bg-[#0F1420]/90 border-slate-800 hover:border-blue-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white group-hover:text-blue-300 font-display">
                    {district.name}
                  </h4>
                  <div className="text-[10px] text-slate-400 font-mono">{district.headquarters}</div>
                </div>

                {district.isHotspotAlert && (
                  <span className="px-2 py-0.5 text-[9px] font-mono font-bold rounded bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse">
                    SPIKE ZONE
                  </span>
                )}
              </div>

              {/* Time Scrubber Impacted Metrics */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Hourly Peak</div>
                  <div className="font-bold text-amber-400">
                    {Math.round(district.crimeCountMTD * (currentHourData.thefts / 200))} incidents
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Risk Index</div>
                  <div
                    className={`font-bold ${
                      district.riskScore > 80
                        ? 'text-red-400'
                        : district.riskScore > 65
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {district.riskScore}/100
                  </div>
                </div>
              </div>

              {/* Sparkline Visual */}
              <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Top: {district.topCrimeType}</span>
                <span className="text-blue-400 font-bold">vs St. Avg +14%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Floating Time-of-Day Scrubber / Slider */}
      <div className="p-4 bg-[#0F1420]/95 border-t border-slate-800 backdrop-blur-md flex flex-col md:flex-row items-center gap-4 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-all"
            title={isPlaying ? 'Pause Timeline' : 'Play Timeline (00:00 - 23:00)'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentHourIndex(0);
            }}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
            title="Reset Timeline"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="font-mono text-xs text-slate-200">
            <span className="text-slate-400 uppercase">Selected Hour Band:</span>{' '}
            <span className="font-bold text-blue-400 text-sm">{currentHourData.label} ({currentHourData.hour})</span>
          </div>
        </div>

        {/* Timeline Range Scrubber */}
        <div className="flex-1 w-full flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={HOURLY_CRIME_DISTRIBUTION.length - 1}
            value={currentHourIndex}
            onChange={(e) => {
              setIsPlaying(false);
              setCurrentHourIndex(Number(e.target.value));
            }}
            className="w-full accent-blue-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        <div className="text-[11px] font-mono text-slate-400 hidden lg:block">
          Night Thieves Peak (02:00) • Cyber Fraud Peak (14:00)
        </div>
      </div>
    </div>
  );
};
