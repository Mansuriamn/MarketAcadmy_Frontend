import React from 'react'

export default function BackBotton() {
  return (
   <>
   <div className="bg-gray-50 border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
    <div className="flex items-center gap-2 text-sm text-gray-600">

      <button
        onClick={() => window.history.back()}
        className="group flex items-center gap-2 text-gray-700 font-medium transition-all duration-300"
      >
        {/* Arrow */}
        <span className="transform transition-all duration-300 group-hover:-translate-x-1 group-hover:text-primary">
          ←
        </span>

        {/* Text */}
        <span className="relative">
          Back
          {/* Underline animation */}
          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </span>
      </button>

    </div>
  </div>
</div>
   </>
  )
}
