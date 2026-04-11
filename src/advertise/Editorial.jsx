import React from 'react'
import { values } from '../data/adverData';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function Editorial() {
  return (
   <>
    <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="integrity-heading">
           💼 Our Services
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our reputation is built on an unwavering commitment to accuracy, fact-based reporting.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow"
                data-testid={`value-${idx}`}
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
   </>
  )
}
