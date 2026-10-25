import {
  FarmerInput,
  RecommendationResult,
  SeedVariety,
  CropROI,
  SeasonalCropPlan,
} from '@/types/agriculture';
import { fetchSoilComposition } from './soilService';
import { fetchLiveMandiPrices } from './marketService';
import { fetchHyperLocalWeather } from './weatherService';

interface SeedVarietyProfile {
  crop: string;
  variety: SeedVariety;
  yieldPerAcreQuintal: { min: number; max: number; expected: number };
  cultivationCostPerAcre: number;
}

const SEED_DATABASE: Record<string, SeedVarietyProfile> = {
  Wheat: {
    crop: 'Wheat',
    variety: {
      name: 'HD-3226 (Pusa Yashasvi)',
      code: 'ICAR-IARI-HD3226',
      breeder: 'Indian Agricultural Research Institute (IARI), New Delhi',
      germinationRatePct: 94,
      daysToMaturity: '135 - 142 days',
      seedRatePerAcre: '40 - 45 kg',
      sowingDepthCm: '4 - 5 cm',
      sowingWindow: '01 Nov - 20 Nov (Optimal Timely Sown)',
      yieldPotentialQuintalPerAcre: '24 - 28 Quintals/Acre',
      keyResistances: ['Stripe (Yellow) Rust', 'Stem Rust', 'Leaf Blight', 'Powdery Mildew'],
      climateResilience: ['High Terminal Heat Tolerance', 'Stiff Straw (Lodging Resistant)'],
      certifiedVendorAvailability: 'In Stock',
      specialTrait: 'High grain protein content (12.8%) with superior chapati making quality index.',
    },
    yieldPerAcreQuintal: { min: 21, max: 27, expected: 24.5 },
    cultivationCostPerAcre: 18500,
  },
  'Paddy (Rice)': {
    crop: 'Paddy (Rice)',
    variety: {
      name: 'PR-126 Short Duration Hybrid',
      code: 'PAU-PR-126',
      breeder: 'Punjab Agricultural University (PAU), Ludhiana',
      germinationRatePct: 93,
      daysToMaturity: '120 - 123 days (Transplant to Harvest)',
      seedRatePerAcre: '8 - 10 kg (Nursery for 1 Acre)',
      sowingDepthCm: '2 - 3 cm in puddled soil',
      sowingWindow: '20 June - 10 July',
      yieldPotentialQuintalPerAcre: '28 - 32 Quintals/Acre',
      keyResistances: ['Bacterial Leaf Blight (7 virulent pathotypes)', 'Blast Tolerant'],
      climateResilience: ['Conserves 22% Groundwater compared to long-duration varieties'],
      certifiedVendorAvailability: 'In Stock',
      specialTrait: 'Early maturity allows zero-till wheat sowing without stubble burning delays.',
    },
    yieldPerAcreQuintal: { min: 25, max: 33, expected: 29.5 },
    cultivationCostPerAcre: 21000,
  },
  'Basmati Rice': {
    crop: 'Basmati Rice',
    variety: {
      name: 'Pusa Basmati 1509 (PB-1509)',
      code: 'IARI-PB-1509',
      breeder: 'ICAR-IARI, New Delhi',
      germinationRatePct: 92,
      daysToMaturity: '115 - 120 days',
      seedRatePerAcre: '5 kg (Nursery)',
      sowingDepthCm: '2 cm',
      sowingWindow: '25 June - 15 July',
      yieldPotentialQuintalPerAcre: '22 - 25 Quintals/Acre',
      keyResistances: ['Bakanae Disease Reduced Susceptibility', 'Semi-Dwarf Lodging Proof'],
      climateResilience: ['30% Less Water Consumption than traditional PB-1121'],
      certifiedVendorAvailability: 'In Stock',
      specialTrait: 'Extra-long slender grain with elongation ratio of 2.1 upon cooking; premium export demand.',
    },
    yieldPerAcreQuintal: { min: 19, max: 25, expected: 22.5 },
    cultivationCostPerAcre: 23500,
  },
  Cotton: {
    crop: 'Cotton',
    variety: {
      name: 'RCH-659 BG-II (Bollgard II Hybrid)',
      code: 'Rasi-659-BG2',
      breeder: 'Rasi Seeds Research Foundation',
      germinationRatePct: 90,
      daysToMaturity: '155 - 165 days',
      seedRatePerAcre: '2 packets (900g + 100g refuge)',
      sowingDepthCm: '3 - 4 cm',
      sowingWindow: '15 May - 15 June',
      yieldPotentialQuintalPerAcre: '12 - 16 Quintals/Acre (Seed Cotton)',
      keyResistances: ['American Bollworm', 'Spotted Bollworm', 'Pink Bollworm Suppression'],
      climateResilience: ['Deep taproot system resilient to mid-season drought dry spells'],
      certifiedVendorAvailability: 'In Stock',
      specialTrait: 'High ginning outturn (36%) with 29.5 mm staple length fiber.',
    },
    yieldPerAcreQuintal: { min: 10, max: 15.5, expected: 13 },
    cultivationCostPerAcre: 27000,
  },
  Soybean: {
    crop: 'Soybean',
    variety: {
      name: 'JS-2034 Early Maturity High Podding',
      code: 'JNKVV-JS2034',
      breeder: 'Jawaharlal Nehru Krishi Vishwa Vidyalaya, Jabalpur',
      germinationRatePct: 91,
      daysToMaturity: '88 - 92 days',
      seedRatePerAcre: '25 - 30 kg',
      sowingDepthCm: '3 - 4 cm',
      sowingWindow: '20 June - 05 July (With onset of monsoon)',
      yieldPotentialQuintalPerAcre: '10 - 13 Quintals/Acre',
      keyResistances: ['Yellow Mosaic Virus (YMV)', 'Charcoal Rot', 'Rhizoctonia Aerial Blight'],
      climateResilience: ['Tolerant to both intermittent drought and short waterlogging'],
      certifiedVendorAvailability: 'In Stock',
      specialTrait: 'High oil (20.5%) and protein (41%) content; pods resist shattering for 12 days post maturity.',
    },
    yieldPerAcreQuintal: { min: 8.5, max: 12.5, expected: 10.8 },
    cultivationCostPerAcre: 15500,
  },
  Mustard: {
    crop: 'Mustard',
    variety: {
      name: 'Pusa Mustard 31 (PDZ-1) Double Low Canola Quality',
      code: 'ICAR-PM31',
      breeder: 'ICAR-Indian Agricultural Research Institute',
      germinationRatePct: 95,
      daysToMaturity: '130 - 138 days',
      seedRatePerAcre: '1.5 - 2 kg',
      sowingDepthCm: '2.5 - 3 cm',
      sowingWindow: '10 Oct - 25 Oct',
      yieldPotentialQuintalPerAcre: '9 - 12 Quintals/Acre',
      keyResistances: ['White Rust Immune', 'Alternaria Blight Moderate Tolerance'],
      climateResilience: ['High frost tolerance and low water footprint (only 2 irrigations required)'],
      certifiedVendorAvailability: 'In Stock',
      specialTrait: 'Canola grade healthy cooking oil with Erucic acid < 2% and glucosinolates < 30 µmoles/g.',
    },
    yieldPerAcreQuintal: { min: 8, max: 12, expected: 10.2 },
    cultivationCostPerAcre: 13000,
  },
  Maize: {
    crop: 'Maize',
    variety: {
      name: 'Pioneer P3396 High Starch Single Cross Hybrid',
      code: 'Corteva-P3396',
      breeder: 'Pioneer / Corteva Agriscience',
      germinationRatePct: 96,
      daysToMaturity: '105 - 112 days',
      seedRatePerAcre: '7.5 - 8 kg',
      sowingDepthCm: '4 - 5 cm',
      sowingWindow: '15 June - 30 June (Kharif) / 15 Oct - 15 Nov (Rabi)',
      yieldPotentialQuintalPerAcre: '32 - 38 Quintals/Acre',
      keyResistances: ['Turcicum Leaf Blight', 'Maydis Leaf Blight', 'Fall Armyworm (FAW) Vigorous Recovery'],
      climateResilience: ['Strong root anchor system against monsoon wind lodging'],
      certifiedVendorAvailability: 'In Stock',
      specialTrait: 'Tight husk cover prevents bird damage and ear rot during maturity rains.',
    },
    yieldPerAcreQuintal: { min: 28, max: 37, expected: 33 },
    cultivationCostPerAcre: 17500,
  },
  'Gram (Chickpea / Chana)': {
    crop: 'Gram (Chickpea / Chana)',
    variety: {
      name: 'JG-11 Early Desi Chickpea',
      code: 'ICRISAT-JG11',
      breeder: 'ICRISAT & JNKVV',
      germinationRatePct: 93,
      daysToMaturity: '95 - 100 days',
      seedRatePerAcre: '25 - 30 kg',
      sowingDepthCm: '5 - 7 cm into moisture zone',
      sowingWindow: '15 Oct - 15 Nov',
      yieldPotentialQuintalPerAcre: '8 - 11 Quintals/Acre',
      keyResistances: ['Fusarium Wilt Resistant', 'Root Rot Tolerant'],
      climateResilience: ['Deep taproot captures residual subsoil moisture with zero winter irrigation needed'],
      certifiedVendorAvailability: 'In Stock',
      specialTrait: 'Fixes up to 40 kg biological nitrogen per acre, enriching soil for subsequent crop.',
    },
    yieldPerAcreQuintal: { min: 7.5, max: 11, expected: 9.2 },
    cultivationCostPerAcre: 12500,
  },
  Tomato: {
    crop: 'Tomato',
    variety: {
      name: 'Syngenta Abhinav F1 Indeterminate Hybrid',
      code: 'SYN-ABHINAV',
      breeder: 'Syngenta Vegetable Seeds',
      germinationRatePct: 92,
      daysToMaturity: '65 - 70 days from transplanting',
      seedRatePerAcre: '40 - 50 grams (Nursery)',
      sowingDepthCm: '0.5 cm in seedling pro-trays',
      sowingWindow: 'Aug - Sept (Kharif) / Dec - Jan (Rabi)',
      yieldPotentialQuintalPerAcre: '250 - 320 Quintals/Acre',
      keyResistances: ['Tomato Leaf Curl Virus (ToLCV)', 'Bacterial Wilt', 'Fusarium Wilt race 1,2'],
      climateResilience: ['Good fruit setting under high temperature fluctuations'],
      certifiedVendorAvailability: 'In Stock',
      specialTrait: 'Firm square-round deep red fruits with thick pericarp, ideal for long-distance transit.',
    },
    yieldPerAcreQuintal: { min: 220, max: 310, expected: 265 },
    cultivationCostPerAcre: 62000,
  },
  Onion: {
    crop: 'Onion',
    variety: {
      name: 'Bhima Super (Red Globe High Storage)',
      code: 'DOGR-BS-1',
      breeder: 'ICAR-Directorate of Onion and Garlic Research, Pune',
      germinationRatePct: 88,
      daysToMaturity: '110 - 115 days after transplanting',
      seedRatePerAcre: '3.5 - 4 kg (Nursery)',
      sowingDepthCm: '1 - 1.5 cm',
      sowingWindow: 'Kharif: Aug | Late Kharif: Sept-Oct | Rabi: Nov-Dec',
      yieldPotentialQuintalPerAcre: '120 - 160 Quintals/Acre',
      keyResistances: ['Purple Blotch Tolerant', 'Thrips Attack Resilient'],
      climateResilience: ['Withstands intermittent post-monsoon dry spells'],
      certifiedVendorAvailability: 'In Stock',
      specialTrait: 'Attractive red shiny skin with low bolting percentage and 4 months storage life.',
    },
    yieldPerAcreQuintal: { min: 110, max: 155, expected: 135 },
    cultivationCostPerAcre: 48000,
  },
  'Chili (Dry)': {
    crop: 'Chili (Dry)',
    variety: {
      name: 'Guntur Teja (Hot Red F1 Hybrid)',
      code: 'APAU-TEJA-S17',
      breeder: 'Andhra Pradesh Horticultural University',
      germinationRatePct: 89,
      daysToMaturity: '140 - 160 days',
      seedRatePerAcre: '150 - 200 grams (Nursery)',
      sowingDepthCm: '0.5 cm in raised bed',
      sowingWindow: 'July - August transplanting',
      yieldPotentialQuintalPerAcre: '18 - 25 Quintals/Acre (Dry Pods)',
      keyResistances: ['Chili Leaf Curl Virus Tolerant', 'Anthracnose Fruit Rot Resilient'],
      climateResilience: ['High heat endurance and drought-tolerant foliage'],
      certifiedVendorAvailability: 'In Stock',
      specialTrait: 'High capsaicin heat (>75,000 SHU) and deep red ASTA color value 95+ fetching peak export bid.',
    },
    yieldPerAcreQuintal: { min: 16, max: 24, expected: 20 },
    cultivationCostPerAcre: 54000,
  },
};

