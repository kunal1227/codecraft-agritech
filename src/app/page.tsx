'use client';

import { useState, useEffect } from 'react';
import {
  FarmerInput,
  RecommendationResult,
  LanguageCode,
  SavedPlan,
} from '@/types/agriculture';
import { generatePrecisionRecommendation } from '@/services/recommendationEngine';
import { Header } from '@/components/Header';
import { InputDashboard } from '@/components/InputDashboard';
import { SeedVarietyCard } from '@/components/SeedVarietyCard';
import { MandiMarketCard } from '@/components/MandiMarketCard';
import { SoilHealthCard } from '@/components/SoilHealthCard';
import { WeatherWidget } from '@/components/WeatherWidget';
import { RoiComparisonCard } from '@/components/RoiComparisonCard';
import { SeasonalPlanner } from '@/components/SeasonalPlanner';
import { OfflinePlansModal } from '@/components/OfflinePlansModal';
import { VoiceAssistantBanner } from '@/components/VoiceAssistantBanner';
import { SoilPhotoScannerModal } from '@/components/SoilPhotoScannerModal';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { TRANSLATIONS } from '@/utils/translations';
import {
  savePlanToStorage,
  getSavedPlans,
  removeSavedPlan,
  getLastCachedRecommendation,
  cacheLatestGeneratedPlan,
} from '@/utils/storage';
import {
  Sprout,
  BookmarkPlus,
  BookmarkCheck,
  CheckCircle2,
  Printer,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  CloudSun,
  FlaskConical,
  Scale,
  CalendarRange,
  Layers,
  ChevronRight,
  WifiOff,
  Camera,
} from 'lucide-react';

