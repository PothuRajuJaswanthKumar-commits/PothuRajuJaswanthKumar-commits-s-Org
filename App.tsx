
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import { UserRole } from './types';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>('admin');
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitializing(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-24 h-24 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg animate-pulse"></div>
          </div>
        </div>
        <h1 className="mt-8 text-2xl font-bold text-white tracking-widest uppercase animate-pulse">
          Taskarinchuta <span className="text-indigo-500">v1.0</span>
        </h1>
        <p className="mt-2 text-slate-500 text-sm">Initializing Hybrid Scout & Production Pipeline...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex overflow-hidden">
      <Sidebar activeRole={role} onRoleChange={setRole} />
      <main className="flex-1 relative overflow-y-auto scrollbar-hide p-6 lg:p-8">
        <Dashboard role={role} />
      </main>
    </div>
  );
};

export default App;
