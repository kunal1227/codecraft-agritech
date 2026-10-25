import { LanguageCode } from '@/types/agriculture';

export interface Translations {
  appName: string;
  appSubtitle: string;
  offlineMode: string;
  onlineMode: string;
  voiceAssistant: string;
  tapToSpeak: string;
  listening: string;
  readAloud: string;
  stopAudio: string;
  saveOffline: string;
  planSavedOffline: string;
  viewSavedPlans: string;
  noSavedPlans: string;

  // Tabs
  tabOverview: string;
  tabSeed: string;
  tabSoilScanner: string;
  tabMandi: string;
  tabWeather: string;
  tabSeasonalPlanner: string;
  tabRoiYield: string;

  // Soil Scanner
  scanSoilButton: string;
  soilScannerTitle: string;
  soilScannerSubtitle: string;
  liveCamera: string;
  galleryUpload: string;
  sampleSoils: string;
  detectedSoil: string;
  confidence: string;
  predictedSeedCultivar: string;
  applyToDashboard: string;
  autoWeather: string;
  highMonsoon: string;
  moderateRain: string;
  lowAridRain: string;

  // Form
  formTitle: string;
  locationLabel: string;
  gpsDetect: string;
  gpsDetecting: string;
  gpsSuccess: string;
  stateLabel: string;
  landSizeLabel: string;
  waterSourceLabel: string;
  waterAdequacyLabel: string;
  targetCropLabel: string;
  targetCropPlaceholder: string;
  recommendCropButton: string;
  calculating: string;
  quickPresets: string;

  // Water Sources
  waterCanal: string;
  waterBorewell: string;
  waterRainfed: string;
  waterDrip: string;

  // Water Adequacy
  waterAdequate: string;
  waterModerate: string;
  waterScarce: string;

  // Results
  recommendationHeader: string;
  agronomicScore: string;
  optimalSeedTitle: string;
  germinationRate: string;
  daysToMaturity: string;
  expectedYield: string;
  estimatedNetProfit: string;
  quintals: string;
  perAcre: string;
  totalHarvest: string;
  mandiPriceTitle: string;
  currentModalRate: string;
  mspBenchmark: string;
  highRoiTitle: string;
  seasonalPlannerTitle: string;
  kharifSeason: string;
  rabiSeason: string;
  zaidSeason: string;
  soilHealthTitle: string;
  weatherForecastTitle: string;
  aiAdvisoryNotes: string;
  exportAdvisory: string;
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    appName: 'AgriTech',
    appSubtitle: 'Precision Agriculture & Seed Intelligence System',
    offlineMode: 'Offline Mode (Cached Data)',
    onlineMode: 'Live Agri-Network Connected',
    voiceAssistant: 'Voice Assistant',
    tapToSpeak: 'Tap to speak your farm details...',
    listening: 'Listening... (Speak crop, state, or acreage)',
    readAloud: 'Listen to Farm Advisory',
    stopAudio: 'Stop Audio',
    saveOffline: 'Save Plan for Offline Access',
    planSavedOffline: 'Farm Plan saved to local storage! Accessible without internet.',
    viewSavedPlans: 'Saved Offline Plans',
    noSavedPlans: 'No saved farm plans yet. Generate a recommendation and save it for field use.',

    tabOverview: 'Overview',
    tabSeed: 'Optimal Seed',
    tabSoilScanner: 'AI Soil Scanner',
    tabMandi: 'Mandi Market & MSP',
    tabWeather: 'Hyper-Local Weather',
    tabSeasonalPlanner: '1-Year Crop Planner',
    tabRoiYield: 'Yield & ROI Analytics',

    scanSoilButton: 'Scan Soil Photo',
    soilScannerTitle: 'AgriTech AI Soil Vision & Seed Predictor',
    soilScannerSubtitle: 'Snap or upload soil photo • Computer Vision classifies soil matrix • AI predicts high-yielding seeds with live weather',
    liveCamera: 'Live Camera',
    galleryUpload: 'Upload from Gallery',
    sampleSoils: 'Instant Sample Soils',
    detectedSoil: 'Detected Soil Type',
    confidence: 'AI Match Confidence',
    predictedSeedCultivar: 'AI Predicted Optimal Seed Cultivar',
    applyToDashboard: 'Apply to Farm Dashboard & Calculate Full ROI',
    autoWeather: '🌦️ Auto Live Weather',
    highMonsoon: '🌧️ High Monsoon (>1,100 mm)',
    moderateRain: '⛅ Moderate Rain (600–900 mm)',
    lowAridRain: '☀️ Low Rain / Arid (<450 mm)',

    formTitle: 'Farm Land & Agronomic Input',
    locationLabel: 'Field Location & Region',
    gpsDetect: 'Detect via GPS',
    gpsDetecting: 'Locating Field...',
    gpsSuccess: 'GPS Coordinates Locked',
    stateLabel: 'State / Agro-Climatic Zone',
    landSizeLabel: 'Land Size',
    waterSourceLabel: 'Primary Water Source',
    waterAdequacyLabel: 'Water Availability Level',
    targetCropLabel: 'Target Crop (Optional)',
    targetCropPlaceholder: 'Select or type crop (e.g., Wheat, Soybean, Cotton)',
    recommendCropButton: 'Generate AI Farm Recommendation',
    calculating: 'Analyzing Soil, Mandi & Weather Data...',
    quickPresets: 'Quick Regional Presets',

