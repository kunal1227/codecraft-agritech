import { HyperLocalWeather, WeatherDayForecast } from '@/types/agriculture';

export async function fetchHyperLocalWeather(
  lat: number,
  lng: number,
  region: string
): Promise<HyperLocalWeather> {
  // Simulate network fetch
  await new Promise((resolve) => setTimeout(resolve, 300));

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();

  // Coordinates influence base temperature
  const baseTemp = 28 + Math.sin(lat) * 4;
  const currentTemp = Math.round(baseTemp);
  const feelsLike = Math.round(currentTemp + 2.5);
  const humidity = Math.round(58 + Math.cos(lng) * 15);
  const windSpeed = Math.round(11 + Math.sin(lat + lng) * 5);

  const forecast7Days: WeatherDayForecast[] = [];

  for (let i = 0; i < 7; i++) {
    const fDate = new Date();
    fDate.setDate(today.getDate() + i);
    const dayName = i === 0 ? 'Today' : dayNames[fDate.getDay()];
    const dateFormatted = fDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
    });

    const isMidWeekRain = i === 2 || i === 3;
    const rainProb = isMidWeekRain ? Math.round(65 + Math.random() * 25) : Math.round(10 + Math.random() * 20);
    const rainMm = rainProb > 50 ? Number((12 + Math.random() * 18).toFixed(1)) : 0;
    const condition =
      rainProb > 60
        ? 'Rainy'
        : rainProb > 35
        ? 'Partly Cloudy'
        : i % 2 === 0
        ? 'Sunny'
        : 'Clear';

    // Spray suitability rule
    let spraySuitability: WeatherDayForecast['spraySuitability'] = 'Excellent';
    if (rainProb > 40 || windSpeed > 18) {
      spraySuitability = 'Avoid';
    } else if (rainProb > 20 || humidity > 75) {
      spraySuitability = 'Moderate';
    }

    forecast7Days.push({
      day: dayName,
      date: dateFormatted,
      tempMax: Math.round(currentTemp + (i % 2 === 0 ? 3 : 1)),
      tempMin: Math.round(currentTemp - 8 - (i % 2 === 0 ? 1 : 2)),
      rainProbPct: rainProb,
      rainfallMm: rainMm,
      condition,
      humidity: Math.round(humidity + (isMidWeekRain ? 18 : -5)),
      windSpeedKmH: Math.round(windSpeed + (isMidWeekRain ? 6 : 0)),
      spraySuitability,
    });
  }

  // Actionable agro-meteorological alerts
  const alerts: HyperLocalWeather['alerts'] = [];

  const rainDay = forecast7Days.find((f) => f.rainProbPct > 60);
  if (rainDay) {
    alerts.push({
      severity: 'warning',
      title: `Unseasonal Rain Forecast on ${rainDay.day} (${rainDay.date})`,
      message: `Thunderstorm showers of ~${rainDay.rainfallMm}mm anticipated with gusty winds.`,
      advisoryAction:
        'Defer foliar fertilizer / chemical pesticide spray until clear skies. Ensure field drainage channels are cleared to prevent root-zone waterlogging.',
    });
  }

  if (currentTemp > 36) {
    alerts.push({
      severity: 'danger',
      title: 'Elevated Daytime Evapotranspiration Warning',
      message: 'High thermal stress may accelerate soil moisture loss and trigger flower dropping.',
      advisoryAction:
        'Apply light evening irrigation or activate micro-sprinklers. Mulch crop rows with crop residue to conserve root zone coolness.',
    });
  } else {
    alerts.push({
      severity: 'info',
      title: 'Ideal Sowing & Foliar Window',
      message: 'Favorable relative humidity and stable wind velocities expected for the next 48 hours.',
      advisoryAction:
        'Recommended window for seedbed preparation, basal nutrient placement, and bio-primed seed sowing.',
    });
  }

  return {
    currentTemp,
    feelsLike,
    humidity,
    windSpeedKmH: windSpeed,
    rainfallPast24hMm: 0,
    forecast7Days,
    alerts,
    monsoonStatus: 'Active Southwest Monsoon Cycle with timely intermittent precipitation.',
  };
}
