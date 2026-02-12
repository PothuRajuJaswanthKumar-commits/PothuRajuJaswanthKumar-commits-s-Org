
import React from 'react';

interface StatusCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: 'indigo' | 'blue' | 'sky' | 'emerald';
}

const StatusCard: React.FC<StatusCardProps> = ({ icon, label, value, color }) => {
  const colorClasses = {
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    sky: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };

  return (
    <div className={`px-4 py-3 rounded-xl border ${colorClasses[color]} flex items-center gap-3`}>
      {icon}
      <div>
        <div className="text-[10px] uppercase tracking-wider font-bold opacity-60 leading-none mb-1">
          {label}
        </div>
        <div className="text-sm font-semibold leading-none">{value}</div>
      </div>
    </div>
  );
};

export default StatusCard;
