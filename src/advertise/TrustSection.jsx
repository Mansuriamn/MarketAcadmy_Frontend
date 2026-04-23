import React from "react";
import { ShieldCheck, CheckCircle } from "lucide-react";

export default function TrustSection({ data }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* Tag */}
      <div className="text-xs font-semibold text-green-600 mb-2 tracking-wide">
        SOCIAL PROOF
      </div>

      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
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
            className="group flex items-start gap-3 transition-all duration-300 cursor-default"
          >
            {/* Icon */}
            <div className="bg-green-50 p-2 rounded-lg group-hover:bg-green-100 transition">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>

            {/* Text */}
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