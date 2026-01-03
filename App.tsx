import React, { useEffect, useState } from 'react';
import { 
  Wifi, 
  Activity, 
  User, 
  Stethoscope, 
  Camera, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight, 
  ArrowLeft,
  Share2,
  RefreshCcw,
  FileText
} from 'lucide-react';
import { DeviceProvider, useDevice } from './contexts/DeviceContext';
import { Button, Card, Container, Header } from './components/UIComponents';
import { AppStep, UserRole } from './types';

// --- Screen 1: Discovery ---
const ScreenDiscovery = () => {
  const { startScanning, isScanning } = useDevice();

  return (
    <Container className="justify-center items-center px-6">
      <div className="text-center mb-12 animate-fade-in">
        <div className={`w-32 h-32 mx-auto bg-med-50 rounded-full flex items-center justify-center mb-8 relative`}>
          {isScanning && (
            <div className="absolute inset-0 bg-med-400 rounded-full opacity-20 animate-ping"></div>
          )}
          <Wifi className={`w-12 h-12 ${isScanning ? 'text-med-600' : 'text-slate-400'}`} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Connect to Device</h2>
        <p className="text-slate-500 max-w-xs mx-auto">
          Ensure your UroScan Hub is powered on and within range.
        </p>
      </div>

      <div className="w-full animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <Button 
          fullWidth 
          onClick={startScanning} 
          isLoading={isScanning}
          icon={Wifi}
        >
          {isScanning ? 'Scanning nearby...' : 'Scan for Device'}
        </Button>
      </div>
    </Container>
  );
};

// --- Screen 2: Connection Success ---
const ScreenConnectionSuccess = () => {
  return (
    <Container className="justify-center items-center bg-med-600 px-6">
      <div className="text-center animate-fade-in">
        <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-xl">
          <CheckCircle className="w-12 h-12 text-med-600" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Connected!</h2>
        <p className="text-med-100">Paired with Charging Hub #402</p>
      </div>
    </Container>
  );
};

// --- Screen 3: Role Selection ---
const ScreenRoleSelection = () => {
  const { setRole } = useDevice();

  return (
    <Container>
      <Header title="Start Diagnosis" subtitle="Step 1 of 3" />
      <div className="flex-1 px-6 py-8 flex flex-col justify-center space-y-6 animate-slide-up">
        <div className="mb-2">
          <h3 className="text-xl font-semibold text-slate-800">Who is performing this test?</h3>
          <p className="text-slate-500 mt-2">We adapt the results based on your expertise.</p>
        </div>

        <Card 
          onClick={() => setRole(UserRole.PATIENT)} 
          className="group hover:border-med-500 hover:shadow-med-100/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-med-50 group-hover:text-med-600 transition-colors">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Non-Medical User</h4>
                <p className="text-sm text-slate-500">Simple, actionable results</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-med-500" />
          </div>
        </Card>

        <Card 
          onClick={() => setRole(UserRole.MEDICAL)}
          className="group hover:border-med-500 hover:shadow-med-100/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-med-50 group-hover:text-med-600 transition-colors">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Medical Personnel</h4>
                <p className="text-sm text-slate-500">Detailed technical analysis</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-med-500" />
          </div>
        </Card>
      </div>
    </Container>
  );
};

