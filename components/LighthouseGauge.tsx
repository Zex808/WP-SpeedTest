import React from 'react';

interface LighthouseGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const LighthouseGauge: React.FC<LighthouseGaugeProps> = ({ score, size = 'md', label }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  let colorClass = 'text-red-500';
  let bgClass = 'text-red-100';
  if (score >= 50) {
    colorClass = 'text-orange-500';
    bgClass = 'text-orange-100';
  }
  if (score >= 90) {
    colorClass = 'text-green-500';
    bgClass = 'text-green-100';
  }

  const sizeClasses = {
    sm: 'w-16 h-16 text-xl',
    md: 'w-32 h-32 text-4xl',
    lg: 'w-48 h-48 text-6xl',
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`relative flex items-center justify-center ${sizeClasses[size]}`}>
        <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
          <circle
            className={bgClass}
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
          />
          <circle
            className={`${colorClass} transition-all duration-1000 ease-out`}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
          />
        </svg>
        <span className={`absolute font-mono font-medium ${colorClass}`}>
            {score}
        </span>
      </div>
      {label && <span className="mt-2 text-sm font-medium text-gray-600">{label}</span>}
    </div>
  );
};

export default LighthouseGauge;
