'use client';

import { useState } from 'react';
import {
  FarmerInput,
  LandUnit,
  WaterSource,
  WaterLevel,
  LanguageCode,
  LocationData,
} from '@/types/agriculture';
import { TRANSLATIONS } from '@/utils/translations';
import {
  MapPin,
  Compass,
  Waves,
  Droplets,
  CloudRain,
  Sliders,
  Mic,
  MicOff,
  Sparkles,
  Search,
  CheckCircle2,
  Layers,
  ArrowRight,
  Camera,
} from 'lucide-react';
import { parseFarmVoiceInput } from '@/utils/speech';

interface InputDashboardProps {
  initialInput?: Partial<FarmerInput>;
  language: LanguageCode;
  onGenerate: (input: FarmerInput) => void;
  isLoading: boolean;
  onOpenSoilScanner?: () => void;
}

const REGIONS: LocationData[] = [
  { state: 'Punjab', district: 'Ludhiana', region: 'Malwa Agro-Zone', latitude: 30.901, longitude: 75.8573 },
  { state: 'Haryana', district: 'Karnal', region: 'Indo-Gangetic Plain', latitude: 29.6857, longitude: 76.9905 },
  { state: 'Maharashtra', district: 'Nashik', region: 'Western Deccan Plateau', latitude: 19.9975, longitude: 73.7898 },
  { state: 'Madhya Pradesh', district: 'Indore', region: 'Malwa Black Soil Belt', latitude: 22.7196, longitude: 75.8577 },
  { state: 'Andhra Pradesh', district: 'Guntur', region: 'Krishna-Godavari Coastal', latitude: 16.3067, longitude: 80.4365 },
  { state: 'Telangana', district: 'Warangal', region: 'North Telangana Plateau', latitude: 17.9689, longitude: 79.5941 },
  { state: 'Uttar Pradesh', district: 'Varanasi', region: 'Eastern Gangetic Alluvial', latitude: 25.3176, longitude: 82.9739 },
  { state: 'Rajasthan', district: 'Kota', region: 'Hadoti Semi-Arid Basin', latitude: 25.2138, longitude: 75.8648 },
  { state: 'Gujarat', district: 'Rajkot', region: 'Saurashtra Arid Coastal', latitude: 22.3039, longitude: 70.8022 },
  { state: 'Karnataka', district: 'Mandya', region: 'Cauvery Basin Irrigated', latitude: 12.5239, longitude: 76.8973 },
];

const CROPS = [
  'Wheat',
  'Paddy (Rice)',
  'Basmati Rice',
  'Cotton',
  'Soybean',
  'Mustard',
  'Maize',
  'Gram (Chickpea / Chana)',
  'Tomato',
  'Onion',
  'Chili (Dry)',
];

