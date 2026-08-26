import "../App.css";
import React, { useState, useEffect, useMemo } from "react";
import { apiCall } from "../api/config";
import { getMarketSignal } from "../utils/getMarketSignal";
import { useDataCache } from "../context/CacheContext";

const LIMIT = 4;

export default function BreakingNewsTicker() {
  const { getCachedData, setCachedData } = useDataCache();
  const [loading, setLoading] = useState(true);
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    const cacheKey = "ticker-headlines";
    const cached = getCachedData(cacheKey);

    if (cached) {
      setHeadlines(cached);
      setLoading(false);
    }

    const fetchHeadlines = async () => {
      try {
        const data = await apiCall(`/api/headlines?limit=${LIMIT}&offset=0`);
        setHeadlines(data);
        setCachedData(cacheKey, data);
      } catch (err) {
        console.error("Ticker fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeadlines();
  }, [getCachedData, setCachedData]);

  // ✅ Duplicate data once for smooth infinite scroll
  const tickerData = useMemo(() => {
    return headlines.length ? [...headlines, ...headlines] : [];
  }, [headlines]);

  if (loading) {
    return <div className="h-9 bg-slate-800 animate-pulse rounded-md" />;
  }

  return (
    <div className="w-full bg-slate-900 border-y border-slate-700 overflow-hidden">
      <div className="flex items-center h-9 sm:h-11">

        {/* 🔴 BREAKING LABEL */}
        <div className="flex items-center px-2 sm:px-4 text-red-400 font-semibold text-[9px] sm:text-xs tracking-wider border-r border-slate-700 whitespace-nowrap">
          ● BREAKING
        </div>

        {/* 📰 TICKER AREA */}
        <div className="flex-1 overflow-hidden relative">

          <div className="ticker-track flex items-center will-change-transform">

            {tickerData.map((item, index) => {
              const signal = getMarketSignal(item.text);

              return (
                <div
                  key={index}
                  className="flex items-center gap-2 px-2 sm:px-4 md:px-6 text-white whitespace-nowrap"
                >
                  {/* 📊 Signal */}
                  <span
                    className={`font-bold text-[10px] sm:text-xs md:text-sm ${signal.color}`}
                  >
                    {signal.symbol}
                  </span>

                  {/* 🧾 Responsive Headline */}
                  <span
                    className="
                      max-w-[120px]
                      sm:max-w-[220px]
                      md:max-w-[320px]
                      lg:max-w-[450px]
                      xl:max-w-[600px]
                      truncate
                      text-[10px]
                      sm:text-xs
                      md:text-sm
                      lg:text-base
                      leading-tight
                    "
                  >
                    {item.text}
                  </span>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </div>
  );
}