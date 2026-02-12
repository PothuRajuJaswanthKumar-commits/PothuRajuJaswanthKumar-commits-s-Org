
import React, { useState, useEffect } from 'react';
import { UserRole, Trend, Transmutation, SystemConfig, Profile } from '../types';
import ScoutMap from './ScoutMap';
import ProductionConsole from './ProductionConsole';
import VibeSlider from './VibeSlider';
import GrowthPulse from './GrowthPulse';
import { Zap, ShieldCheck, CreditCard, Activity } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface DashboardProps {
  role: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
  const [vibe, setVibe] = useState(70);
  const [config, setConfig] = useState<SystemConfig>({
    master_switch: true,
    daily_budget_cap: 100,
    current_daily_spend: 12.45
  });
  
  const [trends] = useState<Trend[]>([
    { id: '1', topic: 'Neuralink Breakthrough', score: 92, velocity: 85, engagement: 78, status: 'greylisted' },
    { id: '2', topic: 'Fusion Ignition Record', score: 88, velocity: 92, engagement: 81, status: 'discovered' },
    { id: '3', topic: 'Starship HLS Update', score: 95, velocity: 98, engagement: 94, status: 'producing' },
    { id: '4', topic: 'Room Temp Superconductors', score: 72, velocity: 45, engagement: 62, status: 'discovered' },
  ]);

  const [userProfile, setUserProfile] = useState<Partial<Profile>>({
    has_claimed_gift: false
  });

  // Budget Percentage for Zone 4
  const budgetUsage = (config.current_daily_spend / config.daily_budget_cap) * 100;

  return (
    <div className="max-w-[1600px] mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            The Alchemist's Console
            {role === 'admin' && (
              <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded-full border border-indigo-500/30 font-mono tracking-tighter uppercase">
                System Master Access
              </span>
            )}
          </h1>
          <p className="text-slate-400 mt-1">Niche: Science & Technology Documentary Engine</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${config.master_switch ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
            <span className="text-xs font-medium text-slate-300">
              {config.master_switch ? 'Scout Online' : 'System Halted'}
            </span>
          </div>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95 flex items-center gap-2">
            <Zap className="w-4 h-4" /> Trigger Scout
          </button>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 grid-rows-none lg:grid-rows-6 gap-6 min-h-[800px]">
        {/* Zone 1: Scout Map */}
        <div className="lg:col-span-8 lg:row-span-4 bg-slate-900 border border-slate-800 rounded-[2rem] p-6 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-lg font-bold text-white uppercase tracking-widest text-xs">Zone 01 // Scout Map</h3>
            <div className="flex gap-2">
              <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400 font-mono">POSTGRES_REALTIME</span>
            </div>
          </div>
          <ScoutMap trends={trends} onTrendAction={(t) => console.log('Action on', t)} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
        </div>

        {/* Zone 2: Production Console */}
        <div className="lg:col-span-4 lg:row-span-3 bg-slate-900 border border-slate-800 rounded-[2rem] p-6 flex flex-col">
          <h3 className="text-lg font-bold text-white uppercase tracking-widest text-xs mb-6">Zone 02 // Production Stage</h3>
          <ProductionConsole tasks={[]} currentRole={role} />
        </div>

        {/* Zone 3: Vibe Slider & Controls */}
        <div className="lg:col-span-4 lg:row-span-3 bg-slate-900 border border-slate-800 rounded-[2rem] p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-widest text-xs mb-6">Zone 03 // Control Center</h3>
            <VibeSlider value={vibe} onChange={setVibe} />
          </div>
          
          <div className="space-y-4 pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium">Circuit Breaker Active</span>
              </div>
              <div 
                onClick={() => role === 'admin' && setConfig({...config, master_switch: !config.master_switch})}
                className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${config.master_switch ? 'bg-emerald-500' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${config.master_switch ? 'right-1' : 'left-1'}`} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400">
                <Activity className="w-4 h-4" />
                <span className="text-sm font-medium">Daily Budget Cap</span>
              </div>
              <span className="text-xs font-mono text-indigo-400">${config.daily_budget_cap}</span>
            </div>
          </div>
        </div>

        {/* Zone 4: Growth Pulse */}
        <div className="lg:col-span-8 lg:row-span-2 bg-slate-900 border border-slate-800 rounded-[2rem] p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white uppercase tracking-widest text-xs">Zone 04 // Growth Pulse</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-indigo-400 text-xs font-bold">
                <CreditCard className="w-3 h-3" /> Spend: ${config.current_daily_spend.toFixed(2)}
              </div>
            </div>
          </div>
          <GrowthPulse usage={budgetUsage} />
        </div>
      </div>
      
      {/* Monetization "Tease" / Gift Logic */}
      {role === 'free_user' && !userProfile.has_claimed_gift && (
        <div className="bg-gradient-to-r from-indigo-900/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 flex items-center justify-between backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-white font-bold">"First Gift" Proof-of-Concept Active</h4>
              <p className="text-slate-400 text-sm">Your next generation will be 1080p, high-bitrate, and watermark-free. Claim it now.</p>
            </div>
          </div>
          <button className="px-6 py-2 bg-white text-slate-950 font-bold rounded-lg hover:bg-slate-200 transition-colors">
            Start Production
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
