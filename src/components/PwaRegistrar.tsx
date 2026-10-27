'use client';

import { useEffect, useState } from 'react';
import { Wifi, WifiOff, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PwaRegistrar({
  onNetworkChange,
}: {
  onNetworkChange?: (isOnline: boolean) => void;
}) {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    // Initial online state
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
      if (onNetworkChange) onNetworkChange(navigator.onLine);

      const handleOnline = () => {
        setIsOnline(true);
        if (onNetworkChange) onNetworkChange(true);
      };

      const handleOffline = () => {
        setIsOnline(false);
        if (onNetworkChange) onNetworkChange(false);
      };

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      // Register Service Worker
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            console.log('CodeCraft Service Worker registered with scope:', reg.scope);
          })
          .catch((err) => {
            console.warn('Service Worker registration failed:', err);
          });
      }

      // Capture PWA install prompt
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      window.addEventListener('appinstalled', () => {
        setIsInstalled(true);
        setDeferredPrompt(null);
      });

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }
  }, [onNetworkChange]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="flex items-center gap-2 text-xs font-medium">
      {/* Network Connectivity Status Badge */}
      <span
        className={`inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full border transition-all ${
          isOnline
            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
            : 'bg-amber-500/15 text-amber-800 dark:text-amber-200 border-amber-500/40 animate-pulse'
        }`}
        title={isOnline ? 'Connected to live agriculture servers' : 'Operating in offline mode with cached farm data'}
      >
        {isOnline ? (
          <>
            <Wifi className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="hidden sm:inline">Online</span>
          </>
        ) : (
          <>
            <WifiOff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="hidden sm:inline">Offline</span>
          </>
        )}
      </span>

      {/* PWA Install Button (if browser prompt available) */}
      {deferredPrompt && !isInstalled && (
        <button
          onClick={handleInstallClick}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition-transform active:scale-95 cursor-pointer"
          title="Install AgriTech app on your device for one-tap field access"
        >
          <Download className="w-3 h-3" />
          <span>Install App</span>
        </button>
      )}
    </div>
  );
}
