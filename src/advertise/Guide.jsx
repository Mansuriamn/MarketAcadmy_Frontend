import React from 'react'
import { BookOpen } from "lucide-react";

export default function Guide({data}) {
  return (
    <>
      <div className="bg-white  rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-emerald-500" />
                    <h3 className="font-bold text-lg text-gray-900">{data.title}</h3>
                  </div>

                <div className="space-y-5">
                  {data.steps.map((guide) => (
                    <div
                      key={guide.step}
                      data-testid={`guide-step-${guide.id}`}
                      className="flex gap-4 items-start group"
                    >
                      {/* Step Number */}
                      <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 
        group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white text-xs font-semibold">
                          {guide.id}
                        </span>
                      </div>

                      {/* Content */}
                      <div>
                        <p className="text-gray-800 text-sm leading-relaxed group-hover:text-gray-900 transition-colors">
                          {guide.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
    </>
  )
}
