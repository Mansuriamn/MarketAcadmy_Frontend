import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

/**
 * Senior Developer Reliability Pattern:
 * Proactively notifies the user when they lose internet connectivity.
 * This prevents frustration when API calls fail without explanation.
 */
const OfflineNotice = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowStatus(true);
      // Hide the "Back Online" message after 3 seconds
      setTimeout(() => setShowStatus(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowStatus(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showStatus && isOnline) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-[9999] p-3 text-center transition-all duration-500 transform ${
        isOnline ? 'bg-green-600 translate-y-0' : 'bg-red-600 translate-y-0'
      }`}
    >
      <div className="flex items-center justify-center gap-3 text-white font-medium text-sm">
        {isOnline ? (
          <>
            <Wifi className="w-4 h-4" />
            <span>Connection Restored! Everything is back to normal.</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            <span>Connection Lost! You are viewing cached content.</span>
          </>
        )}
      </div>
    </div>
  );
};

export default OfflineNotice;
