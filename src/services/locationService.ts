import { LocationData } from '@/types/agriculture';

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
 * Perform real-time reverse geocoding from GPS coordinates
 */
export async function reverseGeocodeCoordinates(
  lat: number,
  lon: number
): Promise<LocationData> {
  try {
    const res = await fetch(`/api/location?lat=${lat}&lon=${lon}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        return {
          region: data.data.region || 'Regional Agro-Zone',
          state: data.data.state || 'Maharashtra',
          district: data.data.district || 'Nashik',
          city: data.data.city,
          latitude: data.data.latitude,
          longitude: data.data.longitude,
          isGpsDetected: true,
          source: data.data.source,
          formattedAddress: data.data.formattedAddress,
        };
      }
    }
  } catch (error) {
    console.warn('Real-time reverse geocoding error:', error);
  }

  // Fallback to coordinates
  return {
    region: 'Real-Time Field GPS',
    state: 'Maharashtra',
    district: 'Live Coords',
    latitude: Number(lat.toFixed(4)),
    longitude: Number(lon.toFixed(4)),
    isGpsDetected: true,
  };
}

/**
 * Real-Time Auto-Location Detection:
 * 1. Tries high-accuracy browser GPS (navigator.geolocation)
 * 2. If granted, reverse-geocodes with BigDataCloud / OSM via /api/location
 * 3. If denied, timed-out, or unavailable, instantly falls back to real-time IP Geolocation (/api/location?auto=true)
 */
export async function detectRealTimeLocation(): Promise<LocationData> {
  // 1. Try Browser GPS first
  if (typeof window !== 'undefined' && 'geolocation' in navigator) {
    const gpsPromise = new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 6000,
        maximumAge: 60000,
      });
    });

    try {
      const pos = await gpsPromise;
      const { latitude, longitude } = pos.coords;
      const location = await reverseGeocodeCoordinates(latitude, longitude);
      location.isGpsDetected = true;
      return location;
    } catch (gpsError) {
      console.warn('Browser GPS permission denied or timed out. Falling back to real-time IP Geolocation:', gpsError);
    }
  }

  // 2. Fallback to Real-Time IP Geolocation
  try {
    const res = await fetch('/api/location?auto=true');
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return {
          region: json.data.region || 'Regional Agro-Zone',
          state: json.data.state || 'Maharashtra',
          district: json.data.district || json.data.city || 'Nashik',
          city: json.data.city,
          latitude: json.data.latitude || 19.9975,
          longitude: json.data.longitude || 73.7898,
          isGpsDetected: true,
          source: json.data.source || 'live_realtime_ip_geolocation',
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
