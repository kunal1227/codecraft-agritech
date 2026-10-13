import { MandiMarketData } from '@/types/agriculture';

// Benchmark database of Mandi prices, MSPs, and APMCs across crops
interface CommodityBenchmark {
  standardVariety: string;
  msp: number; // INR / Quintal
  baseModal: number; // INR / Quintal
  volatility: number;
  seasonTrend: 'bullish' | 'bearish' | 'stable';
  apmcMandiHubs: { name: string; state: string; district: string }[];
}

const COMMODITY_BENCHMARKS: Record<string, CommodityBenchmark> = {
  Wheat: {
    standardVariety: 'Kalyan Sona / HD-3226',
    msp: 2425,
    baseModal: 2680,
    volatility: 0.04,
    seasonTrend: 'bullish',
    apmcMandiHubs: [
      { name: 'Khanna Mandi (Asia Largest)', state: 'Punjab', district: 'Ludhiana' },
      { name: 'Karnal Grain Market', state: 'Haryana', district: 'Karnal' },
      { name: 'Indore APMC Market', state: 'Madhya Pradesh', district: 'Indore' },
      { name: 'Aligarh Mandi', state: 'Uttar Pradesh', district: 'Aligarh' },
      { name: 'Kota Grain APMC', state: 'Rajasthan', district: 'Kota' },
    ],
  },
  'Paddy (Rice)': {
    standardVariety: 'Grade A / PR-126',
    msp: 2320,
    baseModal: 2540,
    volatility: 0.05,
    seasonTrend: 'stable',
    apmcMandiHubs: [
      { name: 'Taraori Basmati Market', state: 'Haryana', district: 'Karnal' },
      { name: 'Gondia APMC', state: 'Maharashtra', district: 'Gondia' },
      { name: 'Burdwan Rice Hub', state: 'West Bengal', district: 'Purba Bardhaman' },
      { name: 'Nizamabad APMC', state: 'Telangana', district: 'Nizamabad' },
    ],
  },
  'Basmati Rice': {
    standardVariety: 'Pusa 1121 / 1509',
    msp: 2320, // (No separate MSP for basmati, benchmarked vs grade A)
    baseModal: 4150,
    volatility: 0.08,
    seasonTrend: 'bullish',
    apmcMandiHubs: [
      { name: 'Karnal Anaj Mandi', state: 'Haryana', district: 'Karnal' },
      { name: 'Amritsar Bhagtanwala APMC', state: 'Punjab', district: 'Amritsar' },
      { name: 'Kotkapura Mandi', state: 'Punjab', district: 'Faridkot' },
    ],
  },
  Cotton: {
    standardVariety: 'Medium Staple (Shanker-6)',
    msp: 7521,
    baseModal: 7850,
    volatility: 0.06,
    seasonTrend: 'bullish',
    apmcMandiHubs: [
      { name: 'Rajkot Cotton APMC', state: 'Gujarat', district: 'Rajkot' },
      { name: 'Kadi Cotton Market', state: 'Gujarat', district: 'Mehsana' },
      { name: 'Adilabad Cotton Yard', state: 'Telangana', district: 'Adilabad' },
      { name: 'Warangal Enamamula Market', state: 'Telangana', district: 'Warangal' },
      { name: 'Akola Cotton APMC', state: 'Maharashtra', district: 'Akola' },
    ],
  },
  Soybean: {
    standardVariety: 'Yellow JS-9560 / 2034',
    msp: 4892,
    baseModal: 5120,
    volatility: 0.07,
    seasonTrend: 'bullish',
    apmcMandiHubs: [
      { name: 'Indore Malwa Krishi Mandi', state: 'Madhya Pradesh', district: 'Indore' },
      { name: 'Latur APMC (Oilseed Capital)', state: 'Maharashtra', district: 'Latur' },
      { name: 'Ujjain Krishi Mandi', state: 'Madhya Pradesh', district: 'Ujjain' },
      { name: 'Nagpur APMC', state: 'Maharashtra', district: 'Nagpur' },
    ],
  },
  Mustard: {
    standardVariety: 'Pusa Bold / Pioneer 45S46',
    msp: 5950,
    baseModal: 6420,
    volatility: 0.05,
    seasonTrend: 'bullish',
    apmcMandiHubs: [
      { name: 'Bharatpur Oilseed Mandi', state: 'Rajasthan', district: 'Bharatpur' },
      { name: 'Jaipur Surajpole Mandi', state: 'Rajasthan', district: 'Jaipur' },
      { name: 'Hisar APMC', state: 'Haryana', district: 'Hisar' },
      { name: 'Morena Mustard Yard', state: 'Madhya Pradesh', district: 'Morena' },
    ],
  },
  Maize: {
    standardVariety: 'Hybrid Yellow Corn',
    msp: 2225,
    baseModal: 2390,
    volatility: 0.04,
    seasonTrend: 'stable',
    apmcMandiHubs: [
      { name: 'Gulabbagh Mandi (Asia Corn Hub)', state: 'Bihar', district: 'Purnia' },
      { name: 'Chhindwara Corn Market', state: 'Madhya Pradesh', district: 'Chhindwara' },
      { name: 'Davangere APMC', state: 'Karnataka', district: 'Davangere' },
    ],
  },
  'Gram (Chickpea / Chana)': {
    standardVariety: 'Desi Chana / JG-11',
    msp: 5650,
    baseModal: 6180,
    volatility: 0.06,
    seasonTrend: 'bullish',
    apmcMandiHubs: [
      { name: 'Bikaner Pulses Market', state: 'Rajasthan', district: 'Bikaner' },
      { name: 'Akola Pulse APMC', state: 'Maharashtra', district: 'Akola' },
      { name: 'Jabalpur APMC', state: 'Madhya Pradesh', district: 'Jabalpur' },
    ],
  },
  Tomato: {
    standardVariety: 'Hybrid Himsona / Abhinav',
    msp: 1600, // Notified floor reference
    baseModal: 2850,
    volatility: 0.18,
    seasonTrend: 'bullish',
    apmcMandiHubs: [
      { name: 'Kolar Tomato Market (Largest)', state: 'Karnataka', district: 'Kolar' },
      { name: 'Pimpalgaon APMC', state: 'Maharashtra', district: 'Nashik' },
      { name: 'Madanapalle APMC', state: 'Andhra Pradesh', district: 'Chittoor' },
    ],
  },
  Onion: {
    standardVariety: 'Garwa / N-53 Red',
    msp: 1800,
    baseModal: 2450,
    volatility: 0.15,
    seasonTrend: 'bullish',
    apmcMandiHubs: [
      { name: 'Lasalgaon APMC (Asia Largest Onion)', state: 'Maharashtra', district: 'Nashik' },
      { name: 'Yeola Onion Yard', state: 'Maharashtra', district: 'Nashik' },
      { name: 'Mahuva Onion Mandi', state: 'Gujarat', district: 'Bhavnagar' },
      { name: 'Hubli APMC', state: 'Karnataka', district: 'Dharwad' },
    ],
  },
  'Chili (Dry)': {
    standardVariety: 'Teja / Byadgi',
    msp: 12000,
    baseModal: 16800,
    volatility: 0.12,
    seasonTrend: 'bullish',
    apmcMandiHubs: [
      { name: 'Guntur Mirchi Yard (Asia Largest)', state: 'Andhra Pradesh', district: 'Guntur' },
      { name: 'Khammam Mirchi Mandi', state: 'Telangana', district: 'Khammam' },
      { name: 'Byadgi APMC', state: 'Karnataka', district: 'Haveri' },
    ],
  },
};

