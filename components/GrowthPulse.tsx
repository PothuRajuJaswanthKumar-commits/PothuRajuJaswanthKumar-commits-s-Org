
import React from 'react';

interface GrowthPulseProps {
  usage?: number;
}

const GrowthPulse: React.FC<GrowthPulseProps> = ({ usage = 0 }) => {
  // Generate a random wavy path for the graph
  const points = [40, 60, 45, 80, 70, 90, 85, 110, 100, 140, 130, 160];
  const max = Math.max(...points);
  const pathData = points.map((p, i) => `${i * 60},${150 - (p / max) * 120}`).join(' L ');
  const areaData = `${pathData} L ${660},150 L 0,150 Z`;

  return (
    <div className="w-full h-full flex items-center justify-between gap-8">
      {/* Mini Stats */}
      <div className="flex flex-col gap-4">
        {[
          { label: 'Total Views', val: '2.4M', up: '+12%' },
          { label: 'Retention', val: '68%', up: '+4%' },
          { label: 'CPM (Est.)', val: '$8.42', up: '+2%' },
        ].map((s, idx) => (
          <div key={idx}>
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{s.label}</div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-white">{s.val}</span>
              <span className="text-[10px] text-emerald-400 font-bold">{s.up}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="flex-1 h-32 relative">
        <svg className="w-full h-full" viewBox="0 0 660 150" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`M 0,${150 - (points[0]/max)*120} L ${pathData}`}
            fill="none"
            stroke="#6366f1"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d={`M 0,${150 - (points[0]/max)*120} L ${areaData}`}
            fill="url(#chartGrad)"
          />
          {/* Vertical Grid lines */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
            <line key={i} x1={i * 66} y1="0" x2={i * 66} y2="150" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          ))}
        </svg>
      </div>

      {/* Target Meter (Budget Usage) */}
      <div className="w-32 flex flex-col items-center">
        <div className="relative w-20 h-20">
          <svg className="w-full h-full -rotate-90">
            <circle cx="40" cy="40" r="35" stroke="#1e293b" strokeWidth="8" fill="none" />
            <circle 
              cx="40" cy="40" r="35" stroke={usage > 90 ? '#f43f5e' : '#6366f1'} strokeWidth="8" fill="none" 
              strokeDasharray="220" strokeDashoffset={220 - (220 * usage / 100)} strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-xs font-black text-white">{Math.round(usage)}%</span>
          </div>
        </div>
        <span className="text-[10px] text-slate-500 font-bold uppercase mt-2 tracking-tighter text-center">Budget Utilized</span>
      </div>
    </div>
  );
};

export default GrowthPulse;
