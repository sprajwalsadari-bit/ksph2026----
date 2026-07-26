export type PageView =
  | 'overview'
  | 'geointelligence'
  | 'network'
  | 'predictive'
  | 'cases'
  | 'alerts'
  | 'admin'
  | 'settings';

export type StatusType = 'OPEN' | 'UNDER INVESTIGATION' | 'CLOSED' | 'COLD CASE' | 'CHARGESHEET FILED';

export type SeverityType = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface DistrictData {
  id: string;
  name: string;
  code: string;
  headquarters: string;
  lat: number;
  lng: number;
  crimeCountMTD: number;
  yoyChange: number; // percentage
  activeCases: number;
  riskScore: number; // 0 - 100
  topCrimeType: string;
  policeStationsCount: number;
  populationDensity: number; // per sq km
  unemploymentRate: number; // percentage
  urbanizationRate: number; // percentage
  isHotspotAlert?: boolean;
  alertReason?: string;
  crimeBreakdown: { category: string; count: number }[];
  monthlyTrend: number[];
}

export interface FIRCase {
  id: string; // e.g., FIR-2026-BLR-0481
  firNumber: string;
  district: string;
  policeStation: string;
  beatNumber: string;
  category: string; // Property Theft, Cybercrime, Organized Crime, Narcotics, Violent Crime, Commercial Fraud
  actSection: string; // e.g. IPC 379, IPC 420, IT Act Sec 66D
  incidentDate: string; // YYYY-MM-DD
  incidentTime: string; // HH:MM
  reportedDate: string;
  status: StatusType;
  severity: SeverityType;
  investigatingOfficer: string;
  officerRank: string;
  suspects: string[];
  victimsCount: number;
  estimatedLossINR: number;
  lat: number;
  lng: number;
  modusOperandi: string;
  description: string;
  tags: string[];
}

export type NodeType = 'suspect' | 'victim' | 'location' | 'incident' | 'vehicle';

export interface NetworkNode {
  id: string;
  name: string;
  type: NodeType;
  category?: string;
  district?: string;
  alias?: string;
  repeatOffenderRank?: 'GOLD' | 'SILVER' | 'BRONZE' | 'NONE';
  incidentCount?: number;
  photoUrl?: string;
  modusOperandiTags?: string[];
  lat?: number;
  lng?: number;
  x?: number;
  y?: number;
}

export interface NetworkEdge {
  source: string;
  target: string;
  relationType: 'co-accused' | 'same_address' | 'same_mo' | 'financial_transfer' | 'frequent_contact' | 'vehicle_linked';
  weight: number; // 1-5 line thickness
  detail: string; // e.g. "Shared phone tower location during 3 burglaries"
}

export interface AlertNotification {
  id: string;
  timestamp: string;
  district: string;
  policeStation: string;
  title: string;
  category: string;
  severity: SeverityType;
  description: string;
  isRead: boolean;
  aiConfidence?: number;
}

export interface AnomalyItem {
  id: string;
  district: string;
  beat: string;
  crimeCategory: string;
  detectedAt: string;
  severity: SeverityType;
  reason: string;
  deviationPercent: number; // e.g. +310%
  historicalAverage: number;
  currentCount: number;
}

export interface CrimeCategoryStat {
  category: string;
  count: number;
  color: string;
  yoyDelta: number;
  sharePercent: number;
}

export interface RiskLeaderboardItem {
  rank: number;
  district: string;
  headquarters: string;
  riskScore: number;
  riskLevel: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'MODERATE';
  primaryFactor: string;
  monthlySpike: number;
  resolutionEfficiency: number;
  beatsAtRisk: number;
}

export interface IntelDrawerData {
  type: 'district' | 'suspect' | 'case' | 'hotspot' | 'anomaly';
  title: string;
  subtitle?: string;
  data: any;
}
