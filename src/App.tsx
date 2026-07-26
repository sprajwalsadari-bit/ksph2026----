import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { IntelDrawer } from './components/common/IntelDrawer';
import { ReportModal } from './components/common/ReportModal';
import { IngestionModal } from './components/common/IngestionModal';

import { ExecutiveOverview } from './components/pages/ExecutiveOverview';
import { GeoIntelligenceMap } from './components/pages/GeoIntelligenceMap';
import { NetworkAnalysis } from './components/pages/NetworkAnalysis';
import { PredictiveDashboard } from './components/pages/PredictiveDashboard';
import { CaseRepository } from './components/pages/CaseRepository';
import { ReportsAlertsPage } from './components/pages/ReportsAlertsPage';
import { AdminIngestionPage } from './components/pages/AdminIngestionPage';
import { SettingsPage } from './components/pages/SettingsPage';

import { PageView, IntelDrawerData } from './types';

export default function App() {
  const [activeView, setActiveView] = useState<PageView>('overview');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Intel Drawer state
  const [intelDrawer, setIntelDrawer] = useState<IntelDrawerData | null>(null);

  // Modals
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isIngestionModalOpen, setIsIngestionModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onSelectIntel={setIntelDrawer}
      />

      {/* Main Body Shell */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          onOpenReportModal={() => setIsReportModalOpen(true)}
          onOpenIngestionModal={() => setIsIngestionModalOpen(true)}
        />

        {/* Main Canvas Viewport */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-[#0B0F19]">
          {activeView === 'overview' && (
            <ExecutiveOverview
              selectedDistrict={selectedDistrict}
              onSelectIntel={setIntelDrawer}
              onNavigatePage={setActiveView}
            />
          )}

          {activeView === 'geointelligence' && (
            <GeoIntelligenceMap
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={setSelectedDistrict}
              onSelectIntel={setIntelDrawer}
            />
          )}

          {activeView === 'network' && (
            <NetworkAnalysis onSelectIntel={setIntelDrawer} />
          )}

          {activeView === 'predictive' && (
            <PredictiveDashboard onSelectIntel={setIntelDrawer} />
          )}

          {activeView === 'cases' && (
            <CaseRepository
              onSelectIntel={setIntelDrawer}
              onOpenReportModal={() => setIsReportModalOpen(true)}
              onOpenIngestionModal={() => setIsIngestionModalOpen(true)}
            />
          )}

          {activeView === 'alerts' && (
            <ReportsAlertsPage
              onSelectIntel={setIntelDrawer}
              onOpenReportModal={() => setIsReportModalOpen(true)}
            />
          )}

          {activeView === 'admin' && (
            <AdminIngestionPage
              onOpenIngestionModal={() => setIsIngestionModalOpen(true)}
            />
          )}

          {activeView === 'settings' && <SettingsPage />}
        </main>
      </div>

      {/* Right Slide-out Intel Drawer */}
      <IntelDrawer intel={intelDrawer} onClose={() => setIntelDrawer(null)} />

      {/* Intelligence Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      {/* Legacy Data Ingestion Modal */}
      <IngestionModal
        isOpen={isIngestionModalOpen}
        onClose={() => setIsIngestionModalOpen(false)}
      />
    </div>
  );
}
