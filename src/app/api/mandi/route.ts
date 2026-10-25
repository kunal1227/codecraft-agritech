import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 600; // Cache for 10 minutes

const COMMODITY_MAP: Record<string, string> = {
  Wheat: 'Wheat',
  'Paddy (Rice)': 'Paddy(Dhan)(Common)',
  'Basmati Rice': 'Paddy(Dhan)(Basmati)',
  Cotton: 'Cotton',
  Soybean: 'Soyabean',
  Mustard: 'Mustard',
  Maize: 'Maize',
  'Gram (Chickpea / Chana)': 'Bengal Gram(Gram)(Whole)',
  Tomato: 'Tomato',
  Onion: 'Onion',
  'Chili (Dry)': 'Red Chillies',
};

const AGMARKNET_KEY =
  process.env.DATA_GOV_IN_API_KEY || '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const crop = searchParams.get('crop') || 'Wheat';
  const state = searchParams.get('state') || '';

  const agmarknetCommodity = COMMODITY_MAP[crop] || crop;

  try {
    let url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${AGMARKNET_KEY}&format=json&limit=20&filters[commodity]=${encodeURIComponent(
      agmarknetCommodity
    )}`;

    if (state) {
      url += `&filters[state]=${encodeURIComponent(state)}`;
    }

    const res = await fetch(url, {
      next: { revalidate: 600 },
      headers: { 'User-Agent': 'AgriTech-App/1.0' },
    });

    if (!res.ok) {
      // If state-filtered query yielded non-200, try commodity only
      const fallbackUrl = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${AGMARKNET_KEY}&format=json&limit=20&filters[commodity]=${encodeURIComponent(
        agmarknetCommodity
      )}`;
      const fallbackRes = await fetch(fallbackUrl);
      if (fallbackRes.ok) {
        const fbData = await fallbackRes.json();
        return NextResponse.json({ source: 'live_agmarknet', records: fbData.records || [] });
      }
      return NextResponse.json({ error: 'Mandi API request failed' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ source: 'live_agmarknet', records: data.records || [] });
  } catch (error) {
    console.error('Mandi API error:', error);
    return NextResponse.json({ error: 'Internal Mandi fetch error' }, { status: 500 });
  }
}
