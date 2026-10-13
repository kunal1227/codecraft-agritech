import { RecommendationResult, SavedPlan } from '@/types/agriculture';

const PLANS_STORAGE_KEY = 'codecraft_saved_plans_v1';
const LAST_RECOMMENDATION_KEY = 'codecraft_last_recommendation_v1';
const DB_NAME = 'CodeCraftAgritechDB';
const DB_VERSION = 1;
const STORE_NAME = 'farm_plans';

// Helper to open IndexedDB
function openIndexedDB(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null);
      return;
    }

    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

// Save a plan to IndexedDB (asynchronous background persistence)
async function saveToIndexedDB(key: string, data: unknown): Promise<void> {
  const db = await openIndexedDB();
  if (!db) return;

  try {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put({ id: key, data, updatedAt: new Date().toISOString() });
  } catch (err) {
    console.warn('IndexedDB save warning:', err);
  }
}

// Retrieve from IndexedDB (fallback if localStorage is cleared or quota exceeded)
export async function getFromIndexedDB<T>(key: string): Promise<T | null> {
  const db = await openIndexedDB();
  if (!db) return null;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => {
        resolve(req.result ? (req.result.data as T) : null);
      };
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

export interface CachedPlanRecord {
  result: RecommendationResult;
  savedAt: string;
}

/**
 * Automatically invoked whenever a user generates a new recommendation plan.
 * Persists both to localStorage and IndexedDB so data is immediately safe offline.
 */
export function cacheLatestGeneratedPlan(result: RecommendationResult): void {
  if (typeof window === 'undefined') return;

  const record: CachedPlanRecord = {
    result,
    savedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(LAST_RECOMMENDATION_KEY, JSON.stringify(record));
  } catch (err) {
    console.warn('localStorage cache quota warning:', err);
  }

  // Also save to IndexedDB asynchronously
  saveToIndexedDB('latest_plan', record);
}

/**
 * Retrieves the last generated recommendation plan from localStorage
 * or IndexedDB fallback.
 */
export function getLastCachedRecommendation(): CachedPlanRecord | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(LAST_RECOMMENDATION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Support both new record structure and raw legacy result
      if (parsed.result && parsed.savedAt) {
        return parsed as CachedPlanRecord;
      }
      return {
        result: parsed as RecommendationResult,
        savedAt: (parsed as RecommendationResult).timestamp || new Date().toISOString(),
      };
    }
  } catch (err) {
    console.error('Failed to retrieve cached recommendation from localStorage:', err);
  }

  return null;
}

/**
 * Save plan to farmer's permanent offline library list
 */
export function savePlanToStorage(result: RecommendationResult): SavedPlan {
  const newPlan: SavedPlan = {
    id: result.id,
    createdAt: new Date().toISOString(),
    farmName: `${result.input.location.district || result.input.location.region} Farm (${result.input.landSize} ${result.input.landUnit})`,
    locationName: `${result.input.location.district ? result.input.location.district + ', ' : ''}${result.input.location.state}`,
    primaryCrop: result.primaryCrop,
    landSizeAcres: result.input.landSize,
    expectedProfit: result.expectedYield.estimatedNetProfit,
    result,
  };

  try {
    if (typeof window !== 'undefined') {
      const existing = getSavedPlans();
      const filtered = existing.filter((p) => p.id !== result.id);
      const updated = [newPlan, ...filtered].slice(0, 25); // Cache up to 25 plans
      localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(updated));
      saveToIndexedDB('saved_plans_list', updated);
    }
  } catch (err) {
    console.error('Failed to save plan to localStorage:', err);
  }

  // Also cache as latest plan
  cacheLatestGeneratedPlan(result);

  return newPlan;
}

export function getSavedPlans(): SavedPlan[] {
  try {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(PLANS_STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    }
  } catch (err) {
    console.error('Failed to read plans from localStorage:', err);
  }
  return [];
}

export function removeSavedPlan(id: string): void {
  try {
    if (typeof window !== 'undefined') {
      const existing = getSavedPlans();
      const updated = existing.filter((p) => p.id !== id);
      localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(updated));
      saveToIndexedDB('saved_plans_list', updated);
    }
  } catch (err) {
    console.error('Failed to remove plan from localStorage:', err);
  }
}
