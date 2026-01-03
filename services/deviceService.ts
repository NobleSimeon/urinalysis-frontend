import { AnalysisResult, FullAnalysis } from '../types';

/**
 * MOCK SERVICE LAYER
 * This file simulates the WebSocket/HTTP communication with the Raspberry Pi.
 * To implement real functionality, replace the setTimeout calls with actual API requests.
 */

// Simulated delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockScanForDevice = async (): Promise<boolean> => {
  await delay(3000); // Simulate network scanning
  // Randomly fail for demo purposes? No, let's assume success for smooth flow.
  return true; 
};

export const mockCaptureAndAnalyze = async (): Promise<FullAnalysis> => {
  await delay(3000); // Simulate image processing time

  // Dummy Clinical Data
  const mockResults: AnalysisResult[] = [
    { parameter: 'Leukocytes', value: '500 Leu/uL', severity: 'critical', referenceRange: '< 10 Leu/uL' },
    { parameter: 'Nitrites', value: 'Positive', severity: 'warning', referenceRange: 'Negative' },
    { parameter: 'pH', value: '6.5', severity: 'normal', referenceRange: '4.5 - 8.0' },
    { parameter: 'Protein', value: 'Negative', severity: 'normal', referenceRange: 'Negative' },
    { parameter: 'Glucose', value: 'Normal', severity: 'normal', referenceRange: 'Normal' },
  ];

  return {
    id: `TEST-${Math.floor(Math.random() * 10000)}`,
    timestamp: new Date().toISOString(),
    results: mockResults,
    summary: "Your results indicate signs of a possible urinary tract infection.",
    recommendation: "Recommend microscopy and urine culture verification. Antibiotic sensitivity test suggested.",
    imageUrl: "https://picsum.photos/600/400?grayscale" // Simulated captured image
  };
};