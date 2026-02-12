
import React from 'react';
import { Clock } from 'lucide-react';

interface VibeSliderProps {
  value: number;
  onChange: (val: number) => void;
}

const VibeSlider: React.FC<VibeSliderProps> = ({ value, onChange }) => {
  const getLabel = (v: number) => {
    if (v < 30) return 'Conservative';
    if (v < 70) return 'Standard';
    return 'Aggressive (Gold Mode)';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Scout Frequency</div>
          <div className="text-xl font-bold text-white">{value}% Intensity</div>
        </div>
        <div className="text-right">
          <div className={`text-xs font-bold uppercase ${value > 70 ? 'text-indigo-400' : 'text-slate-400'}`}>
            {getLabel(value)}
          </div>
        </div>
      </div>

      <div className="relative h-12 flex items-center">
        {/* Track */}
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="h-2 w-full bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-800 to-indigo-500 transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
        
        {/* Ticks */}
        <div className="absolute inset-x-0 bottom-0 flex justify-between px-1 pointer-events-none">
          {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(t => (
            <div key={t} className={`w-0.5 h-1.5 ${value >= t ? 'bg-indigo-500' : 'bg-slate-800'} rounded-full transition-colors`} />
          ))}
        </div>

        {/* Input */}
        <input 
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
        />
      </div>

      <div className="bg-slate-950/50 rounded-xl p-4 flex items-center gap-4 border border-slate-800/50">
        <Clock className="w-5 h-5 text-indigo-500" />
        <div>
          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Polling Interval</div>
          <div className="text-xs font-mono text-slate-300">Every {Math.max(1, Math.floor(24 / (value / 20 || 1)))} hours</div>
        </div>
      </div>
    </div>
  );
};

export default VibeSlider;
