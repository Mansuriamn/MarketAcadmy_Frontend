import React, { useState, useEffect } from 'react'; 
import { apiCall } from '../api/config';
import { useDataCache } from '../context/CacheContext';

const LIMIT = 1; 
const offset = 0;

const Hero = ({ page }) => {
  const { getCachedData, setCachedData } = useDataCache();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      const cacheKey = `hero-${page}`;
      const cached = getCachedData(cacheKey);
      
      if (cached) {
        setPost(cached);
        setLoading(false);
      }

      try {
        const data = await apiCall(`/api/${page}?limit=${LIMIT}&offset=${offset}`);
        setPost(data);
        setCachedData(cacheKey, data);
      } catch (err) {
        console.error("Hero fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, [page, getCachedData, setCachedData]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="animate-pulse h-[350px] md:h-[500px] bg-gray-200 rounded-[2.5rem]"></div>
      </div>
    );
  }

  if (!post || post.length === 0) return null;

  const { image, category, title } = post[0];
  const imageUrl = image || 'https://images.unsplash.com/photo-1611974717482-98287e074b35?auto=format&fit=crop&q=80&w=1200';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="relative rounded-[2.5rem] overflow-hidden group premium-shadow border border-white/20">

        <img
          src={imageUrl}
          alt={title}
          fetchpriority="high"
          className="w-full h-[350px] md:h-[500px] object-cover group-hover:scale-105 transition duration-1000 ease-out"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-teal-500 backdrop-blur-md px-4 py-1.5 text-[10px] rounded-full text-white font-bold uppercase tracking-widest shadow-lg">
              {category}
            </span>
          </div>

          <h1 className="text-white text-3xl md:text-6xl font-extrabold max-w-4xl leading-[1.1] tracking-tight mb-4 font-outfit">
            {title}
          </h1>
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-white/5 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Hero;