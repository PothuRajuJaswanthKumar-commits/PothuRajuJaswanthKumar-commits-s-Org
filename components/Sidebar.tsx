
import React from 'react';
import { UserRole } from '../types';
import { 
  LayoutDashboard, 
  Search, 
  Video, 
  Settings, 
  Shield, 
  Crown, 
  Gift,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeRole, onRoleChange }) => {
  const roles: { id: UserRole; icon: any; label: string }[] = [
    { id: 'admin', icon: Crown, label: 'Super Admin' },
    { id: 'subscriber', icon: Shield, label: 'Subscriber' },
    { id: 'free_user', icon: Gift, label: 'Free Tier' },
  ];

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Search, label: 'The Scout' },
    { icon: Video, label: 'Factory' },
    { icon: Settings, label: 'System Prefs' },
  ];

  return (
    <aside className="w-20 lg:w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-50 transition-all duration-300">
      {/* Brand */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/30">
          <span className="text-white font-black text-xl">T</span>
        </div>
        <span className="hidden lg:block font-bold text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          TASKARINCHUTA
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all
              ${item.active ? 'bg-indigo-600/10 text-indigo-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}
          >
            <item.icon className="w-5 h-5" />
            <span className="hidden lg:block font-semibold text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Role Switcher */}
      <div className="p-4 border-t border-slate-800">
        <div className="hidden lg:block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4">
          Identity Switcher
        </div>
        <div className="space-y-2">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => onRoleChange(r.id)}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-all
                ${activeRole === r.id ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-800/30'}`}
            >
              <div className="flex items-center gap-3">
                <r.icon className={`w-4 h-4 ${activeRole === r.id ? 'text-indigo-400' : 'text-slate-600'}`} />
                <span className="hidden lg:block text-xs font-bold">{r.label}</span>
              </div>
              {activeRole === r.id && <ChevronRight className="hidden lg:block w-3 h-3" />}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
