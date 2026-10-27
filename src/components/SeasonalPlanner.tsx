'use client';

import { SeasonalCropPlan } from '@/types/agriculture';
import {
  CalendarRange,
  Leaf,
  Sprout,
  SunMedium,
  CheckCircle2,
  TrendingUp,
  Droplet,
  Layers,
} from 'lucide-react';

interface SeasonalPlannerProps {
  plans: SeasonalCropPlan[];
  acres: number;
}

export function SeasonalPlanner({ plans, acres }: SeasonalPlannerProps) {
  const totalAnnualProfit = plans.reduce((acc, p) => acc + p.estimatedNetProfitPerAcre * acres, 0);

  const getSeasonHeaderColor = (season: 'kharif' | 'rabi' | 'zaid') => {
    if (season === 'kharif') {
      return 'from-emerald-700 to-green-800 text-white';
    }
    if (season === 'rabi') {
      return 'from-amber-600 to-yellow-700 text-white';
    }
    return 'from-teal-600 to-cyan-700 text-white';
  };

  const getSeasonBadge = (season: 'kharif' | 'rabi' | 'zaid') => {
    if (season === 'kharif') {
      return { icon: CloudRainIcon, text: 'Monsoon Cycle' };
    }
    if (season === 'rabi') {
      return { icon: SunMedium, text: 'Winter Cycle' };
    }
    return { icon: Sprout, text: 'Summer Catch Cycle' };
  };

  function CloudRainIcon(props: React.SVGProps<SVGSVGElement>) {
    return <Leaf {...props} />;
  }

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 sm:p-7 shadow-xl shadow-emerald-950/5 border border-emerald-900/10 dark:border-emerald-800/40 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <CalendarRange className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Integrated Crop Rotation Architecture
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-50 mt-1">
            1-Year Multi-Crop Seasonal Planner
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Synchronized Kharif, Rabi & Zaid rotation designed to maximize cumulative annual profits and restore biological soil health.
          </p>
        </div>

        {/* Total Annual Rotation Profit */}
        <div className="w-full sm:w-auto text-left sm:text-right flex flex-col justify-center bg-stone-50 dark:bg-stone-800/70 p-3 sm:px-4 sm:py-2.5 rounded-2xl border border-stone-200 dark:border-stone-700">
          <div className="text-[10px] uppercase font-bold text-stone-400">Projected 3-Season Farm Income</div>
          <div className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400">
            ₹{totalAnnualProfit.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-stone-400">Combined for {acres} Acres</div>
        </div>
      </div>

      {/* 3 Season Cards Progression */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 my-6">
        {plans.map((p, idx) => {
          const badge = getSeasonBadge(p.season);
          const BadgeIcon = badge.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col justify-between bg-stone-50/50 dark:bg-stone-800/30 hover:border-emerald-500 transition-all shadow-xs"
            >
              {/* Season Banner */}
              <div className={`p-4 bg-gradient-to-r ${getSeasonHeaderColor(p.season)}`}>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded-full">
                    <BadgeIcon className="w-3 h-3" />
                    {badge.text}
                  </span>
                  <span className="text-xs font-mono font-bold bg-white/20 px-2 py-0.5 rounded-full">
                    {p.months}
                  </span>
                </div>
                <h4 className="text-lg font-black mt-2 tracking-tight">{p.seasonName}</h4>
                <div className="text-xs text-white/90 font-medium">{p.primaryCrop}</div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-4 text-xs">
                {/* Variety & Sowing */}
                <div className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Cultivar:</span>
                    <span className="font-extrabold text-stone-800 dark:text-stone-100">{p.recommendedVariety}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Sowing Window:</span>
                    <span className="font-medium text-emerald-700 dark:text-emerald-400">{p.sowingWindow}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Harvest Window:</span>
                    <span className="font-medium text-stone-700 dark:text-stone-300">{p.harvestWindow}</span>
                  </div>
                </div>

                {/* Soil & Nutrient Impact Matrix */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-stone-400 block tracking-wider">
                    Soil Impact & Nutrient Balance
                  </span>
                  <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-[11px] space-y-1 text-stone-700 dark:text-stone-300">
                    <div className="flex items-start gap-1.5">
                      <Leaf className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{p.soilImpact.nitrogenBalance}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{p.soilImpact.organicMatterContribution}</span>
                    </div>
                  </div>
                </div>

                {/* Companion crop */}
                {p.companionOrIntercrop && (
                  <div className="text-[11px] text-stone-600 dark:text-stone-300">
                    <strong>Intercrop/Border:</strong> {p.companionOrIntercrop}
                  </div>
                )}

                {/* Projected Seasonal Net Profit */}
                <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-stone-400">Est. Profit / Acre:</span>
                  <span className="font-black text-sm text-emerald-700 dark:text-emerald-400">
                    ₹{p.estimatedNetProfitPerAcre.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rotation agronomic rationale callout */}
      <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/60 text-xs text-stone-600 dark:text-stone-300 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-stone-900 dark:text-stone-100">Why this 3-season sequence works:</strong>{' '}
          Rotating a heavy feeder (like Wheat or Rice) with a deep-rooting catch crop like Zaid Green Gram prevents
          nutrient mining in identical root depths, breaks fungal spores and nematode pathogen life-cycles, and contributes
          up to 38-40 kg of biologically fixed atmospheric nitrogen per acre into the topsoil.
        </div>
      </div>
    </div>
  );
}
