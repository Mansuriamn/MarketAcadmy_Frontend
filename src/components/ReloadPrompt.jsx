import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw, X } from 'lucide-react';

const ReloadPrompt = () => {
  const swState = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ', r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  // Senior dev defensive check
  if (!swState) return null;

  const {
    offlineReady: offlineReadyState = [false, () => {}],
    needUpdate: needUpdateState = [false, () => {}],
    updateServiceWorker,
  } = swState;

  const [offlineReady, setOfflineReady] = Array.isArray(offlineReadyState) ? offlineReadyState : [false, () => {}];
  const [needUpdate, setNeedUpdate] = Array.isArray(needUpdateState) ? needUpdateState : [false, () => {}];

  const close = () => {
    if (typeof setOfflineReady === 'function') setOfflineReady(false);
    if (typeof setNeedUpdate === 'function') setNeedUpdate(false);
  };

  if (!offlineReady && !needUpdate) return null;

  return (
    <div className="fixed right-4 bottom-4 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-white dark:bg-slate-900 border border-teal-500/20 shadow-2xl rounded-2xl p-4 flex flex-col gap-3 max-w-sm backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="bg-teal-500/10 p-2 rounded-xl text-teal-600">
              <RefreshCw className={`w-5 h-5 ${needUpdate ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {offlineReady ? 'App ready to work offline' : 'New update available!'}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {offlineReady 
                  ? 'Access Market Academy even without an internet connection.' 
                  : 'We have updated the platform with new performance improvements.'}
              </p>
            </div>
          </div>
          <button 
            onClick={close}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {needUpdate && (
          <button
            onClick={() => updateServiceWorker(true)}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-xl transition-all shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2"
          >
            Reload to Update
          </button>
        )}
      </div>
    </div>
  );
};

export default ReloadPrompt;
