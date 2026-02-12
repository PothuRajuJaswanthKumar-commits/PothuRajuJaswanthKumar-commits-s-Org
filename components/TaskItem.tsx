
import React from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

interface TaskItemProps {
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'waiting';
  step: number;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, description, status, step }) => {
  return (
    <div className="flex gap-4 group">
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors
          ${status === 'completed' ? 'bg-emerald-500 border-emerald-500' : 
            status === 'pending' ? 'bg-indigo-500/10 border-indigo-500 animate-pulse' : 
            'bg-slate-800 border-slate-700 group-hover:border-slate-600'}`}>
          {status === 'completed' ? (
            <CheckCircle2 className="w-5 h-5 text-white" />
          ) : status === 'pending' ? (
            <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
          ) : (
            <span className="text-xs font-bold text-slate-500">{step}</span>
          )}
        </div>
        <div className="w-0.5 flex-1 bg-slate-800 my-1 group-last:hidden" />
      </div>
      <div className="pb-6">
        <h4 className={`font-semibold text-sm ${status === 'waiting' ? 'text-slate-400' : 'text-white'}`}>
          {title}
        </h4>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default TaskItem;
