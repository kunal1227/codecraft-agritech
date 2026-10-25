'use client';

import { Sprout, Globe, BookmarkCheck, Sparkles, Camera } from 'lucide-react';
import { LanguageCode } from '@/types/agriculture';
import { TRANSLATIONS } from '@/utils/translations';
import { PwaRegistrar } from './PwaRegistrar';

interface HeaderProps {
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  savedPlansCount: number;
  onOpenSavedPlans: () => void;
  isOnline: boolean;
  onNetworkChange: (online: boolean) => void;
  onOpenSoilScanner?: () => void;
}

const LANGUAGES: { code: LanguageCode; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
];

export function Header({
  language,
  onLanguageChange,
  savedPlansCount,
  onOpenSavedPlans,
  onNetworkChange,
  onOpenSoilScanner,
}: HeaderProps) {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-emerald-950/80 border-b border-emerald-900/10 dark:border-emerald-800/40 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 ring-2 ring-emerald-500/30">
              <Sprout className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black tracking-tight text-emerald-900 dark:text-emerald-100">
                  {t.appName}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                  <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                  AI Precision
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-500 dark:text-emerald-300/70 line-clamp-1">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Controls: Online/Offline Badge, Language Selector, Saved Plans */}
          <div className="flex items-center gap-2 sm:gap-3">
            <PwaRegistrar onNetworkChange={onNetworkChange} />

            {/* Quick 1-Tap Marathi Pill */}
            <button
              type="button"
              onClick={() => onLanguageChange(language === 'mr' ? 'en' : 'mr')}
              className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === 'mr'
                  ? 'bg-amber-500 text-stone-950 font-black shadow-xs'
                  : 'bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
              }`}
              title="मराठी भाषेत बदला / Switch to Marathi"
            >
              🚩 मराठी
            </button>

            {/* Vernacular Language Selector Dropdown */}
            <div className="relative inline-flex items-center">
              <label htmlFor="language-select" className="sr-only">
                Language
              </label>
              <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-100 dark:bg-emerald-900/40 border border-stone-200 dark:border-emerald-800 text-stone-700 dark:text-emerald-200 text-xs sm:text-sm font-semibold hover:border-emerald-500 transition-colors">
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <select
                  id="language-select"
                  value={language}
                  onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
                  className="bg-transparent border-none outline-none cursor-pointer pr-1 font-medium"
                >
                  {LANGUAGES.map((lang) => (
                    <option
                      key={lang.code}
                      value={lang.code}
                      className="bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100"
                    >
                      {lang.native} ({lang.label})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* AI Soil Photo Scanner Button */}
            {onOpenSoilScanner && (
              <button
                type="button"
                onClick={onOpenSoilScanner}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs sm:text-sm font-bold hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-stone-950 transition-all active:scale-95 cursor-pointer shadow-xs"
                title="Scan Soil Photo with AI"
              >
                <Camera className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:text-inherit" />
                <span className="hidden sm:inline">Scan Soil</span>
              </button>
            )}

            {/* Offline Saved Plans Button */}
            <button
              onClick={onOpenSavedPlans}
              className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-xs sm:text-sm font-semibold transition-all active:scale-95 cursor-pointer"
              title={t.viewSavedPlans}
            >
              <BookmarkCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden md:inline">{t.viewSavedPlans}</span>
              {savedPlansCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-600 text-white min-w-4">
                  {savedPlansCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
