import React from 'react';

/**
 * Senior Developer UI Pattern: Premium Skeletons
 * Better skeletons reduce perceived waiting time by maintaining the layout 
 * structure and using subtle animations.
 */
const BlogSkeleton = () => {
  return (
    <div className="w-full flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
      {/* Thumbnail Area */}
      <div className="aspect-video bg-slate-200 animate-pulse" />
      
      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        {/* Title Lines */}
        <div className="h-5 bg-slate-200 rounded-md w-full animate-pulse" />
        <div className="h-5 bg-slate-200 rounded-md w-2/3 animate-pulse" />
        
        {/* Description Lines */}
        <div className="mt-2 space-y-2">
          <div className="h-3 bg-slate-100 rounded w-full animate-pulse" />
          <div className="h-3 bg-slate-100 rounded w-5/6 animate-pulse" />
        </div>
        
        {/* Footer */}
        <div className="mt-auto pt-4 flex items-center gap-2">
          <div className="h-4 w-4 bg-slate-100 rounded-full animate-pulse" />
          <div className="h-3 bg-slate-100 rounded w-20 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default BlogSkeleton;