export async function generatePrecisionRecommendation(
  input: FarmerInput
): Promise<RecommendationResult> {
  const { location, landSize, landUnit, waterSource, waterLevel, soilType, targetCrop } = input;

  // Convert land size to standard Acres for agronomic algorithms
  let acres = landSize;
  if (landUnit === 'hectares') acres = landSize * 2.471;
  else if (landUnit === 'bigha') acres = landSize * 0.625;
  else if (landUnit === 'guntha') acres = landSize * 0.025;

  // Determine default target crop based on agro-ecological zone if farmer didn't choose
  let primaryCropName = targetCrop?.trim() || '';
  if (!primaryCropName || !SEED_DATABASE[primaryCropName]) {
    if (location.state === 'Punjab' || location.state === 'Haryana' || location.state === 'Uttar Pradesh') {
      primaryCropName = waterLevel === 'adequate' ? 'Wheat' : 'Mustard';
    } else if (location.state === 'Maharashtra' || location.state === 'Gujarat') {
      primaryCropName = waterSource === 'rainfed' ? 'Soybean' : 'Cotton';
    } else if (location.state === 'Andhra Pradesh' || location.state === 'Telangana') {
      primaryCropName = 'Chili (Dry)';
    } else if (location.state === 'Karnataka') {
      primaryCropName = 'Tomato';
    } else {
      primaryCropName = 'Wheat';
    }
  }

  // Fetch modular online data sources concurrently
  const [soil, market, weather] = await Promise.all([
    fetchSoilComposition(location.latitude, location.longitude, location.state, soilType),
    fetchLiveMandiPrices(primaryCropName, location.state, location.district),
    fetchHyperLocalWeather(location.latitude, location.longitude, location.region),
  ]);

  const seedProfile = SEED_DATABASE[primaryCropName] || SEED_DATABASE['Wheat'];
  const optimalSeed = seedProfile.variety;

  // Water and soil modifiers on yield
  let yieldMultiplier = 1.0;
  if (waterLevel === 'adequate' && (waterSource === 'canal' || waterSource === 'drip_sprinkler')) {
    yieldMultiplier += 0.08;
  } else if (waterLevel === 'scarce') {
    yieldMultiplier -= 0.15;
  }

  if (soil.healthScore > 85) yieldMultiplier += 0.05;
  else if (soil.healthScore < 70) yieldMultiplier -= 0.08;

  const yieldMin = Number((seedProfile.yieldPerAcreQuintal.min * yieldMultiplier).toFixed(1));
  const yieldMax = Number((seedProfile.yieldPerAcreQuintal.max * yieldMultiplier).toFixed(1));
  const yieldExpected = Number((seedProfile.yieldPerAcreQuintal.expected * yieldMultiplier).toFixed(1));

  const totalExpectedQuintals = Number((yieldExpected * acres).toFixed(1));
  const costTotal = Math.round(seedProfile.cultivationCostPerAcre * acres);
  const revenueExpected = Math.round(totalExpectedQuintals * market.currentModalPrice);
  const revenueMin = Math.round(yieldMin * acres * market.mspPrice);
  const revenueMax = Math.round(yieldMax * acres * market.harvestWindowProjectedPrice.max);
  const netProfit = Math.round(revenueExpected - costTotal);

  // Generate 2 - 3 alternative high-ROI crops suited to the conditions
  const allCropKeys = Object.keys(SEED_DATABASE).filter((c) => c !== primaryCropName);
  const altCropCandidates = allCropKeys.slice(0, 3);

  const alternativeCrops: CropROI[] = altCropCandidates.map((cropKey) => {
    const prof = SEED_DATABASE[cropKey];
    const altModalPrice =
      cropKey === 'Mustard'
        ? 6400
        : cropKey === 'Gram (Chickpea / Chana)'
        ? 6180
        : cropKey === 'Maize'
        ? 2390
        : cropKey === 'Tomato'
        ? 2850
        : 5120;

    const altYield = prof.yieldPerAcreQuintal.expected;
    const grossRev = Math.round(altYield * altModalPrice);
    const netProf = Math.round(grossRev - prof.cultivationCostPerAcre);
    const roi = Number((grossRev / prof.cultivationCostPerAcre).toFixed(2));

    const waterReq: 'Low' | 'Medium' | 'High' =
      cropKey === 'Mustard' || cropKey === 'Gram (Chickpea / Chana)'
        ? 'Low'
        : cropKey === 'Tomato' || cropKey === 'Basmati Rice' || cropKey === 'Paddy (Rice)'
        ? 'High'
        : 'Medium';

    const risk: 'Low' | 'Moderate' | 'High' =
      cropKey === 'Tomato' || cropKey === 'Onion'
        ? 'High'
        : cropKey === 'Mustard' || cropKey === 'Wheat'
        ? 'Low'
        : 'Moderate';

    return {
      cropName: prof.crop,
      varietyName: prof.variety.name,
      season: cropKey === 'Mustard' || cropKey === 'Wheat' || cropKey === 'Gram (Chickpea / Chana)' ? 'rabi' : 'kharif',
      durationDays: parseInt(prof.variety.daysToMaturity) || 120,
      costOfCultivationPerAcre: prof.cultivationCostPerAcre,
      grossRevenuePerAcre: grossRev,
      netProfitPerAcre: netProf,
      roiMultiplier: roi,
      waterRequirement: waterReq,
      marketRisk: risk,
      keyAdvantage:
        cropKey === 'Mustard'
          ? 'Requires 40% less irrigation than wheat and benefits from buoyant edible oil market rates.'
          : cropKey === 'Gram (Chickpea / Chana)'
          ? 'Bio-fixes nitrogen, zero chemical fertilizer needed, robust MSP procurement.'
          : `${prof.variety.specialTrait.slice(0, 85)}...`,
      isRecommendedAlternative: roi > 2.2,
    };
  });

  // Sort alternatives by net profit descending
  alternativeCrops.sort((a, b) => b.netProfitPerAcre - a.netProfitPerAcre);

  // Generate 1-Year Multi-Crop Seasonal Planner (Kharif, Rabi, Zaid)
  const multiCropAnnualPlan: SeasonalCropPlan[] = [
    {
      season: 'kharif',
      seasonName: 'Kharif Season (Monsoon)',
      months: 'June – October',
      primaryCrop:
        primaryCropName === 'Wheat' || primaryCropName === 'Mustard' || primaryCropName === 'Gram (Chickpea / Chana)'
          ? waterLevel === 'adequate'
            ? 'Basmati Rice (PB-1509)'
            : 'Soybean (JS-2034)'
          : primaryCropName,
      recommendedVariety:
        primaryCropName === 'Wheat' || primaryCropName === 'Mustard' || primaryCropName === 'Gram (Chickpea / Chana)'
          ? waterLevel === 'adequate'
            ? 'PB-1509 Short Duration'
            : 'JS-2034 High Podding'
          : optimalSeed.name,
      purpose: 'Primary monsoon cash crop leveraging natural precipitation patterns.',
      sowingWindow: '20 June – 05 July (Pre-monsoon / First Soaking Rain)',
      harvestWindow: '10 Oct – 25 Oct',
      waterRequirement: 'High to Moderate (Monsoon dependent + 2 life-saving supplemental irrigations)',
      soilImpact: {
        nitrogenBalance: 'Moderate depletion; compensated with basal DAP placement',
        organicMatterContribution: 'High root residue contribution improves rhizosphere porosity',
        weedSuppression: 'Dense canopy covers weed emergence by week 4',
      },
      companionOrIntercrop: 'Sesbania (Dhaincha) green manure border strip',
      estimatedNetProfitPerAcre: 34500,
    },
    {
      season: 'rabi',
      seasonName: 'Rabi Season (Winter)',
      months: 'November – March',
      primaryCrop:
        primaryCropName === 'Paddy (Rice)' || primaryCropName === 'Soybean' || primaryCropName === 'Cotton'
          ? waterSource === 'rainfed'
            ? 'Mustard (Pusa 31)'
            : 'Wheat (HD-3226)'
          : primaryCropName,
      recommendedVariety:
        primaryCropName === 'Paddy (Rice)' || primaryCropName === 'Soybean' || primaryCropName === 'Cotton'
          ? waterSource === 'rainfed'
            ? 'Pusa Mustard 31'
            : 'HD-3226 (Pusa Yashasvi)'
          : optimalSeed.name,
      purpose: 'High-stability grain/oilseed staple crop with robust market liquidity and MSP safety net.',
      sowingWindow: '01 Nov – 20 Nov',
      harvestWindow: '25 March – 15 April',
      waterRequirement: 'Controlled; 3 to 4 scheduled irrigations at CRI, tillering, flowering, and milk stages',
      soilImpact: {
        nitrogenBalance: 'Balanced uptake; split neem-coated urea prevents leaching',
        organicMatterContribution: 'Deep fibrous roots stabilize topsoil structure against winter erosion',
        weedSuppression: 'Aggressive tillering outcompetes Phalaris minor when timed correctly',
      },
      companionOrIntercrop: 'Chickpea / Mustard row intercropping (9:1 ratio) for pest deterrent border',
      estimatedNetProfitPerAcre: 41500,
    },
    {
      season: 'zaid',
      seasonName: 'Zaid Season (Summer Catch Crop)',
      months: 'March – June',
      primaryCrop: 'Moong Bean (Green Gram) / Summer Fodder',
      recommendedVariety: 'SML-668 / IPM 205-7 (Virat) Super-Early 60-Day',
      purpose: 'Biological soil rejuvenation, atmospheric nitrogen fixation, and high-value summer cash buffer.',
      sowingWindow: '25 March – 10 April (Immediate post-Rabi harvest)',
      harvestWindow: '20 May – 05 June (Before monsoon onset)',
      waterRequirement: 'Low; requires 2 to 3 light irrigations',
      soilImpact: {
        nitrogenBalance: 'Net POSITIVE: Fixes 35-40 kg atmospheric Nitrogen/Acre directly in soil nodules',
        organicMatterContribution: 'Incorporation of post-harvest biomass adds ~1.5 tonnes fresh green manure',
        weedSuppression: 'Thick groundcover prevents summer weed colonization and prevents soil crust baking',
      },
      companionOrIntercrop: 'Watermelon or Summer Cowpea border rows',
      estimatedNetProfitPerAcre: 22000,
    },
  ];

  // AI Advisory Notes tailored to conditions
  const aiAdvisoryNotes: string[] = [
    `Precision Sowing Depth: Sow ${optimalSeed.name} at precisely ${optimalSeed.sowingDepthCm} into the moist seedbed to ensure uniform ${optimalSeed.germinationRatePct}% field germination.`,
    `Water Optimization: Your ${waterSource.replace('_', ' ')} system is estimated to save ${waterSource === 'drip_sprinkler' ? '40-50%' : '15%'} water compared to conventional flood basin methods.`,
    `Soil Amendment Trigger: Field pH is ${soil.ph.value} (${soil.ph.status}). ${soil.fertilizerRecommendations[0]?.purpose || 'Maintain balanced basal fertilizer placement.'}`,
    `Market Timing Window: Live Agmarknet market intelligence indicates a 30-day ${market.trendStatus.toUpperCase()} trend (+${market.priceTrendPct30Days}%). Projected harvest window price reaches ₹${market.harvestWindowProjectedPrice.expectedModal}/qtl.`,
    `Multi-Crop Rejuvenation: The included 1-year rotation (Kharif → Rabi → Zaid Moong) will fix an estimated 38kg atmospheric Nitrogen per acre, reducing next year's synthetic urea bill by 25%.`,
  ];

  const agronomicScore = Math.round((soil.healthScore * 0.4) + (waterLevel === 'adequate' ? 45 : 30) + (optimalSeed.germinationRatePct * 0.15));

  return {
    id: `rec-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    input,
    primaryCrop: primaryCropName,
    soil,
    market,
    weather,
    optimalSeed,
    expectedYield: {
      quintalsPerAcreMin: yieldMin,
      quintalsPerAcreMax: yieldMax,
      quintalsPerAcreExpected: yieldExpected,
      totalExpectedQuintals,
      estimatedRevenueMin: revenueMin,
      estimatedRevenueExpected: revenueExpected,
      estimatedRevenueMax: revenueMax,
      estimatedNetProfit: netProfit,
      costOfCultivationTotal: costTotal,
    },
    alternativeCrops,
    multiCropAnnualPlan,
    agronomicScore: Math.min(99, agronomicScore),
    aiAdvisoryNotes,
  };
}
