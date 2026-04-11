import React from "react";
import { TrendingUp, ShieldCheck, Target, BarChart3,Star } from "lucide-react";

const iconMap = {
  confidence: TrendingUp,
  mistakes: ShieldCheck,
  consistency: BarChart3,
  risk: Target,
};

export default function ResultsSection({ data }) {
  return (
    <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-green-50">
          <Star className="w-5 h-5 text-teal-600" />
        </div>
        <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
          Results & Benefits
        </h3>
      </div>

      {/* List */}
      <div className="grid gap-4 sm:grid-cols-2">
        {data.map((item) => {
          const Icon =
            iconMap[item.type] || TrendingUp;

          return (
            <div
              key={item.id}
              className="group flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50/40 transition-all duration-300"
            >
              {/* Icon */}
              <div className="p-2 rounded-lg bg-green-100 group-hover:bg-white transition">
                <Icon className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform duration-200" />
              </div>

              {/* Content */}
              <div>
                <p className="text-sm font-semibold text-gray-900 leading-snug">
                  {item.title}
                </p>
                {item.description && (
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
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