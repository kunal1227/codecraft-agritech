'use client';

import { MandiMarketData } from '@/types/agriculture';
import {
  TrendingUp,
  TrendingDown,
  Building2,
  Calendar,
  IndianRupee,
  Activity,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';

interface MandiMarketCardProps {
  market: MandiMarketData;
}

export function MandiMarketCard({ market }: MandiMarketCardProps) {
  // Sparkline calculation for SVG
  const prices = market.sparklinePrices;
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  const range = maxP - minP || 1;
  const width = 300;
  const height = 60;

  const points = prices
    .map((p, idx) => {
      const x = (idx / (prices.length - 1)) * width;
      const y = height - ((p - minP) / range) * (height - 10) - 5;
      return `${x},${y}`;
    })
    .join(' ');

  const isBullish = market.trendStatus === 'bullish';
  const isAboveMsp = market.priceDiffFromMsp >= 0;

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 sm:p-7 shadow-xl shadow-emerald-950/5 border border-emerald-900/10 dark:border-emerald-800/40 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {market.dataSourceBadge || 'Agmarknet Live Mandi Stream'}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-50 mt-1">
            {market.crop} Market Intelligence
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Standard: {market.variety} • State: {market.state}
          </p>
        </div>

        {/* 30-Day Trend Indicator */}
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold self-start sm:self-auto ${
            isBullish
              ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
              : 'bg-rose-100 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
          }`}
        >
          {isBullish ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{market.priceTrendPct30Days > 0 ? `+${market.priceTrendPct30Days}%` : `${market.priceTrendPct30Days}%`} (30 Days)</span>
        </div>
      </div>

      {/* Primary Price Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5">
        {/* Current Modal Rate */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
          <div className="text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase flex items-center gap-1">
            <IndianRupee className="w-3.5 h-3.5" />
            Current Modal Price
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-950 dark:text-white mt-1">
            ₹{market.currentModalPrice.toLocaleString('en-IN')}
            <span className="text-xs font-normal text-stone-500 dark:text-emerald-300/80 ml-1">/ Quintal</span>
          </div>
          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-1">
            Weighted APMC Average
          </div>
        </div>

        {/* Govt MSP Comparison */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60">
          <div className="text-stone-500 dark:text-stone-400 text-xs font-bold uppercase flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            Govt. MSP Floor
          </div>
          <div className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 mt-1">
            ₹{market.mspPrice.toLocaleString('en-IN')}
            <span className="text-xs font-normal text-stone-400 ml-1">/ Quintal</span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-bold">
            <span
              className={`px-1.5 py-0.5 rounded ${
                isAboveMsp
                  ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300'
              }`}
            >
              {isAboveMsp ? `+₹${market.priceDiffFromMsp} Above MSP` : `-₹${Math.abs(market.priceDiffFromMsp)} Below MSP`}
            </span>
          </div>
        </div>

        {/* Harvest Window Projection */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60">
          <div className="text-stone-500 dark:text-stone-400 text-xs font-bold uppercase flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            Projected Harvest Window
          </div>
          <div className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 mt-1">
            ₹{market.harvestWindowProjectedPrice.expectedModal.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-stone-400 mt-1">
            Band: ₹{market.harvestWindowProjectedPrice.min} – ₹{market.harvestWindowProjectedPrice.max}
          </div>
        </div>
      </div>

      {/* 30-Day Price Trend Sparkline Chart */}
      <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/60 mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            30-Day Agmarknet Price Movement
          </span>
          <span className="text-[11px] font-mono text-stone-400">
            Min: ₹{minP} | Max: ₹{maxP}
          </span>
        </div>
        <div className="w-full overflow-hidden">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-16 stroke-current">
            <defs>
              <linearGradient id="mandiGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="#059669"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>

      {/* Nearby APMC Mandis Table */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            Nearby APMC Yard Rates & Arrival Volumes
          </span>
        </div>
        {/* Mobile View: Clean Card Stack */}
        <div className="sm:hidden space-y-2.5">
          {market.topMandis.map((mandi, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/60 flex items-center justify-between"
            >
              <div>
                <div className="font-extrabold text-xs text-stone-900 dark:text-stone-100">
                  {mandi.mandiName}
                </div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">
                  {mandi.district} • {mandi.distanceKm} km away
                </div>
                <div className="text-[10px] text-stone-400 mt-1 font-mono">
                  Range: ₹{mandi.minPrice} - ₹{mandi.maxPrice}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-emerald-700 dark:text-emerald-400">
                  ₹{mandi.modalPrice}
                </div>
                <span className="text-[10px] font-semibold text-stone-400">/ Quintal</span>
                <div className="text-[10px] font-mono text-stone-400 mt-0.5">
                  {mandi.arrivalVolumeTonnes} MT
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Full Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-400 font-bold uppercase text-[10px]">
                <th className="py-2 px-2">APMC Mandi Yard</th>
                <th className="py-2 px-2">Distance</th>
                <th className="py-2 px-2">Modal Price</th>
                <th className="py-2 px-2">Price Spread</th>
                <th className="py-2 px-2 text-right">Daily Arrivals</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {market.topMandis.map((mandi, idx) => (
                <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-stone-800/40">
                  <td className="py-2.5 px-2 font-bold text-stone-800 dark:text-stone-100">
                    {mandi.mandiName}
                    <div className="text-[10px] font-normal text-stone-400">{mandi.district}</div>
                  </td>
                  <td className="py-2.5 px-2 text-stone-600 dark:text-stone-400 font-mono">
                    {mandi.distanceKm} km
                  </td>
                  <td className="py-2.5 px-2 font-extrabold text-emerald-700 dark:text-emerald-400">
                    ₹{mandi.modalPrice}
                  </td>
                  <td className="py-2.5 px-2 text-stone-500 font-mono text-[11px]">
                    ₹{mandi.minPrice} – ₹{mandi.maxPrice}
                  </td>
                  <td className="py-2.5 px-2 text-right font-medium text-stone-700 dark:text-stone-300">
                    {mandi.arrivalVolumeTonnes} MT
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
