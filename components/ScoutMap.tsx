
import React, { useMemo } from 'react';
import { Trend } from '../types';

interface ScoutMapProps {
  trends: Trend[];
  onTrendAction: (trend: Trend) => void;
}

const ScoutMap: React.FC<ScoutMapProps> = ({ trends }) => {
  // Mock node positions for force-directed look
  const nodes = useMemo(() => trends.map((t, i) => ({
    ...t,
    x: 100 + Math.random() * 600,
    y: 100 + Math.random() * 300,
    r: 20 + (t.score / 100) * 40
  })), [trends]);

  return (
    <div className="w-full h-full relative min-h-[400px]">
      <svg className="w-full h-full" viewBox="0 0 800 500">
        {/* Connection lines */}
        {nodes.map((n, i) => (
          nodes.slice(i + 1).map((m, j) => (
            <line
              key={`${i}-${j}`}
              x1={n.x} y1={n.y} x2={m.x} y2={m.y}
              stroke="rgba(99, 102, 241, 0.15)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))
        ))}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id} className="cursor-pointer group/node">
            <defs>
              <radialGradient id={`grad-${node.id}`}>
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle
              cx={node.x} cy={node.y} r={node.r * 1.5}
              fill={`url(#grad-${node.id})`}
              className="animate-pulse"
            />
            <circle
              cx={node.x} cy={node.y} r={node.r}
              fill="#0f172a"
              stroke={node.status === 'producing' ? '#10b981' : '#6366f1'}
              strokeWidth="2"
              className="transition-transform duration-300 group-hover/node:scale-110"
            />
            <text
              x={node.x} y={node.y + node.r + 20}
              textAnchor="middle"
              fill="white"
              className="text-[10px] font-bold uppercase tracking-tighter"
            >
              {node.topic}
            </text>
            <text
              x={node.x} y={node.y + 4}
              textAnchor="middle"
              fill="#6366f1"
              className="text-[10px] font-black"
            >
              {node.score}%
            </text>
          </g>
        ))}
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-indigo-500" /> Discovered
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-emerald-500" /> Producing
        </div>
      </div>
    </div>
  );
};

export default ScoutMap;
