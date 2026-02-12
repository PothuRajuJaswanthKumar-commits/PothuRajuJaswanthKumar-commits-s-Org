
import React from 'react';
import { UserRole, ProductionTask } from '../types';
import { Play, Layers, Timer, CheckCircle2, ChevronRight } from 'lucide-react';

interface ProductionConsoleProps {
  tasks: ProductionTask[];
  currentRole: UserRole;
}

const ProductionConsole: React.FC<ProductionConsoleProps> = ({ currentRole }) => {
  const mockTasks = [
    { id: '1', topic: 'Neuralink Update', stage: 'Visuals', progress: 65 },
    { id: '2', topic: 'Fusion Milestone', stage: 'Voiceover', progress: 32 },
  ];

  return (
    <div className="flex-1 flex flex-col gap-6">
      {/* Preview Stage */}
      <div className="aspect-video bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center relative group overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/40 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-950 shadow-2xl scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-8 h-8 fill-current translate-x-1" />
          </button>
          <span className="text-white text-xs font-bold tracking-widest uppercase">Preview Active Build</span>
        </div>
        
        <div className="text-center p-8 space-y-2">
          <Layers className="w-12 h-12 text-slate-700 mx-auto mb-4" />
          <p className="text-slate-500 text-sm font-medium">No clip currently selected for staging</p>
        </div>
        
        {/* Dynamic Timing Indicators */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-3 bg-slate-800 rounded-full" />)}
          </div>
          <span className="text-[10px] font-mono text-slate-600">00:00:00:00</span>
        </div>
      </div>

      {/* Task Queue */}
      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between px-2">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Pipeline</h4>
          <Timer className="w-3 h-3 text-slate-500" />
        </div>
        
        {mockTasks.map((task) => (
          <div key={task.id} className="bg-slate-800/40 border border-slate-800 p-3 rounded-xl hover:border-slate-700 transition-colors group">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{task.topic}</span>
              <span className="text-[10px] font-mono text-indigo-400">{task.progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 rounded-full transition-all duration-500" 
                style={{ width: `${task.progress}%` }} 
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase">{task.stage}</span>
              <div className="flex gap-1">
                <CheckCircle2 className="w-3 h-3 text-slate-700" />
                <CheckCircle2 className="w-3 h-3 text-slate-700" />
                <div className="w-3 h-3 rounded-full border border-slate-700 animate-pulse" />
              </div>
            </div>
          </div>
        ))}

        <button className="w-full py-3 border border-dashed border-slate-800 rounded-xl text-slate-600 text-[10px] font-bold uppercase tracking-widest hover:border-slate-700 hover:text-slate-500 transition-all">
          View Master Queue <ChevronRight className="inline w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default ProductionConsole;