// --- Screen 4: Calibration & Camera ---
const ScreenCamera = () => {
  const { captureImage } = useDevice();
  
  return (
    <Container className="bg-black">
      {/* Overlay UI */}
      <div className="absolute top-0 left-0 w-full p-4 z-20 flex justify-between items-start text-white/90">
        <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/10">
          Live Feed • 1080p
        </div>
        <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/10">
          Calibrating...
        </div>
      </div>

      {/* Simulated Camera Feed */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        <img 
          src="https://placehold.co/600x900/1e293b/475569?text=Live+Camera+Feed" 
          alt="Camera Feed" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        
        {/* Guide Box */}
        <div className="relative z-10 w-64 h-80 border-2 border-white/50 rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-med-400 -mt-0.5 -ml-0.5 rounded-tl-sm"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-med-400 -mt-0.5 -mr-0.5 rounded-tr-sm"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-med-400 -mb-0.5 -ml-0.5 rounded-bl-sm"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-med-400 -mb-0.5 -mr-0.5 rounded-br-sm"></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/80 text-center text-sm font-medium px-4">
              Align test strip within the frame
            </p>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="p-6 bg-slate-900 pb-10 z-20 rounded-t-3xl -mt-6 relative">
        <Button 
          fullWidth 
          variant="primary" 
          onClick={captureImage}
          className="bg-white text-med-700 hover:bg-slate-100 shadow-none"
          icon={Camera}
        >
          Capture & Analyze
        </Button>
      </div>
    </Container>
  );
};

// --- Screen 5: Processing ---
const ScreenProcessing = () => (
  <Container className="justify-center items-center px-6">
    <div className="text-center animate-pulse">
      <div className="w-20 h-20 mx-auto border-4 border-med-100 border-t-med-600 rounded-full animate-spin mb-8"></div>
      <h2 className="text-xl font-bold text-slate-800">Analyzing Sample...</h2>
      <p className="text-slate-500 mt-2">Checking reagent color changes</p>
    </div>
  </Container>
);

// --- Screen 6: Results ---
const ScreenResults = () => {
  const { role, lastAnalysis, resetFlow } = useDevice();
  
  if (!lastAnalysis) return null;

  const isMedical = role === UserRole.MEDICAL;
  const criticalCount = lastAnalysis.results.filter(r => r.severity !== 'normal').length;

  return (
    <Container className="bg-slate-50">
      <Header 
        title="Analysis Report" 
        subtitle={lastAnalysis.timestamp.split('T')[0]} 
        leftIcon={
          <button onClick={resetFlow} className="p-2 -ml-2 rounded-full hover:bg-slate-100">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
        }
      />
      
      <div className="flex-1 overflow-y-auto pb-8 animate-slide-up">
        {/* Status Banner */}
        <div className={`px-6 py-6 ${criticalCount > 0 ? 'bg-amber-50' : 'bg-med-50'}`}>
          <div className="flex items-start space-x-3">
            {criticalCount > 0 ? (
              <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="w-6 h-6 text-med-600 shrink-0 mt-0.5" />
            )}
            <div>
              <h3 className={`font-bold ${criticalCount > 0 ? 'text-amber-800' : 'text-med-800'}`}>
                {criticalCount > 0 ? 'Attention Required' : 'Results Normal'}
              </h3>
              <p className={`text-sm mt-1 leading-relaxed ${criticalCount > 0 ? 'text-amber-700' : 'text-med-700'}`}>
                {isMedical ? lastAnalysis.recommendation : lastAnalysis.summary}
              </p>
            </div>
          </div>
        </div>

        {/* Results List */}
        <div className="p-6 space-y-4">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            {isMedical ? 'Detailed Parameters' : 'Health Indicators'}
          </h4>

          {lastAnalysis.results.map((result, idx) => (
            <Card key={idx} className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-10 rounded-full ${
                  result.severity === 'critical' ? 'bg-red-500' : 
                  result.severity === 'warning' ? 'bg-amber-400' : 'bg-med-400'
                }`}></div>
                <div>
                  <p className="font-semibold text-slate-800">{result.parameter}</p>
                  {isMedical && (
                    <p className="text-xs text-slate-400">Ref: {result.referenceRange}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${
                  result.severity === 'critical' ? 'text-red-600' : 
                  result.severity === 'warning' ? 'text-amber-600' : 'text-med-600'
                }`}>
                  {result.value}
                </p>
              </div>
            </Card>
          ))}
          
          {/* Medical Only: Reference Image */}
          {isMedical && (
            <div className="mt-8">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Reference Check</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-500">Captured</p>
                  <img src={lastAnalysis.imageUrl} className="w-full h-32 object-cover rounded-lg border border-slate-200" alt="Sample" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-500">Standard Chart</p>
                  <div className="w-full h-32 bg-gradient-to-br from-red-200 via-yellow-200 to-green-200 rounded-lg border border-slate-200 flex items-center justify-center">
                    <span className="text-xs text-slate-500 font-medium">Ref Chart</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Bar */}
      <div className="p-6 bg-white border-t border-slate-100 sticky bottom-0 z-10 pb-8">
        {isMedical ? (
          <div className="grid grid-cols-2 gap-4">
            <Button variant="secondary" icon={FileText} onClick={() => alert('Exporting PDF...')}>Export PDF</Button>
            <Button onClick={resetFlow} icon={RefreshCcw}>New Test</Button>
          </div>
        ) : (
          <Button fullWidth onClick={() => alert('Report sent to your provider.')} icon={Share2}>
            Send Report to My Doctor
          </Button>
        )}
      </div>
    </Container>
  );
};

// --- Main App Component ---
const AppContent = () => {
  const { step } = useDevice();

  switch (step) {
    case AppStep.DISCOVERY:
      return <ScreenDiscovery />;
    case AppStep.CONNECTION_SUCCESS:
      return <ScreenConnectionSuccess />;
    case AppStep.ROLE_SELECTION:
      return <ScreenRoleSelection />;
    case AppStep.CAMERA_CALIBRATION:
      return <ScreenCamera />;
    case AppStep.PROCESSING:
      return <ScreenProcessing />;
    case AppStep.RESULTS:
      return <ScreenResults />;
    default:
      return <ScreenDiscovery />;
  }
};

function App() {
  return (
    <DeviceProvider>
      <AppContent />
    </DeviceProvider>
  );
}

export default App;