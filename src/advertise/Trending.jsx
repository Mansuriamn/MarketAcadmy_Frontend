import React from 'react'
import { Play, ArrowRight, TrendingUp, ChevronRight,ShieldCheck,Check } from "lucide-react";

export default function Trending({data}) {
  return (
  <>
     <div className="bg-white rounded-xl p-6 shadow-sm" data-testid="trending-section">
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck className="w-5 h-5 text-teal-500" />
                    <h3 className="font-bold text-lg text-gray-900">{data.title}</h3>
                  </div>
                 <div className="space-y-4">
    {data.steps.map((topic, index) => (
      <div
        key={topic.id}
        className="group flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0 cursor-pointer"
        data-testid={`trending-item-${topic.id}`}
      >
        
        {/* Index Number */}
      <Check className="w-5 h-5 text-teal-500" />
  
        {/* Content */}
        <div>
          <p className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-primary transition">
            {topic.title}
          </p>
  
          {/* Optional subtext */}
          
        </div>
      </div>
    ))}
  </div>
                </div>
  </>
  )
}
