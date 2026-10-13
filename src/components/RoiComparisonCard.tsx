'use client';

import { CropROI, RecommendationResult } from '@/types/agriculture';
import {
  TrendingUp,
  IndianRupee,
  Scale,
  Sparkles,
  Droplet,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

interface RoiComparisonCardProps {
  result: RecommendationResult;
}

export function RoiComparisonCard({ result }: RoiComparisonCardProps) {
  const { expectedYield, alternativeCrops, primaryCrop, input } = result;
  const acres = input.landSize;

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 sm:p-7 shadow-xl shadow-emerald-950/5 border border-emerald-900/10 dark:border-emerald-800/40 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Agronomic Economics & ROI Engine
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-50 mt-1">
            Yield & Profit Analytics for {acres} {input.landUnit}
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Full-spectrum cost of cultivation, yield confidence bounds, and alternative crop comparisons.
          </p>
        </div>

        {/* Expected Net Profit Banner */}
        <div className="bg-gradient-to-br from-emerald-600 to-green-700 text-white p-3 sm:px-5 sm:py-3 rounded-2xl shadow-md shadow-emerald-700/20 self-start sm:self-auto">
          <div className="text-[10px] uppercase font-bold text-emerald-100">Estimated Total Net Profit</div>
          <div className="text-2xl sm:text-3xl font-black tracking-tight">
            ₹{expectedYield.estimatedNetProfit.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-emerald-100 mt-0.5">
            After ₹{expectedYield.costOfCultivationTotal.toLocaleString('en-IN')} input costs
          </div>
        </div>
      </div>

      {/* Primary Crop Yield Performance */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5">
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60">
          <div className="text-stone-500 dark:text-stone-400 text-xs font-bold uppercase">
            Expected Yield Rate
          </div>
          <div className="text-2xl font-black text-stone-900 dark:text-stone-100 mt-1">
            {expectedYield.quintalsPerAcreExpected}{' '}
            <span className="text-xs font-normal text-stone-400">Qtl / Acre</span>
          </div>
          <div className="text-[11px] text-stone-400 mt-1">
            Range: {expectedYield.quintalsPerAcreMin} – {expectedYield.quintalsPerAcreMax} Qtl
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60">
          <div className="text-stone-500 dark:text-stone-400 text-xs font-bold uppercase">
            Total Expected Harvest
          </div>
          <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-1">
            {expectedYield.totalExpectedQuintals}{' '}
            <span className="text-xs font-normal text-stone-400">Quintals</span>
          </div>
          <div className="text-[11px] text-stone-400 mt-1">
            Across your total {acres} {input.landUnit}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60">
          <div className="text-stone-500 dark:text-stone-400 text-xs font-bold uppercase">
            Expected Gross Revenue
          </div>
          <div className="text-2xl font-black text-stone-900 dark:text-stone-100 mt-1">
            ₹{expectedYield.estimatedRevenueExpected.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-stone-400 mt-1">
            Conservative Floor: ₹{expectedYield.estimatedRevenueMin.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Alternative High-ROI Crops Comparison Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Alternative High-ROI Crop Recommendations
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              Optimized for current market conditions, input costs, and water availability.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alternativeCrops.map((alt, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 flex flex-col justify-between hover:border-emerald-500 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-[10px]">
                    {alt.season.toUpperCase()} • {alt.durationDays} Days
                  </span>
                  <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
                    {alt.roiMultiplier}x ROI
                  </span>
                </div>

                <h4 className="text-lg font-black text-stone-900 dark:text-stone-100">
                  {alt.cropName}
                </h4>
                <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  {alt.varietyName}
                </div>

                {/* Economics summary */}
                <div className="my-3 space-y-1.5 py-2.5 px-3 rounded-xl bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Net Profit / Acre:</span>
                    <span className="font-extrabold text-emerald-700 dark:text-emerald-400">
                      ₹{alt.netProfitPerAcre.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Cultivation Cost:</span>
                    <span className="font-mono text-stone-600 dark:text-stone-300">
                      ₹{alt.costOfCultivationPerAcre.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Tags for Water & Risk */}
                <div className="flex items-center gap-2 text-[11px] mb-3">
                  <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1 font-semibold">
                    <Droplet className="w-3 h-3" />
                    {alt.waterRequirement} Water
                  </span>
                  <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    {alt.marketRisk} Risk
                  </span>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed italic">
                  &ldquo;{alt.keyAdvantage}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
