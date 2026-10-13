'use client';

import { HyperLocalWeather } from '@/types/agriculture';
import {
  CloudSun,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  AlertTriangle,
  Info,
  CheckCircle2,
  Calendar,
  Compass,
} from 'lucide-react';

interface WeatherWidgetProps {
  weather: HyperLocalWeather;
}

export function WeatherWidget({ weather }: WeatherWidgetProps) {
  const getSprayBadge = (suitability: 'Excellent' | 'Moderate' | 'Avoid') => {
    if (suitability === 'Excellent') {
      return 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
    }
    if (suitability === 'Moderate') {
      return 'bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800';
    }
    return 'bg-rose-100 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800';
  };

  const getWeatherIcon = (cond: string) => {
    if (cond.includes('Rain') || cond.includes('Thunder')) {
      return <CloudRain className="w-5 h-5 text-blue-500" />;
    }
    if (cond.includes('Cloud')) {
      return <CloudSun className="w-5 h-5 text-amber-500" />;
    }
    return <Sun className="w-5 h-5 text-amber-500" />;
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 sm:p-7 shadow-xl shadow-emerald-950/5 border border-emerald-900/10 dark:border-emerald-800/40 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <CloudSun className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              OpenWeatherMap Hyper-Local Integration
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-50 mt-1">
            7-Day Agronomic Weather Outlook
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Micro-climate tracking for foliar spraying, irrigation timing, and crop protection.
          </p>
        </div>

        {/* Current Temp & Wind Snapshot */}
        <div className="flex items-center gap-4 bg-stone-50 dark:bg-stone-800/60 px-4 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-700 self-start sm:self-auto">
          <div>
            <div className="text-[10px] uppercase font-bold text-stone-400">Current Field Temp</div>
            <div className="text-2xl font-black text-stone-900 dark:text-stone-100">
              {weather.currentTemp}°C
            </div>
            <div className="text-[10px] text-stone-400">Feels like {weather.feelsLike}°C</div>
          </div>
          <div className="h-8 w-px bg-stone-300 dark:bg-stone-700" />
          <div className="text-xs space-y-1">
            <div className="flex items-center gap-1 text-stone-600 dark:text-stone-300">
              <Droplets className="w-3.5 h-3.5 text-blue-500" />
              <span>{weather.humidity}% RH</span>
            </div>
            <div className="flex items-center gap-1 text-stone-600 dark:text-stone-300">
              <Wind className="w-3.5 h-3.5 text-teal-500" />
              <span>{weather.windSpeedKmH} km/h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Agro-meteorological Alerts */}
      {weather.alerts.length > 0 && (
        <div className="my-4 space-y-2.5">
          {weather.alerts.map((alert, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border flex items-start gap-3 text-xs ${
                alert.severity === 'warning'
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                  : alert.severity === 'danger'
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              }`}
            >
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-extrabold text-sm">{alert.title}</div>
                <div className="text-stone-600 dark:text-stone-300">{alert.message}</div>
                <div className="font-semibold text-stone-800 dark:text-stone-100 flex items-center gap-1 pt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <strong>Advisory:</strong> {alert.advisoryAction}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 7-Day Forecast Grid */}
      <div className="mt-5">
        <div className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-emerald-600" />
          Day-by-Day Forecast & Spray Windows
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {weather.forecast7Days.map((day, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60 flex flex-col items-center text-center space-y-2 transition-all hover:border-emerald-500"
            >
              <div className="font-bold text-xs text-stone-800 dark:text-stone-200">{day.day}</div>
              <div className="text-[10px] text-stone-400">{day.date}</div>

              <div className="my-1">{getWeatherIcon(day.condition)}</div>

              <div className="text-xs font-extrabold text-stone-900 dark:text-stone-100">
                {day.tempMax}° / <span className="text-stone-400 font-normal">{day.tempMin}°</span>
              </div>

              <div className="text-[11px] text-blue-600 dark:text-blue-400 font-bold flex items-center gap-0.5">
                <CloudRain className="w-3 h-3" />
                <span>{day.rainProbPct}%</span>
              </div>

              <div className="w-full pt-1 border-t border-stone-200 dark:border-stone-700">
                <span className="text-[9px] uppercase font-bold text-stone-400 block mb-0.5">
                  Spray Index
                </span>
                <span
                  className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase border ${getSprayBadge(
                    day.spraySuitability
                  )}`}
                >
                  {day.spraySuitability}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