export default function Home() {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<RecommendationResult | null>(null);

  // Tab State
  const [activeTab, setActiveTab] = useState<
    'overview' | 'seed' | 'mandi' | 'soil' | 'weather' | 'seasonal' | 'roi'
  >('overview');

  // Soil Vision Scanner Modal
  const [isSoilScannerOpen, setIsSoilScannerOpen] = useState<boolean>(false);

  // Offline saved plans & fallback state
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);
  const [isSavedPlansModalOpen, setIsSavedPlansModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isOfflineFallback, setIsOfflineFallback] = useState<boolean>(false);
  const [offlineCachedTime, setOfflineCachedTime] = useState<string>('');

  const t = TRANSLATIONS[language];

  // Initial load: fetch saved plans and generate default initial recommendation or load offline cache
  useEffect(() => {
    const plans = getSavedPlans();
    setSavedPlans(plans);

    const online = typeof navigator !== 'undefined' ? navigator.onLine : true;
    setIsOnline(online);

    // Retrieve last cached recommendation from browser localStorage / IndexedDB
    const cachedRecord = getLastCachedRecommendation();

    if (!online && cachedRecord) {
      // Offline fallback state: display cached plan directly
      setResult(cachedRecord.result);
      setIsOfflineFallback(true);
      setOfflineCachedTime(cachedRecord.savedAt);
    } else if (cachedRecord) {
      setResult(cachedRecord.result);
      setOfflineCachedTime(cachedRecord.savedAt);
    } else {
      // Generate initial Punjab Wheat default recommendation if online and no cache
      const defaultInput: FarmerInput = {
        location: {
          region: 'Malwa Agro-Zone',
          state: 'Punjab',
          district: 'Ludhiana',
          latitude: 30.901,
          longitude: 75.8573,
        },
        landSize: 5,
        landUnit: 'acres',
        waterSource: 'canal',
        waterLevel: 'adequate',
        targetCrop: 'Wheat',
      };
      generatePrecisionRecommendation(defaultInput).then((res) => {
        setResult(res);
        // Automatically cache to browser localStorage & IndexedDB
        cacheLatestGeneratedPlan(res);
      });
    }
  }, []);

  const handleGenerate = async (input: FarmerInput) => {
    setIsLoading(true);
    try {
      const res = await generatePrecisionRecommendation(input);
      setResult(res);
      // Automatically cache whenever a user generates a new recommendation plan!
      cacheLatestGeneratedPlan(res);
      setIsOfflineFallback(false);
      setOfflineCachedTime(new Date().toISOString());

      // Auto switch to overview on generation
      setActiveTab('overview');
      // Scroll to results section smoothly
      const el = document.getElementById('results-view');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Failed to generate recommendation:', err);
      // Fallback to last cached plan if network or API failed
      const cachedRecord = getLastCachedRecommendation();
      if (cachedRecord) {
        setResult(cachedRecord.result);
        setIsOfflineFallback(true);
        setOfflineCachedTime(cachedRecord.savedAt);
        setToastMessage('Network disconnected. Restored last generated farm plan from offline cache.');
        setTimeout(() => setToastMessage(''), 5000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePlan = () => {
    if (!result) return;
    const plan = savePlanToStorage(result);
    setSavedPlans(getSavedPlans());
    setToastMessage(t.planSavedOffline);
    setTimeout(() => setToastMessage(''), 4500);
  };

  const handleDeletePlan = (id: string) => {
    removeSavedPlan(id);
    setSavedPlans(getSavedPlans());
  };

  const handleSelectPlan = (plan: SavedPlan) => {
    setResult(plan.result);
    setActiveTab('overview');
    const el = document.getElementById('results-view');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-100/60 dark:bg-stone-950 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Sticky Header with Language Toggle & PWA Status */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        savedPlansCount={savedPlans.length}
        onOpenSavedPlans={() => setIsSavedPlansModalOpen(true)}
        isOnline={isOnline}
        onNetworkChange={setIsOnline}
        onOpenSoilScanner={() => setIsSoilScannerOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 pb-28 sm:pb-12 space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 text-white p-6 sm:p-10 shadow-xl shadow-emerald-950/20">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-white/10 text-emerald-200 border border-white/20 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Next-Gen Agronomy 2.0</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {t.appName}
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl leading-relaxed">
              Empowering farmers with algorithmic seed selection, Agmarknet live Mandi price forecasting,
              hyper-local weather spray windows, and 1-year multi-crop Kharif-Rabi-Zaid rotation calendars.
            </p>
          </div>
        </div>

        {/* Toast Feedback Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 border border-emerald-500 animate-in slide-in-from-bottom duration-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
          </div>
        )}

        {/* Input Dashboard Form */}
        <section id="planner">
          <InputDashboard
            language={language}
            onGenerate={handleGenerate}
            isLoading={isLoading}
            onOpenSoilScanner={() => setIsSoilScannerOpen(true)}
          />
        </section>

        {/* Results View */}
        {result && (
          <section id="results-view" className="space-y-6 pt-4">
            {/* Offline Fallback State Notice */}
            {(!isOnline || isOfflineFallback) && (
              <div className="p-4 sm:p-5 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-400 dark:border-amber-700/80 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-950 dark:text-amber-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                    <WifiOff className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-300">
                        Offline Field Mode Active
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200">
                        Cached in LocalStorage
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold mt-0.5">
                      You are currently operating offline. Displaying your last saved farm plan for{' '}
                      <strong className="underline">{result.primaryCrop}</strong> on {result.input.landSize} {result.input.landUnit} ({result.input.location.state}).
                    </p>
                    {offlineCachedTime && (
                      <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80 mt-0.5">
                        Saved on {new Date(offlineCachedTime).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })} • All seed varieties, agronomic guides & seasonal plans remain viewable without internet.
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => setIsSavedPlansModalOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
                  >
                    <BookmarkCheck className="w-4 h-4" />
                    <span>View All Saved Plans</span>
                  </button>
                </div>
              </div>
            )}

            {/* Top Bar: Action Buttons & Offline Save */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-3xl bg-white dark:bg-stone-900 border border-emerald-900/10 dark:border-emerald-800/40 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-black text-lg">
                  {result.agronomicScore}
                </div>
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    {t.agronomicScore}
                  </div>
                  <div className="text-base sm:text-lg font-black text-stone-900 dark:text-stone-50">
                    {result.primaryCrop} on {result.input.landSize} {result.input.landUnit} ({result.input.location.state})
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={handleSavePlan}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-emerald-700/20 active:scale-95 cursor-pointer"
                >
                  <BookmarkPlus className="w-4 h-4" />
                  <span>{t.saveOffline}</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs sm:text-sm font-bold transition-all cursor-pointer"
                  title="Print or export PDF field advisory card"
                >
                  <Printer className="w-4 h-4" />
                  <span className="hidden sm:inline">Export Card</span>
                </button>
              </div>
            </div>

            {/* Voice-Friendly Vernacular Audio Readout Banner */}
            <VoiceAssistantBanner result={result} language={language} />

            {/* Interactive Tab Navigation */}
            <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
              {[
                { id: 'overview', label: t.tabOverview, icon: Sparkles },
                { id: 'seed', label: t.tabSeed, icon: Sprout },
                { id: 'soil_scanner', label: 'AI Soil Scanner', icon: Camera, isAction: true },
                { id: 'mandi', label: t.tabMandi, icon: TrendingUp },
                { id: 'soil', label: 'Soil Health', icon: FlaskConical },
                { id: 'weather', label: t.tabWeather, icon: CloudSun },
                { id: 'seasonal', label: t.tabSeasonalPlanner, icon: CalendarRange },
                { id: 'roi', label: t.tabRoiYield, icon: Scale },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (tab.isAction) {
                        setIsSoilScannerOpen(true);
                      } else {
                        setActiveTab(tab.id as typeof activeTab);
                      }
                    }}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                      tab.isAction
                        ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white'
                        : isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/20'
                        : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Views */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* 4 Quick Stat Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Cultivar */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                    <div className="text-[10px] uppercase font-bold text-stone-400 flex items-center gap-1">
                      <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                      Recommended Cultivar
                    </div>
                    <div className="text-base font-black text-stone-900 dark:text-stone-100 mt-1 line-clamp-1">
                      {result.optimalSeed.name}
                    </div>
                    <div className="text-xs text-emerald-700 dark:text-emerald-400 font-bold mt-0.5">
                      {result.optimalSeed.germinationRatePct}% Certified Germination
                    </div>
                  </div>

                  {/* Expected Yield */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                    <div className="text-[10px] uppercase font-bold text-stone-400 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-emerald-600" />
                      {t.expectedYield}
                    </div>
                    <div className="text-xl font-black text-stone-900 dark:text-stone-100 mt-1">
                      {result.expectedYield.quintalsPerAcreExpected} <span className="text-xs font-normal text-stone-400">Qtl/Acre</span>
                    </div>
                    <div className="text-xs text-stone-500 font-medium mt-0.5">
                      Total: {result.expectedYield.totalExpectedQuintals} Quintals
                    </div>
                  </div>

                  {/* Live Mandi Modal */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                    <div className="text-[10px] uppercase font-bold text-stone-400 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      Agmarknet Live Modal
                    </div>
                    <div className="text-xl font-black text-emerald-700 dark:text-emerald-400 mt-1">
                      ₹{result.market.currentModalPrice}{' '}
                      <span className="text-xs font-normal text-stone-400">/ Qtl</span>
                    </div>
                    <div className="text-xs text-stone-500 font-medium mt-0.5">
                      MSP: ₹{result.market.mspPrice} ({result.market.priceDiffFromMsp >= 0 ? '+' : ''}₹{result.market.priceDiffFromMsp})
                    </div>
                  </div>

                  {/* Net Profit */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                    <div className="text-[10px] uppercase font-bold text-stone-400 flex items-center gap-1">
                      <Scale className="w-3.5 h-3.5 text-emerald-600" />
                      {t.estimatedNetProfit}
                    </div>
                    <div className="text-xl font-black text-emerald-700 dark:text-emerald-400 mt-1">
                      ₹{result.expectedYield.estimatedNetProfit.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-stone-500 font-medium mt-0.5">
                      Net Farm Income
                    </div>
                  </div>
                </div>

                {/* AI Agronomist Actionable Advisories */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5" />
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-stone-50">
                      {t.aiAdvisoryNotes}
                    </h3>
                  </div>
                  <div className="space-y-2.5">
                    {result.aiAdvisoryNotes.map((note, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm text-stone-700 dark:text-stone-300 flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Side-by-side seed variety card & mandi card */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <SeedVarietyCard seed={result.optimalSeed} cropName={result.primaryCrop} />
                  <MandiMarketCard market={result.market} />
                </div>

                {/* Seasonal planner preview */}
                <SeasonalPlanner plans={result.multiCropAnnualPlan} acres={result.input.landSize} />
              </div>
            )}

            {activeTab === 'seed' && (
              <SeedVarietyCard seed={result.optimalSeed} cropName={result.primaryCrop} />
            )}

            {activeTab === 'mandi' && (
              <MandiMarketCard market={result.market} />
            )}

            {activeTab === 'soil' && (
              <SoilHealthCard
                soil={result.soil}
                onOpenSoilScanner={() => setIsSoilScannerOpen(true)}
              />
            )}

            {activeTab === 'weather' && (
              <WeatherWidget weather={result.weather} />
            )}

            {activeTab === 'seasonal' && (
              <SeasonalPlanner plans={result.multiCropAnnualPlan} acres={result.input.landSize} />
            )}

            {activeTab === 'roi' && (
              <RoiComparisonCard result={result} />
            )}
          </section>
        )}
      </main>

      {/* Offline Plans Drawer / Modal */}
      <OfflinePlansModal
        isOpen={isSavedPlansModalOpen}
        onClose={() => setIsSavedPlansModalOpen(false)}
        savedPlans={savedPlans}
        onSelectPlan={handleSelectPlan}
        onDeletePlan={handleDeletePlan}
        language={language}
      />

      {/* AI Soil Photo Scanner Modal */}
      <SoilPhotoScannerModal
        isOpen={isSoilScannerOpen}
        onClose={() => setIsSoilScannerOpen(false)}
        language={language}
        location={
          result?.input?.location || {
            region: 'Malwa Agro-Zone',
            state: 'Punjab',
            district: 'Ludhiana',
            latitude: 30.901,
            longitude: 75.8573,
          }
        }
        liveWeather={result?.weather}
        waterSource={result?.input?.waterSource || 'canal'}
        onApplyPrediction={(detectedSoilType, recommendedCrop) => {
          const baseInput: FarmerInput = result?.input || {
            location: {
              region: 'Malwa Agro-Zone',
              state: 'Punjab',
              district: 'Ludhiana',
              latitude: 30.901,
              longitude: 75.8573,
            },
            landSize: 5,
            landUnit: 'acres',
            waterSource: 'canal',
            waterLevel: 'adequate',
          };
          const updatedInput: FarmerInput = {
            ...baseInput,
            soilType: detectedSoilType,
            targetCrop: recommendedCrop,
          };
          handleGenerate(updatedInput);
          setToastMessage(
            `✨ AI Soil Vision Applied: Classified ${detectedSoilType.replace('_', ' ')} & predicted ${recommendedCrop}! Full farm plan recalculated.`
          );
          setTimeout(() => setToastMessage(''), 5000);
        }}
      />

      {/* Sticky Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenSoilScanner={() => setIsSoilScannerOpen(true)}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/70 backdrop-blur-md py-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-stone-800 dark:text-stone-200">
              AgriTech
            </span>
            <span>• PWA Offline Ready</span>
          </div>
          <div className="text-center sm:text-right text-[11px] text-stone-400">
            Agronomic algorithms benchmarked against ICAR, Agmarknet, and Indian agro-climatic zones.
          </div>
        </div>
      </footer>
    </div>
  );
}
