import React, { useCallback, memo } from 'react';

const CategorieButtons = ({ handleCategoryChange, activeCategory,categories = [] }) => {

 

  return (
  <div className="w-full flex justify-center px-4 md:px-8 mt-12 mb-8">
  <div className="flex gap-3 overflow-x-auto pb-4 max-w-6xl w-full no-scrollbar scroll-smooth">
    
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => handleCategoryChange(category)}
        className={`flex-shrink-0 whitespace-nowrap 
          px-4 py-1.5 text-[0.8rem]
          sm:px-5 sm:py-2 sm:text-[0.85rem] 
          md:px-6 md:py-2.5 md:text-[0.95rem] 
          rounded-full font-semibold transition-all duration-300
          ${
            activeCategory === category
              ? 'bg-primary text-white shadow-md scale-105'
              : 'bg-gray-50 text-text-muted border border-gray-200 hover:bg-white hover:text-primary hover:scale-105 hover:border-primary/40'
          }`}
      >
        {category}
      </button>
    ))}

  </div>
</div>
  );
};

// ✅ memo prevents unnecessary re-renders
export default memo(CategorieButtons);