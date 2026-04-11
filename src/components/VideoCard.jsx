import React from "react";
import { Play, Eye } from "lucide-react";
import { Link } from 'react-router-dom';

export const VideoCard = ({ video }) => {
  const { _id, title, image, category, duration } = video;
  
  // 📸 Thumbnail Fallback
  const imageUrl = image || 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800';

  return (
    <Link to={`/video/${_id}`} className="block h-full group">
      <div
        data-testid={`video-card-${_id}`}
        className="w-full h-full flex flex-col bg-white rounded-2xl overflow-hidden premium-shadow hover-lift border border-slate-100 transition-all duration-300"
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={imageUrl}
          
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
   
          {/* Overlay with Glass Play Button */}
          <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-all duration-500 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 group-hover:bg-white group-hover:scale-110 transition-all duration-500 flex items-center justify-center shadow-2xl">
              <Play
                className="w-6 h-6 text-white group-hover:text-sky-600 ml-1 transition-colors duration-300"
                fill="currentColor"
              />
            </div>
            
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-500 text-white shadow-lg">
              {category}
            </span>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-lg border border-white/10">
            {duration}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-4 leading-snug group-hover:text-sky-600 transition-colors line-clamp-2 font-outfit">
            {title}
          </h3>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
              <Eye className="w-3.5 h-3.5" />
              <span>Watch Lesson</span>
            </div>
            
            <div className="flex items-center text-sky-500 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
              Start Now →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};