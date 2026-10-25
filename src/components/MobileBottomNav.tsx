'use client';

import { Sprout, TrendingUp, CloudSun, FlaskConical, Camera } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'overview' | 'seed' | 'mandi' | 'soil' | 'weather' | 'seasonal' | 'roi';
  onTabChange: (tab: 'overview' | 'seed' | 'mandi' | 'soil' | 'weather' | 'seasonal' | 'roi') => void;
  onOpenSoilScanner: () => void;
}

export function MobileBottomNav({
  activeTab,
  onTabChange,
  onOpenSoilScanner,
}: MobileBottomNavProps) {
  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-stone-950/95 backdrop-blur-xl border-t border-stone-800 shadow-2xl pb-[env(safe-area-inset-bottom,0.5rem)] pt-1.5 transition-all"
    >
      <div className="max-w-md mx-auto px-3 flex items-center justify-around">
        {/* 1. Overview */}
        <button
          onClick={() => {
            onTabChange('overview');
            window.scrollTo({ top: 380, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all cursor-pointer min-w-[56px] min-h-[48px] ${
            activeTab === 'overview'
              ? 'text-emerald-400 font-extrabold'
              : 'text-stone-400 hover:text-stone-200 font-medium'
          }`}
        >
          <div
            className={`p-1 rounded-lg transition-transform ${
              activeTab === 'overview' ? 'scale-110 bg-emerald-500/20' : ''
            }`}
          >
            <Sprout className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Overview</span>
        </button>

        {/* 2. Mandi */}
        <button
          onClick={() => {
            onTabChange('mandi');
            window.scrollTo({ top: 420, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all cursor-pointer min-w-[56px] min-h-[48px] ${
            activeTab === 'mandi'
              ? 'text-emerald-400 font-extrabold'
              : 'text-stone-400 hover:text-stone-200 font-medium'
          }`}
        >
          <div
            className={`p-1 rounded-lg transition-transform ${
              activeTab === 'mandi' ? 'scale-110 bg-emerald-500/20' : ''
            }`}
          >
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Mandi</span>
        </button>

        {/* 3. Center Action: AI Soil Camera Scanner */}
        <div className="relative -top-4 flex flex-col items-center">
          <button
            onClick={onOpenSoilScanner}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-green-400 text-stone-950 flex items-center justify-center shadow-xl shadow-emerald-500/40 ring-4 ring-stone-950 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Scan Soil Photo with AI"
          >
            <Camera className="w-6 h-6 stroke-[2.5]" />
          </button>
          <span className="text-[10px] font-black text-emerald-400 tracking-tight mt-0.5">
            Scan Soil
          </span>
        </div>

        {/* 4. Weather */}
        <button
          onClick={() => {
            onTabChange('weather');
            window.scrollTo({ top: 420, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all cursor-pointer min-w-[56px] min-h-[48px] ${
            activeTab === 'weather'
              ? 'text-emerald-400 font-extrabold'
              : 'text-stone-400 hover:text-stone-200 font-medium'
          }`}
        >
          <div
            className={`p-1 rounded-lg transition-transform ${
              activeTab === 'weather' ? 'scale-110 bg-emerald-500/20' : ''
            }`}
          >
            <CloudSun className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Weather</span>
        </button>

        {/* 5. Soil Health */}
        <button
          onClick={() => {
            onTabChange('soil');
            window.scrollTo({ top: 420, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all cursor-pointer min-w-[56px] min-h-[48px] ${
            activeTab === 'soil'
              ? 'text-emerald-400 font-extrabold'
              : 'text-stone-400 hover:text-stone-200 font-medium'
          }`}
        >
          <div
            className={`p-1 rounded-lg transition-transform ${
              activeTab === 'soil' ? 'scale-110 bg-emerald-500/20' : ''
            }`}
          >
            <FlaskConical className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Soil</span>
        </button>
      </div>
    </nav>
  );
}
