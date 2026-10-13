'use client';

import { SavedPlan, LanguageCode } from '@/types/agriculture';
import { TRANSLATIONS } from '@/utils/translations';
import {
  X,
  BookmarkCheck,
  Trash2,
  Calendar,
  Layers,
  IndianRupee,
  ExternalLink,
  Printer,
  Sparkles,
} from 'lucide-react';

interface OfflinePlansModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedPlans: SavedPlan[];
  onSelectPlan: (plan: SavedPlan) => void;
  onDeletePlan: (id: string) => void;
  language: LanguageCode;
}

export function OfflinePlansModal({
  isOpen,
  onClose,
  savedPlans,
  onSelectPlan,
  onDeletePlan,
  language,
}: OfflinePlansModalProps) {
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <BookmarkCheck className="w-5 h-5 stroke-[2.2]" />
            </span>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-stone-900 dark:text-stone-50">
                {t.viewSavedPlans}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Stored in device local cache. Available even with zero cellular network.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-3 flex-1">
          {savedPlans.length === 0 ? (
            <div className="py-12 text-center text-stone-400 space-y-2">
              <BookmarkCheck className="w-10 h-10 mx-auto text-stone-300 dark:text-stone-700" />
              <p className="text-sm font-medium">{t.noSavedPlans}</p>
            </div>
          ) : (
            savedPlans.map((plan) => (
              <div
                key={plan.id}
                className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/70 hover:border-emerald-500 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-stone-100">
                      {plan.primaryCrop}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                      {plan.landSizeAcres} Acres
                    </span>
                  </div>
                  <div className="text-xs text-stone-500 dark:text-stone-400 mt-1 flex items-center gap-3">
                    <span>{plan.locationName}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-stone-400" />
                      {new Date(plan.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-1">
                    Est. Profit: ₹{plan.expectedProfit.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => {
                      onSelectPlan(plan);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                  >
                    <span>Load Plan</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onDeletePlan(plan.id)}
                    className="p-1.5 rounded-xl bg-stone-200 hover:bg-rose-100 dark:bg-stone-800 dark:hover:bg-rose-950/50 text-stone-500 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Delete saved plan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            {savedPlans.length} plan{savedPlans.length === 1 ? '' : 's'} cached offline
          </span>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-200 text-xs font-bold hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t.exportAdvisory}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
