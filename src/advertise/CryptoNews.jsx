import React, { useEffect, useState } from "react";
import { apiCall } from "../api/config";
import { TrendingUp, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDataCache } from "../context/CacheContext";

export default function Headline() {
  const { getCachedData, setCachedData } = useDataCache();
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchHeadlines();
  }, []);

  const fetchHeadlines = async () => {
    const cacheKey = "trending-sidebar";
    const cached = getCachedData(cacheKey);

    if (cached) {
      setHeadlines(cached);
    } else {
      setLoading(true);
    }

    try {
      setError(null);
      const data = await apiCall("/api/get/trending");
      setHeadlines(data);
      setCachedData(cacheKey, data);
    } catch (err) {
      console.error("Headline Fetch Error:", err);
      if (!cached) setError("Something went wrong while loading headlines");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 HANDLE CLICK
  const handleClick = (topic) => {
    const page="trending";
    
    navigate(`/${page}/${topic._id}`); 
    // You can change "news" → dynamic page if needed
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-teal-500" />
        <h3 className="font-bold text-lg text-gray-900">
          Trending Now
        </h3>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-sm text-gray-500">Loading trending news...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {/* Empty */}
      {!loading && !error && headlines.length === 0 && (
        <p className="text-sm text-gray-500">No trending data available</p>
      )}

      {/* Data */}
      <div className="space-y-4">
        {!loading &&
          !error &&
          headlines.map((topic) => (
            <div
              key={topic._id}
              onMouseEnter={() => setActiveId(topic._id)}
              onMouseLeave={() => setActiveId(null)}
              onClick={() => handleClick(topic)} // ✅ CLICK NAVIGATION
              className="pb-4 border-b border-gray-100 last:border-0 last:pb-0 flex items-start gap-2 cursor-pointer hover:bg-gray-50 rounded-md p-2 transition"
            >
              {/* Icon */}
              <Flame className="w-12 h-10 text-red-500 mt-1" />

              {/* Content */}
              <div>
                {/* Title */}
                <p className="text-sm font-medium text-gray-900">
                  {topic.title}
                </p>

                {/* Description (hover) */}
                <p
                  className={`text-xs text-gray-500 mt-1 transition-all duration-300 overflow-hidden ${
                    activeId === topic._id
                      ? "max-h-20 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {topic.description} {/* ✅ FIXED */}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}