import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 300; // Cache for 5 minutes

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat') || '30.901';
  const lng = searchParams.get('lng') || '75.857';

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max&timezone=auto`;

    const res = await fetch(url, {
      next: { revalidate: 300 },
      headers: { 'User-Agent': 'AgriTech-App/1.0' },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ source: 'live_open_meteo', data });
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json({ error: 'Internal weather fetch error' }, { status: 500 });
  }
}
