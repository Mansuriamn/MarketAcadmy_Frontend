import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search } from "lucide-react";

export default function SearchBox() {
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // ✅ Sync input with URL (important for refresh / share link)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    setQuery(q);
  }, [location.search]);

  // ✅ Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // ✅ Auto search (after debounce)
  useEffect(() => {
    if (debouncedQuery.trim()) {
      navigate(`/search?q=${debouncedQuery}`, { replace: true });
    }
  }, [debouncedQuery, navigate]);

  // ✅ Enter key support (instant search)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className="hidden md:flex flex-1 max-w-xl mx-6 relative items-center group">
      
      {/* Icon */}
      <Search className="absolute left-4 text-gray-400 w-[18px] h-[18px] group-focus-within:text-teal-500 transition-colors duration-300" />

      {/* Input */}
      <input
        type="text"
        placeholder="Search markets, stocks, news..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full pl-11 pr-4 py-[0.7rem] text-[0.95rem] font-medium 
        bg-gray-50 border border-gray-200 rounded-xl 
        text-gray-800 placeholder:text-gray-400 
        hover:border-gray-300 
        focus:outline-none focus:border-teal-500 focus:bg-white 
        focus:ring-[4px] focus:ring-teal-500/10 
        transition-all duration-300 shadow-sm"
      />
    </div>
  );
}