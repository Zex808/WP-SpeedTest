import React, { useState } from 'react';
import InputForm from './components/InputForm';
import AuditDashboard from './components/AuditDashboard';
import { generateSpeedPlan } from './services/gemini';
import { SpeedAuditPlan } from './types';

const App: React.FC = () => {
  const [plan, setPlan] = useState<SpeedAuditPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (url: string, hosting: string, details: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateSpeedPlan(url, hosting, details);
      setPlan(result);
    } catch (err) {
      setError("Failed to generate the optimization plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPlan(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20 font-sans text-gray-900">
      {/* PSI-like Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center text-white shadow-sm">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
            <div>
                <h1 className="text-lg font-bold text-gray-800 leading-tight">WPSpeedAI</h1>
                <p className="text-xs text-gray-500">Elementor Optimization Specialist</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 mt-10">
        
        {/* Intro Hero */}
        {!plan && !loading && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Make your Elementor site <span className="text-primary">blazing fast</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get a tailored checklist of plugins, hosting tweaks, and code changes to boost your PageSpeed score.
            </p>
          </div>
        )}

        {/* Error Banner */}
        {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-md shadow-sm">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                </div>
            </div>
        )}

        {/* Dynamic Content */}
        {plan ? (
          <AuditDashboard plan={plan} onReset={handleReset} />
        ) : (
          <InputForm onSubmit={handleAnalyze} isLoading={loading} />
        )}

        {/* Footer info */}
        <div className="mt-20 text-center border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500 mb-2">Designed for</p>
            <div className="flex justify-center gap-4 text-gray-400 grayscale opacity-70">
                 {/* Simple text representation for brands */}
                 <span className="font-bold">WordPress</span>
                 <span className="mx-2">•</span>
                 <span className="font-bold">Elementor</span>
                 <span className="mx-2">•</span>
                 <span className="font-bold">Lighthouse</span>
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;
