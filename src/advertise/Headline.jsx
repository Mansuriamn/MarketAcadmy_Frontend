import React, { useEffect, useState } from "react";
import { TrendingUp, Flame } from "lucide-react";

export default function Headline() {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    fetchHeadlines();
  }, []);

  const fetchHeadlines = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/server/api/get/trending");
      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch headlines");
      }

    console.log(result.data);
      setHeadlines(result.data);
     
      
    } catch (err) {
      console.error("Headline Fetch Error:", err);
      setError("Something went wrong while loading headlines");
    } finally {
      setLoading(false);
    }
   
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
          headlines.map((topic,id) => (
            <div
              key={id}
              onMouseEnter={() => setActiveId(topic._id)}
              onMouseLeave={() => setActiveId(null)}
              className="pb-4 border-b border-gray-100 last:border-0 last:pb-0 flex items-start gap-2 cursor-pointer"
            >
              {/* Icon */}
              <Flame className="w-5 h-5 text-red-500 mt-1" />

              {/* Content */}
              <div>
                {/* Title */}
                <p className="text-sm font-medium text-gray-900">
                  {topic.title}
                </p>

                {/* Summary (hover) */}
                <p
                  className={`text-xs text-gray-500 mt-1 transition-all duration-300 overflow-hidden ${
                    activeId === topic._id
                      ? "max-h-20 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {topic.summary}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}