export async function fetchLiveMandiPrices(
  crop: string,
  state: string,
  _district?: string
): Promise<MandiMarketData> {
  // Simulate network fetch with low latency
  await new Promise((resolve) => setTimeout(resolve, 400));

  const benchmark =
    COMMODITY_BENCHMARKS[crop] || COMMODITY_BENCHMARKS['Wheat'];

  // Add realistic price jitter
  const randomShift = (Math.random() - 0.45) * 0.05;
  const currentModalPrice = Math.round(benchmark.baseModal * (1 + randomShift));
  const mspPrice = benchmark.msp;
  const priceDiffFromMsp = currentModalPrice - mspPrice;

  // 30 days sparkline history simulation
  const sparklinePrices: number[] = [];
  let runner = Math.round(currentModalPrice * 0.93);
  for (let i = 0; i < 30; i++) {
    const dailyDrift = (Math.random() - 0.47) * 25 + (i * 4);
    runner = Math.round(runner + dailyDrift);
    sparklinePrices.push(runner);
  }
  sparklinePrices[29] = currentModalPrice;

  const trendPct = Number(
    (((currentModalPrice - sparklinePrices[0]) / sparklinePrices[0]) * 100).toFixed(1)
  );

  // Generate top regional mandis
  const topMandis = benchmark.apmcMandiHubs.map((hub, idx) => {
    const dist = 18 + idx * 24 + Math.round(Math.random() * 15);
    const priceVariance = Math.round((Math.random() - 0.5) * 120);
    const mPrice = currentModalPrice + priceVariance;
    return {
      mandiName: hub.name,
      district: hub.district,
      distanceKm: dist,
      modalPrice: mPrice,
      minPrice: Math.round(mPrice * 0.94),
      maxPrice: Math.round(mPrice * 1.06),
      arrivalVolumeTonnes: Math.round(240 + Math.random() * 850),
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    };
  });

  return {
    crop,
    variety: benchmark.standardVariety,
    state,
    currentModalPrice,
    mspPrice,
    priceDiffFromMsp,
    priceTrendPct30Days: trendPct,
    trendStatus: trendPct > 2 ? 'bullish' : trendPct < -2 ? 'bearish' : 'stable',
    sparklinePrices,
    topMandis,
    harvestWindowProjectedPrice: {
      min: Math.round(currentModalPrice * 0.96),
      max: Math.round(currentModalPrice * 1.14),
      expectedModal: Math.round(currentModalPrice * 1.05),
    },
  };
}
