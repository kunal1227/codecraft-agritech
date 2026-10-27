import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 60; // 1 minute cache for location lookups

interface ReverseGeoResult {
  latitude: number;
  longitude: number;
  state: string;
  district: string;
  city: string;
  region: string;
  country: string;
  source: string;
  formattedAddress?: string;
}

// Map Indian States to Agro-Climatic Zones
function getAgroZoneForState(state: string, district?: string): string {
  const s = (state || '').toLowerCase();
  const d = (district || '').toLowerCase();

  if (s.includes('maharashtra')) {
    if (d.includes('nashik') || d.includes('pune') || d.includes('ahmednagar') || d.includes('satara')) {
      return 'Western Deccan Plateau & Ghats';
    }
    if (d.includes('nagpur') || d.includes('amravati') || d.includes('akola') || d.includes('wardha') || d.includes('yavatmal')) {
      return 'Vidarbha Black Soil Zone';
    }
    if (d.includes('latur') || d.includes('nanded') || d.includes('chhatrapati') || d.includes('aurangabad') || d.includes('jalna') || d.includes('beed')) {
      return 'Marathwada Semi-Arid Plateau';
    }
    if (d.includes('jalgaon') || d.includes('dhule') || d.includes('nandurbar')) {
      return 'Khandesh Tapi Basin';
    }
    return 'Maharashtra Deccan Plateau';
  }

  if (s.includes('punjab')) return 'Malwa & Upper Gangetic Agro-Zone';
  if (s.includes('haryana')) return 'Indo-Gangetic Semi-Arid Plain';
  if (s.includes('gujarat')) return 'Saurashtra & Western Arid Coastal';
  if (s.includes('madhya pradesh')) return 'Malwa Plateau & Narmada Basin';
  if (s.includes('rajasthan')) return 'Hadoti & Thar Semi-Arid Agro-Zone';
  if (s.includes('uttar pradesh')) return 'Central & Eastern Gangetic Alluvial';
  if (s.includes('karnataka')) return 'Southern Deccan & Krishna Basin';
  if (s.includes('telangana')) return 'North Telangana Semi-Arid Plateau';
  if (s.includes('andhra pradesh')) return 'Krishna-Godavari Coastal Agro-Zone';
  if (s.includes('tamil nadu')) return 'Cauvery Delta & Southern Coastal';
  if (s.includes('bihar')) return 'Middle Gangetic Plain';
  if (s.includes('west bengal')) return 'Lower Gangetic Plain & Delta';
  if (s.includes('odisha')) return 'Eastern Coastal & Mahanadi Basin';

  return `${state} Agro-Climatic Zone`;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const latStr = searchParams.get('lat');
  const lonStr = searchParams.get('lon') || searchParams.get('lng');
  const query = searchParams.get('search');
  const isAuto = searchParams.get('auto') === 'true' || (!latStr && !query);

  // 1. Live Place Search / Autocomplete (e.g. ?search=Nashik)
  if (query && query.trim().length >= 2) {
    try {
      const searchUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        query.trim()
      )}&count=8&language=en&format=json`;

      const searchRes = await fetch(searchUrl, {
        headers: { 'User-Agent': 'AgriTech-App/1.0' },
        next: { revalidate: 3600 },
      });

      if (searchRes.ok) {
        const searchData = await searchRes.json();
        const results = (searchData.results || []).map((item: any) => {
          const state = item.admin1 || item.country || '';
          const district = item.admin2 || item.name || '';
          return {
            id: item.id,
            name: item.name,
            district,
            state,
            country: item.country || 'India',
            latitude: Number(item.latitude.toFixed(4)),
            longitude: Number(item.longitude.toFixed(4)),
            region: getAgroZoneForState(state, district),
            label: `${item.name}${item.admin2 ? ', ' + item.admin2 : ''}, ${state} (${item.country})`,
          };
        });
        return NextResponse.json({ success: true, results });
      }
    } catch (searchErr) {
      console.warn('Geocoding search failed:', searchErr);
    }
  }

  // 2. Real-Time Reverse Geocoding from Coordinates (?lat=...&lon=...)
  if (latStr && lonStr) {
    const lat = parseFloat(latStr);
    const lon = parseFloat(lonStr);

    if (!isNaN(lat) && !isNaN(lon)) {
      // Primary Source: BigDataCloud Free Client Reverse Geocoding
      try {
        const bdcUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
        const bdcRes = await fetch(bdcUrl, {
          headers: { 'User-Agent': 'AgriTech-App/1.0' },
          next: { revalidate: 300 },
        });

        if (bdcRes.ok) {
          const bdcData = await bdcRes.json();
          const state = bdcData.principalSubdivision || 'Maharashtra';
          
          // Find district from administrative levels
          let district = bdcData.city || bdcData.locality || '';
          if (Array.isArray(bdcData.localityInfo?.administrative)) {
            const districtObj = bdcData.localityInfo.administrative.find(
              (item: any) =>
                item.description?.toLowerCase().includes('district') ||
                item.name?.toLowerCase().includes('district') ||
                item.adminLevel === 5
            );
            if (districtObj) {
              district = districtObj.name.replace(/\s+district/i, '');
            }
          }
          if (!district) district = bdcData.city || bdcData.locality || 'Field Region';

          const city = bdcData.city || bdcData.locality || district;
          const region = getAgroZoneForState(state, district);

          const payload: ReverseGeoResult = {
            latitude: Number(lat.toFixed(4)),
            longitude: Number(lon.toFixed(4)),
            state,
            district,
            city,
            region,
            country: bdcData.countryName || 'India',
            source: 'live_bigdatacloud_reverse_geocoding',
            formattedAddress: `${city}, ${district}, ${state}`,
          };

          return NextResponse.json({ success: true, data: payload });
        }
      } catch (bdcError) {
        console.warn('BigDataCloud geocode failed, trying Nominatim fallback:', bdcError);
      }

      // Secondary Fallback: OpenStreetMap Nominatim
      try {
        const nomUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=14&addressdetails=1`;
        const nomRes = await fetch(nomUrl, {
          headers: { 'User-Agent': 'AgriTech-Precision-Agriculture-App/1.0 (contact@agritech.app)' },
          next: { revalidate: 300 },
        });

        if (nomRes.ok) {
          const nomData = await nomRes.json();
          const addr = nomData.address || {};
          const state = addr.state || 'Maharashtra';
          const district = addr.state_district || addr.county || addr.district || addr.city || 'Nashik';
          const city = addr.city || addr.town || addr.village || addr.suburb || district;
          const region = getAgroZoneForState(state, district);

          const payload: ReverseGeoResult = {
            latitude: Number(lat.toFixed(4)),
            longitude: Number(lon.toFixed(4)),
            state,
            district: district.replace(/\s+district/i, ''),
            city,
            region,
            country: addr.country || 'India',
            source: 'live_osm_nominatim_reverse_geocoding',
            formattedAddress: nomData.display_name || `${city}, ${state}`,
          };

          return NextResponse.json({ success: true, data: payload });
        }
      } catch (nomError) {
        console.warn('Nominatim fallback error:', nomError);
      }
    }
  }

  // 3. Real-Time IP Geolocation Auto-Detection (When GPS is pending/denied or ?auto=true)
  if (isAuto) {
    // Try ipwho.is first
    try {
      const clientIp =
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        request.headers.get('x-real-ip') ||
        '';

      const ipUrl = clientIp && !clientIp.startsWith('127.') && !clientIp.startsWith('192.168.')
        ? `https://ipwho.is/${clientIp}`
        : 'https://ipwho.is/';

      const ipRes = await fetch(ipUrl, {
        headers: { 'User-Agent': 'AgriTech-App/1.0' },
        next: { revalidate: 300 },
      });

      if (ipRes.ok) {
        const ipData = await ipRes.json();
        if (ipData.success !== false && ipData.latitude && ipData.longitude) {
          const state = ipData.region || 'Maharashtra';
          const district = ipData.city || 'Nashik';
          const region = getAgroZoneForState(state, district);

          const payload: ReverseGeoResult = {
            latitude: Number(Number(ipData.latitude).toFixed(4)),
            longitude: Number(Number(ipData.longitude).toFixed(4)),
            state,
            district,
            city: ipData.city || district,
            region,
            country: ipData.country || 'India',
            source: 'live_realtime_ip_geolocation',
            formattedAddress: `${ipData.city || district}, ${state}, ${ipData.country || 'India'}`,
          };

          return NextResponse.json({ success: true, data: payload });
        }
      }
    } catch (ipWhoError) {
      console.warn('ipwho.is failed, trying ipapi.co fallback:', ipWhoError);
    }

    // Secondary IP Fallback: ipapi.co
    try {
      const ipApiRes = await fetch('https://ipapi.co/json/', {
        headers: { 'User-Agent': 'AgriTech-App/1.0' },
        next: { revalidate: 300 },
      });

      if (ipApiRes.ok) {
        const ipApiData = await ipApiRes.json();
        if (ipApiData.latitude && ipApiData.longitude) {
          const state = ipApiData.region || 'Maharashtra';
          const district = ipApiData.city || 'Nashik';
          const region = getAgroZoneForState(state, district);

          const payload: ReverseGeoResult = {
            latitude: Number(Number(ipApiData.latitude).toFixed(4)),
            longitude: Number(Number(ipApiData.longitude).toFixed(4)),
            state,
            district,
            city: ipApiData.city || district,
            region,
            country: ipApiData.country_name || 'India',
            source: 'live_ipapi_geolocation',
            formattedAddress: `${ipApiData.city || district}, ${state}`,
          };

          return NextResponse.json({ success: true, data: payload });
        }
      }
    } catch (ipApiError) {
      console.warn('ipapi.co failed:', ipApiError);
    }
  }

  // 4. Default Safe Indian Agricultural Hub (Nashik, Maharashtra Deccan Regur)
  const defaultPayload: ReverseGeoResult = {
    latitude: 19.9975,
    longitude: 73.7898,
    state: 'Maharashtra',
    district: 'Nashik',
    city: 'Nashik',
    region: 'Western Deccan Plateau & Ghats',
    country: 'India',
    source: 'regional_agricultural_preset',
    formattedAddress: 'Nashik, Maharashtra, India',
  };

  return NextResponse.json({ success: true, data: defaultPayload });
}
