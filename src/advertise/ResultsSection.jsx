import React from "react";
import { TrendingUp, ShieldCheck, Target, BarChart3, Star } from "lucide-react";

const iconMap = {
  confidence: TrendingUp,
  mistakes: ShieldCheck,
  consistency: BarChart3,
  risk: Target,
};

export default function ResultsSection({ data }) {
  return (
    <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* Tag */}
     

      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <h3 className="text-lg md:text-xl font-bold text-gray-900">
          Results & Benefits
        </h3>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {data.map((item) => {
          const Icon = iconMap[item.type] || TrendingUp;

          return (
            <div
              key={item.id}
              className="group flex items-start gap-3 p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-300"
            >
              {/* Icon */}
              <div className="bg-teal-50 p-2 rounded-lg group-hover:bg-teal-100 transition">
                <Icon className="w-5 h-5 text-teal-600" />
              </div>

              {/* Content */}
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {item.title}
                </p>

                {item.description && (
                  <p className="text-xs text-gray-500 mt-1">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}