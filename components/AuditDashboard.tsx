import React, { useState } from 'react';
import { SpeedAuditPlan } from '../types';
import TaskCard from './TaskCard';
import LighthouseGauge from './LighthouseGauge';
import LighthouseComparison from './LighthouseComparison';

interface AuditDashboardProps {
  plan: SpeedAuditPlan;
  onReset: () => void;
}

const AuditDashboard: React.FC<AuditDashboardProps> = ({ plan, onReset }) => {
  const [activeTab, setActiveTab] = useState<'plan' | 'compare'>('plan');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 w-full md:w-auto">
            <LighthouseGauge score={plan.estimatedCurrentScore} size="sm" />
            <div>
                <h2 className="text-xl font-bold text-gray-900">{plan.siteUrl}</h2>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded">Elementor Site</span>
                    <span className="text-xs text-gray-500">Estimated Baseline</span>
                </div>
            </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
            <button 
                onClick={() => setActiveTab('plan')}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg font-medium text-sm transition ${activeTab === 'plan' ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
                Optimization Plan
            </button>
            <button 
                onClick={() => setActiveTab('compare')}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg font-medium text-sm transition ${activeTab === 'compare' ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
                Verify Results
            </button>
        </div>
      </div>

      {activeTab === 'plan' ? (
          <div className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl">
                <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                    <span className="text-xl">🤖</span> AI Analysis Summary
                </h3>
                <p className="text-indigo-800 leading-relaxed">{plan.summary}</p>
            </div>

            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Implementation Guide</h3>
                    <span className="text-sm text-gray-500">{plan.tasks.length} tasks identified</span>
                </div>
                <div className="space-y-3">
                    {plan.tasks.map((task, index) => (
                        <TaskCard key={index} task={task} index={index} />
                    ))}
                </div>
            </div>
          </div>
      ) : (
          <LighthouseComparison beforeScore={plan.estimatedCurrentScore} siteUrl={plan.siteUrl} />
      )}
      
      <div className="flex justify-center pt-8 border-t border-gray-200">
        <button
            onClick={onReset}
            className="text-gray-500 hover:text-gray-800 font-medium flex items-center gap-2 transition"
        >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Analyze Another Site
        </button>
      </div>
    </div>
  );
};

export default AuditDashboard;
