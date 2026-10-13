import { LanguageCode } from '@/types/agriculture';

// Language codes mapped to BCP-47 speech tags
export const SPEECH_LANG_CODES: Record<LanguageCode, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  pa: 'pa-IN',
  te: 'te-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
};

// Check if Speech Recognition is supported in the browser
export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any;
  return !!(win.SpeechRecognition || win.webkitSpeechRecognition);
}

// Check if Speech Synthesis is supported
export function isSpeechSynthesisSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

// Speak text using SpeechSynthesis
export function speakAdvisory(
  text: string,
  lang: LanguageCode = 'en',
  onEnd?: () => void
): void {
  if (!isSpeechSynthesisSupported()) return;

  try {
    window.speechSynthesis.cancel(); // Stop any active speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = SPEECH_LANG_CODES[lang] || 'en-IN';
    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1.0;

    // Pick appropriate voice if available
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(
      (v) => v.lang.startsWith(lang) || v.lang.replace('_', '-').startsWith(SPEECH_LANG_CODES[lang])
    );
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis error:', err);
    if (onEnd) onEnd();
  }
}

export function stopSpeaking(): void {
  if (isSpeechSynthesisSupported()) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
}

// Extract farm parameters from spoken natural language
export interface ParsedVoiceQuery {
  rawQuery: string;
  detectedCrop?: string;
  detectedLandSize?: number;
  detectedState?: string;
  detectedWaterSource?: 'canal' | 'borewell' | 'rainfed' | 'drip_sprinkler';
}

export function parseFarmVoiceInput(transcript: string): ParsedVoiceQuery {
  const lower = transcript.toLowerCase();
  const result: ParsedVoiceQuery = { rawQuery: transcript };

  // Detect Crops
  const cropMap: Record<string, string> = {
    wheat: 'Wheat',
    gehu: 'Wheat',
    kanak: 'Wheat',
    paddy: 'Paddy (Rice)',
    rice: 'Paddy (Rice)',
    chawal: 'Paddy (Rice)',
    dhan: 'Paddy (Rice)',
    basmati: 'Basmati Rice',
    cotton: 'Cotton',
    kapas: 'Cotton',
    narma: 'Cotton',
    soybean: 'Soybean',
    soya: 'Soybean',
    mustard: 'Mustard',
    sarson: 'Mustard',
    rai: 'Mustard',
    maize: 'Maize',
    makka: 'Maize',
    chana: 'Gram (Chickpea / Chana)',
    gram: 'Gram (Chickpea / Chana)',
    chickpea: 'Gram (Chickpea / Chana)',
    tomato: 'Tomato',
    tamatar: 'Tomato',
    onion: 'Onion',
    pyaz: 'Onion',
    kanda: 'Onion',
    chili: 'Chili (Dry)',
    mirchi: 'Chili (Dry)',
  };

  for (const [key, cropName] of Object.entries(cropMap)) {
    if (lower.includes(key)) {
      result.detectedCrop = cropName;
      break;
    }
  }

  // Detect Numbers for Land Size
  const sizeMatch = lower.match(/(\d+(\.\d+)?)\s*(acre|acres|ekad|hectare|kila|bigha)?/i);
  if (sizeMatch && sizeMatch[1]) {
    const parsed = parseFloat(sizeMatch[1]);
    if (!isNaN(parsed) && parsed > 0 && parsed <= 500) {
      result.detectedLandSize = parsed;
    }
  }

  // Detect State / Region
  const stateMap: Record<string, string> = {
    punjab: 'Punjab',
    haryana: 'Haryana',
    maharashtra: 'Maharashtra',
    'madhya pradesh': 'Madhya Pradesh',
    mp: 'Madhya Pradesh',
    rajasthan: 'Rajasthan',
    gujarat: 'Gujarat',
    'uttar pradesh': 'Uttar Pradesh',
    up: 'Uttar Pradesh',
    andhra: 'Andhra Pradesh',
    telangana: 'Telangana',
    karnataka: 'Karnataka',
  };

  for (const [key, stateName] of Object.entries(stateMap)) {
    if (lower.includes(key)) {
      result.detectedState = stateName;
      break;
    }
  }

  // Detect Water Source
  if (lower.includes('canal') || lower.includes('nahar') || lower.includes('nehar')) {
    result.detectedWaterSource = 'canal';
  } else if (lower.includes('borewell') || lower.includes('tube') || lower.includes('motor')) {
    result.detectedWaterSource = 'borewell';
  } else if (lower.includes('rain') || lower.includes('barish') || lower.includes('barani')) {
    result.detectedWaterSource = 'rainfed';
  } else if (lower.includes('drip') || lower.includes('sprinkler') || lower.includes('fowara')) {
    result.detectedWaterSource = 'drip_sprinkler';
  }

  return result;
}
