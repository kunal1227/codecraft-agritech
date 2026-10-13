'use client';

import { SeedVariety } from '@/types/agriculture';
import {
  ShieldCheck,
  Award,
  Calendar,
  Layers,
  ThermometerSun,
  Sparkles,
  Store,
  CheckCircle,
} from 'lucide-react';

interface SeedVarietyCardProps {
  seed: SeedVariety;
  cropName: string;
}

export function SeedVarietyCard({ seed, cropName }: SeedVarietyCardProps) {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 sm:p-7 shadow-xl shadow-emerald-950/5 border border-emerald-900/10 dark:border-emerald-800/40 relative overflow-hidden transition-all">
      {/* Decorative agronomic ribbon */}
      <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300">
              Optimal Cultivar Choice
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-800">
              <Store className="w-3 h-3" />
              {seed.certifiedVendorAvailability}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-50 mt-1">
            {seed.name}
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1.5 mt-0.5">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>Developed by: {seed.breeder}</span>
            <span className="font-mono text-stone-400">({seed.code})</span>
          </p>
        </div>

        {/* Germination Gauge */}
        <div className="flex items-center gap-3 bg-stone-50 dark:bg-stone-800/70 px-4 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-700 self-start sm:self-auto">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-stone-400">Certified Germination</div>
            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
              {seed.germinationRatePct}%
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Grid of Key Agronomic Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
        <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60">
          <div className="text-stone-400 text-[11px] font-bold uppercase flex items-center gap-1">
            <Calendar className="w-3 h-3 text-emerald-600" />
            Maturity
          </div>
          <div className="text-sm font-extrabold text-stone-800 dark:text-stone-100 mt-1">
            {seed.daysToMaturity}
          </div>
          <div className="text-[10px] text-stone-400 mt-0.5">Sow to Harvest</div>
        </div>

        <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60">
          <div className="text-stone-400 text-[11px] font-bold uppercase flex items-center gap-1">
            <Layers className="w-3 h-3 text-emerald-600" />
            Seed Rate
          </div>
          <div className="text-sm font-extrabold text-stone-800 dark:text-stone-100 mt-1">
            {seed.seedRatePerAcre}
          </div>
          <div className="text-[10px] text-stone-400 mt-0.5">Recommended/Acre</div>
        </div>

        <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60">
          <div className="text-stone-400 text-[11px] font-bold uppercase flex items-center gap-1">
            <ThermometerSun className="w-3 h-3 text-emerald-600" />
            Sowing Depth
          </div>
          <div className="text-sm font-extrabold text-stone-800 dark:text-stone-100 mt-1">
            {seed.sowingDepthCm}
          </div>
          <div className="text-[10px] text-stone-400 mt-0.5">Moisture Line</div>
        </div>

        <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60">
          <div className="text-stone-400 text-[11px] font-bold uppercase flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Yield Potential
          </div>
          <div className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400 mt-1">
            {seed.yieldPotentialQuintalPerAcre}
          </div>
          <div className="text-[10px] text-stone-400 mt-0.5">Peak Agronomic</div>
        </div>
      </div>

      {/* Sowing Window Banner */}
      <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs">
        <span className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-emerald-600" />
          Optimal Sowing Calendar Window:
        </span>
        <span className="font-extrabold text-emerald-800 dark:text-emerald-300">
          {seed.sowingWindow}
        </span>
      </div>

      {/* Disease Resistance & Climate Traits */}
      <div className="space-y-3">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
            Pathogen & Pest Defenses:
          </span>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {seed.keyResistances.map((res, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700"
              >
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                {res}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
            Climate Resilience Attributes:
          </span>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {seed.climateResilience.map((clim, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60"
              >
                <ThermometerSun className="w-3 h-3 text-amber-500" />
                {clim}
              </span>
            ))}
          </div>
        </div>

        {/* Special Trait Note */}
        <div className="pt-2 text-xs text-stone-600 dark:text-stone-300 italic bg-stone-50 dark:bg-stone-800/40 p-3 rounded-xl border-l-4 border-emerald-600">
          <strong>Breeder Highlight for {cropName}:</strong> {seed.specialTrait}
        </div>
      </div>
    </div>
  );
}
