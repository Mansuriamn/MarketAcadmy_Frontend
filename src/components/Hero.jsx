import React, { useState, useEffect, useCallback } from 'react'; 
import API_BASE_URL from '../api/config';

const LIMIT = 1; const offset =0;
const Hero = ({ page }) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/${page}?limit=${LIMIT}&offset=${offset}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      });
  }, [page]); // also add dependency

  if (loading) {
    return <div className="animate-pulse h-64 bg-gray-200 rounded-xl"></div>;
  }

  

  const { image, category, title } = post[0];
  const imageUrl = image || 'https://images.unsplash.com/photo-1611974717482-98287e074b35?auto=format&fit=crop&q=80&w=1200';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="relative rounded-[2.5rem] overflow-hidden group premium-shadow border border-white/20">

        <img
          src={imageUrl}
         
          className="w-full h-[350px] md:h-[500px] object-cover group-hover:scale-105 transition duration-1000 ease-out"
        />

        {/* Dynamic Overlays */}
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
          
          {/* <div className="flex items-center gap-4 text-slate-300 text-sm font-medium">
             <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                Featured Analysis
             </span>
             <span className="w-1 h-1 rounded-full bg-slate-500" />
             
          </div> */}
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-white/5 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Hero;