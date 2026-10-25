'use client';

import { useState, useRef, useEffect } from 'react';
import {
  SoilVisionAnalysis,
  SeedPredictionResult,
  RainCondition,
  LocationData,
  WaterSource,
  HyperLocalWeather,
  LanguageCode,
  SoilType,
} from '@/types/agriculture';
import {
  analyzeSoilImageData,
  predictSeedsForSoilAndClimate,
  SAMPLE_SOIL_PRESETS,
} from '@/services/soilVisionAi';
import { speakAdvisory } from '@/utils/speech';
import {
  Camera,
  Upload,
  Sparkles,
  X,
  RefreshCw,
  CheckCircle2,
  Droplets,
  CloudRain,
  Flame,
  Sprout,
  Compass,
  Sliders,
  Volume2,
  ArrowRight,
  ShieldCheck,
  Layers,
  ChevronDown,
  Info,
} from 'lucide-react';

interface SoilPhotoScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
  location: LocationData;
  liveWeather?: HyperLocalWeather | null;
  waterSource: WaterSource;
  onApplyPrediction: (detectedSoilType: SoilType, recommendedCrop: string) => void;
}

export function SoilPhotoScannerModal({
  isOpen,
  onClose,
  language,
  location,
  liveWeather,
  waterSource,
  onApplyPrediction,
}: SoilPhotoScannerModalProps) {
  // Mode: 'camera' | 'upload' | 'samples'
  const [inputMode, setInputMode] = useState<'camera' | 'upload' | 'samples'>('camera');
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string>('');
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  // Selected or captured image
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  // Rain condition parameter
  const [rainCondition, setRainCondition] = useState<RainCondition>('auto_weather');
  const [activeWaterSource, setActiveWaterSource] = useState<WaterSource>(waterSource);

  // Analysis State
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgressStage, setScanProgressStage] = useState<string>('');
  const [soilAnalysis, setSoilAnalysis] = useState<SoilVisionAnalysis | null>(null);
  const [seedPrediction, setSeedPrediction] = useState<SeedPredictionResult | null>(null);

  // Audio state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Initialize Camera when mode is camera
  useEffect(() => {
    if (isOpen && inputMode === 'camera' && !imagePreviewUrl) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, inputMode, imagePreviewUrl, facingMode]);

  const startCamera = async () => {
    setCameraError('');
    stopCamera();
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Camera API is not supported on this browser. Please use gallery upload.');
        setInputMode('upload');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err) {
      console.warn('Unable to access camera:', err);
      setCameraError('Camera access was denied or is unavailable. You can upload a photo from your gallery.');
      setCameraActive(false);
      setInputMode('upload');
    }
  };

  const handleToggleCameraFacing = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  // Capture Photo from Camera Viewfinder
  const handleCaptureSnapshot = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Crop center square
    const minDim = Math.min(video.videoWidth, video.videoHeight);
    const startX = (video.videoWidth - minDim) / 2;
    const startY = (video.videoHeight - minDim) / 2;

    ctx.drawImage(video, startX, startY, minDim, minDim, 0, 0, 400, 400);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setImagePreviewUrl(dataUrl);
    stopCamera();

    // Trigger AI Model Pipeline
    processImageForSoilAnalysis(canvas);
  };

  // Handle File Upload from Gallery
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setImagePreviewUrl(dataUrl);

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, 400, 400);
          processImageForSoilAnalysis(canvas);
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  // Handle Sample Preset Soil Tile
  const handleSelectSample = (sample: (typeof SAMPLE_SOIL_PRESETS)[0]) => {
    // Generate simulated canvas
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Draw organic grain texture with simulated colors
      ctx.fillStyle = sample.dominantColorHex;
      ctx.fillRect(0, 0, 400, 400);

      // Add speckle noise simulating soil particles
      for (let i = 0; i < 4000; i++) {
        const x = Math.random() * 400;
        const y = Math.random() * 400;
        const radius = Math.random() * 2.5;
        const delta = (Math.random() - 0.5) * 35;
        ctx.fillStyle = `rgb(${sample.mockR + delta}, ${sample.mockG + delta}, ${sample.mockB + delta})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      const dataUrl = canvas.toDataURL('image/jpeg');
      setImagePreviewUrl(dataUrl);
      processImageForSoilAnalysis(canvas);
    }
  };

  // Run AI Vision Feature Extraction + Model Pipeline
  const processImageForSoilAnalysis = (canvas: HTMLCanvasElement) => {
    setIsScanning(true);
    setSoilAnalysis(null);
    setSeedPrediction(null);

    const isMr = language === 'mr';
    // Staged animated progress HUD
    setScanProgressStage(
      isMr
        ? 'RGB वर्णपट आणि रंगद्रव्याचे विश्लेषण सुरू आहे...'
        : 'Extracting RGB Spectral Channels & Hue Pigmentation...'
    );

    setTimeout(() => {
      setScanProgressStage(
        isMr
          ? 'वाळू, गाळ आणि चिकणमाती प्रमाणाचे विश्लेषण सुरू आहे...'
          : 'Analyzing Sand-Silt-Clay Granularity & Texture...'
      );
    }, 450);

    setTimeout(() => {
      setScanProgressStage(
        isMr
          ? 'प्रशिक्षित AI माती मॉडेलशी नमुना जुळवला जात आहे...'
          : 'Matching with Trained Soil Model Centroids...'
      );
    }, 900);

    setTimeout(() => {
      setScanProgressStage(
        isMr
          ? 'स्थानिक हवामान, पाऊस आणि सर्वोत्तम बियाणे जातींचा अंदाज घेत आहे...'
          : 'Synthesizing Rainfall Forecast & Predicting Seed Cultivars...'
      );

      const ctx = canvas.getContext('2d');
      if (ctx) {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const analysis = analyzeSoilImageData(imgData);
        analysis.capturedImagePreviewUrl = canvas.toDataURL('image/jpeg');

        const prediction = predictSeedsForSoilAndClimate(
          analysis,
          rainCondition,
          liveWeather,
          location,
          activeWaterSource
        );

        setSoilAnalysis(analysis);
        setSeedPrediction(prediction);
      }
      setIsScanning(false);
    }, 1400);
  };

  // Re-run seed prediction if user adjusts rain condition or water source
  const handleRecalculatePrediction = (newRain: RainCondition, newWater: WaterSource) => {
    setRainCondition(newRain);
    setActiveWaterSource(newWater);

    if (soilAnalysis) {
      const updated = predictSeedsForSoilAndClimate(
        soilAnalysis,
        newRain,
        liveWeather,
        location,
        newWater
      );
      setSeedPrediction(updated);
    }
  };

  // Handle Reset / Retake
  const handleReset = () => {
    setImagePreviewUrl(null);
    setSoilAnalysis(null);
    setSeedPrediction(null);
    setIsScanning(false);
    if (inputMode === 'camera') {
      startCamera();
    }
  };

  // Play Audio Readout
  const handlePlayVoice = () => {
    if (!seedPrediction || !soilAnalysis) return;
    setIsPlayingAudio(true);
    const text =
      language === 'mr'
        ? `ॲग्रीटेक एआय माती विश्लेषण: आपल्या शेतात ${soilAnalysis.soilTypeName} प्रकारची माती आढळली असून अचूकता ${soilAnalysis.confidencePct}% आहे. स्थानिक हवामान व पाऊस स्थितीनुसार, आपल्या शेतीसाठी सर्वोत्तम बियाणे ${seedPrediction.primarySeed.name} (${seedPrediction.cropName}) आहे. अपेक्षित उत्पादन ${seedPrediction.expectedYieldQuintalsPerAcre} क्विंटल प्रति एकर राहील. पेरणीचा योग्य कालावधी ${seedPrediction.sowingWindow} आहे.`
        : `AgriTech AI Soil Analysis: Detected ${soilAnalysis.soilTypeName} with ${soilAnalysis.confidencePct}% confidence. Based on ${rainCondition.replace('_', ' ')} rainfall conditions, recommended seed is ${seedPrediction.primarySeed.name} (${seedPrediction.cropName}) with expected yield of ${seedPrediction.expectedYieldQuintalsPerAcre} quintals per acre. Sowing window: ${seedPrediction.sowingWindow}.`;

    speakAdvisory(text, language, () => {
      setIsPlayingAudio(false);
    });
  };

  // Apply to Main Farm Dashboard
  const handleApply = () => {
    if (soilAnalysis && seedPrediction) {
      onApplyPrediction(soilAnalysis.soilType, seedPrediction.cropName);
      onClose();
    }
  };

  if (!isOpen) return null;

  const isMr = language === 'mr';
  const SAMPLE_SOIL_NAMES_MR: Record<string, { name: string; region: string }> = {
    sample_black_cotton: { name: 'काळी रेगूर माती (दख्खन पठार)', region: 'विदर्भ, मराठवाडा, खान्देश' },
    sample_alluvial_loam: { name: 'गाळाची सुपीक माती (पोयटा)', region: 'नदी खोरे, उत्तर भारतीय मैदाने' },
    sample_red_soil: { name: 'लाल तांबडी जांभी माती', region: 'कोकण, पश्चिम घाट, दक्षिण पठार' },
    sample_sandy_loam: { name: 'हलकी वाळूयुक्त पोयटा माती', region: 'अवर्षणग्रस्त भाग, किनारी पट्टी' },
  };

  const textDict = {
    title: isMr ? 'AgriTech AI माती दृष्टी आणि बियाणे अंदाज' : 'AgriTech AI Soil Vision',
    subtitle: isMr
      ? 'मातीचा फोटो काढा किंवा अपलोड करा • संगणक दृष्टी मातीचे विश्लेषण करते • अचूक बियाणे सुचवते'
      : 'Snap or upload soil photo • Computer Vision classifies soil matrix • AI predicts high-yielding seeds',
    liveCamera: isMr ? 'थेट कॅमेरा' : 'Live Camera',
    gallery: isMr ? 'गॅलरीमधून निवडा' : 'Gallery',
    sampleSoils: isMr ? 'मातीचे नमुने' : 'Sample Soils',
    reticle: isMr ? 'चौकोनात स्वच्छ मातीचा नमुना ठेवा (पाने/कचरा बाजूला करा)' : 'Align clear soil sample in box (remove leaves/dry grass)',
    chooseFromDevice: isMr ? 'डिव्हाइसमधून फोटो निवडा' : 'Choose Photo from Device',
    tapToSnapOrUpload: isMr ? 'फोटो काढण्यासाठी किंवा गॅलरीतून निवडण्यासाठी टॅप करा' : 'Tap to snap photo or choose from gallery',
    sunlightHint: isMr ? 'नैसर्गिक सूर्यप्रकाशातील फोटो सर्वाधिक अचूक निकाल देतात.' : 'Natural sunlight photos provide highest spectral accuracy.',
    samplePresetHint: isMr ? 'AI माती वर्गीकरण व बियाणे अंदाज तात्काळ तपासण्यासाठी प्रमाणित माती नमुना निवडा:' : 'Select a calibrated archetype soil sample to test the AI classification and seed prediction pipeline instantly:',
    retake: isMr ? 'पुन्हा फोटो काढा' : 'Retake / New Photo',
    fieldCaptured: isMr ? 'शेतातील मातीचा नमुना निश्चित' : 'Field Sample Captured',
    scanning: isMr ? 'AI माती विश्लेषण सुरू आहे...' : 'AI Vision Analysis in Progress...',
    confidence: isMr ? 'अचूकता' : 'Confidence',
    clay: isMr ? 'चिकणमाती' : 'Clay Content',
    silt: isMr ? 'गाळ' : 'Silt Content',
    ph: isMr ? 'अंदाज pH' : 'Estimated pH',
    weatherTitle: isMr ? 'स्थानिक हवामान आणि पाऊस स्थिती' : 'Regional Weather & Rainfall Parameters',
    autoWeather: isMr ? '🌦️ थेट हवामान' : '🌦️ Auto Live Weather',
    autoWeatherDesc: isMr ? 'ओपन-मेटिओ अंदाज वापरा' : 'Use Open-Meteo forecast',
    highMonsoon: isMr ? '🌧️ मुसळधार पाऊस' : '🌧️ High Monsoon',
    highMonsoonDesc: isMr ? '>११०० मिमी पाऊस' : '>1,100 mm heavy rain',
    moderateRain: isMr ? '⛅ मध्यम पाऊस' : '⛅ Moderate Rain',
    moderateRainDesc: isMr ? '६००-९०० मिमी हंगामी' : '600–900 mm seasonal',
    lowRain: isMr ? '☀️ कमी पाऊस / दुष्काळ' : '☀️ Low Rain / Arid',
    lowRainDesc: isMr ? '<४५० मिमी कोरडवाहू' : '<450 mm drought risk',
    seedTitle: isMr ? 'AI शिफारस केलेले सर्वोत्तम बियाणे जात' : 'AI Predicted Optimal Seed Cultivar',
    breeder: isMr ? 'संशोधन संस्था' : 'Breeder',
    matchScore: isMr ? 'अनुकूलता जुळणी' : 'Compatibility Match',
    expectedYield: isMr ? 'अपेक्षित उत्पादन' : 'Expected Yield',
    qtlAcre: isMr ? 'क्विंटल / एकर' : 'Qtl/Acre',
    underRain: isMr ? 'पाऊस स्थितीनुसार' : 'Under tuned rainfall',
    sowingWindow: isMr ? 'पेरणीची योग्य वेळ' : 'Sowing Window',
    timelySowing: isMr ? 'हंगामी वेळेवर पेरणी' : 'Timely seasonal sowing',
    seedRate: isMr ? 'बियाणे प्रमाण' : 'Seed Rate',
    certifiedGerm: isMr ? 'प्रमाणित उगवण क्षमता ९४%' : 'Certified germination 94%',
    waterNeeds: isMr ? 'पाण्याची गरज' : 'Water Needs',
    droughtBuiltIn: isMr ? 'दुष्काळ प्रतिकारकता सक्षम' : 'Drought resilience built-in',
    soilMatch: isMr ? 'माती अनुकूलता: ' : 'Soil Match: ',
    rainMatch: isMr ? 'पाऊस अनुकूलता: ' : 'Rainfall Match: ',
    altCultivars: isMr ? 'पर्यायी अधिक उत्पादन देणाऱ्या इतर जाती' : 'Alternative High-Compatibility Cultivars',
    applyBtn: isMr ? 'शेती डॅशबोर्डवर लागू करा आणि नफा मोजा' : 'Apply to Farm Dashboard & Calculate Full ROI',
    scanAnother: isMr ? 'दुसरा नमुना तपासा' : 'Scan Another Soil',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[94dvh] sm:max-h-[90vh] overflow-y-auto bg-stone-900 border border-emerald-500/30 rounded-t-3xl sm:rounded-3xl shadow-2xl text-stone-100 p-4 sm:p-7 pb-8">
        {/* Mobile Swipe Handle Indicator */}
        <div className="w-12 h-1.5 rounded-full bg-stone-700 mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
              <Camera className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-2xl font-black text-white">
                  {textDict.title}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Vision Model
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5 line-clamp-1 sm:line-clamp-none">
                {textDict.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="mt-4 sm:mt-5 space-y-5">
          {/* Step 1: Input Source Selector Tabs (Visible when no photo captured yet) */}
          {!imagePreviewUrl && (
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-stone-950 border border-stone-800">
              <button
                onClick={() => setInputMode('camera')}
                className={`flex-1 min-w-[100px] sm:min-w-[130px] flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[44px] ${
                  inputMode === 'camera'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Camera className="w-4 h-4 shrink-0" />
                {textDict.liveCamera}
              </button>
              <button
                onClick={() => setInputMode('upload')}
                className={`flex-1 min-w-[100px] sm:min-w-[130px] flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[44px] ${
                  inputMode === 'upload'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Upload className="w-4 h-4 shrink-0" />
                {textDict.gallery}
              </button>
              <button
                onClick={() => setInputMode('samples')}
                className={`flex-1 min-w-[100px] sm:min-w-[130px] flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[44px] ${
                  inputMode === 'samples'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                {textDict.sampleSoils}
              </button>
            </div>
          )}

          {/* Capture/Upload Container */}
          {!imagePreviewUrl ? (
            <div className="relative">
              {/* Camera Mode */}
              {inputMode === 'camera' && (
                <div className="relative w-full aspect-square sm:aspect-video max-h-[380px] bg-black rounded-3xl overflow-hidden border border-stone-800 flex flex-col items-center justify-center">
                  {cameraError ? (
                    <div className="text-center p-6 max-w-md">
                      <p className="text-amber-400 text-xs sm:text-sm mb-3">{cameraError}</p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold min-h-[44px]"
                      >
                        {textDict.chooseFromDevice}
                      </button>
                    </div>
                  ) : (
                    <>
                      <video
                        ref={videoRef}
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />

                      {/* Agricultural Target Reticle Overlay */}
                      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-4">
                        <div className="w-44 h-44 sm:w-56 sm:h-56 border-2 border-dashed border-emerald-400/80 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/10">
                          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                        </div>
                        <span className="mt-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm text-[10px] sm:text-[11px] font-bold text-emerald-300 border border-emerald-500/30 text-center">
                          {textDict.reticle}
                        </span>
                      </div>

                      {/* Camera Controls Row */}
                      <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-6 px-4">
                        {/* Switch Camera Button */}
                        <button
                          type="button"
                          onClick={handleToggleCameraFacing}
                          className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center active:scale-90 transition-transform cursor-pointer shadow-lg"
                          title="Flip Camera (Front/Back)"
                        >
                          <RefreshCw className="w-5 h-5" />
                        </button>

                        {/* Shutter Button */}
                        <button
                          onClick={handleCaptureSnapshot}
                          className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white hover:bg-stone-200 text-stone-900 flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all border-4 border-emerald-500 cursor-pointer"
                          title="Capture Soil Photo"
                        >
                          <Camera className="w-8 h-8 text-emerald-950" />
                        </button>

                        {/* Spacer for symmetrical centering */}
                        <div className="w-12 h-12 invisible" />
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Upload Mode */}
              {inputMode === 'upload' && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-video sm:aspect-[16/9] max-h-[320px] bg-stone-950/70 border-2 border-dashed border-stone-700 hover:border-emerald-500 rounded-3xl flex flex-col items-center justify-center p-6 cursor-pointer group transition-all"
                >
                  <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 group-hover:bg-emerald-500/20 text-emerald-400 flex items-center justify-center transition-colors">
                    <Upload className="w-8 h-8" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white mt-4 text-center">
                    {textDict.tapToSnapOrUpload}
                  </h4>
                  <p className="text-xs text-stone-400 mt-1 max-w-sm text-center">
                    {textDict.sunlightHint}
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              )}

              {/* Instant Samples Mode */}
              {inputMode === 'samples' && (
                <div>
                  <p className="text-xs text-stone-400 mb-3">
                    {textDict.samplePresetHint}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {SAMPLE_SOIL_PRESETS.map((sample) => {
                      const sampleName =
                        isMr && SAMPLE_SOIL_NAMES_MR[sample.id]
                          ? SAMPLE_SOIL_NAMES_MR[sample.id].name
                          : sample.name;
                      const sampleRegion =
                        isMr && SAMPLE_SOIL_NAMES_MR[sample.id]
                          ? SAMPLE_SOIL_NAMES_MR[sample.id].region
                          : sample.region;
                      return (
                        <button
                          key={sample.id}
                          onClick={() => handleSelectSample(sample)}
                          className="group flex flex-col items-center p-4 rounded-2xl bg-stone-950 border border-stone-800 hover:border-emerald-500/60 hover:bg-stone-800/40 text-left transition-all"
                        >
                          <div
                            className={`w-full h-20 rounded-xl mb-3 bg-gradient-to-br ${sample.bgGradient} flex items-center justify-center shadow-inner border border-white/10 group-hover:scale-105 transition-transform`}
                          >
                            <span className="text-[10px] uppercase font-bold text-white/90 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
                              {sample.dominantColorHex}
                            </span>
                          </div>
                          <div className="w-full">
                            <h5 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                              {sampleName}
                            </h5>
                            <p className="text-[10px] text-stone-400 mt-0.5 line-clamp-1">
                              {sampleRegion}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Image Preview & Scanning Status */
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-stone-950/80 p-4 rounded-3xl border border-stone-800">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border border-emerald-500/40 shrink-0">
                  <img
                    src={imagePreviewUrl}
                    alt="Analyzed Soil Sample"
                    className="w-full h-full object-cover"
                  />
                  {isScanning && (
                    <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-[1px] flex items-center justify-center">
                      <div className="absolute inset-x-0 h-1 bg-emerald-400 shadow-lg shadow-emerald-400 animate-pulse top-1/2 -translate-y-1/2" />
                    </div>
                  )}
                </div>

                <div className="flex-1 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {textDict.fieldCaptured}
                    </span>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-bold text-stone-300 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      {textDict.retake}
                    </button>
                  </div>

                  {isScanning ? (
                    <div className="mt-3 p-4 rounded-2xl bg-stone-900 border border-emerald-500/30">
                      <div className="flex items-center gap-3">
                        <RefreshCw className="w-5 h-5 text-emerald-400 animate-spin" />
                        <div>
                          <div className="text-sm font-bold text-white">{textDict.scanning}</div>
                          <div className="text-xs text-emerald-400 font-mono mt-0.5">
                            {scanProgressStage}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : soilAnalysis ? (
                    <div className="mt-2 space-y-2">
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-lg sm:text-xl font-black text-white">
                          {soilAnalysis.soilTypeName}
                        </h3>
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          {soilAnalysis.confidencePct}% {textDict.confidence}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400">
                        {soilAnalysis.colorDescription}
                      </p>

                      {/* Texture Metrics */}
                      <div className="grid grid-cols-3 gap-2 pt-2">
                        <div className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-center">
                          <div className="text-[10px] text-stone-400 font-bold uppercase">{textDict.clay}</div>
                          <div className="text-sm font-black text-emerald-400">
                            {soilAnalysis.textureBreakdown.clayPct}%
                          </div>
                        </div>
                        <div className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-center">
                          <div className="text-[10px] text-stone-400 font-bold uppercase">{textDict.silt}</div>
                          <div className="text-sm font-black text-amber-400">
                            {soilAnalysis.textureBreakdown.siltPct}%
                          </div>
                        </div>
                        <div className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-center">
                          <div className="text-[10px] text-stone-400 font-bold uppercase">{textDict.ph}</div>
                          <div className="text-sm font-black text-blue-400">
                            {soilAnalysis.estimatedPh}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Rain & Regional Weather Parameter Override Bar */}
              {soilAnalysis && (
                <div className="p-4 rounded-3xl bg-stone-950 border border-stone-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <CloudRain className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-bold text-white">
                        {textDict.weatherTitle}
                      </span>
                    </div>
                    {liveWeather && (
                      <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        {isMr ? 'थेट ओपन-मेटिओ:' : 'Live Open-Meteo:'} {location.district}, {location.state} ({liveWeather.currentTemp}°C)
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => handleRecalculatePrediction('auto_weather', activeWaterSource)}
                      className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all ${
                        rainCondition === 'auto_weather'
                          ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <div className="text-[11px] font-black">{textDict.autoWeather}</div>
                      <div className="text-[10px] opacity-80 mt-0.5">{textDict.autoWeatherDesc}</div>
                    </button>

                    <button
                      onClick={() => handleRecalculatePrediction('high_rain', activeWaterSource)}
                      className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all ${
                        rainCondition === 'high_rain'
                          ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <div className="text-[11px] font-black">{textDict.highMonsoon}</div>
                      <div className="text-[10px] opacity-80 mt-0.5">{textDict.highMonsoonDesc}</div>
                    </button>

                    <button
                      onClick={() => handleRecalculatePrediction('moderate_rain', activeWaterSource)}
                      className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all ${
                        rainCondition === 'moderate_rain'
                          ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <div className="text-[11px] font-black">{textDict.moderateRain}</div>
                      <div className="text-[10px] opacity-80 mt-0.5">{textDict.moderateRainDesc}</div>
                    </button>

                    <button
                      onClick={() => handleRecalculatePrediction('low_arid', activeWaterSource)}
                      className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all ${
                        rainCondition === 'low_arid'
                          ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <div className="text-[11px] font-black">{textDict.lowRain}</div>
                      <div className="text-[10px] opacity-80 mt-0.5">{textDict.lowRainDesc}</div>
                    </button>
                  </div>
                </div>
              )}

              {/* Seed Recommendation Output */}
              {seedPrediction && (
                <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-emerald-950/60 via-stone-900 to-stone-950 border border-emerald-500/40 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                          <Sparkles className="w-4 h-4" />
                        </span>
                        <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">
                          {textDict.seedTitle}
                        </span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-black text-white mt-1">
                        {seedPrediction.primarySeed.name} ({seedPrediction.cropName})
                      </h4>
                      <p className="text-xs text-stone-300 mt-0.5">
                        {textDict.breeder}: {seedPrediction.primarySeed.breeder}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-[10px] uppercase font-bold text-stone-400">
                          {textDict.matchScore}
                        </div>
                        <div className="text-2xl font-black text-emerald-400">
                          {seedPrediction.compatibilityScore}%
                        </div>
                      </div>
                      <button
                        onClick={handlePlayVoice}
                        className={`p-3 rounded-2xl border transition-all ${
                          isPlayingAudio
                            ? 'bg-amber-500 text-stone-950 border-amber-400 animate-pulse'
                            : 'bg-stone-800 hover:bg-stone-700 text-emerald-400 border-stone-700'
                        }`}
                        title={isMr ? "मराठी आवाजात ऐका" : "Listen to audio readout"}
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Seed Yield & Sowing Metric Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="p-3 rounded-2xl bg-stone-900/80 border border-stone-800">
                      <div className="text-[10px] text-stone-400 font-bold uppercase">{textDict.expectedYield}</div>
                      <div className="text-base sm:text-lg font-black text-emerald-300 mt-0.5">
                        {seedPrediction.expectedYieldQuintalsPerAcre} {textDict.qtlAcre}
                      </div>
                      <div className="text-[10px] text-stone-400 mt-0.5">{textDict.underRain}</div>
                    </div>

                    <div className="p-3 rounded-2xl bg-stone-900/80 border border-stone-800">
                      <div className="text-[10px] text-stone-400 font-bold uppercase">{textDict.sowingWindow}</div>
                      <div className="text-xs sm:text-sm font-bold text-stone-100 mt-0.5">
                        {seedPrediction.sowingWindow}
                      </div>
                      <div className="text-[10px] text-stone-400 mt-0.5">{textDict.timelySowing}</div>
                    </div>

                    <div className="p-3 rounded-2xl bg-stone-900/80 border border-stone-800">
                      <div className="text-[10px] text-stone-400 font-bold uppercase">{textDict.seedRate}</div>
                      <div className="text-xs sm:text-sm font-bold text-stone-100 mt-0.5">
                        {seedPrediction.primarySeed.seedRatePerAcre}
                      </div>
                      <div className="text-[10px] text-stone-400 mt-0.5">{textDict.certifiedGerm}</div>
                    </div>

                    <div className="p-3 rounded-2xl bg-stone-900/80 border border-stone-800">
                      <div className="text-[10px] text-stone-400 font-bold uppercase">{textDict.waterNeeds}</div>
                      <div className="text-xs sm:text-sm font-bold text-blue-300 mt-0.5 flex items-center gap-1">
                        <Droplets className="w-3.5 h-3.5" />
                        {seedPrediction.waterRequirement}
                      </div>
                      <div className="text-[10px] text-stone-400 mt-0.5">{textDict.droughtBuiltIn}</div>
                    </div>
                  </div>

                  {/* AI Reasoning Text */}
                  <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-emerald-500/20 text-xs text-stone-300 space-y-1.5">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <p>
                        <strong className="text-white">{textDict.soilMatch}</strong>
                        {seedPrediction.soilSuitabilityNote}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <p>
                        <strong className="text-white">{textDict.rainMatch}</strong>
                        {seedPrediction.rainfallSuitabilityNote}
                      </p>
                    </div>
                  </div>

                  {/* Alternative High-Yield Cultivars */}
                  {seedPrediction.alternativeSeeds.length > 0 && (
                    <div className="pt-2">
                      <div className="text-xs font-bold text-stone-400 mb-2 uppercase tracking-wider">
                        {textDict.altCultivars}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {seedPrediction.alternativeSeeds.map((alt, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-2xl bg-stone-900/90 border border-stone-800 flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-white">{alt.crop}</span>
                                <span className="text-[11px] font-black text-emerald-400">
                                  {alt.matchScore}%
                                </span>
                              </div>
                              <div className="text-[11px] text-stone-300 font-medium mt-0.5">
                                {alt.varietyName}
                              </div>
                            </div>
                            <div className="text-[10px] text-stone-400 mt-2">
                              {isMr ? 'अंदाजे' : 'Est.'} {alt.expectedYield} {textDict.qtlAcre}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Bar */}
                  <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={handleApply}
                      className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.01]"
                    >
                      <Sprout className="w-4 h-4" />
                      {textDict.applyBtn}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                    <button
                      onClick={handleReset}
                      className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs transition-colors"
                    >
                      {textDict.scanAnother}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
