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
  tabMandi: string;
  tabWeather: string;
  tabSeasonalPlanner: string;
  tabRoiYield: string;

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
    tabMandi: 'Mandi Market & MSP',
    tabWeather: 'Hyper-Local Weather',
    tabSeasonalPlanner: '1-Year Crop Planner',
    tabRoiYield: 'Yield & ROI Analytics',

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
    appName: 'एग्रीटेक',
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
    tabMandi: 'मंडी भाव व MSP',
    tabWeather: 'मौसम पूर्वानुमान',
    tabSeasonalPlanner: '1-वर्षीय फसल चक्र',
    tabRoiYield: 'उपज और आय विश्लेषण',

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
    waterBorewell: 'नलकूप / ट्यूबवेल',
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
    appName: 'ਐਗਰੀਟੈਕ',
    appSubtitle: 'ਸ਼ੁੱਧ ਖੇਤੀਬਾੜੀ ਅਤੇ ਬੀਜ ਸਿਫ਼ਾਰਸ਼ ਪ੍ਰਣਾਲੀ',
    offlineMode: 'ਔਫਲਾਈਨ ਮੋਡ (ਕੈਸ਼ ਡਾਟਾ)',
    onlineMode: 'ਲਾਈਵ ਐਗਰੀ ਨੈੱਟਵਰਕ ਜੁੜਿਆ ਹੋਇਆ ਹੈ',
    voiceAssistant: 'ਆਵਾਜ਼ ਸਹਾਇਕ',
    tapToSpeak: 'ਆਪਣੇ ਖੇਤ ਬਾਰੇ ਬੋਲਣ ਲਈ ਦਬਾਓ...',
    listening: 'ਸੁਣ ਰਿਹਾ ਹੈ... (ਫ਼ਸਲ ਜਾਂ ਏਕੜ ਬੋਲੋ)',
    readAloud: 'ਖੇਤੀ ਸਲਾਹ ਸੁਣੋ',
    stopAudio: 'ਆਡੀਓ ਰੋਕੋ',
    saveOffline: 'ਔਫਲਾਈਨ ਲਈ ਸੰਭਾਲੋ',
    planSavedOffline: 'ਖੇਤੀ ਯੋਜਨਾ ਸੰਭਾਲੀ ਗਈ! ਇੰਟਰਨੈੱਟ ਤੋਂ ਬਿਨਾਂ ਵੀ ਉਪਲਬਧ।',
    viewSavedPlans: 'ਸੰਭਾਲੀਆਂ ਗਈਆਂ ਯੋਜਨਾਵਾਂ',
    noSavedPlans: 'ਕੋਈ ਯੋਜਨਾ ਨਹੀਂ ਮਿਲੀ। ਨਵੀਂ ਯੋਜਨਾ ਬਣਾ ਕੇ ਸੰਭਾਲੋ।',

    tabOverview: 'ਸੰਖੇਪ',
    tabSeed: 'ਉੱਤਮ ਬੀਜ',
    tabMandi: 'ਮੰਡੀ ਭਾਅ ਅਤੇ MSP',
    tabWeather: 'ਮੌਸਮ ਜਾਣਕਾਰੀ',
    tabSeasonalPlanner: '1-ਸਾਲਾ ਫ਼ਸਲ ਚੱਕਰ',
    tabRoiYield: 'ਝਾੜ ਅਤੇ ਮੁਨਾਫ਼ਾ ਵਿਸ਼ਲੇਸ਼ਣ',

    formTitle: 'ਜ਼ਮੀਨ ਅਤੇ ਖੇਤੀ ਵੇਰਵੇ ਦਰਜ ਕਰੋ',
    locationLabel: 'ਖੇਤ ਦੀ ਸਥਿਤੀ ਅਤੇ ਖੇਤਰ',
    gpsDetect: 'GPS ਰਾਹੀਂ ਸਥਾਨ ਲੱਭੋ',
    gpsDetecting: 'ਸਥਾਨ ਲੱਭਿਆ ਜਾ ਰਿਹਾ ਹੈ...',
    gpsSuccess: 'GPS ਸਥਾਨ ਪੁਸ਼ਟ ਹੋਇਆ',
    stateLabel: 'ਸੂਬਾ / ਖੇਤੀ ਜ਼ੋਨ',
    landSizeLabel: 'ਜ਼ਮੀਨ ਦਾ ਰਕਬਾ',
    waterSourceLabel: 'ਸਿੰਚਾਈ ਦਾ ਮੁੱਖ ਸਾਧਨ',
    waterAdequacyLabel: 'ਪਾਣੀ ਦੀ ਉਪਲਬਧਤਾ',
    targetCropLabel: 'ਨਿਸ਼ਾਨਾ ਫ਼ਸਲ (ਵਿਕਲਪਿਕ)',
    targetCropPlaceholder: 'ਫ਼ਸਲ ਚੁਣੋ (ਜਿਵੇਂ ਕਣਕ, ਬਾਸਮਤੀ, ਨਰਮਾ)',
    recommendCropButton: 'AI ਖੇਤੀ ਸਿਫ਼ਾਰਸ਼ ਪ੍ਰਾਪਤ ਕਰੋ',
    calculating: 'ਮਿੱਟੀ, ਮੰਡੀ ਅਤੇ ਮੌਸਮ ਦੀ ਜਾਂਚ ਹੋ ਰਹੀ ਹੈ...',
    quickPresets: 'ਤੇਜ਼ ਖੇਤਰੀ ਪ੍ਰੀਸੈੱਟ',

    waterCanal: 'ਨਹਿਰੀ ਪਾਣੀ',
    waterBorewell: 'ਟਿਊਬਵੈੱਲ / ਬੋਰਵੈੱਲ',
    waterRainfed: 'ਬਰਸਾਤੀ (ਬਾਰਾਨੀ)',
    waterDrip: 'ਡ੍ਰਿੱਪ / ਫੁਹਾਰਾ ਸਿੰਚਾਈ',

    waterAdequate: 'ਕਾਫ਼ੀ (ਵੱਧ)',
    waterModerate: 'ਦਰਮਿਆਨਾ',
    waterScarce: 'ਘੱਟ ਪਾਣੀ',

    recommendationHeader: 'ਸਹੀ ਖੇਤੀਬਾੜੀ ਸਿਫ਼ਾਰਸ਼ ਨਤੀਜੇ',
    agronomicScore: 'ਖੇਤੀ ਅਨੁਕੂਲਤਾ ਸਕੋਰ',
    optimalSeedTitle: 'ਸਭ ਤੋਂ ਵਧੀਆ ਬੀਜ ਕਿਸਮ',
    germinationRate: 'ਉੱਗਣ ਸ਼ਕਤੀ',
    daysToMaturity: 'ਪੱਕਣ ਦੇ ਦਿਨ',
    expectedYield: 'ਅਨੁਮਾਨਿਤ ਝਾੜ',
    estimatedNetProfit: 'ਅਨੁਮਾਨਿਤ ਸ਼ੁੱਧ ਮੁਨਾਫ਼ਾ',
    quintals: 'ਕੁਇੰਟਲ',
    perAcre: 'ਪ੍ਰਤੀ ਏਕੜ',
    totalHarvest: 'ਕੁੱਲ ਅਨੁਮਾਨਿਤ ਉਤਪਾਦਨ',
    mandiPriceTitle: 'ਐਗਮਾਰਕਨੈੱਟ ਲਾਈਵ ਮੰਡੀ ਰੇਟ',
    currentModalRate: 'ਮੌਜੂਦਾ ਮਾਡਲ ਭਾਅ',
    mspBenchmark: 'ਸਰਕਾਰੀ ਸਰਕਾਰੀ ਐੱਮ.ਐੱਸ.ਪੀ (MSP)',
    highRoiTitle: 'ਵੱਧ ਮੁਨਾਫ਼ੇ ਵਾਲੀਆਂ ਬਦਲਵੀਂਆਂ ਫ਼ਸਲਾਂ',
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
    appName: 'అగ్రిటెక్',
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
    tabMandi: 'మార్కెట్ ధరలు & MSP',
    tabWeather: 'వాతావరణ సూచన',
    tabSeasonalPlanner: '1-సంవత్సర పంట ప్రణాళిక',
    tabRoiYield: 'దిగుబడి & లాభ విశ్లేషణ',

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
    waterBorewell: 'బోరుబావి',
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
    appName: 'ॲग्रीटेक',
    appSubtitle: 'अचूक शेती आणि बियाणे शिफारस प्रणाली',
    offlineMode: 'ऑफलाइन मोड (कॅश डेटा)',
    onlineMode: 'थेट कृषी नेटवर्क जोडलेले',
    voiceAssistant: 'व्हॉइस असिस्टंट',
    tapToSpeak: 'शेतीची माहिती बोलण्यासाठी टॅप करा...',
    listening: 'ऐकत आहे... (पीक, राज्य किंवा एकर बोला)',
    readAloud: 'शेती सल्ला ऐका',
    stopAudio: 'ऑडिओ थांबवा',
    saveOffline: 'ऑफलाइन वापरासाठी जतन करा',
    planSavedOffline: 'शेती योजना जतन केली! इंटरनेट नसतानाही पाहू शकता.',
    viewSavedPlans: 'जतन केलेल्या योजना',
    noSavedPlans: 'जतन केलेली कोणतीही योजना नाही. योजना तयार करून जतन करा.',

    tabOverview: 'आढावा',
    tabSeed: 'उत्कृष्ट बियाणे',
    tabMandi: 'बाजारभाव आणि MSP',
    tabWeather: 'हवामान अंदाज',
    tabSeasonalPlanner: '१-वर्षीय पीक फेरपालट',
    tabRoiYield: 'उत्पादन आणि नफा विश्लेषण',

    formTitle: 'शेती आणि जमिनीचा तपशील प्रविष्ट करा',
    locationLabel: 'शेताचे ठिकाण व जिल्हा',
    gpsDetect: 'GPS द्वारे शोधा',
    gpsDetecting: 'ठिकाण शोधत आहे...',
    gpsSuccess: 'GPS ठिकाण निश्चित झाले',
    stateLabel: 'राज्य / कृषी हवामान विभाग',
    landSizeLabel: 'जमिनीचे क्षेत्रफळ',
    waterSourceLabel: 'पाण्याचा मुख्य स्त्रोत',
    waterAdequacyLabel: 'पाणी उपलब्धता पातळी',
    targetCropLabel: 'इच्छित पीक (पर्यायी)',
    targetCropPlaceholder: 'पीक निवडा किंवा टाइप करा (उदा. सोयाबीन, कांदा, कापूस)',
    recommendCropButton: 'AI कृषी शिफारस मिळवा',
    calculating: 'माती, बाजारभाव व हवामानाचे विश्लेषण सुरू आहे...',
    quickPresets: 'जलद प्रादेशिक पर्याय',

    waterCanal: 'कालवा सिंचन',
    waterBorewell: 'कूपनलिका / बोअरवेल',
    waterRainfed: 'जिरायती / पावसावर आधारित',
    waterDrip: 'ठिबक / तुषार सिंचन',

    waterAdequate: 'मुबलक पाणी',
    waterModerate: 'मध्यम',
    waterScarce: 'कमी / दुष्काळ प्रवण',

    recommendationHeader: 'अचूक शेती सल्ला निकाल',
    agronomicScore: 'कृषी अनुकूलता स्कोअर',
    optimalSeedTitle: 'सर्वोत्तम शिफारस केलेले बियाणे',
    germinationRate: 'उगवण क्षमता',
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
    kharifSeason: 'खरीप (पावसाळा)',
    rabiSeason: 'रब्बी (हिवाळा)',
    zaidSeason: 'उन्हाळी (हंगामी पीक)',
    soilHealthTitle: 'मृदा आरोग्य व खत व्यवस्थापन कार्ड',
    weatherForecastTitle: '७-दिवसीय हवामान आणि फवारणी सल्ला',
    aiAdvisoryNotes: 'AI तज्ज्ञ कृषी सल्लागार सूचना',
    exportAdvisory: 'सल्ला कार्ड प्रिंट करा',
  },

  gu: {
    appName: 'એગ્રીટેક',
    appSubtitle: 'ચોકસાઈભરી ખેતી અને બિયારણ ભલામણ પ્રણાલી',
    offlineMode: 'ઑફલાઇન મોડ (કેશ્ડ ડેટા)',
    onlineMode: 'લાઇવ નેટવર્ક કનેક્ટેડ',
    voiceAssistant: 'વૉઇસ આસિસ્ટન્ટ',
    tapToSpeak: 'ખેતરની વિગત બોલવા માટે દબાવો...',
    listening: 'સાંભળી રહ્યા છીએ... (પાક, રાજ્ય અથવા એકર બોલો)',
    readAloud: 'ખેતી સલાહ સાંભળો',
    stopAudio: 'ઑડિયો બંધ કરો',
    saveOffline: 'ઑફલાઇન માટે સેવ કરો',
    planSavedOffline: 'ખેતી પ્લાન સેવ થયો! ઇન્ટરનેટ વગર પણ જોઈ શકો છો.',
    viewSavedPlans: 'સેવ કરેલા પ્લાન',
    noSavedPlans: 'હજુ કોઈ સેવ પ્લાન નથી. નવો પ્લાન બનાવી સેવ કરો.',

    tabOverview: 'વિહંગાવલોકન',
    tabSeed: 'શ્રેષ્ઠ બિયારણ',
    tabMandi: 'માર્કેટ ભાવ અને MSP',
    tabWeather: 'હવામાન આગાહી',
    tabSeasonalPlanner: '1-વર્ષીય પાક ચક્ર',
    tabRoiYield: 'ઉત્પાદન અને નફા વિશ્લેષણ',

    formTitle: 'જમીન અને ખેતીની વિગતો દાખલ કરો',
    locationLabel: 'ખેતરનું સ્થળ અને જિલ્લો',
    gpsDetect: 'GPS દ્વારા શોધો',
    gpsDetecting: 'સ્થળ શોધી રહ્યા છીએ...',
    gpsSuccess: 'GPS સ્થળ નક્કી થયું',
    stateLabel: 'રાજ્ય / કૃષિ ઝોન',
    landSizeLabel: 'જમીનનું માપ',
    waterSourceLabel: 'સિંચાઈનો મુખ્ય સ્ત્રોત',
    waterAdequacyLabel: 'પાણીની ઉપલબ્ધતા',
    targetCropLabel: 'ઇચ્છિત પાક (વૈકલ્પિક)',
    targetCropPlaceholder: 'પાક પસંદ કરો (દા.ત. કપાસ, મગફળી, જીરું)',
    recommendCropButton: 'AI ખેતી ભલામણ મેળવો',
    calculating: 'જમીન, માર્કેટ અને હવામાનનું વિશ્લેષણ ચાલુ છે...',
    quickPresets: 'ઝડપી પ્રાદેશિક નમૂના',

    waterCanal: 'કેનાલ પિયત',
    waterBorewell: 'બોરવેલ / કૂવો',
    waterRainfed: 'વરસાદ આધારિત (બિનપિયત)',
    waterDrip: 'ટપક / ફુવારા પદ્ધતિ',

    waterAdequate: 'પૂરતું પાણી',
    waterModerate: 'મધ્યમ',
    waterScarce: 'ઓછું પાણી / અછત',

    recommendationHeader: 'ચોકસાઈભરી કૃષિ ભલામણ પરિણામ',
    agronomicScore: 'કૃષિ અનુકૂળતા સ્કોર',
    optimalSeedTitle: 'શ્રેષ્ઠ ભલામણ કરેલ બિયારણ',
    germinationRate: 'ઉગાવો ક્ષમતા',
    daysToMaturity: 'પાકવાનો સમય (દિવસો)',
    expectedYield: 'અપેક્ષિત ઉત્પાદન',
    estimatedNetProfit: 'અંદાજિત ચોખ્ખો નફો',
    quintals: 'ક્વિન્ટલ',
    perAcre: 'પ્રતિ એકર',
    totalHarvest: 'કુલ અપેક્ષિત ઉત્પાદન',
    mandiPriceTitle: 'એગમાર્કનેટ લાઇવ યાર્ડ ભાવ',
    currentModalRate: 'હાલનો મોડલ ભાવ',
    mspBenchmark: 'ટેકાના ભાવ (MSP)',
    highRoiTitle: 'વધુ નફો આપતા વૈકલ્પિક પાક',
    seasonalPlannerTitle: '1-વર્ષીય બહુ-પાક વાવણી કેલેન્ડર',
    kharifSeason: 'ચોમાસુ (ખરીફ)',
    rabiSeason: 'શિયાળુ (રવિ)',
    zaidSeason: 'ઉનાળુ (ઝાયદ પાક)',
    soilHealthTitle: 'જમીન આરોગ્ય અને પોષક તત્વો',
    weatherForecastTitle: '7-દિવસીય હવામાન અને છંટકાવ સલાહ',
    aiAdvisoryNotes: 'AI કૃષિ નિષ્ણાત સલાહ',
    exportAdvisory: 'કાર્ડ પ્રિન્ટ / ડાઉનલોડ કરો',
  },
};
