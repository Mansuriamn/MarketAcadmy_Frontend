import React, { createContext, useContext, useRef, useCallback } from 'react';

const CacheContext = createContext();

/**
 * Senior Developer Strategy: Global Data Caching
 * This provider stores API responses in memory. 
 * When a user navigates back to a page, we can show cached data instantly 
 * while refreshing in the background.
 */
export const CacheProvider = ({ children }) => {
  const cache = useRef(new Map());

  const getCachedData = useCallback((key) => {
    return cache.current.get(key);
  }, []);

  const setCachedData = useCallback((key, data) => {
    cache.current.set(key, data);
  }, []);

  const clearCache = useCallback(() => {
    cache.current.clear();
  }, []);

  return (
    <CacheContext.Provider value={{ getCachedData, setCachedData, clearCache }}>
      {children}
    </CacheContext.Provider>
  );
};

export const useDataCache = () => {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error('useDataCache must be used within a CacheProvider');
  }
  return context;
};