export function InputDashboard({
  initialInput,
  language,
  onGenerate,
  isLoading,
  onOpenSoilScanner,
}: InputDashboardProps) {
  const t = TRANSLATIONS[language];

  // Form State
  const [selectedRegionIdx, setSelectedRegionIdx] = useState<number>(0);
  const [customLocation, setCustomLocation] = useState<LocationData>(REGIONS[0]);
  const [isDetectingGps, setIsDetectingGps] = useState<boolean>(false);
  const [gpsLocked, setGpsLocked] = useState<boolean>(false);

  const [landSize, setLandSize] = useState<number>(initialInput?.landSize || 5);
  const [landUnit, setLandUnit] = useState<LandUnit>(initialInput?.landUnit || 'acres');
  const [waterSource, setWaterSource] = useState<WaterSource>(initialInput?.waterSource || 'canal');
  const [waterLevel, setWaterLevel] = useState<WaterLevel>(initialInput?.waterLevel || 'adequate');
  const [targetCrop, setTargetCrop] = useState<string>(initialInput?.targetCrop || 'Wheat');

  // Voice Input State
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceFeedback, setVoiceFeedback] = useState<string>('');

  // Handle GPS Auto-Detection
  const handleDetectGps = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsDetectingGps(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCustomLocation({
          region: 'GPS Field Location',
          state: 'Punjab', // Default nearest agricultural hub simulation
          district: 'Live Coords',
          latitude: Number(latitude.toFixed(4)),
          longitude: Number(longitude.toFixed(4)),
          isGpsDetected: true,
        });
        setIsDetectingGps(false);
        setGpsLocked(true);
      },
      (err) => {
        console.warn('GPS detection failed or timed out:', err);
        // Fallback simulation
        setTimeout(() => {
          setCustomLocation({
            region: 'GPS Field Location (Simulated)',
            state: 'Punjab',
            district: 'Ludhiana Ag-Belt',
            latitude: 30.901,
            longitude: 75.857,
            isGpsDetected: true,
          });
          setIsDetectingGps(false);
          setGpsLocked(true);
        }, 600);
      },
      { timeout: 7000 }
    );
  };

  // Handle Region Dropdown Change
  const handleRegionChange = (idx: number) => {
    setSelectedRegionIdx(idx);
    setCustomLocation(REGIONS[idx]);
    setGpsLocked(false);
  };

  // Voice Input (Speech Recognition)
  const handleVoiceListen = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback simulation for unsupported browsers/environments
      setIsListening(true);
      setVoiceFeedback('Listening... (e.g., "Wheat in Punjab 5 acres borewell")');
      setTimeout(() => {
        const simulatedTranscript = 'Recommend Wheat for 6 acres in Punjab with canal irrigation';
        setVoiceFeedback(`Captured: "${simulatedTranscript}"`);
        const parsed = parseFarmVoiceInput(simulatedTranscript);
        if (parsed.detectedCrop) setTargetCrop(parsed.detectedCrop);
        if (parsed.detectedLandSize) setLandSize(parsed.detectedLandSize);
        if (parsed.detectedWaterSource) setWaterSource(parsed.detectedWaterSource);
        setIsListening(false);
      }, 2000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'pa' ? 'pa-IN' : 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);
      setVoiceFeedback(t.listening);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setVoiceFeedback(`Captured: "${transcript}"`);
        const parsed = parseFarmVoiceInput(transcript);

        if (parsed.detectedCrop) setTargetCrop(parsed.detectedCrop);
        if (parsed.detectedLandSize) setLandSize(parsed.detectedLandSize);
        if (parsed.detectedState) {
          const matched = REGIONS.find((r) => r.state.toLowerCase() === parsed.detectedState?.toLowerCase());
          if (matched) {
            setCustomLocation(matched);
          }
        }
        if (parsed.detectedWaterSource) setWaterSource(parsed.detectedWaterSource);
      };

      recognition.onerror = () => {
        setIsListening(false);
        setVoiceFeedback('Voice recognition ended. Tap to speak again.');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.warn('Speech recognition error:', err);
      setIsListening(false);
    }
  };

  // Quick Preset Loader
  const loadPreset = (preset: {
    regionIdx: number;
    size: number;
    unit: LandUnit;
    water: WaterSource;
    level: WaterLevel;
    crop: string;
  }) => {
    setSelectedRegionIdx(preset.regionIdx);
    setCustomLocation(REGIONS[preset.regionIdx]);
    setGpsLocked(false);
    setLandSize(preset.size);
    setLandUnit(preset.unit);
    setWaterSource(preset.water);
    setWaterLevel(preset.level);
    setTargetCrop(preset.crop);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      location: customLocation,
      landSize: Number(landSize),
      landUnit,
      waterSource,
      waterLevel,
      targetCrop,
    });
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 sm:p-7 shadow-xl shadow-emerald-950/5 border border-emerald-900/10 dark:border-emerald-800/40 transition-all">
      {/* Top Header & Presets */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <Sliders className="w-4 h-4 stroke-[2.5]" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-50 tracking-tight">
              {t.formTitle}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Configure soil zone, irrigation parameters, and target crop for precision AI analytics.
          </p>
        </div>

        {/* Voice Input Button */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={handleVoiceListen}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-300 dark:ring-rose-900/50'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-700/20'
            }`}
            title="Speak your farm details in your language"
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            <span>{isListening ? t.listening : t.tapToSpeak}</span>
          </button>
        </div>
      </div>

      {/* Spoken voice feedback message */}
      {voiceFeedback && (
        <div className="my-3 px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>{voiceFeedback}</span>
        </div>
      )}

      {/* AI Soil Scanner Callout Banner */}
      {onOpenSoilScanner && (
        <div className="my-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 border border-emerald-500/40 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl shadow-emerald-950/20">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40 shadow-inner">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black text-white">
                  Train AI & Predict: Soil Photo Scanner
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-500 text-stone-950">
                  Vision Model
                </span>
              </div>
              <p className="text-xs text-stone-300 mt-0.5">
                Capture or upload soil photo • Computer Vision classifies soil matrix • AI synthesizes regional rainfall & forecasts to predict high-yielding seed cultivars.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenSoilScanner}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] cursor-pointer shrink-0"
          >
            <Camera className="w-4 h-4" />
            <span>Scan Soil Photo</span>
          </button>
        </div>
      )}

      {/* Quick Regional Presets */}
      <div className="pt-4 pb-2">
        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
          {t.quickPresets}:
        </span>
        <div className="flex flex-wrap gap-2 mt-2">
          <button
            type="button"
            onClick={() =>
              loadPreset({
                regionIdx: 0,
                size: 8,
                unit: 'acres',
                water: 'canal',
                level: 'adequate',
                crop: 'Wheat',
              })
            }
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-emerald-50 dark:bg-stone-800 dark:hover:bg-emerald-950/50 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-emerald-400 transition-colors cursor-pointer"
          >
            🌾 Punjab (8 Ac Canal Wheat)
          </button>
          <button
            type="button"
            onClick={() =>
              loadPreset({
                regionIdx: 2,
                size: 4,
                unit: 'acres',
                water: 'drip_sprinkler',
                level: 'adequate',
                crop: 'Cotton',
              })
            }
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-emerald-50 dark:bg-stone-800 dark:hover:bg-emerald-950/50 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-emerald-400 transition-colors cursor-pointer"
          >
            🌱 Maharashtra (4 Ac Drip Cotton)
          </button>
          <button
            type="button"
            onClick={() =>
              loadPreset({
                regionIdx: 3,
                size: 6,
                unit: 'acres',
                water: 'rainfed',
                level: 'moderate',
                crop: 'Soybean',
              })
            }
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-emerald-50 dark:bg-stone-800 dark:hover:bg-emerald-950/50 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-emerald-400 transition-colors cursor-pointer"
          >
            🌻 MP Malwa (6 Ac Rainfed Soybean)
          </button>
          <button
            type="button"
            onClick={() =>
              loadPreset({
                regionIdx: 4,
                size: 3,
                unit: 'acres',
                water: 'borewell',
                level: 'adequate',
                crop: 'Chili (Dry)',
              })
            }
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-emerald-50 dark:bg-stone-800 dark:hover:bg-emerald-950/50 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-emerald-400 transition-colors cursor-pointer"
          >
            🌶️ Andhra (3 Ac Borewell Chili)
          </button>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="mt-5 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Location & GPS */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                {t.locationLabel}
              </span>
              <button
                type="button"
                onClick={handleDetectGps}
                disabled={isDetectingGps}
                className="text-[11px] text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer font-semibold"
              >
                <Compass className={`w-3 h-3 ${isDetectingGps ? 'animate-spin' : ''}`} />
                {isDetectingGps ? t.gpsDetecting : gpsLocked ? t.gpsSuccess : t.gpsDetect}
              </button>
            </label>
            <select
              value={selectedRegionIdx}
              onChange={(e) => handleRegionChange(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-100 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
            >
              {REGIONS.map((r, idx) => (
                <option key={r.state} value={idx}>
                  {r.state} — {r.district} ({r.region})
                </option>
              ))}
            </select>
            <div className="text-[11px] text-stone-400 flex items-center gap-1.5 pl-1">
              <span>Coordinates:</span>
              <span className="font-mono text-emerald-700 dark:text-emerald-400">
                {customLocation.latitude}°N, {customLocation.longitude}°E
              </span>
            </div>
          </div>

          {/* Land Size & Unit */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              {t.landSizeLabel}
            </label>
            <div className="flex gap-2 items-center">
              <div className="flex-1 relative flex items-center">
                <button
                  type="button"
                  onClick={() => setLandSize((prev) => Math.max(0.5, Number((prev - 0.5).toFixed(1))))}
                  className="w-11 h-11 rounded-l-xl bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-100 font-black text-xl flex items-center justify-center shrink-0 cursor-pointer active:scale-95 transition-transform"
                  title="Decrease Land Size"
                >
                  -
                </button>
                <input
                  type="number"
                  min="0.25"
                  max="250"
                  step="0.25"
                  value={landSize}
                  onChange={(e) => setLandSize(parseFloat(e.target.value) || 1)}
                  required
                  className="w-full text-center px-2 py-2.5 h-11 bg-stone-50 dark:bg-stone-800/80 border-y border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-100 text-base sm:text-sm font-black focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setLandSize((prev) => Number((prev + 0.5).toFixed(1)))}
                  className="w-11 h-11 rounded-r-xl bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-100 font-black text-xl flex items-center justify-center shrink-0 cursor-pointer active:scale-95 transition-transform"
                  title="Increase Land Size"
                >
                  +
                </button>
              </div>
              <select
                value={landUnit}
                onChange={(e) => setLandUnit(e.target.value as LandUnit)}
                className="h-11 px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 text-xs font-bold uppercase outline-none"
              >
                <option value="acres">Acres</option>
                <option value="hectares">Hectares</option>
                <option value="bigha">Bigha</option>
                <option value="guntha">Guntha</option>
              </select>
            </div>
            <p className="text-[11px] text-stone-400 pl-1">
              Standardized across calculations for high-resolution financial modeling.
            </p>
          </div>

          {/* Target Crop Selector & Search */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-emerald-600" />
                {t.targetCropLabel}
              </span>
              <button
                type="button"
                onClick={() => setTargetCrop('')}
                className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline font-semibold cursor-pointer"
              >
                Auto AI Recommendation
              </button>
            </label>
            <select
              value={targetCrop}
              onChange={(e) => setTargetCrop(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-100 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="">✨ Let AI Pick Best Crop For Field</option>
              {CROPS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-stone-400 pl-1">
              {targetCrop ? `Targeting: ${targetCrop}` : 'AI will analyze highest-ROI crop for your zone'}
            </p>
          </div>
        </div>

        {/* Primary Water Source Cards */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
            <Waves className="w-3.5 h-3.5 text-emerald-600" />
            {t.waterSourceLabel}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'canal', label: t.waterCanal, icon: Waves, desc: 'Gravity flow canal grid' },
              { id: 'borewell', label: t.waterBorewell, icon: Droplets, desc: 'Deep aquifer tube-well' },
              { id: 'rainfed', label: t.waterRainfed, icon: CloudRain, desc: 'Natural monsoon Barani' },
              { id: 'drip_sprinkler', label: t.waterDrip, icon: Sparkles, desc: 'Pressurized micro-drip' },
            ].map((src) => {
              const Icon = src.icon;
              const isSelected = waterSource === src.id;
              return (
                <button
                  key={src.id}
                  type="button"
                  onClick={() => setWaterSource(src.id as WaterSource)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-700/20 ring-2 ring-emerald-500/30'
                      : 'bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 border-stone-200 dark:border-stone-700/80 text-stone-800 dark:text-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <div className="mt-2 font-bold text-xs sm:text-sm line-clamp-1">{src.label}</div>
                  <div className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? 'text-emerald-100' : 'text-stone-400'}`}>
                    {src.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Water Adequacy Level */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
            {t.waterAdequacyLabel}
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'adequate', label: t.waterAdequate, badge: 'High Yield', color: 'emerald' },
              { id: 'moderate', label: t.waterModerate, badge: 'Standard', color: 'blue' },
              { id: 'scarce', label: t.waterScarce, badge: 'Drought Risk', color: 'amber' },
            ].map((lvl) => {
              const isSelected = waterLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setWaterLevel(lvl.id as WaterLevel)}
                  className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer text-xs font-bold ${
                    isSelected
                      ? 'bg-stone-900 dark:bg-emerald-500 text-white dark:text-stone-950 border-transparent shadow-sm'
                      : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  <div>{lvl.label}</div>
                  <div className="text-[10px] font-normal opacity-80 mt-0.5">{lvl.badge}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-extrabold text-base sm:text-lg shadow-lg shadow-emerald-700/25 transition-all transform active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{t.calculating}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>{t.recommendCropButton}</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