    waterCanal: 'Canal Irrigation',
    waterBorewell: 'Tube-well / Borewell',
    waterRainfed: 'Rainfed (Barani)',
    waterDrip: 'Drip / Micro-Sprinkler',

    waterAdequate: 'Adequate (Plentiful)',
    waterModerate: 'Moderate (Timed)',
    waterScarce: 'Scarce / Dryland',

    recommendationHeader: 'Precision Agronomic Recommendation',
    agronomicScore: 'Agronomic Suitability Score',
    optimalSeedTitle: 'Optimal Seed Variety',
    germinationRate: 'Germination Rate',
    daysToMaturity: 'Days to Maturity',
    expectedYield: 'Expected Yield',
    estimatedNetProfit: 'Estimated Net Profit',
    quintals: 'Quintals',
    perAcre: 'per acre',
    totalHarvest: 'Total Expected Harvest',
    mandiPriceTitle: 'Agmarknet Live Mandi Rates',
    currentModalRate: 'Current Modal Price',
    mspBenchmark: 'Govt. MSP Benchmark',
    highRoiTitle: 'High-ROI Alternative Crops',
    seasonalPlannerTitle: '1-Year Multi-Crop Rotation Planner',
    kharifSeason: 'Kharif (Monsoon)',
    rabiSeason: 'Rabi (Winter)',
    zaidSeason: 'Zaid (Summer Catch Crop)',
    soilHealthTitle: 'Soil Composition & Health Card',
    weatherForecastTitle: '7-Day Hyper-Local Weather Advisory',
    aiAdvisoryNotes: 'AI Agronomist Actionable Advisories',
    exportAdvisory: 'Print / Export Field Card',
  },

  hi: {
    appName: 'AgriTech',
    appSubtitle: 'सटीक कृषि एवं उन्नत बीज अनुशंसा प्रणाली',
    offlineMode: 'ऑफ़लाइन मोड (कैश डेटा)',
    onlineMode: 'लाइव नेटवर्क कनेक्टेड',
    voiceAssistant: 'वॉयस असिस्टेंट',
    tapToSpeak: 'खेत की जानकारी बोलने के लिए दबाएं...',
    listening: 'सुन रहे हैं... (फसल, राज्य या एकड़ बोलें)',
    readAloud: 'कृषि सलाह सुनें',
    stopAudio: 'ऑडियो रोकें',
    saveOffline: 'ऑफ़लाइन उपयोग के लिए सहेजें',
    planSavedOffline: 'खेत योजना सुरक्षित की गई! बिना इंटरनेट भी उपलब्ध है।',
    viewSavedPlans: 'सहेजी गई योजनाएं',
    noSavedPlans: 'कोई सहेजी गई योजना नहीं मिली। योजना बनाकर ऑफ़लाइन सहेजें।',

    tabOverview: 'अवलोकन',
    tabSeed: 'सर्वोत्तम बीज',
    tabSoilScanner: 'AI मिट्टी स्कैनर',
    tabMandi: 'मंडी भाव व MSP',
    tabWeather: 'मौसम पूर्वानुमान',
    tabSeasonalPlanner: '1-वर्षीय फसल चक्र',
    tabRoiYield: 'उपज और आय विश्लेषण',

    scanSoilButton: 'मिट्टी की फोटो स्कैन करें',
    soilScannerTitle: 'AgriTech AI मृदा दृष्टि और बीज भविष्यवाणी',
    soilScannerSubtitle: 'मिट्टी की फोटो लें या अपलोड करें • कंप्यूटर विजन मिट्टी की पहचान करता है • क्षेत्रीय मौसम अनुसार सटीक बीज बताता है',
    liveCamera: 'लाइव कैमरा',
    galleryUpload: 'गैलरी से चुनें',
    sampleSoils: 'मिट्टी के नमूने',
    detectedSoil: 'पहचानी गई मिट्टी',
    confidence: 'सटीकता',
    predictedSeedCultivar: 'AI अनुशंसित सर्वोत्तम बीज',
    applyToDashboard: 'फार्म डैशबोर्ड पर लागू करें और संपूर्ण मुनाफा देखें',
    autoWeather: '🌦️ लाइव मौसम',
    highMonsoon: '🌧️ भारी वर्षा (>1100 मिमी)',
    moderateRain: '⛅ मध्यम वर्षा (600–900 मिमी)',
    lowAridRain: '☀️ कम वर्षा / सूखा (<450 मिमी)',

    formTitle: 'खेत और कृषि विवरण दर्ज करें',
    locationLabel: 'खेत का स्थान और क्षेत्र',
    gpsDetect: 'GPS द्वारा स्थान पता करें',
    gpsDetecting: 'स्थान खोजा जा रहा है...',
    gpsSuccess: 'GPS स्थान निर्धारित',
    stateLabel: 'राज्य / कृषि जलवायु क्षेत्र',
    landSizeLabel: 'जमीन का रकबा (माप)',
    waterSourceLabel: 'सिंचाई का मुख्य साधन',
    waterAdequacyLabel: 'पानी की उपलब्धता स्तर',
    targetCropLabel: 'इच्छित फसल (वैकल्पिक)',
    targetCropPlaceholder: 'फसल चुनें या लिखें (जैसे गेहूं, सोयाबीन, कपास)',
    recommendCropButton: 'AI कृषि अनुशंसा प्राप्त करें',
    calculating: 'मिट्टी, मंडी व मौसम का विश्लेषण जारी...',
    quickPresets: 'त्वरित क्षेत्रीय उदाहरण',

    waterCanal: 'नहर सिंचाई',
    waterBorewell: 'नलकूप / ट्यूबवेल / कुआं',
    waterRainfed: 'वर्षा आधारित (बारानी)',
    waterDrip: 'ड्रिप / सूक्ष्म फव्वारा',

    waterAdequate: 'पर्याप्त (प्रचुर)',
    waterModerate: 'मध्यम (सीमित)',
    waterScarce: 'कम / सूखा प्रवण',

    recommendationHeader: 'सटीक कृषि अनुशंसा परिणाम',
    agronomicScore: 'कृषि अनुकूलता स्कोर',
    optimalSeedTitle: 'सर्वोत्तम अनुशंसित बीज',
    germinationRate: 'अंकुरण क्षमता',
    daysToMaturity: 'पकने की अवधि',
    expectedYield: 'अनुमानित पैदावार',
    estimatedNetProfit: 'अनुमानित शुद्ध लाभ',
    quintals: 'क्विंटल',
    perAcre: 'प्रति एकड़',
    totalHarvest: 'कुल अनुमानित उपज',
    mandiPriceTitle: 'एगमार्कनेट लाइव मंडी भाव',
    currentModalRate: 'वर्तमान मॉडल भाव',
    mspBenchmark: 'सरकारी न्यूनतम समर्थन मूल्य (MSP)',
    highRoiTitle: 'उच्च मुनाफा वैकल्पिक फसलें',
    seasonalPlannerTitle: '1-वर्षीय बहु-फसल चक्रीय योजना',
    kharifSeason: 'खरीफ (मानसून)',
    rabiSeason: 'रबी (सर्दियां)',
    zaidSeason: 'जायद (गर्मी)',
    soilHealthTitle: 'मृदा स्वास्थ्य एवं पोषक तत्व कार्ड',
    weatherForecastTitle: '7-दिवसीय मौसम एवं छिड़काव सलाह',
    aiAdvisoryNotes: 'AI कृषि विशेषज्ञ महत्वपूर्ण परामर्श',
    exportAdvisory: 'खेत सलाह पत्र प्रिंट / डाउनलोड करें',
  },

  pa: {
    appName: 'AgriTech',
    appSubtitle: 'ਸ਼ੁੱਧ ਖੇਤੀਬਾੜੀ ਅਤੇ ਬੀਜ ਸਿਫ਼ਾਰਸ਼ ਪ੍ਰਣਾਲੀ',
    offlineMode: 'ਔਫਲਾਈਨ ਮੋਡ (ਕੈਸ਼ ਡਾਟਾ)',
    onlineMode: 'ਲਾਈਵ ਐਗਰੀ ਨੈੱਟਵਰਕ ਜੁੜਿਆ ਹੋਇਆ ਹੈ',
    voiceAssistant: 'ਆਵਾਜ਼ ਸਹਾਇਕ',
    tapToSpeak: 'ਆਪਣੇ ਖੇਤ ਬਾਰੇ ਬੋਲਣ ਲਈ ਦਬਾਓ...',
    listening: 'ਸੁਣ ਰਿਹਾ ਹੈ... (ਫ਼ਸਲ, ਜ਼ਿਲ੍ਹਾ ਜਾਂ ਏਕੜ ਬੋਲੋ)',
    readAloud: 'ਖੇਤੀ ਸਲਾਹ ਸੁਣੋ',
    stopAudio: 'ਆਵਾਜ਼ ਬੰਦ ਕਰੋ',
    saveOffline: 'ਔਫਲਾਈਨ ਵਰਤੋਂ ਲਈ ਸੇਵ ਕਰੋ',
    planSavedOffline: 'ਖੇਤੀ ਯੋਜਨਾ ਸੁਰੱਖਿਅਤ ਹੋ ਗਈ! ਬਿਨਾਂ ਇੰਟਰਨੈਟ ਦੇ ਦੇਖ ਸਕਦੇ ਹੋ।',
    viewSavedPlans: 'ਸੇਵ ਕੀਤੀਆਂ ਯੋਜਨਾਵਾਂ',
    noSavedPlans: 'ਕੋਈ ਯੋਜਨਾ ਸੇਵ ਨਹੀਂ ਹੈ। ਯੋਜਨਾ ਬਣਾ ਕੇ ਸੇਵ ਕਰੋ।',

    tabOverview: 'ਜਾਇਜ਼ਾ',
    tabSeed: 'ਸਭ ਤੋਂ ਵਧੀਆ ਬੀਜ',
    tabSoilScanner: 'AI ਮਿੱਟੀ ਸਕੈਨਰ',
    tabMandi: 'ਮੰਡੀ ਭਾਅ ਅਤੇ MSP',
    tabWeather: 'ਮੌਸਮ ਜਾਣਕਾਰੀ',
    tabSeasonalPlanner: '1-ਸਾਲਾ ਫ਼ਸਲੀ ਚੱਕਰ',
    tabRoiYield: 'ਉਪਜ ਅਤੇ ਮੁਨਾਫ਼ਾ',

    scanSoilButton: 'ਮਿੱਟੀ ਦੀ ਫ਼ੋਟੋ ਸਕੈਨ ਕਰੋ',
    soilScannerTitle: 'AgriTech AI ਮਿੱਟੀ ਜਾਂਚ ਅਤੇ ਬੀਜ ਭਵਿੱਖਬਾਣੀ',
    soilScannerSubtitle: 'ਖੇਤ ਦੀ ਮਿੱਟੀ ਦੀ ਫ਼ੋਟੋ ਖਿੱਚੋ • ਕੰਪਿਊਟਰ ਵਿਜ਼ਨ ਮਿੱਟੀ ਪਰਖਦਾ ਹੈ • ਮੌਸਮ ਅਨੁਸਾਰ ਵਧੀਆ ਬੀਜ ਦੱਸਦਾ ਹੈ',
    liveCamera: 'ਲਾਈਵ ਕੈਮਰਾ',
    galleryUpload: 'ਗੈਲਰੀ ਵਿੱਚੋਂ ਚੁਣੋ',
    sampleSoils: 'ਮਿੱਟੀ ਦੇ ਨਮੂਨੇ',
    detectedSoil: 'ਪਛਾਣੀ ਗਈ ਮਿੱਟੀ',
    confidence: 'ਸਹੀ ਹੋਣ ਦੀ ਦਰ',
    predictedSeedCultivar: 'AI ਸਿਫ਼ਾਰਸ਼ ਕੀਤਾ ਬੀਜ',
    applyToDashboard: 'ਖੇਤੀ ਡੈਸ਼ਬੋਰਡ ਵਿੱਚ ਲਾਗੂ ਕਰੋ',
    autoWeather: '🌦️ ਲਾਈਵ ਮੌਸਮ',
    highMonsoon: '🌧️ ਭਾਰੀ ਮੀਂਹ (>1100 mm)',
    moderateRain: '⛅ ਦਰਮਿਆਨਾ ਮੀਂਹ (600–900 mm)',
    lowAridRain: '☀️ ਘੱਟ ਮੀਂਹ / ਸੋਕਾ (<450 mm)',

    formTitle: 'ਖੇਤ ਅਤੇ ਜ਼ਮੀਨ ਦਾ ਵੇਰਵਾ ਦਰਜ ਕਰੋ',
    locationLabel: 'ਖੇਤ ਦਾ ਸਥਾਨ ਅਤੇ ਖੇਤਰ',
    gpsDetect: 'GPS ਰਾਹੀਂ ਸਥਾਨ ਲੱਭੋ',
    gpsDetecting: 'ਸਥਾਨ ਖੋਜਿਆ ਜਾ ਰਿਹਾ ਹੈ...',
    gpsSuccess: 'GPS ਸਥਾਨ ਪੱਕਾ ਹੋ ਗਿਆ',
    stateLabel: 'ਸੂਬਾ / ਖੇਤੀ ਜ਼ੋਨ',
    landSizeLabel: 'ਜ਼ਮੀਨ ਦਾ ਰਕਬਾ',
    waterSourceLabel: 'ਸਿੰਚਾਈ ਦਾ ਸਾਧਨ',
    waterAdequacyLabel: 'ਪਾਣੀ ਦੀ ਉਪਲਬਧਤਾ',
    targetCropLabel: 'ਮਨਪਸੰਦ ਫ਼ਸਲ (ਮਰਜ਼ੀ ਮੁਤਾਬਕ)',
    targetCropPlaceholder: 'ਫ਼ਸਲ ਚੁਣੋ (ਜਿਵੇਂ ਕਣਕ, ਝੋਨਾ, ਬਾਸਮਤੀ)',
    recommendCropButton: 'AI ਖੇਤੀ ਸਿਫ਼ਾਰਸ਼ ਹਾਸਲ ਕਰੋ',
    calculating: 'ਮਿੱਟੀ, ਮੰਡੀ ਅਤੇ ਮੌਸਮ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਚੱਲ ਰਿਹਾ ਹੈ...',
    quickPresets: 'ਤੇਜ਼ੀ ਨਾਲ ਉਦਾਹਰਣ ਚੁਣੋ',

    waterCanal: 'ਨਹਿਰੀ ਪਾਣੀ',
    waterBorewell: 'ਟਿਊਬਵੈੱਲ / ਬੋਰਵੈੱਲ',
    waterRainfed: 'ਮੀਂਹ ਆਧਾਰਿਤ (ਬਾਰਾਨੀ)',
    waterDrip: 'ਡ੍ਰਿਪ / ਫ਼ਵਾਰਾ ਸਿੰਚਾਈ',

    waterAdequate: 'ਕਾਫ਼ੀ ਪਾਣੀ',
    waterModerate: 'ਦਰਮਿਆਨਾ',
    waterScarce: 'ਘੱਟ ਪਾਣੀ',

    recommendationHeader: 'ਸ਼ੁੱਧ ਖੇਤੀਬਾੜੀ ਸਿਫ਼ਾਰਸ਼ ਨਤੀਜੇ',
    agronomicScore: 'ਖੇਤੀ ਅਨੁਕੂਲਤਾ ਸਕੋਰ',
    optimalSeedTitle: 'ਸਭ ਤੋਂ ਉੱਤਮ ਬੀਜ',
    germinationRate: 'ਜੰਮਣ ਸ਼ਕਤੀ',
    daysToMaturity: 'ਪੱਕਣ ਦਾ ਸਮਾਂ (ਦਿਨ)',
    expectedYield: 'ਅਨੁਮਾਨਿਤ ਝਾੜ',
    estimatedNetProfit: 'ਅਨੁਮਾਨਿਤ ਸ਼ੁੱਧ ਮੁਨਾਫ਼ਾ',
    quintals: 'ਕੁਇੰਟਲ',
    perAcre: 'ਪ੍ਰਤੀ ਏਕੜ',
    totalHarvest: 'ਕੁੱਲ ਅਨੁਮਾਨਿਤ ਉਪਜ',
    mandiPriceTitle: 'ਲਾਈਵ ਮੰਡੀ ਭਾਅ (Agmarknet)',
    currentModalRate: 'ਮੌਜੂਦਾ ਮਾਡਲ ਰੇਟ',
    mspBenchmark: 'ਸਰਕਾਰੀ ਘੱਟੋ-ਘੱਟ ਸਮਰਥਨ ਮੁੱਲ (MSP)',
    highRoiTitle: 'ਵੱਧ ਮੁਨਾਫ਼ਾ ਦੇਣ ਵਾਲੀਆਂ ਬਦਲਵੀਂਆਂ ਫ਼ਸਲਾਂ',
    seasonalPlannerTitle: '1-ਸਾਲਾ ਬਹੁ-ਫ਼ਸਲੀ ਚੱਕਰ ਯੋਜਨਾ',
    kharifSeason: 'ਸਾਉਣੀ (ਖਰੀਫ਼)',
    rabiSeason: 'ਹਾੜ੍ਹੀ (ਰਬੀ)',
    zaidSeason: 'ਜ਼ਾਇਦ (ਗਰਮੀਆਂ ਦੀ ਫ਼ਸਲ)',
    soilHealthTitle: 'ਮਿੱਟੀ ਸਿਹਤ ਅਤੇ ਖਾਦ ਕਾਰਡ',
    weatherForecastTitle: '7-ਦਿਨਾਂ ਮੌਸਮ ਅਤੇ ਸਪਰੇਅ ਸਲਾਹ',
    aiAdvisoryNotes: 'ਮਾਹਿਰ AI ਖੇਤੀ ਸਲਾਹ',
    exportAdvisory: 'ਖੇਤੀ ਕਾਰਡ ਪ੍ਰਿੰਟ ਕਰੋ',
  },

  te: {
    appName: 'AgriTech',
    appSubtitle: 'ఖచ్చితమైన వ్యవసాయం & విత్తన సిఫార్సు వ్యవస్థ',
    offlineMode: 'ఆఫ్‌లైన్ మోడ్ (కాష్ డేటా)',
    onlineMode: 'లైవ్ నెట్‌వర్క్ కనెక్ట్ చేయబడింది',
    voiceAssistant: 'వాయిస్ అసిస్టెంట్',
    tapToSpeak: 'మీ పొలం వివరాలు చెప్పడానికి నొక్కండి...',
    listening: 'వింటున్నాము... (పంట, రాష్ట్రం లేదా ఎకరాలు చెప్పండి)',
    readAloud: 'వ్యవసాయ సలహా వినండి',
    stopAudio: 'ఆడియో ఆపు',
    saveOffline: 'ఆఫ్‌లైన్ కోసం భద్రపరచండి',
    planSavedOffline: 'వ్యవసాయ ప్రణాళిక భద్రపరచబడింది! ఇంటర్నెట్ లేకుండా చూడవచ్చు.',
    viewSavedPlans: 'భద్రపరిచిన ప్రణాళికలు',
    noSavedPlans: 'ఎలాంటి ప్రణాళికలు లేవు. ప్రణాళికను తయారుచేసి భద్రపరచండి.',

    tabOverview: 'సమీక్ష',
    tabSeed: 'ఉత్తమ విత్తనం',
    tabSoilScanner: 'AI మట్టి స్కానర్',
    tabMandi: 'మార్కెట్ ధరలు & MSP',
    tabWeather: 'వాతావరణ సూచన',
    tabSeasonalPlanner: '1-సంవత్సర పంట ప్రణాళిక',
    tabRoiYield: 'దిగుబడి & లాభ విశ్లేషణ',

    scanSoilButton: 'మట్టి ఫోటో స్కాన్ చేయండి',
    soilScannerTitle: 'AgriTech AI మట్టి విశ్లేషణ & విత్తన అంచనా',
    soilScannerSubtitle: 'మట్టి ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి • కంప్యూటర్ విజన్ మట్టిని విశ్లేషిస్తుంది • సరైన విత్తనాలను సూచిస్తుంది',
    liveCamera: 'లైవ్ కెమెరా',
    galleryUpload: 'గ్యాలరీ నుండి ఎంచుకోండి',
    sampleSoils: 'మట్టి నమూనాలు',
    detectedSoil: 'గుర్తించబడిన నేల రకం',
    confidence: 'ఖచ్చితత్వం',
    predictedSeedCultivar: 'AI సిఫార్సు చేసిన ఉత్తమ విత్తనం',
    applyToDashboard: 'డ్యాష్‌బోర్డ్‌కు వర్తింపజేయండి',
    autoWeather: '🌦️ లైవ్ వాతావరణం',
    highMonsoon: '🌧️ భారీ వర్షాలు (>1100 మి.మీ)',
    moderateRain: '⛅ సాధారణ వర్షం (600–900 మి.మీ)',
    lowAridRain: '☀️ తక్కువ వర్షం / బెట్ట (<450 మి.మీ)',

    formTitle: 'వ్యవసాయ భూమి వివరాలు నమోదు చేయండి',
    locationLabel: 'క్షేత్ర ప్రాంతం మరియు జిల్లా',
    gpsDetect: 'GPS ద్వారా గుర్తించండి',
    gpsDetecting: 'లొకేషన్ శోధిస్తోంది...',
    gpsSuccess: 'GPS లొకేషన్ ఖరారైంది',
    stateLabel: 'రాష్ట్రం / వ్యవసాయ జోన్',
    landSizeLabel: 'భూమి విస్తీర్ణం',
    waterSourceLabel: 'నీటి వనరు',
    waterAdequacyLabel: 'నీటి లభ్యత స్థాయి',
    targetCropLabel: 'లక్ష్య పంట (ఐచ్ఛికం)',
    targetCropPlaceholder: 'పంటను ఎంచుకోండి లేదా టైప్ చేయండి (ఉదా: మిరప, పత్తి, వరి)',
    recommendCropButton: 'AI పంట సిఫార్సు పొందండి',
    calculating: 'నేల, మార్కెట్ మరియు వాతావరణ సమాచారం విశ్లేషిస్తోంది...',
    quickPresets: 'శీఘ్ర ప్రాంతీయ నమూనాలు',

    waterCanal: 'కాలువ నీరు',
    waterBorewell: 'బోరుబావి / బావి',
    waterRainfed: 'వర్షాధారం (మెట్ట భూమి)',
    waterDrip: 'బిందు / తుంపర సేద్యం',

    waterAdequate: 'సమృద్ధిగా ఉంది',
    waterModerate: 'మధ్యస్థం',
    waterScarce: 'కొరత / బెట్ట',

    recommendationHeader: 'ఖచ్చితమైన వ్యవసాయ సిఫార్సు ఫలితాలు',
    agronomicScore: 'సాగు అనుకూలత స్కోరు',
    optimalSeedTitle: 'సిఫార్సు చేయబడిన ఉత్తమ విత్తనం',
    germinationRate: 'మొలక శాతం',
    daysToMaturity: 'పంట కాలం (రోజులు)',
    expectedYield: 'ఆశించిన దిగుబడి',
    estimatedNetProfit: 'అంచనా నికర లాభం',
    quintals: 'క్వింటాళ్లు',
    perAcre: 'ఎకరాకు',
    totalHarvest: 'మొత్తం దిగుబడి',
    mandiPriceTitle: 'లైవ్ మార్కెట్ ధరలు (Agmarknet)',
    currentModalRate: 'ప్రస్తుత మోడల్ ధర',
    mspBenchmark: 'ప్రభుత్వ మద్దతు ధర (MSP)',
    highRoiTitle: 'అధిక లాభదాయక ప్రత్యామ్నాయ పంటలు',
    seasonalPlannerTitle: '1-సంవత్సర బహుళ పంట మార్పిడి ప్రణాళిక',
    kharifSeason: 'ఖరీఫ్ (వర్షాకాలం)',
    rabiSeason: 'రబీ (శీతాకాలం)',
    zaidSeason: 'జాయెద్ (వేసవి పంట)',
    soilHealthTitle: 'నేల ఆరోగ్య & పోషకాల కార్డు',
    weatherForecastTitle: '7 రోజుల వాతావరణం & పిచికారీ సలహా',
    aiAdvisoryNotes: 'AI వ్యవసాయ శాస్త్రవేత్త కీలక సలహాలు',
    exportAdvisory: 'కార్డు ప్రింట్ / సేవ్ చేయండి',
  },

  mr: {
    appName: 'AgriTech',
    appSubtitle: 'अचूक शेती आणि प्रगत बियाणे शिफारस प्रणाली',
    offlineMode: 'ऑफलाइन मोड (जतन केलेला डेटा)',
    onlineMode: 'थेट कृषी नेटवर्क जोडलेले आहे',
    voiceAssistant: 'व्हॉइस असिस्टंट (मराठी आवाज)',
    tapToSpeak: 'शेतीची माहिती बोलण्यासाठी येथे टॅप करा...',
    listening: 'ऐकत आहे... (उदा. सोयाबीन, नाशिक, ५ एकर बोला)',
    readAloud: 'शेती सल्ला ऐका (मराठीत)',
    stopAudio: 'आवाज थांबवा',
    saveOffline: 'ऑफलाइन वापरासाठी जतन करा',
    planSavedOffline: 'शेती योजना जतन केली! इंटरनेट नसतानाही शेतात पाहू शकता.',
    viewSavedPlans: 'जतन केलेल्या सर्व योजना',
    noSavedPlans: 'कोणतीही योजना जतन केलेली नाही. नवीन योजना तयार करून जतन करा.',

    tabOverview: 'आढावा',
    tabSeed: 'उत्कृष्ट बियाणे',
    tabSoilScanner: 'AI माती स्कॅनर',
    tabMandi: 'बाजारभाव आणि MSP',
    tabWeather: 'हवामान अंदाज',
    tabSeasonalPlanner: '१-वर्षीय पीक फेरपालट',
    tabRoiYield: 'उत्पादन आणि नफा विश्लेषण',

    scanSoilButton: 'मातीचा फोटो स्कॅन करा',
    soilScannerTitle: 'AgriTech AI माती दृष्टी आणि बियाणे अंदाज',
    soilScannerSubtitle: 'शेतातील मातीचा फोटो काढा किंवा अपलोड करा • संगणक दृष्टी मातीचे पृथक्करण करते • स्थानिक पाऊस आणि हवामानानुसार जास्त उत्पादन देणारे बियाणे सुचवते',
    liveCamera: 'थेट कॅमेरा',
    galleryUpload: 'गॅलरीमधून फोटो निवडा',
    sampleSoils: 'मातीचे नमुने (१-टॅप टेस्ट)',
    detectedSoil: 'शोधलेला मातीचा प्रकार',
    confidence: 'AI अचूकता',
    predictedSeedCultivar: 'AI शिफारस केलेले सर्वोत्तम बियाणे जात',
    applyToDashboard: 'शेती डॅशबोर्डवर लागू करा आणि संपूर्ण नफा मोजा',
    autoWeather: '🌦️ थेट हवामान अंदाज',
    highMonsoon: '🌧️ मुसळधार पाऊस (>११०० मिमी)',
    moderateRain: '⛅ मध्यम पाऊस (६००-९०० मिमी)',
    lowAridRain: '☀️ कमी पाऊस / दुष्काळ प्रवण (<४५० मिमी)',

    formTitle: 'शेती आणि जमिनीचा तपशील प्रविष्ट करा',
    locationLabel: 'शेताचे ठिकाण व जिल्हा',
    gpsDetect: 'GPS द्वारे थेट शेत शोधा',
    gpsDetecting: 'शेताचे ठिकाण शोधत आहे...',
    gpsSuccess: 'GPS स्थान निश्चित झाले',
    stateLabel: 'राज्य / कृषी हवामान विभाग',
    landSizeLabel: 'जमिनीचे क्षेत्रफळ (एकर)',
    waterSourceLabel: 'पाण्याचा मुख्य स्त्रोत',
    waterAdequacyLabel: 'पाणी उपलब्धता पातळी',
    targetCropLabel: 'इच्छित पीक (पर्यायी)',
    targetCropPlaceholder: 'पीक निवडा किंवा टाइप करा (उदा. सोयाबीन, कांदा, कापूस, हरभरा)',
    recommendCropButton: 'AI अचूक कृषी शिफारस मिळवा',
    calculating: 'माती, बाजारभाव व हवामानाचे सखोल विश्लेषण सुरू आहे...',
    quickPresets: 'महाराष्ट्रातील जलद प्रादेशिक पर्याय',

    waterCanal: 'कालवा / पाटबंधारे सिंचन',
    waterBorewell: 'कूपनलिका / बोअरवेल / विहीर',
    waterRainfed: 'जिरायती (पावसावर अवलंबून)',
    waterDrip: 'ठिबक / तुषार सिंचन',

    waterAdequate: 'मुबलक पाणी (भरपूर)',
    waterModerate: 'मध्यम पाणी (वेळेवर)',
    waterScarce: 'कमी पाणी / कोरडवाहू दुष्काळ',

    recommendationHeader: 'अचूक शेती शिफारस निकाल',
    agronomicScore: 'कृषी अनुकूलता स्कोअर',
    optimalSeedTitle: 'सर्वोत्तम शिफारस केलेले बियाणे जात',
    germinationRate: 'प्रमाणित उगवण क्षमता',
    daysToMaturity: 'पक्व होण्याचा कालावधी',
    expectedYield: 'अपेक्षित उत्पादन',
    estimatedNetProfit: 'अंदाज निव्वळ नफा',
    quintals: 'क्विंटल',
    perAcre: 'प्रति एकर',
    totalHarvest: 'एकूण अपेक्षित उत्पादन',
    mandiPriceTitle: 'एगमार्कनेट थेट कृषी उत्पन्न बाजारभाव',
    currentModalRate: 'सध्याचा मॉडेल भाव',
    mspBenchmark: 'किमान आधारभूत किंमत (MSP)',
    highRoiTitle: 'अधिक नफा देणारी पर्यायी पिके',
    seasonalPlannerTitle: '१-वर्षीय बहु-पीक फेरपालट नियोजन',
    kharifSeason: 'खरीप हंगाम (पावसाळा)',
    rabiSeason: 'रब्बी हंगाम (हिवाळा)',
    zaidSeason: 'उन्हाळी हंगाम (कॅश क्रॉप)',
    soilHealthTitle: 'मृदा आरोग्य व खत व्यवस्थापन कार्ड',
    weatherForecastTitle: '७-दिवसीय हवामान आणि फवारणी सल्ला',
    aiAdvisoryNotes: 'AI तज्ज्ञ कृषी शास्त्रज्ञांच्या महत्त्वाच्या सूचना',
    exportAdvisory: 'शेती सल्ला पत्रक प्रिंट / डाउनलोड करा',
  },

  gu: {
    appName: 'AgriTech',
    appSubtitle: 'ચોક્કસ કૃષિ અને બિયારણ ભલામણ સિસ્ટમ',
    offlineMode: 'ઑફલાઇન મોડ (સાચવેલો ડેટા)',
    onlineMode: 'લાઈવ કૃષિ નેટવર્ક જોડાયેલ છે',
    voiceAssistant: 'વૉઇસ આસિસ્ટન્ટ',
    tapToSpeak: 'ખેતરની વિગત બોલવા માટે દબાવો...',
    listening: 'સાંભળી રહ્યા છીએ... (પાક, જિલ્લો અથવા એકર બોલો)',
    readAloud: 'ખેતી સલાહ સાંભળો',
    stopAudio: 'ઑડિયો બંધ કરો',
    saveOffline: 'ઑફલાઇન માટે સાચવો',
    planSavedOffline: 'ખેતી યોજના સાચવવામાં આવી! ઇન્ટરનેટ વિના પણ જોઈ શકાય છે.',
    viewSavedPlans: 'સાચવેલી યોજનાઓ',
    noSavedPlans: 'કોઈ યોજના સાચવેલી નથી. યોજના બનાવી સાચવો.',

    tabOverview: 'વિહંગાવલોકન',
    tabSeed: 'શ્રેષ્ઠ બિયારણ',
    tabSoilScanner: 'AI માટી સ્કેનર',
    tabMandi: 'બજાર ભાવ અને MSP',
    tabWeather: 'હવામાન આગાહી',
    tabSeasonalPlanner: '1-વાર્ષિક પાક ચક્ર',
    tabRoiYield: 'ઉપજ અને નફો',

    scanSoilButton: 'માટીનો ફોટો સ્કેન કરો',
    soilScannerTitle: 'AgriTech AI માટી વિશ્લેષણ અને બિયારણ આગાહી',
    soilScannerSubtitle: 'માટીનો ફોટો લો અથવા અપલોડ કરો • કમ્પ્યુટર વિઝન માટી ઓળખે છે • શ્રેષ્ઠ બિયારણ સૂચવે છે',
    liveCamera: 'લાઈવ કેમેરા',
    galleryUpload: 'ગેલેરીમાંથી પસંદ કરો',
    sampleSoils: 'માટીના નમૂના',
    detectedSoil: 'ઓળખાયેલ માટીનો પ્રકાર',
    confidence: 'ચોકસાઈ',
    predictedSeedCultivar: 'AI ભલામણ કરેલ બિયારણ',
    applyToDashboard: 'ડેશબોર્ડ પર લાગુ કરો',
    autoWeather: '🌦️ લાઈવ હવામાન',
    highMonsoon: '🌧️ ભારે વરસાદ (>1100 mm)',
    moderateRain: '⛅ મધ્યમ વરસાદ (600–900 mm)',
    lowAridRain: '☀️ ઓછો વરસાદ / દુષ્કાળ (<450 mm)',

    formTitle: 'ખેતર અને જમીનની વિગતો દાખલ કરો',
    locationLabel: 'ખેતરનું સ્થળ અને જિલ્લો',
    gpsDetect: 'GPS દ્વારા શોધો',
    gpsDetecting: 'શોધી રહ્યું છે...',
    gpsSuccess: 'GPS સ્થાન નક્કી થયું',
    stateLabel: 'રાજ્ય / કૃષિ ઝોન',
    landSizeLabel: 'જમીનનું ક્ષેત્રફળ (એકર)',
    waterSourceLabel: 'સિંચાઈનો મુખ્ય સ્ત્રોત',
    waterAdequacyLabel: 'પાણીની ઉપલબ્ધતા',
    targetCropLabel: 'ઇચ્છિત પાક (વૈકલ્પિક)',
    targetCropPlaceholder: 'પાક પસંદ કરો (દા.ત. કપાસ, મગફળી, સોયાબીન)',
    recommendCropButton: 'AI કૃષિ ભલામણ મેળવો',
    calculating: 'માટી, બજારભાવ અને હવામાનનું વિશ્લેષણ શરૂ છે...',
    quickPresets: 'ઝડપી પ્રાદેશિક વિકલ્પો',

    waterCanal: 'નહેર સિંચાઈ',
    waterBorewell: 'બોરવેલ / કૂવો',
    waterRainfed: 'વરસાદ આધારિત (બિનપિયત)',
    waterDrip: 'ટપક / ફુવારા પદ્ધતિ',

    waterAdequate: 'પૂરતું પાણી',
    waterModerate: 'મધ્યમ',
    waterScarce: 'ઓછું પાણી',

    recommendationHeader: 'ચોક્કસ કૃષિ ભલામણ પરિણામ',
    agronomicScore: 'કૃષિ અનુકૂળતા સ્કોર',
    optimalSeedTitle: 'સર્વોત્તમ બિયારણ જાત',
    germinationRate: 'ઉગાવાની ક્ષમતા',
    daysToMaturity: 'પાકવાનો સમય (દિવસ)',
    expectedYield: 'અંદાજિત ઉત્પાદન',
    estimatedNetProfit: 'અંદાજિત ચોખ્ખો નફો',
    quintals: 'ક્વિન્ટલ',
    perAcre: 'પ્રતિ એકર',
    totalHarvest: 'કુલ અંદાજિત ઉપજ',
    mandiPriceTitle: 'લાઈવ બજાર ભાવ (Agmarknet)',
    currentModalRate: 'વર્તમાન મોડેલ ભાવ',
    mspBenchmark: 'ટેકાના ભાવ (MSP)',
    highRoiTitle: 'વધુ નફો આપતા વૈકલ્પિક પાકો',
    seasonalPlannerTitle: '1-વાર્ષિક પાક ફેરબદલી યોજના',
    kharifSeason: 'ચોમાસુ (ખરીફ)',
    rabiSeason: 'શિયાળુ (રવિ)',
    zaidSeason: 'ઉનાળુ (જાયદ)',
    soilHealthTitle: 'જમીન આરોગ્ય અને ખાતર કાર્ડ',
    weatherForecastTitle: '7-દિવસનું હવામાન અને છંટકાવ સલાહ',
    aiAdvisoryNotes: 'AI નિષ્ણાત કૃષિ સલાહ',
    exportAdvisory: 'કૃષિ કાર્ડ પ્રિન્ટ કરો',
  },
};
