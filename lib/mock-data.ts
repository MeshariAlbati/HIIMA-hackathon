export interface Alert {
  id: string
  patientId: string
  braceletId: string
  type: string
  severity: 'critical' | 'warning' | 'normal'
  time: string
  location?: string
}

export interface KPIData {
  activeBracelets: number
  criticalAlerts: number
  highRiskPatients: number
  overcrowdedZones: number
}

export interface MapPoint {
  id: string
  lat: number
  lng: number
  status: 'critical' | 'warning' | 'normal'
  patientId: string
}

export interface ChartData {
  hour: string
  value: number
}

export const mockKPIs: KPIData = {
  activeBracelets: 1247,
  criticalAlerts: 23,
  highRiskPatients: 89,
  overcrowdedZones: 5,
}

export const mockAlerts: Alert[] = [
  {
    id: '1',
    patientId: 'P-2024-001',
    braceletId: 'HLB-1247',
    type: 'Low SpO2',
    severity: 'critical',
    time: '2 min ago',
    location: 'Zone A-3',
  },
  {
    id: '2',
    patientId: 'P-2024-002',
    braceletId: 'HLB-1246',
    type: 'Arrhythmia Detected',
    severity: 'critical',
    time: '5 min ago',
    location: 'Zone B-1',
  },
  {
    id: '3',
    patientId: 'P-2024-003',
    braceletId: 'HLB-1245',
    type: 'High Heart Rate',
    severity: 'warning',
    time: '8 min ago',
    location: 'Zone C-2',
  },
  {
    id: '4',
    patientId: 'P-2024-004',
    braceletId: 'HLB-1244',
    type: 'Temperature Alert',
    severity: 'warning',
    time: '12 min ago',
    location: 'Zone A-1',
  },
  {
    id: '5',
    patientId: 'P-2024-005',
    braceletId: 'HLB-1243',
    type: 'Fall Detection',
    severity: 'critical',
    time: '15 min ago',
    location: 'Zone D-4',
  },
  {
    id: '6',
    patientId: 'P-2024-006',
    braceletId: 'HLB-1242',
    type: 'Low Battery',
    severity: 'warning',
    time: '18 min ago',
    location: 'Zone B-3',
  },
  {
    id: '7',
    patientId: 'P-2024-007',
    braceletId: 'HLB-1241',
    type: 'Irregular Pattern',
    severity: 'warning',
    time: '22 min ago',
    location: 'Zone C-1',
  },
  {
    id: '8',
    patientId: 'P-2024-008',
    braceletId: 'HLB-1240',
    type: 'SpO2 Drop',
    severity: 'critical',
    time: '25 min ago',
    location: 'Zone A-2',
  },
]

export const mockMapPoints: MapPoint[] = [
  { id: '1', lat: 21.4225, lng: 39.8262, status: 'critical', patientId: 'P-2024-001' }, // Grand Mosque north gate
  { id: '2', lat: 21.4208, lng: 39.8277, status: 'critical', patientId: 'P-2024-002' },
  { id: '3', lat: 21.4189, lng: 39.8285, status: 'warning', patientId: 'P-2024-003' },
  { id: '4', lat: 21.4172, lng: 39.8258, status: 'warning', patientId: 'P-2024-004' },
  { id: '5', lat: 21.4195, lng: 39.8239, status: 'normal', patientId: 'P-2024-009' },
  { id: '6', lat: 21.4163, lng: 39.8221, status: 'normal', patientId: 'P-2024-010' },
  { id: '7', lat: 21.4147, lng: 39.8294, status: 'critical', patientId: 'P-2024-005' },
  { id: '8', lat: 21.4129, lng: 39.8247, status: 'warning', patientId: 'P-2024-006' },
]

export const mockHRTrend: ChartData[] = [
  { hour: '00:00', value: 72 },
  { hour: '04:00', value: 68 },
  { hour: '08:00', value: 75 },
  { hour: '12:00', value: 82 },
  { hour: '16:00', value: 78 },
  { hour: '20:00', value: 74 },
  { hour: '24:00', value: 70 },
]

export const mockSpO2Trend: ChartData[] = [
  { hour: '00:00', value: 98 },
  { hour: '04:00', value: 97 },
  { hour: '08:00', value: 99 },
  { hour: '12:00', value: 98 },
  { hour: '16:00', value: 97 },
  { hour: '20:00', value: 98 },
  { hour: '24:00', value: 99 },
]

export const mockAlertsPerHour: ChartData[] = [
  { hour: '00:00', value: 5 },
  { hour: '04:00', value: 3 },
  { hour: '08:00', value: 12 },
  { hour: '12:00', value: 18 },
  { hour: '16:00', value: 15 },
  { hour: '20:00', value: 8 },
  { hour: '24:00', value: 4 },
]

export const mockAlertCategories = [
  { name: 'SpO2 Alerts', value: 35, color: '#EF4444' },
  { name: 'Heart Rate', value: 28, color: '#F59E0B' },
  { name: 'Temperature', value: 20, color: '#10B981' },
  { name: 'Fall Detection', value: 12, color: '#8B5CF6' },
  { name: 'Other', value: 5, color: '#6B7280' },
]

