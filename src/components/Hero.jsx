import React from 'react';
import { heroData } from '../data/heroData';

const Hero = () => {

  // ✅ destructuring data
  const { image, category, title } = heroData;

  return (
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="relative rounded-3xl overflow-hidden group shadow-lg">

    {/* IMAGE */}
    <img
      src={image}   // ✅ dynamic
      className="w-full h-[300px] md:h-[420px] object-cover group-hover:scale-110 transition duration-700 ease-out"
    />

    {/* OVERLAY */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

    {/* CONTENT */}
    <div className="absolute inset-0 flex flex-col justify-end md:justify-center p-6 md:p-12">

      {/* TOP META */}
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-teal-500 backdrop-blur px-3 py-1 text-xs rounded-full text-white font-medium tracking-wide">
          {category}  {/* ✅ dynamic */}
        </span>
      </div>

      {/* TITLE */}
      <h1 className="text-white text-2xl md:text-5xl font-bold max-w-3xl leading-tight tracking-tight">
        {title}   {/* ✅ dynamic */}
      </h1>

    </div>

    {/* HOVER EFFECT */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/5"></div>
  </div>
</div>
  );
};

export default Hero;