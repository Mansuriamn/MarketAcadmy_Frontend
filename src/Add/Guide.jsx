import React from 'react'
import { learningTracks, quickGuideSteps } from "../data/content";

export default function Guide() {
  return (
    <>
      <div className="bg-white  rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">

                <h3 className="text-gray-900 text-sm font-bold mb-5 uppercase tracking-wider">
                  Quick Guide
                </h3>

                <div className="space-y-5">
                  {quickGuideSteps.map((guide) => (
                    <div
                      key={guide.step}
                      data-testid={`guide-step-${guide.step}`}
                      className="flex gap-4 items-start group"
                    >
                      {/* Step Number */}
                      <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 
        group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white text-xs font-semibold">
                          {guide.step}
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
