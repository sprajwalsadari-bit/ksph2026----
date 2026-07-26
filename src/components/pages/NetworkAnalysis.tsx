import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import {
  Share2,
  Filter,
  User,
  MapPin,
  FileText,
  Shield,
  Award,
  Layers,
  Search,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
import { NETWORK_NODES, NETWORK_EDGES, KARNATAKA_DISTRICTS } from '../../data/mockData';
import { NetworkNode, NetworkEdge, IntelDrawerData } from '../../types';

interface NetworkAnalysisProps {
  onSelectIntel: (intel: IntelDrawerData) => void;
}

export const NetworkAnalysis: React.FC<NetworkAnalysisProps> = ({ onSelectIntel }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [selectedNodeType, setSelectedNodeType] = useState<string>('ALL');
  const [minWeight, setMinWeight] = useState<number>(1);
  const [searchNode, setSearchNode] = useState<string>('');

  // Filtered nodes and edges
  const filteredEdges = NETWORK_EDGES.filter((edge) => edge.weight >= minWeight);

  const nodeIdsWithEdges = new Set<string>();
  filteredEdges.forEach((e) => {
    nodeIdsWithEdges.add(typeof e.source === 'string' ? e.source : (e.source as any).id);
    nodeIdsWithEdges.add(typeof e.target === 'string' ? e.target : (e.target as any).id);
  });

  const filteredNodes = NETWORK_NODES.filter((node) => {
    if (selectedNodeType !== 'ALL' && node.type !== selectedNodeType) return false;
    if (selectedDistrict !== 'ALL' && node.district !== selectedDistrict) return false;
    if (searchNode && !node.name.toLowerCase().includes(searchNode.toLowerCase())) return false;
    return true;
  });

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth || 900;
    const height = svgRef.current.clientHeight || 600;

    // Clear existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('viewBox', [0, 0, width, height])
      .style('cursor', 'grab');

    const g = svg.append('g');

    // Zoom setup
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.4, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Deep clone data for force simulation
    const nodes = filteredNodes.map((d) => ({ ...d }));
    const links = filteredEdges
      .filter(
        (e) =>
          nodes.some((n) => n.id === e.source) && nodes.some((n) => n.id === e.target)
      )
      .map((e) => ({ ...e }));

    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(120)
      )
      .force('charge', d3.forceManyBody().strength(-350))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40));

    // Render Links (Edges)
    const link = g
      .append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', (d: any) =>
        d.relationType === 'co-accused'
          ? '#EF4444'
          : d.relationType === 'financial_transfer'
          ? '#10B981'
          : '#3B82F6'
      )
      .attr('stroke-opacity', 0.8)
      .attr('stroke-width', (d: any) => Math.max(1.5, d.weight * 1.5))
      .attr('stroke-dasharray', (d: any) => (d.relationType === 'financial_transfer' ? '4,4' : 'none'));

    // Link Tooltip
    link.append('title').text((d: any) => `${d.relationType.toUpperCase()}: ${d.detail}`);

    // Render Nodes Group
    const node = g
      .append('g')
      .selectAll('.node')
      .data(nodes)
      .join('g')
      .attr('class', 'node')
      .style('cursor', 'pointer')
      .call(
        d3
          .drag<any, any>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      );

    // Circle Node Shapes
    node
      .append('circle')
      .attr('r', (d: any) => (d.type === 'suspect' ? 22 : d.type === 'incident' ? 18 : 15))
      .attr('fill', (d: any) =>
        d.type === 'suspect'
          ? '#1E293B'
          : d.type === 'incident'
          ? '#0F172A'
          : d.type === 'location'
          ? '#1E1B4B'
          : '#064E3B'
      )
      .attr('stroke', (d: any) =>
        d.repeatOffenderRank === 'GOLD'
          ? '#F59E0B'
          : d.repeatOffenderRank === 'SILVER'
          ? '#94A3B8'
          : d.type === 'suspect'
          ? '#3B82F6'
          : d.type === 'incident'
          ? '#EF4444'
          : '#10B981'
      )
      .attr('stroke-width', (d: any) => (d.repeatOffenderRank === 'GOLD' ? 3 : 2));

    // Node Labels
    node
      .append('text')
      .text((d: any) => d.name)
      .attr('x', 0)
      .attr('y', 34)
      .attr('text-anchor', 'middle')
      .attr('fill', '#F8FAFC')
      .style('font-size', '10px')
      .style('font-family', 'JetBrains Mono')
      .style('font-weight', '600')
      .style('pointer-events', 'none');

    // Click handler to open Intel Drawer
    node.on('click', (event, d: any) => {
      onSelectIntel({
        type: d.type === 'suspect' ? 'suspect' : d.type === 'incident' ? 'case' : 'district',
        title: d.name,
        subtitle: `${d.type.toUpperCase()} • ${d.district || 'Karnataka State'}`,
        data: d,
      });
    });

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }, [filteredNodes, filteredEdges]);

  return (
    <div className="relative w-full h-[calc(100vh-100px)] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-[#0B0F19] flex">
      {/* Left Floating Filter Sidebar */}
      <div className="w-80 bg-[#0F1420] border-r border-slate-800/80 p-4 space-y-4 z-20 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Share2 className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="font-bold font-display text-sm text-white">
                Link & Network Filter Engine
              </h3>
              <p className="text-[10px] text-slate-400 font-mono">D3 Force Simulation Graph</p>
            </div>
          </div>

          {/* Node Search */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
              Search Node or Suspect
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Name or Alias..."
                value={searchNode}
                onChange={(e) => setSearchNode(e.target.value)}
                className="w-full bg-[#161E2E] text-slate-200 text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-700 font-mono"
              />
            </div>
          </div>

          {/* Node Type Filter */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
              Entity Type
            </label>
            <select
              value={selectedNodeType}
              onChange={(e) => setSelectedNodeType(e.target.value)}
              className="w-full bg-[#161E2E] text-slate-200 text-xs p-2 rounded-lg border border-slate-700 font-mono"
            >
              <option value="ALL">ALL ENTITIES (Suspects, FIRs, Locations)</option>
              <option value="suspect">Suspects Only</option>
              <option value="incident">Incidents / FIRs Only</option>
              <option value="location">Locations & Safehouses Only</option>
              <option value="victim">Victim Groups</option>
            </select>
          </div>

          {/* District Filter */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
              District Jurisdiction
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-[#161E2E] text-slate-200 text-xs p-2 rounded-lg border border-slate-700 font-mono"
            >
              <option value="ALL">ALL DISTRICTS</option>
              {KARNATAKA_DISTRICTS.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Link Strength Slider */}
          <div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
              <span>Min Relation Strength</span>
              <span className="font-bold text-amber-400">{minWeight}x</span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              value={minWeight}
              onChange={(e) => setMinWeight(Number(e.target.value))}
              className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Offender Rank Legend */}
        <div className="p-3 bg-[#161E2E] rounded-xl border border-slate-800 space-y-2 text-[11px] font-mono">
          <div className="font-bold text-slate-300 uppercase text-[10px]">Repeat Offender Badge Legend</div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-300"></span>
            <span className="text-amber-400 font-bold">GOLD RANK</span> (15+ FIRs)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400 border border-slate-300"></span>
            <span className="text-slate-300 font-bold">SILVER RANK</span> (8-14 FIRs)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 border border-blue-400"></span>
            <span className="text-blue-400 font-bold">STANDARD SUSPECT</span>
          </div>
        </div>
      </div>

      {/* Main Force Graph Canvas */}
      <div className="flex-1 h-full relative overflow-hidden bg-[#0B0F19]">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-25 pointer-events-none"></div>

        <svg ref={svgRef} className="w-full h-full relative z-10"></svg>

        {/* Legend Overlay at top right */}
        <div className="absolute top-4 right-4 z-20 glass-panel p-3 rounded-xl border border-slate-700/80 text-[11px] font-mono text-slate-300 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-red-500"></span> Co-Accused Relation
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-emerald-400 border-dashed border-b"></span> Hawala Transfer
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-blue-500"></span> Shared MO / Address
          </div>
        </div>
      </div>
    </div>
  );
};
