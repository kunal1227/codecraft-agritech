import { LocationData } from '@/types/agriculture';
import { findNearestIndianDistrict } from '@/utils/indiaGeo';

export interface LocationSearchResult {
  id: number;
  name: string;
  district: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  region: string;
  label: string;
}

/**
 * Perform real-time reverse geocoding from GPS coordinates.
 * Priority:
 * 1. Direct browser client call to BigDataCloud (bypasses server rate limits)
 * 2. Next.js internal API (/api/location?lat=...&lon=...)
 * 3. 100% offline-safe Indian District Centroid Engine (< 1ms, zero network dependency)
 */
export async function reverseGeocodeCoordinates(
  lat: number,
  lon: number
): Promise<LocationData> {
  const nearest = findNearestIndianDistrict(lat, lon);

  // 1. Try Direct Client-Side Reverse Geocoding (Direct from browser connection)
  if (typeof window !== 'undefined') {
    try {
      const bdcUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
      const res = await fetch(bdcUrl, { signal: AbortSignal.timeout(4000) });
      if (res.ok) {
        const bdcData = await res.json();
        const state = bdcData.principalSubdivision || nearest.state;

        let district = '';
        if (Array.isArray(bdcData.localityInfo?.administrative)) {
          const districtObj = bdcData.localityInfo.administrative.find(
            (item: any) =>
              item.description?.toLowerCase().includes('district') ||
              item.name?.toLowerCase().includes('district') ||
              item.adminLevel === 5
          );
          if (districtObj) {
            district = districtObj.name.replace(/\s+district/i, '').trim();
          }
        }
        if (!district) district = bdcData.city || bdcData.locality || nearest.district;
        const city = bdcData.city || bdcData.locality || district;

        return {
          region: nearest.region,
          state,
          district,
          city,
          latitude: Number(lat.toFixed(4)),
          longitude: Number(lon.toFixed(4)),
          isGpsDetected: true,
          source: 'direct_client_bigdatacloud_gps',
          formattedAddress: `${city}, ${district}, ${state}`,
        };
      }
    } catch {
      // Continue to next fallback
    }
  }

  // 2. Next.js Internal Location API
  try {
    const res = await fetch(`/api/location?lat=${lat}&lon=${lon}`, { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        return {
          region: data.data.region || nearest.region,
          state: data.data.state || nearest.state,
          district: data.data.district || nearest.district,
          city: data.data.city || data.data.district || nearest.district,
          latitude: Number(lat.toFixed(4)), // NEVER overwrite real GPS coords
          longitude: Number(lon.toFixed(4)), // NEVER overwrite real GPS coords
          isGpsDetected: true,
          source: data.data.source || 'internal_api_gps',
          formattedAddress: data.data.formattedAddress || `${nearest.district}, ${nearest.state}`,
        };
      }
    }
  } catch (error) {
    console.warn('Internal API reverse geocode warning:', error);
  }

  // 3. Guaranteed Offline Fallback (Indian District Centroid Match)
  return {
    region: nearest.region,
    state: nearest.state,
    district: nearest.district,
    city: nearest.district,
    latitude: Number(lat.toFixed(4)),
    longitude: Number(lon.toFixed(4)),
    isGpsDetected: true,
    source: 'offline_agricultural_centroid_engine',
    formattedAddress: `${nearest.district}, ${nearest.state}, India`,
  };
}

/**
 * Explicitly query device hardware GPS with high accuracy and a 15-second timeout.
 * Throws on permission denied or hardware unavailable so UI can show proper guidance.
 */
export async function acquireHardwareGps(): Promise<LocationData> {
  if (typeof window === 'undefined' || !('geolocation' in navigator)) {
    throw new Error('UNSUPPORTED');
  }

  const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    });
  });

  const { latitude, longitude } = pos.coords;
  const location = await reverseGeocodeCoordinates(latitude, longitude);
  location.isGpsDetected = true;
  return location;
}

/**
 * Real-Time Auto-Location Detection on App Launch:
 * 1. Tries high-accuracy browser GPS (navigator.geolocation)
 * 2. If denied or timed-out, falls back to IP Geolocation without claiming false GPS lock
 */
export async function detectRealTimeLocation(): Promise<LocationData> {
  // 1. Try Browser GPS first
  if (typeof window !== 'undefined' && 'geolocation' in navigator) {
    try {
      return await acquireHardwareGps();
    } catch (gpsError) {
      console.warn('Browser GPS not immediately available, falling back to IP Geolocation:', gpsError);
    }
  }

  // 2. Fallback to Real-Time IP Geolocation
  try {
    const res = await fetch('/api/location?auto=true', { signal: AbortSignal.timeout(4000) });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return {
          region: json.data.region || 'Western Deccan Plateau & Ghats',
          state: json.data.state || 'Maharashtra',
          district: json.data.district || 'Nashik',
          city: json.data.city || json.data.district || 'Nashik',
          latitude: json.data.latitude || 19.9975,
          longitude: json.data.longitude || 73.7898,
          isGpsDetected: false, // Honest flag: IP approximation, not hardware GPS lock
          source: json.data.source || 'live_network_ip_estimation',
          formattedAddress: json.data.formattedAddress,
        };
      }
    }
  } catch (ipErr) {
    console.warn('Real-time IP location fetch failed:', ipErr);
  }

  // 3. Absolute default (Nashik, Maharashtra)
  return {
    region: 'Western Deccan Plateau & Ghats',
    state: 'Maharashtra',
    district: 'Nashik',
    city: 'Nashik',
    latitude: 19.9975,
    longitude: 73.7898,
    isGpsDetected: false,
    formattedAddress: 'Nashik, Maharashtra, India',
    source: 'preset_default',
  };
}

/**
 * Real-time Indian District / Village / City Search & Autocomplete
 */
export async function searchRealTimeLocations(
  query: string
): Promise<LocationSearchResult[]> {
  if (!query || query.trim().length < 2) return [];

  try {
    const res = await fetch(`/api/location?search=${encodeURIComponent(query.trim())}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.results)) {
        return data.results;
      }
    }
  } catch (err) {
    console.warn('Live location search error:', err);
  }

  return [];
}
