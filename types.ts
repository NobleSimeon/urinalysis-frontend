export enum AppStep {
  DISCOVERY = 'DISCOVERY',
  CONNECTION_SUCCESS = 'CONNECTION_SUCCESS',
  ROLE_SELECTION = 'ROLE_SELECTION',
  CAMERA_CALIBRATION = 'CAMERA_CALIBRATION',
  PROCESSING = 'PROCESSING',
  RESULTS = 'RESULTS'
}

export enum UserRole {
  MEDICAL = 'MEDICAL',
  PATIENT = 'PATIENT',
  UNSELECTED = 'UNSELECTED'
}

export interface AnalysisResult {
  parameter: string;
  value: string; // e.g., "Positive", "Negative", "500 Leu/uL"
  severity: 'normal' | 'warning' | 'critical';
  referenceRange?: string;
}

export interface FullAnalysis {
  timestamp: string;
  id: string;
  results: AnalysisResult[];
  summary: string; // Layman summary
  recommendation: string; // Clinical recommendation
  imageUrl: string; // The captured image
}

export interface DeviceState {
  isConnected: boolean;
  isScanning: boolean;
  step: AppStep;
  role: UserRole;
  lastAnalysis: FullAnalysis | null;
}