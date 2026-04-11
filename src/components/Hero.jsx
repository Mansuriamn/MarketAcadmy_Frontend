import React, { useState, useEffect, useCallback } from 'react'; 

const LIMIT = 1; const offset =0;
const Hero = ({ page }) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`/server/api/${page}?limit=${LIMIT}&offset=${offset}`)
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden group shadow-lg">

        <img
          src={image}
          className="w-full h-[300px] md:h-[420px] object-cover group-hover:scale-110 transition duration-700 ease-out"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end md:justify-center p-6 md:p-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-teal-500 px-3 py-1 text-xs rounded-full text-white font-medium tracking-wide">
              {category}
            </span>
          </div>

          <h1 className="text-white text-2xl md:text-5xl font-bold max-w-3xl leading-tight tracking-tight">
            {title}
          </h1>
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/5"></div>
      </div>
    </div>
  );
};

export default Hero;