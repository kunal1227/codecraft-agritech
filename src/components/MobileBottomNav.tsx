'use client';

import { Sprout, TrendingUp, CloudSun, FlaskConical, Camera } from 'lucide-react';
import { LanguageCode } from '@/types/agriculture';

interface MobileBottomNavProps {
  activeTab: 'overview' | 'seed' | 'mandi' | 'soil' | 'weather' | 'seasonal' | 'roi';
  onTabChange: (tab: 'overview' | 'seed' | 'mandi' | 'soil' | 'weather' | 'seasonal' | 'roi') => void;
  onOpenSoilScanner: () => void;
  language?: LanguageCode;
}

export function MobileBottomNav({
  activeTab,
  onTabChange,
  onOpenSoilScanner,
  language = 'en',
}: MobileBottomNavProps) {
  const isMr = language === 'mr';
  const isHi = language === 'hi';

  const labels = {
    overview: isMr ? 'आढावा' : isHi ? 'अवलोकन' : 'Overview',
    mandi: isMr ? 'बाजारभाव' : isHi ? 'मंडी भाव' : 'Mandi',
    scanSoil: isMr ? 'माती स्कॅन' : isHi ? 'मिट्टी स्कैन' : 'Scan Soil',
    weather: isMr ? 'हवामान' : isHi ? 'मौसम' : 'Weather',
    soil: isMr ? 'मृदा आरोग्य' : isHi ? 'मृदा' : 'Soil',
  };
  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-stone-950/95 backdrop-blur-xl border-t border-stone-800 shadow-2xl pb-[env(safe-area-inset-bottom,0.5rem)] pt-1 transition-all"
    >
      <div className="w-full max-w-lg mx-auto grid grid-cols-5 items-end px-1 h-14">
        {/* 1. Overview */}
        <button
          onClick={() => {
            onTabChange('overview');
            window.scrollTo({ top: 380, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-end h-full pb-1 px-1 rounded-xl transition-all cursor-pointer w-full touch-manipulation ${
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
          <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-full text-center leading-tight">
            {labels.overview}
          </span>
        </button>

        {/* 2. Mandi */}
        <button
          onClick={() => {
            onTabChange('mandi');
            window.scrollTo({ top: 420, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-end h-full pb-1 px-1 rounded-xl transition-all cursor-pointer w-full touch-manipulation ${
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
          <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-full text-center leading-tight">
            {labels.mandi}
          </span>
        </button>

        {/* 3. Center Action: AI Soil Camera Scanner (Centered with elevated button) */}
        <div className="flex flex-col items-center justify-end h-full pb-1 w-full">
          <button
            onClick={onOpenSoilScanner}
            className="-mt-5 sm:-mt-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-green-400 text-stone-950 flex items-center justify-center shadow-xl shadow-emerald-500/40 ring-4 ring-stone-950 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0 touch-manipulation"
            title="Scan Soil Photo with AI"
            aria-label="Scan Soil Photo with AI"
          >
            <Camera className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>
          <span className="text-[10px] font-black text-emerald-400 tracking-tight mt-0.5 truncate max-w-full text-center leading-tight">
            {labels.scanSoil}
          </span>
        </div>

        {/* 4. Weather */}
        <button
          onClick={() => {
            onTabChange('weather');
            window.scrollTo({ top: 420, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-end h-full pb-1 px-1 rounded-xl transition-all cursor-pointer w-full touch-manipulation ${
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
          <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-full text-center leading-tight">
            {labels.weather}
          </span>
        </button>

        {/* 5. Soil Health */}
        <button
          onClick={() => {
            onTabChange('soil');
            window.scrollTo({ top: 420, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-end h-full pb-1 px-1 rounded-xl transition-all cursor-pointer w-full touch-manipulation ${
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
          <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-full text-center leading-tight">
            {labels.soil}
          </span>
        </button>
      </div>
    </nav>
  );
}
