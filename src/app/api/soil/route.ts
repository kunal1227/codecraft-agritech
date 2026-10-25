import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 1800; // Cache for 30 minutes

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat') || '30.901';
  const lng = searchParams.get('lng') || '75.857';

  try {
    // 1. Fetch live soil moisture and temperature from Open-Meteo
    const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=soil_temperature_0cm,soil_moisture_0_to_1cm,soil_moisture_1_to_3cm&timezone=auto`;

    // 2. Fetch ISRIC SoilGrids live soil chemistry
    const soilGridsUrl = `https://rest.isric.org/soilgrids/v2.0/properties/query?lat=${lat}&lon=${lng}&property=phh2o&property=nitrogen&property=soc&depth=0-5cm`;

    const [meteoRes, isricRes] = await Promise.allSettled([
      fetch(openMeteoUrl, { next: { revalidate: 1800 } }),
      fetch(soilGridsUrl, { next: { revalidate: 86400 } }),
    ]);

    let soilMoisturePercent: number | null = null;
    let soilTemperature: number | null = null;
    let isricPh: number | null = null;
    let isricNitrogen: number | null = null;
    let isricSoc: number | null = null;

    if (meteoRes.status === 'fulfilled' && meteoRes.value.ok) {
      const mData = await meteoRes.value.json();
      const currentIdx = 0;
      const volumetric = mData.hourly?.soil_moisture_0_to_1cm?.[currentIdx] ?? 0.32;
      soilMoisturePercent = Math.round(volumetric * 100);
      soilTemperature = mData.hourly?.soil_temperature_0cm?.[currentIdx] ?? null;
    }

    if (isricRes.status === 'fulfilled' && isricRes.value.ok) {
      const sData = await isricRes.value.json();
      const layers = sData.properties?.layers || [];
      for (const layer of layers) {
        const mean = layer.depths?.[0]?.values?.mean;
        if (mean !== undefined && mean !== null) {
          if (layer.name === 'phh2o') {
            isricPh = Number((mean / 10).toFixed(1));
          } else if (layer.name === 'nitrogen') {
            isricNitrogen = Number((mean / 10).toFixed(0)); // Convert to kg/ha equivalent range
          } else if (layer.name === 'soc') {
            isricSoc = Number((mean / 100).toFixed(2)); // percentage
          }
        }
      }
    }

    return NextResponse.json({
      source: 'live_isric_and_open_meteo',
      liveSoil: {
        moistureIndex: soilMoisturePercent,
        soilTemperature,
        ph: isricPh,
        nitrogen: isricNitrogen,
        organicCarbon: isricSoc,
      },
    });
  } catch (error) {
    console.error('Soil API error:', error);
    return NextResponse.json({ error: 'Internal Soil fetch error' }, { status: 500 });
  }
}
