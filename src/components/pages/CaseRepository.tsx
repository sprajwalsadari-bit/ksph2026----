import React, { useState } from 'react';
import {
  FolderKanban,
  Search,
  Filter,
  FileSpreadsheet,
  Download,
  Plus,
  Eye,
  ChevronLeft,
  ChevronRight,
  Shield,
  Phone,
} from 'lucide-react';
import { MOCK_FIRS, KARNATAKA_DISTRICTS } from '../../data/mockData';
import { FIRCase, IntelDrawerData } from '../../types';

interface CaseRepositoryProps {
  onSelectIntel: (intel: IntelDrawerData) => void;
  onOpenReportModal: () => void;
  onOpenIngestionModal: () => void;
}

export const CaseRepository: React.FC<CaseRepositoryProps> = ({
  onSelectIntel,
  onOpenReportModal,
  onOpenIngestionModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [districtFilter, setDistrictFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Filter cases
  const filteredCases = MOCK_FIRS.filter((caseItem) => {
    if (districtFilter !== 'ALL' && caseItem.district !== districtFilter) return false;
    if (categoryFilter !== 'ALL' && caseItem.category !== categoryFilter) return false;
    if (statusFilter !== 'ALL' && caseItem.status !== statusFilter) return false;
    if (
      searchTerm &&
      !caseItem.firNumber.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !caseItem.actSection.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !caseItem.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="p-4 rounded-2xl bg-[#0F1420] border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div>
          <h2 className="text-base font-bold font-display text-white flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-blue-400" />
            Karnataka SCRB Central FIR & Crime Case Repository
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Database of active & historic FIR records across 31 districts and 1,120 police stations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenIngestionModal}
            className="px-3 py-2 rounded-lg bg-[#161E2E] hover:bg-slate-800 text-slate-200 text-xs font-mono border border-slate-700 flex items-center gap-1.5 transition-all"
          >
            <FileSpreadsheet className="w-4 h-4 text-amber-400" /> Ingest Legacy Data
          </button>

          <button
            onClick={onOpenReportModal}
            className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
          >
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-xl bg-[#0F1420] border border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search FIR#, IPC section..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#161E2E] text-slate-100 text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-700 font-mono placeholder-slate-500"
          />
        </div>

        {/* District Filter */}
        <select
          value={districtFilter}
          onChange={(e) => setDistrictFilter(e.target.value)}
          className="bg-[#161E2E] text-slate-200 text-xs p-2 rounded-lg border border-slate-700 font-mono"
        >
          <option value="ALL">ALL DISTRICTS</option>
          {KARNATAKA_DISTRICTS.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-[#161E2E] text-slate-200 text-xs p-2 rounded-lg border border-slate-700 font-mono"
        >
          <option value="ALL">ALL CRIME CATEGORIES</option>
          <option value="Cybercrime">Cybercrime</option>
          <option value="Property Theft">Property Theft</option>
          <option value="Organized Gang">Organized Gang</option>
          <option value="Narcotics">Narcotics</option>
          <option value="Commercial Fraud">Commercial Fraud</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#161E2E] text-slate-200 text-xs p-2 rounded-lg border border-slate-700 font-mono"
        >
          <option value="ALL">ALL STATUSES</option>
          <option value="OPEN">OPEN</option>
          <option value="UNDER INVESTIGATION">UNDER INVESTIGATION</option>
          <option value="CHARGESHEET FILED">CHARGESHEET FILED</option>
          <option value="CLOSED">CLOSED</option>
          <option value="COLD CASE">COLD CASE</option>
        </select>
      </div>

      {/* Main Data Table */}
      <div className="bg-[#0F1420] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="bg-[#161E2E] text-slate-400 uppercase border-b border-slate-800">
                <th className="p-3.5 pl-5">FIR Reference</th>
                <th className="p-3.5">District / Station</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">IPC / Act Section</th>
                <th className="p-3.5">Incident Date</th>
                <th className="p-3.5">Est. Loss (INR)</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 pr-5 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/80 text-slate-200">
              {filteredCases.map((c) => (
                <tr
                  key={c.id}
                  onClick={() =>
                    onSelectIntel({
                      type: 'case',
                      title: c.firNumber,
                      subtitle: `${c.district} • ${c.policeStation}`,
                      data: c,
                    })
                  }
                  className="hover:bg-slate-800/50 cursor-pointer transition-colors group"
                >
                  <td className="p-3.5 pl-5 font-bold text-white group-hover:text-blue-300">
                    <div>{c.id}</div>
                    <div className="text-[10px] text-slate-400 font-normal">FIR: {c.firNumber}</div>
                  </td>

                  <td className="p-3.5">
                    <div className="font-bold text-slate-200">{c.district}</div>
                    <div className="text-[10px] text-slate-400">{c.policeStation}</div>
                  </td>

                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 text-[10px]">
                      {c.category}
                    </span>
                  </td>

                  <td className="p-3.5 text-slate-300 max-w-[200px] truncate">{c.actSection}</td>

                  <td className="p-3.5 text-slate-400">
                    <div>{c.incidentDate}</div>
                    <div className="text-[10px]">{c.incidentTime}</div>
                  </td>

                  <td className="p-3.5 font-bold text-emerald-400">
                    ₹{(c.estimatedLossINR || 0).toLocaleString('en-IN')}
                  </td>

                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                        c.status === 'OPEN'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : c.status === 'UNDER INVESTIGATION'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : c.status === 'CHARGESHEET FILED'
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="p-3.5 pr-5 text-right">
                    <button className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-mono border border-slate-700 flex items-center gap-1 ml-auto">
                      <Eye className="w-3 h-3 text-blue-400" /> View Briefing
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-[#161E2E] border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Showing 1–{filteredCases.length} of {filteredCases.length} active FIR records</span>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-white font-bold">Page 1 of 1</span>
            <button className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-50" disabled>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
