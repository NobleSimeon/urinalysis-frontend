import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { AppStep, UserRole, DeviceState, FullAnalysis } from '../types';
import { mockScanForDevice, mockCaptureAndAnalyze } from '../services/deviceService';

interface DeviceContextType extends DeviceState {
  startScanning: () => Promise<void>;
  setRole: (role: UserRole) => void;
  startCameraFlow: () => void;
  captureImage: () => Promise<void>;
  resetFlow: () => void;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

// Fix: Make children optional in props type definition
export const DeviceProvider = ({ children }: { children?: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [step, setStep] = useState<AppStep>(AppStep.DISCOVERY);
  const [role, setUserRole] = useState<UserRole>(UserRole.UNSELECTED);
  const [lastAnalysis, setLastAnalysis] = useState<FullAnalysis | null>(null);

  const startScanning = useCallback(async () => {
    setIsScanning(true);
    try {
      const success = await mockScanForDevice();
      if (success) {
        setIsConnected(true);
        setStep(AppStep.CONNECTION_SUCCESS);
        
        // Auto-transition after success toast
        setTimeout(() => {
          setStep(AppStep.ROLE_SELECTION);
        }, 2000);
      }
    } catch (error) {
      console.error("Scanning failed", error);
    } finally {
      setIsScanning(false);
    }
  }, []);

  const setRole = useCallback((newRole: UserRole) => {
    setUserRole(newRole);
    setStep(AppStep.CAMERA_CALIBRATION);
  }, []);

  const startCameraFlow = useCallback(() => {
    setStep(AppStep.CAMERA_CALIBRATION);
  }, []);

  const captureImage = useCallback(async () => {
    setStep(AppStep.PROCESSING);
    try {
      const data = await mockCaptureAndAnalyze();
      setLastAnalysis(data);
      setStep(AppStep.RESULTS);
    } catch (error) {
      console.error("Analysis failed", error);
      // Handle error state here in a real app
      setStep(AppStep.CAMERA_CALIBRATION);
    }
  }, []);

  const resetFlow = useCallback(() => {
    setStep(AppStep.DISCOVERY);
    setIsConnected(false);
    setUserRole(UserRole.UNSELECTED);
    setLastAnalysis(null);
  }, []);

  return (
    <DeviceContext.Provider
      value={{
        isConnected,
        isScanning,
        step,
        role,
        lastAnalysis,
        startScanning,
        setRole,
        startCameraFlow,
        captureImage,
        resetFlow
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
};