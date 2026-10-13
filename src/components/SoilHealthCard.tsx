'use client';

import { SoilComposition } from '@/types/agriculture';
import {
  FlaskConical,
  Sprout,
  CheckCircle,
  AlertTriangle,
  Info,
  Droplet,
  Layers,
} from 'lucide-react';

interface SoilHealthCardProps {
  soil: SoilComposition;
}

export function SoilHealthCard({ soil }: SoilHealthCardProps) {
  const getStatusColor = (status: 'deficient' | 'optimal' | 'excess' | 'low' | 'medium' | 'high' | 'acidic' | 'neutral' | 'alkaline') => {
    if (status === 'optimal' || status === 'medium' || status === 'neutral') {
      return 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
    }
    if (status === 'deficient' || status === 'low' || status === 'acidic') {
      return 'bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800';
    }
    return 'bg-purple-100 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800';
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 sm:p-7 shadow-xl shadow-emerald-950/5 border border-emerald-900/10 dark:border-emerald-800/40 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <FlaskConical className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Soil Composition & Chemistry
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-50 mt-1">
            {soil.soilTypeName}
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Electrical Conductivity: {soil.electricalConductivity} dS/m (Salinity Normal)
          </p>
        </div>

        {/* Soil Health Score Badge */}
        <div className="flex items-center gap-3 bg-stone-50 dark:bg-stone-800/60 px-4 py-2 rounded-2xl border border-stone-200 dark:border-stone-700 self-start sm:self-auto">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-stone-400">Soil Health Score</div>
            <div className="text-xl font-black text-emerald-700 dark:text-emerald-400">
              {soil.healthScore}/100
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center">
            <Sprout className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Primary N-P-K & pH Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
        {/* Nitrogen */}
        <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400">Nitrogen (N)</span>
            <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded border ${getStatusColor(soil.nitrogen.status)}`}>
              {soil.nitrogen.status}
            </span>
          </div>
          <div className="text-xl font-black text-stone-900 dark:text-stone-100 mt-1">
            {soil.nitrogen.value} <span className="text-xs font-normal text-stone-400">kg/ha</span>
          </div>
          <div className="text-[10px] text-stone-400 mt-1">Goal: {soil.nitrogen.benchmark}</div>
        </div>

        {/* Phosphorus */}
        <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400">Phosphorus (P)</span>
            <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded border ${getStatusColor(soil.phosphorus.status)}`}>
              {soil.phosphorus.status}
            </span>
          </div>
          <div className="text-xl font-black text-stone-900 dark:text-stone-100 mt-1">
            {soil.phosphorus.value} <span className="text-xs font-normal text-stone-400">kg/ha</span>
          </div>
          <div className="text-[10px] text-stone-400 mt-1">Goal: {soil.phosphorus.benchmark}</div>
        </div>

        {/* Potassium */}
        <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400">Potassium (K)</span>
            <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded border ${getStatusColor(soil.potassium.status)}`}>
              {soil.potassium.status}
            </span>
          </div>
          <div className="text-xl font-black text-stone-900 dark:text-stone-100 mt-1">
            {soil.potassium.value} <span className="text-xs font-normal text-stone-400">kg/ha</span>
          </div>
          <div className="text-[10px] text-stone-400 mt-1">Goal: {soil.potassium.benchmark}</div>
        </div>

        {/* Soil pH */}
        <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400">Soil pH</span>
            <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded border ${getStatusColor(soil.ph.status)}`}>
              {soil.ph.status}
            </span>
          </div>
          <div className="text-xl font-black text-stone-900 dark:text-stone-100 mt-1">
            {soil.ph.value}
          </div>
          <div className="text-[10px] text-stone-400 mt-1">{soil.ph.benchmark}</div>
        </div>
      </div>

      {/* Secondary properties: Organic Carbon & Moisture */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/60 text-xs">
          <span className="text-stone-600 dark:text-stone-300 flex items-center gap-1.5 font-medium">
            <Layers className="w-4 h-4 text-emerald-600" />
            Organic Carbon (OC) Level:
          </span>
          <span className="font-extrabold text-stone-800 dark:text-stone-100">
            {soil.organicCarbon.value}% ({soil.organicCarbon.status.toUpperCase()})
          </span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/60 text-xs">
          <span className="text-stone-600 dark:text-stone-300 flex items-center gap-1.5 font-medium">
            <Droplet className="w-4 h-4 text-blue-600" />
            Root-Zone Moisture Index:
          </span>
          <span className="font-extrabold text-stone-800 dark:text-stone-100">
            {soil.moistureIndex}% Available Water Capacity
          </span>
        </div>
      </div>

      {/* Fertilizer Amendments Plan */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
          Tailored Fertilizer & Amendment Prescription
        </div>

        <div className="space-y-2">
          {soil.fertilizerRecommendations.map((rec, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div>
                <div className="font-bold text-xs text-stone-800 dark:text-stone-100">
                  {rec.fertilizer}
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                  {rec.purpose}
                </div>
              </div>
              <div className="sm:text-right shrink-0">
                <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-bold border border-emerald-300 dark:border-emerald-800">
                  {rec.dosagePerAcre}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
