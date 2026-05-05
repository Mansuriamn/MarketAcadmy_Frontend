import React, { useState, useEffect } from 'react';
import { Download, Smartphone, CheckCircle, X } from 'lucide-react';

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };

    const installedHandler = () => {
      console.log('PWA was installed');
      setSupportsPWA(false);
      setShowSuccess(true);
      // Auto hide after 6 seconds
      setTimeout(() => setShowSuccess(false), 6000);
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', installedHandler);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setSupportsPWA(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', installedHandler);
    };
  }, []);

  const onClick = (evt) => {
    evt.preventDefault();
    if (!promptInstall) return;
    promptInstall.prompt();
    promptInstall.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        setSupportsPWA(false);
      }
    });
  };

  return (
    <>
      {/* Success "Drop" Notification */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md animate-in slide-in-from-top-10 duration-500 ease-out">
          <div className="bg-white dark:bg-slate-900 border border-emerald-500/30 shadow-2xl rounded-2xl p-4 flex items-center justify-between gap-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/20 p-2 rounded-full text-emerald-500">
                <CheckCircle className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white leading-none">Installation Successful!</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Market Academy is now available on your home screen.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      )}

      {/* Install Button */}
      {supportsPWA && (
        <button
          onClick={onClick}
          className="group flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-teal-500/25 active:scale-95"
          title="Install Market Academy App"
        >
          <Download className="w-4 h-4 group-hover:animate-bounce" />
          <span className="hidden sm:inline">Install App</span>
          <Smartphone className="w-4 h-4 sm:hidden" />
        </button>
      )}
    </>
  );
};

export default InstallPWA

