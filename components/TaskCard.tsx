import React, { useState } from 'react';
import { OptimizationTask } from '../types';

interface TaskCardProps {
  task: OptimizationTask;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  const [expanded, setExpanded] = useState(false);

  const difficultyColor = {
    'Easy': 'bg-green-100 text-green-800 border-green-200',
    'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Hard': 'bg-red-100 text-red-800 border-red-200',
  };

  const impactColor = {
      'High': 'text-red-600',
      'Medium': 'text-orange-500',
      'Low': 'text-gray-500'
  }

  const categoryIcon = {
      'Plugin': '🔌',
      'Hosting': '☁️',
      'Code': '👨‍💻',
      'Configuration': '⚙️'
  }

  return (
    <div className={`bg-white rounded-lg border transition-all duration-300 overflow-hidden ${expanded ? 'shadow-md border-primary ring-1 ring-primary' : 'shadow-sm border-gray-200 hover:border-gray-300'}`}>
      <div 
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4 flex-1">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center font-mono text-sm text-gray-500 border border-gray-200">
                {index + 1}
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold text-gray-800">{task.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${difficultyColor[task.difficulty]}`}>
                        {task.difficulty}
                    </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded">
                        {categoryIcon[task.category]} {task.category}
                    </span>
                    <span className="flex items-center gap-1">
                        Impact: <span className={`font-bold ${impactColor[task.impact]}`}>{task.impact}</span>
                    </span>
                </div>
            </div>
        </div>
        <div className="ml-4 text-gray-400">
            <svg className={`w-5 h-5 transform transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-6 pt-0 border-t border-gray-100 bg-gray-50/50">
            <div className="mt-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Instructions</h4>
                <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap font-medium">
                    {task.instructions}
                </div>
            </div>

            {task.tools && task.tools.length > 0 && (
                <div className="mt-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Recommended Tools</h4>
                    <div className="flex flex-wrap gap-2">
                        {task.tools.map((tool, i) => (
                            <span key={i} className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-indigo-600 font-medium shadow-sm">
                                {tool}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
