import React from "react";
import { Play, Eye } from "lucide-react";
import { Link } from 'react-router-dom';

export const VideoCard = ({ video }) => {

  const { _id, title, image,category,duration } = video;
  return (
   <Link to={`/video/${_id}`} >
     <div
      data-testid={`video-card-${_id}`}
     
      className=" hover:shadow-xl w-full border-none h-full flex flex-col group cursor-pointer bg-white rounded-xl overflow-hidden 
      transition-all duration-300 
      hover:scale-[1.001]"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video  overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover 
          group-hover:scale-110 transition-transform duration-500"
        />
   
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 
        group-hover:bg-black/60 transition-all duration-300 
        flex items-center justify-center">
          
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full 
          bg-white/90 group-hover:bg-white group-hover:scale-110 
          transition-all duration-300 flex items-center justify-center shadow-lg">
            
            <Play
              className="w-6 h-6 md:w-7 md:h-7 text-[#1a2838] ml-1"
              fill="currentColor"
            />
          </div>
            <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500 text-white`}>
            {category}
          </span>
        </div>

        {/* Duration */}
        <div className="absolute bottom-2 right-2 bg-black/80 
        text-white text-xs px-2 py-1 rounded-md">
          {duration}
        </div>

        {/* Free Badge */}
        {/* {video.isFree && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-emerald-500 text-white text-xs px-2 py-1 font-semibold">
              Free
            </Badge>
          </div>
        )} */}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-text-muted transition-colors">
          {title}
        </h3>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="truncate max-w-[60%]">
            {/* {video.instructor} */}
          </span>

          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {/* <span>{video.views} views</span> */}
          </div>
        </div>
      </div>
    </div>
   </Link>
  );
};