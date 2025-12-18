import React, { useState } from 'react';
import LighthouseGauge from './LighthouseGauge';
import { LighthouseResult, CoreWebVitals } from '../types';

interface LighthouseComparisonProps {
  beforeScore?: number;
  siteUrl: string;
}

const MetricCard: React.FC<{ label: string; value: string; status: 'good' | 'needs-improvement' | 'poor' }> = ({ label, value, status }) => {
    const colors = {
        'good': 'border-l-green-500 text-green-700 bg-green-50',
        'needs-improvement': 'border-l-orange-500 text-orange-700 bg-orange-50',
        'poor': 'border-l-red-500 text-red-700 bg-red-50'
    };
    
    // Icon based on status
    const icons = {
        'good': '●', // circle
        'needs-improvement': '■', // square
        'poor': '▲' // triangle
    }

    return (
        <div className={`p-3 border-l-4 rounded-r flex justify-between items-center ${colors[status]}`}>
            <span className="text-xs font-bold uppercase tracking-wide opacity-75">{label}</span>
            <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-lg">{value}</span>
                <span className="text-xs">{icons[status]}</span>
            </div>
        </div>
    );
};

const LighthouseComparison: React.FC<LighthouseComparisonProps> = ({ beforeScore = 45, siteUrl }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [result, setResult] = useState<LighthouseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleProcessJson = () => {
    try {
        if (!jsonInput.trim()) {
            setError("Please paste the JSON content.");
            return;
        }

        const data = JSON.parse(jsonInput);
        
        // Extracting data from standard Lighthouse JSON structure v8/v9/v10
        const categories = data.categories || {};
        const audits = data.audits || {};

        const perfScore = categories.performance ? Math.round(categories.performance.score * 100) : 0;
        
        const metrics: CoreWebVitals = {
            fcp: audits['first-contentful-paint']?.displayValue || 'N/A',
            lcp: audits['largest-contentful-paint']?.displayValue || 'N/A',
            tbt: audits['total-blocking-time']?.displayValue || 'N/A',
            cls: audits['cumulative-layout-shift']?.displayValue || 'N/A',
            si: audits['speed-index']?.displayValue || 'N/A',
        };

        setResult({
            score: perfScore,
            metrics,
            timestamp: new Date().toLocaleTimeString()
        });
        setError(null);
    } catch (e) {
        setError("Invalid JSON format. Please copy the entire JSON from PageSpeed Insights or Lighthouse.");
    }
  };

  const getStatus = (val: string, type: 'lcp' | 'cls' | 'tbt'): 'good' | 'needs-improvement' | 'poor' => {
      // Simplified logic for demo purposes
      if (val === 'N/A') return 'good';
      const num = parseFloat(val.replace(/[^\d.]/g, ''));
      
      if (type === 'lcp') return num < 2.5 ? 'good' : num < 4.0 ? 'needs-improvement' : 'poor';
      if (type === 'cls') return num < 0.1 ? 'good' : num < 0.25 ? 'needs-improvement' : 'poor';
      if (type === 'tbt') return num < 200 ? 'good' : num < 600 ? 'needs-improvement' : 'poor';
      return 'good';
  };

  return (
    <div className="bg-gray-50 border-t border-gray-200 mt-12 p-8 rounded-xl">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Result Verification</h3>
      
      {!result ? (
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-600 mb-4 text-center">
                After applying the fixes, run a Lighthouse test (or use PageSpeed Insights), download the JSON report, and paste it below to generate a comparison.
            </p>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <textarea 
                    className="w-full h-40 p-3 text-xs font-mono border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none"
                    placeholder='Paste Lighthouse JSON here... {"categories": { "performance": ... } }'
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                ></textarea>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <button 
                    onClick={handleProcessJson}
                    className="w-full mt-4 bg-dark text-white font-semibold py-2 rounded hover:bg-black transition"
                >
                    Generate Comparison Report
                </button>
            </div>
          </div>
      ) : (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Before */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center opacity-70 scale-95">
                    <h4 className="text-gray-500 font-bold mb-4 uppercase tracking-wider">Before Optimization</h4>
                    <LighthouseGauge score={beforeScore} size="md" />
                    <p className="mt-4 text-sm text-gray-400">Estimated Initial Score</p>
                </div>

                {/* After */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center transform scale-105 ring-4 ring-green-50 relative">
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">LATEST RUN</div>
                    <h4 className="text-gray-800 font-bold mb-4 uppercase tracking-wider">After Optimization</h4>
                    <LighthouseGauge score={result.score} size="md" />
                    <div className="grid grid-cols-2 gap-3 w-full mt-6">
                        <MetricCard label="LCP" value={result.metrics.lcp} status={getStatus(result.metrics.lcp, 'lcp')} />
                        <MetricCard label="TBT" value={result.metrics.tbt} status={getStatus(result.metrics.tbt, 'tbt')} />
                        <MetricCard label="CLS" value={result.metrics.cls} status={getStatus(result.metrics.cls, 'cls')} />
                        <MetricCard label="SI" value={result.metrics.si} status={'good'} />
                    </div>
                </div>
            </div>
            
            <div className="text-center">
                 <button 
                    onClick={() => { setResult(null); setJsonInput(''); }}
                    className="text-primary hover:text-indigo-800 text-sm font-medium underline"
                 >
                    Upload a different report
                 </button>
            </div>
          </div>
      )}
    </div>
  );
};

export default LighthouseComparison;
