import React from "react";
import { ShieldCheck, Check } from "lucide-react";

export default function Trending({ data }) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
      data-testid="trending-section"
    >
      {/* Tag */}
      <div className="text-xs font-semibold text-teal-600 mb-2 tracking-wide">
        TRENDING NOW
      </div>

      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck className="w-5 h-5 text-teal-500" />
        <h3 className="font-bold text-lg text-gray-900">
          {data.title}
        </h3>
      </div>

      {/* List */}
      <div className="space-y-4">
        {data.steps.map((topic, index) => (
          <div
            key={topic.id}
            className="group flex items-start gap-3 transition-all duration-300 cursor-pointer"
            data-testid={`trending-item-${topic.id}`}
          >
            {/* Icon */}
            <div className="bg-teal-50 p-2 rounded-lg group-hover:bg-teal-100 transition">
              <Check className="w-4 h-4 text-teal-600" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-teal-600 transition">
                {topic.title}
              </p>

              {/* Optional future support */}
              {topic.description && (
                <p className="text-xs text-gray-500 mt-1">
                  {topic.description}
                </p>
              )}
            </div>

            {/* Arrow (micro interaction) */}
            <span className="opacity-0 group-hover:opacity-100 transition text-gray-400">
              →
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}