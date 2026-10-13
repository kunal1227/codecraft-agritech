'use client';

import { useState } from 'react';
import { RecommendationResult, LanguageCode } from '@/types/agriculture';
import { TRANSLATIONS } from '@/utils/translations';
import { speakAdvisory, stopSpeaking } from '@/utils/speech';
import { Volume2, VolumeX, Sparkles, AudioWaveform } from 'lucide-react';

interface VoiceAssistantBannerProps {
  result: RecommendationResult;
  language: LanguageCode;
}

export function VoiceAssistantBanner({ result, language }: VoiceAssistantBannerProps) {
  const t = TRANSLATIONS[language];
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const buildSpokenSummary = (): string => {
    const { primaryCrop, optimalSeed, expectedYield, market } = result;

    if (language === 'hi') {
      return `नमस्ते किसान साथी! आपके खेत के लिए सर्वोत्तम अनुशंसित फसल ${primaryCrop} है, और सर्वोत्तम बीज किस्म ${optimalSeed.name} है, जिसका अंकुरण ${optimalSeed.germinationRatePct} प्रतिशत है। आपकी अनुमानित पैदावार ${expectedYield.quintalsPerAcreExpected} क्विंटल प्रति एकड़ रहेगी। वर्तमान मंडी भाव ₹${market.currentModalPrice} प्रति क्विंटल है। कुल अनुमानित शुद्ध लाभ ₹${expectedYield.estimatedNetProfit} है।`;
    }
    if (language === 'pa') {
      return `ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ ਵੀਰੋ! ਤੁਹਾਡੇ ਖੇਤ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਫ਼ਸਲ ${primaryCrop} ਅਤੇ ਬੀਜ ${optimalSeed.name} ਹੈ। ਉੱਗਣ ਸ਼ਕਤੀ ${optimalSeed.germinationRatePct} ਪ੍ਰਤੀਸ਼ਤ ਹੈ ਅਤੇ ਅਨੁਮਾਨਿਤ ਝਾੜ ${expectedYield.quintalsPerAcreExpected} ਕੁਇੰਟਲ ਪ੍ਰਤੀ ਏਕੜ ਹੈ। ਮੰਡੀ ਭਾਅ ₹${market.currentModalPrice} ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਹੈ।`;
    }
    if (language === 'te') {
      return `నమస్కారం రైతు మిత్రులారా! మీ పొలానికి అనుకూలమైన ఉత్తమ పంట ${primaryCrop}, మరియు సిఫార్సు చేసిన విత్తనం ${optimalSeed.name}. మొలక శాతం ${optimalSeed.germinationRatePct}%. ఎకరాకు ఆశించిన దిగుబడి ${expectedYield.quintalsPerAcreExpected} క్వింటాళ్లు. ప్రస్తుత మార్కెట్ ధర క్వింటాలుకు ₹${market.currentModalPrice}.`;
    }
    if (language === 'mr') {
      return `नमस्कार शेतकरी बंधूंनो! आपल्या शेतासाठी सर्वोत्तम शिफारस केलेले पीक ${primaryCrop} आणि बियाणे ${optimalSeed.name} आहे. उगवण क्षमता ${optimalSeed.germinationRatePct} टक्के असून अपेक्षित उत्पादन ${expectedYield.quintalsPerAcreExpected} क्विंटल प्रति एकर आहे. सध्याचा बाजारभाव ₹${market.currentModalPrice} आहे.`;
    }
    if (language === 'gu') {
      return `નમસ્તે ખેડૂત મિત્રો! તમારા ખેતર માટે શ્રેષ્ઠ પાક ${primaryCrop} અને ઉત્તમ બિયારણ ${optimalSeed.name} છે. ઉગાવો ક્ષમતા ${optimalSeed.germinationRatePct} ટકા છે અને અંદાજિત ઉત્પાદન ${expectedYield.quintalsPerAcreExpected} ક્વિન્ટલ પ્રતિ એકર છે. માર્કેટ યાર્ડ ભાવ ₹${market.currentModalPrice} છે.`;
    }

    // Default English
    return `Hello Farmer! For your field, the optimal recommended crop is ${primaryCrop}, and the best seed cultivar is ${optimalSeed.name} with ${optimalSeed.germinationRatePct}% germination rate. Expected yield is ${expectedYield.quintalsPerAcreExpected} quintals per acre. Live modal market price is ₹${market.currentModalPrice} per quintal. Estimated total net profit is ₹${expectedYield.estimatedNetProfit.toLocaleString('en-IN')}.`;
  };

  const handleToggleSpeak = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const text = buildSpokenSummary();
      speakAdvisory(text, language, () => {
        setIsPlaying(false);
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-emerald-800 via-green-800 to-teal-900 text-white rounded-3xl p-4 sm:p-5 shadow-lg shadow-emerald-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/20">
          <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              {t.voiceAssistant}
            </span>
            {isPlaying && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-400 text-stone-950 px-2 py-0.2 rounded-full animate-pulse">
                <AudioWaveform className="w-3 h-3" />
                Narrating Audio
              </span>
            )}
          </div>
          <p className="text-sm font-bold text-white mt-0.5">
            {isPlaying ? 'Speaking precision recommendation aloud in vernacular voice...' : 'Listen to this recommendation read aloud in your selected language.'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
        <button
          onClick={handleToggleSpeak}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all shadow-md cursor-pointer ${
            isPlaying
              ? 'bg-rose-600 hover:bg-rose-700 text-white ring-4 ring-rose-400/40'
              : 'bg-white hover:bg-emerald-50 text-emerald-900 shadow-white/10 active:scale-95'
          }`}
        >
          {isPlaying ? (
            <>
              <VolumeX className="w-4 h-4" />
              <span>{t.stopAudio}</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-emerald-700" />
              <span>{t.readAloud}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
