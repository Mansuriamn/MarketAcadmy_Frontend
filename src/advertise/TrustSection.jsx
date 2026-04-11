import React from "react";
import { ShieldCheck, Star, Users, CheckCircle } from "lucide-react";

export default function TrustSection({ data }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <ShieldCheck className="w-5 h-5 text-green-500" />
        <h3 className="font-bold text-lg text-gray-900">
          Trusted by Users
        </h3>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0 group"
          >
            {/* Icon */}
            <div className="mt-1">
              <CheckCircle className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform duration-200" />
            </div>

            {/* Text Content */}
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {item.title}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}