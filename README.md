# CodeCraft AgriTech — Precision Agriculture & Seed Intelligence

A responsive, modern progressive web application (PWA) designed for precision crop cultivation, seed intelligence, and agricultural decision support built using **Next.js (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**.

---

## 🌟 Key Features

### 1. 🌾 Input Dashboard
- **GPS Field Location**: One-tap GPS detection via HTML5 Geolocation API with coordinate lock and regional agro-climatic zone fallbacks.
- **Land Sizing**: Multi-unit sizing support (Acres, Hectares, Bigha, Guntha).
- **Water Source & Adequacy**: Visual cards for Canal Irrigation, Deep Aquifer Borewell, Rainfed (Barani), and Pressurized Micro-Drip / Sprinklers, with adequacy scaling (Adequate, Moderate, Scarce).
- **Target Crop & AI Auto-Pick**: Select or search from standard commodities (Wheat, Basmati Rice, Paddy, Cotton, Soybean, Mustard, Maize, Gram/Chana, Tomato, Onion, Chili), or leave blank for the AI engine to recommend the highest-ROI crop for the land.
- **Quick Regional Presets**: Instant one-click presets for major agricultural regions (Punjab, Maharashtra, Madhya Pradesh, Andhra Pradesh).

### 2. 📡 Modular Online Data Services
- [`soilService.ts`](src/services/soilService.ts): Fetches regional soil profiles (Alluvial Loam, Black Cotton Regur, Red Soil, Sandy Loam), calculates N-P-K nutrient status (Deficient / Optimal / Excess), soil pH balance, Organic Carbon %, Electrical Conductivity, and tailored fertilizer amendment prescriptions (e.g. Neem-coated Urea, SSP, MOP, Gypsum).
- [`marketService.ts`](src/services/marketService.ts): Agmarknet live Mandi price simulation engine providing modal prices, MSP floor comparison, 30-day sparkline price trends, projected harvest window price bands, and arrival volumes across nearby APMC markets.
- [`weatherService.ts`](src/services/weatherService.ts): Hyper-local weather service with 7-day forecast (temp highs/lows, rain probability %, wind speed, relative humidity), day-by-day pesticide/fertilizer spraying suitability index, and actionable agro-meteorological alert advisories.

### 3. 🧠 Precision AI Recommendation Engine
- [`recommendationEngine.ts`](src/services/recommendationEngine.ts):
  - **Optimal Seed Variety**: High-yielding cultivar recommendations with certified breeder pedigree, germination rating (92-96%), maturity duration, seed rate per acre, sowing depth, pathogen/pest resistances, and certified supplier stock status.
  - **Expected Yield & Financial Breakdown**: Detailed projections of Quintals/Acre, Total Harvest Quintals, Cost of Cultivation, Gross Revenue, and Net Farm Income.
  - **High-ROI Alternative Crops**: Side-by-side comparison of 2-3 alternative crops evaluated for net profit/acre, ROI multiplier, water footprint, and market risk.
  - **1-Year Multi-Crop Seasonal Planner**: Full crop rotation calendar across **Kharif** (Monsoon), **Rabi** (Winter), and **Zaid** (Summer catch crop) with biological nitrogen fixation and soil rejuvenation scores.

### 4. 🗣️ Voice-Friendly Vernacular UI
- **Multi-Lingual Toggle**: Full native-script vernacular translations across 6 languages:
  - English
  - Hindi (हिंदी)
  - Punjabi (ਪੰਜਾਬੀ)
  - Telugu (తెలుగు)
  - Marathi (मराठी)
  - Gujarati (ગુજરાતી)
- **Voice Input (Speech-to-Text)**: Tap the microphone button to dictate farm parameters (crop name, acreage, water source, state) with natural language entity extraction.
- **Voice Readout (Text-to-Speech)**: "Listen to Farm Advisory" / "कृषि सलाह सुनें" audio narration powered by Web Speech API `speechSynthesis`.

### 5. 📱 PWA & Offline-First Architecture
- [`public/manifest.json`](public/manifest.json): Web App Manifest for standalone installation and home screen launching.
- [`public/sw.js`](public/sw.js): Custom Service Worker implementing Cache-First for static assets and Network-First with Cache Fallback for dynamic pages.
- **Offline Plan Storage**: Saves farm advisory reports to LocalStorage/Cache API, allowing farmers to access previously generated plans in remote fields with zero cellular connectivity.
- **Live Connectivity Badge**: Real-time visual indicator showing "Online" or "Offline (Cached Data Active)".

---

## 🚀 Running the Project

### Prerequisites
- Node.js LTS (v20+)
- npm

### Development Server
```bash
npm run dev
```

### Production Build & Serve
```bash
npm run build
npm run start
```
The app will be running at `http://localhost:3000`.
