import React, { useEffect } from 'react';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

/**
 * Senior Developer UI Pattern:
 * This component starts NProgress when mounted (during Suspense fallback)
 * and stops it when unmounted (when the lazy component is ready).
 */
const LoadingFallback = () => {
  useEffect(() => {
    nprogress.start();
    
    return () => {
      nprogress.done();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin mb-4" />
      <p className="text-slate-500 font-medium animate-pulse">
        Optimizing experience...
      </p>
    </div>
  );
};

export default LoadingFallback;
