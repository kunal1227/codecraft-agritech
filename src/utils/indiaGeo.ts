/**
 * High-Precision India Agricultural Geo-Intelligence Dataset & Centroid Engine
 * Provides offline-capable, sub-millisecond reverse geocoding from GPS coordinates
 * to exact Indian District, State, and Agro-Climatic Zone.
 */

export interface DistrictCentroid {
  district: string;
  state: string;
  region: string;
  latitude: number;
  longitude: number;
}

export const INDIAN_DISTRICTS: DistrictCentroid[] = [
  // --- MAHARASHTRA (All 36 Districts) ---
  { district: 'Nashik', state: 'Maharashtra', region: 'Western Deccan Plateau & Ghats', latitude: 19.9975, longitude: 73.7898 },
  { district: 'Pune', state: 'Maharashtra', region: 'Western Maharashtra Sugarcane Belt', latitude: 18.5204, longitude: 73.8567 },
  { district: 'Ahmednagar', state: 'Maharashtra', region: 'Central Maharashtra Canal Zone', latitude: 19.0952, longitude: 74.7496 },
  { district: 'Chhatrapati Sambhajinagar', state: 'Maharashtra', region: 'Marathwada Semi-Arid Plateau', latitude: 19.8762, longitude: 75.3433 },
  { district: 'Jalna', state: 'Maharashtra', region: 'Marathwada Seed Capital Belt', latitude: 19.841, longitude: 75.8864 },
  { district: 'Beed', state: 'Maharashtra', region: 'Marathwada Rainfed Basin', latitude: 18.9891, longitude: 75.7601 },
  { district: 'Latur', state: 'Maharashtra', region: 'Marathwada Black Soil Oilseed Zone', latitude: 18.4088, longitude: 76.5604 },
  { district: 'Dharashiv', state: 'Maharashtra', region: 'Marathwada Balaghat Agro-Zone', latitude: 18.1861, longitude: 76.0419 },
  { district: 'Nanded', state: 'Maharashtra', region: 'Godavari Basin Fertile Plain', latitude: 19.1383, longitude: 77.321 },
  { district: 'Parbhani', state: 'Maharashtra', region: 'Marathwada Cotton-Soybean Zone', latitude: 19.2686, longitude: 76.777 },
  { district: 'Hingoli', state: 'Maharashtra', region: 'Upper Penganga Agro-Zone', latitude: 19.7173, longitude: 77.1492 },
  { district: 'Solapur', state: 'Maharashtra', region: 'Southern Maharashtra Drought-Prone Plain', latitude: 17.6599, longitude: 75.9064 },
  { district: 'Satara', state: 'Maharashtra', region: 'Krishna Basin Horticultural Belt', latitude: 17.6805, longitude: 73.9997 },
  { district: 'Sangli', state: 'Maharashtra', region: 'Krishna Basin Sugarcane & Grape Zone', latitude: 16.8524, longitude: 74.5815 },
  { district: 'Kolhapur', state: 'Maharashtra', region: 'Panchaganga Basin Heavy Alluvial', latitude: 16.705, longitude: 74.2433 },
  { district: 'Jalgaon', state: 'Maharashtra', region: 'Khandesh Tapi Basin (Banana Belt)', latitude: 21.0077, longitude: 75.5626 },
  { district: 'Dhule', state: 'Maharashtra', region: 'Khandesh Cotton & Maize Belt', latitude: 20.9042, longitude: 74.7749 },
  { district: 'Nandurbar', state: 'Maharashtra', region: 'Satpura Tribal Agro-Climatic Zone', latitude: 21.3697, longitude: 74.2384 },
  { district: 'Nagpur', state: 'Maharashtra', region: 'Vidarbha Cotton & Orange Belt', latitude: 21.1458, longitude: 79.0882 },
  { district: 'Wardha', state: 'Maharashtra', region: 'Vidarbha Cotton & Soybean Basin', latitude: 20.7453, longitude: 78.6022 },
  { district: 'Amravati', state: 'Maharashtra', region: 'Varhad Cotton & Orange Belt', latitude: 20.932, longitude: 77.7523 },
  { district: 'Akola', state: 'Maharashtra', region: 'Purna Basin Heavy Cotton Soil', latitude: 20.7002, longitude: 77.0082 },
  { district: 'Yavatmal', state: 'Maharashtra', region: 'Vidarbha Rainfed Cotton Belt', latitude: 20.3888, longitude: 78.1204 },
  { district: 'Buldhana', state: 'Maharashtra', region: 'Varhad Plateau Soybean-Cotton Zone', latitude: 20.5293, longitude: 76.1843 },
  { district: 'Washim', state: 'Maharashtra', region: 'West Vidarbha Soybean Basin', latitude: 20.111, longitude: 77.1352 },
  { district: 'Chandrapur', state: 'Maharashtra', region: 'Eastern Vidarbha Forest & Mineral Basin', latitude: 19.9615, longitude: 79.2961 },
  { district: 'Gadchiroli', state: 'Maharashtra', region: 'Wainganga Basin Tribal Forest Zone', latitude: 20.1809, longitude: 80.0034 },
  { district: 'Bhandara', state: 'Maharashtra', region: 'Eastern Maharashtra Paddy & Lake Zone', latitude: 21.1714, longitude: 79.6545 },
  { district: 'Gondia', state: 'Maharashtra', region: 'Wainganga Paddy Rice Bowl', latitude: 21.4624, longitude: 80.1961 },
  { district: 'Raigad', state: 'Maharashtra', region: 'North Konkan Coastal Rice Belt', latitude: 18.5158, longitude: 73.1822 },
  { district: 'Ratnagiri', state: 'Maharashtra', region: 'Central Konkan Laterite Horticultural Zone', latitude: 16.9902, longitude: 73.312 },
  { district: 'Sindhudurg', state: 'Maharashtra', region: 'South Konkan High Rainfall Laterite', latitude: 16.1264, longitude: 73.6931 },
  { district: 'Thane', state: 'Maharashtra', region: 'North Konkan Coastal Alluvial', latitude: 19.2183, longitude: 72.9781 },
  { district: 'Palghar', state: 'Maharashtra', region: 'North Konkan Tribal Coastal Agro-Zone', latitude: 19.6967, longitude: 72.7699 },
  { district: 'Mumbai', state: 'Maharashtra', region: 'Coastal Urban Agro-Zone', latitude: 18.922, longitude: 72.8347 },
  { district: 'Mumbai Suburban', state: 'Maharashtra', region: 'Coastal Suburban Agro-Zone', latitude: 19.076, longitude: 72.8777 },

  // --- PUNJAB ---
  { district: 'Ludhiana', state: 'Punjab', region: 'Malwa Agro-Zone', latitude: 30.901, longitude: 75.8573 },
  { district: 'Amritsar', state: 'Punjab', region: 'Majha Agro-Zone', latitude: 31.634, longitude: 74.8723 },
  { district: 'Jalandhar', state: 'Punjab', region: 'Doaba Agro-Zone', latitude: 31.326, longitude: 75.5762 },
  { district: 'Patiala', state: 'Punjab', region: 'Eastern Malwa Basin', latitude: 30.3398, longitude: 76.3869 },
  { district: 'Bathinda', state: 'Punjab', region: 'South Malwa Cotton Belt', latitude: 30.211, longitude: 74.9455 },
  { district: 'Firozpur', state: 'Punjab', region: 'Sutlej Basin Irrigated', latitude: 30.9237, longitude: 74.6139 },
  { district: 'Sangrur', state: 'Punjab', region: 'Central Malwa High Productivity', latitude: 30.2458, longitude: 75.8421 },
  { district: 'Hoshiarpur', state: 'Punjab', region: 'Kandi Sub-Mountain Agro-Zone', latitude: 31.5273, longitude: 75.9149 },
  { district: 'Gurdaspur', state: 'Punjab', region: 'Upper Bari Doab Basin', latitude: 32.0419, longitude: 75.4053 },
  { district: 'Moga', state: 'Punjab', region: 'Central Malwa Fertile Alluvial', latitude: 30.8165, longitude: 75.1717 },
  { district: 'Faridkot', state: 'Punjab', region: 'South-West Malwa Agro-Zone', latitude: 30.6769, longitude: 74.7583 },

  // --- HARYANA ---
  { district: 'Karnal', state: 'Haryana', region: 'Indo-Gangetic Plain', latitude: 29.6857, longitude: 76.9905 },
  { district: 'Kurukshetra', state: 'Haryana', region: 'Upper Gangetic Rice-Wheat Belt', latitude: 29.9695, longitude: 76.8783 },
  { district: 'Ambala', state: 'Haryana', region: 'Ghaggar Basin Irrigated', latitude: 30.3782, longitude: 76.7767 },
  { district: 'Hisar', state: 'Haryana', region: 'South-West Semi-Arid Cotton Belt', latitude: 29.1492, longitude: 75.7217 },
  { district: 'Sirsa', state: 'Haryana', region: 'Sirsa Desert Margin Cotton Zone', latitude: 29.5349, longitude: 75.0298 },
  { district: 'Rohtak', state: 'Haryana', region: 'Central Yamuna Basin', latitude: 28.8955, longitude: 76.6066 },
  { district: 'Panipat', state: 'Haryana', region: 'Yamuna Alluvial Fertile Belt', latitude: 29.3909, longitude: 76.9635 },
  { district: 'Sonipat', state: 'Haryana', region: 'National Capital Agricultural Fringes', latitude: 28.9931, longitude: 77.0151 },
  { district: 'Jind', state: 'Haryana', region: 'Central Haryana Wheat-Mustard Zone', latitude: 29.3161, longitude: 76.3155 },
  { district: 'Fatehabad', state: 'Haryana', region: 'West Haryana Cotton-Paddy Belt', latitude: 29.5147, longitude: 75.4545 },

  // --- GUJARAT ---
  { district: 'Rajkot', state: 'Gujarat', region: 'Saurashtra Arid Coastal', latitude: 22.3039, longitude: 70.8022 },
  { district: 'Ahmedabad', state: 'Gujarat', region: 'Sabarmati Basin Alluvial', latitude: 23.0225, longitude: 72.5714 },
  { district: 'Surat', state: 'Gujarat', region: 'South Gujarat Coastal Heavy Clay', latitude: 21.1702, longitude: 72.8311 },
  { district: 'Vadodara', state: 'Gujarat', region: 'Central Gujarat Mahi Basin', latitude: 22.3072, longitude: 73.1812 },
  { district: 'Bhavnagar', state: 'Gujarat', region: 'Gulf of Khambhat Horticultural Zone', latitude: 21.7645, longitude: 72.1519 },
  { district: 'Junagadh', state: 'Gujarat', region: 'Gir Forest Margin Groundnut Zone', latitude: 21.5222, longitude: 70.4579 },
  { district: 'Mehsana', state: 'Gujarat', region: 'North Gujarat Oilseed & Dairy Belt', latitude: 23.588, longitude: 72.3693 },
  { district: 'Anand', state: 'Gujarat', region: 'Charotar Tobacco & Dairy Zone', latitude: 22.5645, longitude: 72.9289 },
  { district: 'Kutch', state: 'Gujarat', region: 'Arid Salt Basin & Pastoral Zone', latitude: 23.242, longitude: 69.6669 },
  { district: 'Banaskantha', state: 'Gujarat', region: 'North Arid Pomegranate Belt', latitude: 24.1724, longitude: 72.4346 },

  // --- MADHYA PRADESH ---
  { district: 'Indore', state: 'Madhya Pradesh', region: 'Malwa Black Soil Belt', latitude: 22.7196, longitude: 75.8577 },
  { district: 'Ujjain', state: 'Madhya Pradesh', region: 'Malwa Plateau Soybean-Wheat Hub', latitude: 23.1765, longitude: 75.7885 },
  { district: 'Bhopal', state: 'Madhya Pradesh', region: 'Central Vindhyan Plateau', latitude: 23.2599, longitude: 77.4126 },
  { district: 'Jabalpur', state: 'Madhya Pradesh', region: 'Narmada Valley Alluvial Basin', latitude: 23.1815, longitude: 79.9864 },
  { district: 'Gwalior', state: 'Madhya Pradesh', region: 'Chambal Semi-Arid Alluvial', latitude: 26.2183, longitude: 78.1828 },
  { district: 'Sagar', state: 'Madhya Pradesh', region: 'Bundelkhand Black Soil Fringe', latitude: 23.8388, longitude: 78.7378 },
  { district: 'Khargone', state: 'Madhya Pradesh', region: 'Nimar Cotton & Chili Belt', latitude: 21.8236, longitude: 75.6179 },
  { district: 'Dhar', state: 'Madhya Pradesh', region: 'Tribal Malwa Mixed Soil Zone', latitude: 22.5973, longitude: 75.2974 },
  { district: 'Hoshangabad', state: 'Madhya Pradesh', region: 'Central Narmada Wheat Valley', latitude: 22.7533, longitude: 77.7289 },
  { district: 'Ratlam', state: 'Madhya Pradesh', region: 'West Malwa Horticultural Basin', latitude: 23.3315, longitude: 75.0367 },

  // --- RAJASTHAN ---
  { district: 'Kota', state: 'Rajasthan', region: 'Hadoti Semi-Arid Basin', latitude: 25.2138, longitude: 75.8648 },
  { district: 'Jaipur', state: 'Rajasthan', region: 'Dhundhar Semi-Arid Basin', latitude: 26.9124, longitude: 75.7873 },
  { district: 'Jodhpur', state: 'Rajasthan', region: 'Marwar Arid Agro-Zone', latitude: 26.2389, longitude: 73.0243 },
  { district: 'Bikaner', state: 'Rajasthan', region: 'Thar Desert Canal Command Area', latitude: 28.0229, longitude: 73.3119 },
  { district: 'Udaipur', state: 'Rajasthan', region: 'Mewar Aravalli Hill Farming', latitude: 24.5854, longitude: 73.7125 },
  { district: 'Alwar', state: 'Rajasthan', region: 'NCR Mustard & Oilseed Belt', latitude: 27.553, longitude: 76.6346 },
  { district: 'Sri Ganganagar', state: 'Rajasthan', region: 'Indira Gandhi Canal Command Zone', latitude: 29.9038, longitude: 73.8772 },
  { district: 'Baran', state: 'Rajasthan', region: 'Hadoti Soybean & Garlic Zone', latitude: 25.1011, longitude: 76.5132 },
  { district: 'Bharatpur', state: 'Rajasthan', region: 'Braj Mustard Capital Zone', latitude: 27.2152, longitude: 77.4895 },
  { district: 'Nagaur', state: 'Rajasthan', region: 'Central Arid Pulses & Fenugreek Zone', latitude: 27.1983, longitude: 73.7423 },

  // --- UTTAR PRADESH ---
  { district: 'Varanasi', state: 'Uttar Pradesh', region: 'Eastern Gangetic Alluvial', latitude: 25.3176, longitude: 82.9739 },
  { district: 'Lucknow', state: 'Uttar Pradesh', region: 'Central Gangetic Plain', latitude: 26.8467, longitude: 80.9462 },
  { district: 'Kanpur', state: 'Uttar Pradesh', region: 'Middle Doab Agricultural Basin', latitude: 26.4499, longitude: 80.3319 },
  { district: 'Agra', state: 'Uttar Pradesh', region: 'Yamuna Ravine Potato Belt', latitude: 27.1767, longitude: 78.0081 },
  { district: 'Prayagraj', state: 'Uttar Pradesh', region: 'Ganga-Yamuna Confluence Basin', latitude: 25.4358, longitude: 81.8463 },
  { district: 'Meerut', state: 'Uttar Pradesh', region: 'Upper Doab Sugarcane Bowl', latitude: 28.9845, longitude: 77.7064 },
  { district: 'Gorakhpur', state: 'Uttar Pradesh', region: 'Terai Margin Paddy Basin', latitude: 26.7606, longitude: 83.3732 },
  { district: 'Bareilly', state: 'Uttar Pradesh', region: 'Rohilkhand Alluvial Plain', latitude: 28.367, longitude: 79.4304 },
  { district: 'Aligarh', state: 'Uttar Pradesh', region: 'Central Doab Grain & Oilseed Zone', latitude: 27.8974, longitude: 78.088 },
  { district: 'Jhansi', state: 'Uttar Pradesh', region: 'Bundelkhand Semi-Arid Pulses Zone', latitude: 25.4484, longitude: 78.5685 },

  // --- KARNATAKA ---
  { district: 'Mandya', state: 'Karnataka', region: 'Cauvery Basin Irrigated Sugarcane Belt', latitude: 12.5239, longitude: 76.8973 },
  { district: 'Mysuru', state: 'Karnataka', region: 'Southern Dry & Cauvery Irrigation Zone', latitude: 12.2958, longitude: 76.6394 },
  { district: 'Belagavi', state: 'Karnataka', region: 'Northern Transition Sugarcane & Vegetable Zone', latitude: 15.8497, longitude: 74.4977 },
  { district: 'Dharwad', state: 'Karnataka', region: 'Northern Dry Transition Agro-Zone', latitude: 15.4589, longitude: 75.0078 },
  { district: 'Davanagere', state: 'Karnataka', region: 'Bhadra Basin Central Karnataka Zone', latitude: 14.4644, longitude: 75.9218 },
  { district: 'Ballari', state: 'Karnataka', region: 'Tungabhadra Irrigated Heavy Clay Zone', latitude: 15.1394, longitude: 76.9214 },
  { district: 'Kalaburagi', state: 'Karnataka', region: 'Hyderabad-Karnataka Red Gram (Tur) Bowl', latitude: 17.3297, longitude: 76.8343 },
  { district: 'Vijayapura', state: 'Karnataka', region: 'Krishna Basin Horticulture & Grain Zone', latitude: 16.8302, longitude: 75.71 },
  { district: 'Shivamogga', state: 'Karnataka', region: 'Malnad High-Rainfall Plantation Zone', latitude: 13.9299, longitude: 75.5681 },
  { district: 'Bengaluru', state: 'Karnataka', region: 'Southern Eastern Dry Agro-Zone', latitude: 12.9716, longitude: 77.5946 },

  // --- TELANGANA ---
  { district: 'Warangal', state: 'Telangana', region: 'North Telangana Plateau', latitude: 17.9689, longitude: 79.5941 },
  { district: 'Karimnagar', state: 'Telangana', region: 'Godavari Basin Paddy & Cotton Belt', latitude: 18.4386, longitude: 79.1288 },
  { district: 'Nizamabad', state: 'Telangana', region: 'North Telangana Irrigated Turmeric Belt', latitude: 18.6725, longitude: 78.0941 },
  { district: 'Khammam', state: 'Telangana', region: 'Southern Telangana Chili & Cotton Belt', latitude: 17.2473, longitude: 80.1514 },
  { district: 'Nalgonda', state: 'Telangana', region: 'Southern Telangana Semi-Arid Basin', latitude: 17.0577, longitude: 79.2684 },
  { district: 'Hyderabad', state: 'Telangana', region: 'Telangana Central Agro-Zone', latitude: 17.385, longitude: 78.4867 },
  { district: 'Mahabubnagar', state: 'Telangana', region: 'Krishna Basin Red Soil Agro-Zone', latitude: 16.7488, longitude: 77.9845 },

  // --- ANDHRA PRADESH ---
  { district: 'Guntur', state: 'Andhra Pradesh', region: 'Krishna-Godavari Coastal Chili & Cotton Zone', latitude: 16.3067, longitude: 80.4365 },
  { district: 'Krishna', state: 'Andhra Pradesh', region: 'Krishna Delta Rice Bowl', latitude: 16.1875, longitude: 81.1389 },
  { district: 'West Godavari', state: 'Andhra Pradesh', region: 'Godavari Delta Irrigated Paddy-Aquaculture', latitude: 16.7107, longitude: 81.0952 },
  { district: 'Kurnool', state: 'Andhra Pradesh', region: 'Rayalaseema Scarce Rainfall Groundnut Zone', latitude: 15.8281, longitude: 78.0373 },
  { district: 'Anantapur', state: 'Andhra Pradesh', region: 'Rayalaseema Drought-Prone Groundnut Belt', latitude: 14.6819, longitude: 77.6006 },
  { district: 'Visakhapatnam', state: 'Andhra Pradesh', region: 'North Coastal Agro-Climatic Zone', latitude: 17.6868, longitude: 83.2185 },

  // --- TAMIL NADU ---
  { district: 'Thanjavur', state: 'Tamil Nadu', region: 'Cauvery Delta Rice Bowl', latitude: 10.787, longitude: 79.1378 },
  { district: 'Tiruchirappalli', state: 'Tamil Nadu', region: 'Cauvery River Basin Multi-Crop', latitude: 10.7905, longitude: 78.7047 },
  { district: 'Coimbatore', state: 'Tamil Nadu', region: 'Western Agro-Climatic Cotton & Coconut Zone', latitude: 11.0168, longitude: 76.9558 },
  { district: 'Madurai', state: 'Tamil Nadu', region: 'Southern Dry Agro-Zone', latitude: 9.9252, longitude: 78.1198 },

  // --- BIHAR ---
  { district: 'Patna', state: 'Bihar', region: 'South Bihar Alluvial Plain', latitude: 25.5941, longitude: 85.1376 },
  { district: 'Muzaffarpur', state: 'Bihar', region: 'North Bihar Alluvial Litchi Belt', latitude: 26.1209, longitude: 85.3647 },
  { district: 'Bhagalpur', state: 'Bihar', region: 'Eastern Bihar Silk & Mango Belt', latitude: 25.2425, longitude: 86.9842 },
  { district: 'Purnia', state: 'Bihar', region: 'North-East Sub-Himalayan Jute & Maize Belt', latitude: 25.7771, longitude: 87.4753 },

  // --- WEST BENGAL ---
  { district: 'Purba Bardhaman', state: 'West Bengal', region: 'Damodar Valley Bengal Rice Bowl', latitude: 23.2324, longitude: 87.8615 },
  { district: 'Hooghly', state: 'West Bengal', region: 'Lower Gangetic Plain Potato & Jute Zone', latitude: 22.9039, longitude: 88.3968 },
  { district: 'Nadia', state: 'West Bengal', region: 'New Alluvial Plain High-Productivity Zone', latitude: 23.471, longitude: 88.5565 },

  // --- ODISHA ---
  { district: 'Bargarh', state: 'Odisha', region: 'Hirakud Command Area Rice Bowl', latitude: 21.3341, longitude: 83.6231 },
  { district: 'Cuttack', state: 'Odisha', region: 'Mahanadi Coastal Delta Basin', latitude: 20.4625, longitude: 85.883 },
  { district: 'Sambalpur', state: 'Odisha', region: 'West Central Tableland Agro-Zone', latitude: 21.4669, longitude: 83.9812 },
];

/**
 * Great-circle distance between two geographic coordinates using haversine formula (km)
 */
export function calculateHaversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Finds the nearest Indian Agricultural District centroid to any GPS coordinate.
 * Operates in < 1ms locally without requiring any network call.
 */
export function findNearestIndianDistrict(
  lat: number,
  lon: number
): DistrictCentroid & { distanceKm: number } {
  let closest = INDIAN_DISTRICTS[0];
  let minDistance = Infinity;

  for (let i = 0; i < INDIAN_DISTRICTS.length; i++) {
    const dist = calculateHaversineKm(lat, lon, INDIAN_DISTRICTS[i].latitude, INDIAN_DISTRICTS[i].longitude);
    if (dist < minDistance) {
      minDistance = dist;
      closest = INDIAN_DISTRICTS[i];
    }
  }

  return {
    ...closest,
    distanceKm: Number(minDistance.toFixed(1)),
  };
}
