export type WaterSource = 'canal' | 'borewell' | 'rainfed' | 'drip_sprinkler';

export type WaterLevel = 'adequate' | 'moderate' | 'scarce';

export type LandUnit = 'acres' | 'hectares' | 'bigha' | 'guntha';

export type SoilType = 'black_cotton' | 'alluvial_loam' | 'red_soil' | 'sandy_loam' | 'clay_loam';

export type Season = 'kharif' | 'rabi' | 'zaid';

export type LanguageCode = 'en' | 'hi' | 'pa' | 'te' | 'mr' | 'gu';

export interface LocationData {
  region: string;
  state: string;
  district: string;
  city?: string;
  latitude: number;
  longitude: number;
  isGpsDetected?: boolean;
  source?: string;
  formattedAddress?: string;
}

export interface FarmerInput {
  location: LocationData;
  landSize: number;
  landUnit: LandUnit;
  waterSource: WaterSource;
  waterLevel: WaterLevel;
  soilType?: SoilType;
  priorSeasonCrop?: string;
  targetCrop?: string;
}

export interface NutrientLevel {
  value: number;
  unit: string;
  status: 'deficient' | 'optimal' | 'excess';
  benchmark: string;
}

export interface SoilComposition {
  soilType: SoilType;
  soilTypeName: string;
  ph: {
    value: number;
    status: 'acidic' | 'neutral' | 'alkaline';
    benchmark: string;
  };
  organicCarbon: {
    value: number;
    unit: string;
    status: 'low' | 'medium' | 'high';
  };
  nitrogen: NutrientLevel;
  phosphorus: NutrientLevel;
  potassium: NutrientLevel;
  electricalConductivity: number; // dS/m
  moistureIndex: number; // %
  healthScore: number; // 0-100
  fertilizerRecommendations: {
    fertilizer: string;
    dosagePerAcre: string;
    purpose: string;
  }[];
  isLiveApi?: boolean;
  dataSourceBadge?: string;
}

export interface MandiArrival {
  mandiName: string;
  district: string;
  distanceKm: number;
  modalPrice: number; // INR / Quintal
  minPrice: number;
  maxPrice: number;
  arrivalVolumeTonnes: number;
  date: string;
}

export interface MandiMarketData {
  crop: string;
  variety: string;
  state: string;
  currentModalPrice: number; // INR / Quintal
  mspPrice: number; // Minimum Support Price
  priceDiffFromMsp: number;
  priceTrendPct30Days: number;
  trendStatus: 'bullish' | 'bearish' | 'stable';
  sparklinePrices: number[];
  topMandis: MandiArrival[];
  harvestWindowProjectedPrice: {
    min: number;
    max: number;
    expectedModal: number;
  };
  isLiveApi?: boolean;
  dataSourceBadge?: string;
}

export interface WeatherDayForecast {
  day: string;
  date: string;
  tempMax: number;
  tempMin: number;
  rainProbPct: number;
  rainfallMm: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Rainy' | 'Thunderstorm' | 'Cloudy' | 'Clear';
  humidity: number;
  windSpeedKmH: number;
  spraySuitability: 'Excellent' | 'Moderate' | 'Avoid';
}

export interface HyperLocalWeather {
  currentTemp: number;
  feelsLike: number;
  humidity: number;
  windSpeedKmH: number;
  rainfallPast24hMm: number;
  forecast7Days: WeatherDayForecast[];
  alerts: {
    severity: 'info' | 'warning' | 'danger';
    title: string;
    message: string;
    advisoryAction: string;
  }[];
  monsoonStatus: string;
  isLiveApi?: boolean;
  dataSourceBadge?: string;
}

export interface SeedVariety {
  name: string;
  code: string;
  breeder: string;
  germinationRatePct: number;
  daysToMaturity: string;
  seedRatePerAcre: string;
  sowingDepthCm: string;
  sowingWindow: string;
  yieldPotentialQuintalPerAcre: string;
  keyResistances: string[];
  climateResilience: string[];
  certifiedVendorAvailability: 'In Stock' | 'Limited Stock' | 'Pre-order';
  specialTrait: string;
}

export interface CropROI {
  cropName: string;
  varietyName: string;
  season: Season;
  durationDays: number;
  costOfCultivationPerAcre: number;
  grossRevenuePerAcre: number;
  netProfitPerAcre: number;
  roiMultiplier: number;
  waterRequirement: 'Low' | 'Medium' | 'High';
  marketRisk: 'Low' | 'Moderate' | 'High';
  keyAdvantage: string;
  isRecommendedAlternative: boolean;
}

export interface SeasonalCropPlan {
  season: Season;
  seasonName: string;
  months: string;
  primaryCrop: string;
  recommendedVariety: string;
  purpose: string;
  sowingWindow: string;
  harvestWindow: string;
  waterRequirement: string;
  soilImpact: {
    nitrogenBalance: string;
    organicMatterContribution: string;
    weedSuppression: string;
  };
  companionOrIntercrop?: string;
  estimatedNetProfitPerAcre: number;
}

export interface RecommendationResult {
  id: string;
  timestamp: string;
  input: FarmerInput;
  primaryCrop: string;
  soil: SoilComposition;
  market: MandiMarketData;
  weather: HyperLocalWeather;
  optimalSeed: SeedVariety;
  expectedYield: {
    quintalsPerAcreMin: number;
    quintalsPerAcreMax: number;
    quintalsPerAcreExpected: number;
    totalExpectedQuintals: number;
    estimatedRevenueMin: number;
    estimatedRevenueExpected: number;
    estimatedRevenueMax: number;
    estimatedNetProfit: number;
    costOfCultivationTotal: number;
  };
  alternativeCrops: CropROI[];
  multiCropAnnualPlan: SeasonalCropPlan[];
  agronomicScore: number; // 0-100
  aiAdvisoryNotes: string[];
}

export interface SavedPlan {
  id: string;
  createdAt: string;
  farmName: string;
  locationName: string;
  primaryCrop: string;
  landSizeAcres: number;
  expectedProfit: number;
  result: RecommendationResult;
}

export type RainCondition = 'auto_weather' | 'high_rain' | 'moderate_rain' | 'low_arid';

export interface SoilVisionAnalysis {
  soilType: SoilType;
  soilTypeName: string;
  confidencePct: number;
  textureBreakdown: {
    clayPct: number;
    siltPct: number;
    sandPct: number;
  };
  estimatedOrganicCarbon: number;
  estimatedPh: number;
  waterRetentionCapacity: 'Low' | 'Moderate' | 'High' | 'Very High';
  dominantColorHex: string;
  colorDescription: string;
  visualKeyFeatures: string[];
  classProbabilities: {
    soilType: SoilType;
    name: string;
    probability: number;
  }[];
  capturedImagePreviewUrl?: string;
}

export interface SeedPredictionResult {
  primarySeed: SeedVariety;
  cropName: string;
  compatibilityScore: number;
  expectedYieldQuintalsPerAcre: number;
  matchReasoning: string;
  soilSuitabilityNote: string;
  rainfallSuitabilityNote: string;
  sowingWindow: string;
  waterRequirement: 'Low' | 'Medium' | 'High';
  alternativeSeeds: {
    crop: string;
    varietyName: string;
    matchScore: number;
    expectedYield: number;
    reason: string;
  }[];
}

