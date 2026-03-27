import React, { useCallback, memo } from 'react';

const CategorieButtons = ({ setActiveCategory, activeCategory,categories = [] }) => {

  // ✅ stable function (prevents unnecessary re-renders)
  const handleClick = useCallback((category) => {
  if (category !== activeCategory) {
    setActiveCategory(category);
  }
}, [setActiveCategory, activeCategory]);

  // ✅ safety check
  if (!categories.length) return null;

  return (
    <div className="w-full flex justify-center px-6 md:px-12 mt-12 mb-8">
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide max-w-6xl w-full md:justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleClick(category)}   // ✅ optimized
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[0.95rem] font-bold transition-all duration-300 ${
              activeCategory === category
                ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                : 'bg-gray-50 text-text-muted border border-gray-200 hover:bg-white hover:text-primary hover:shadow-sm hover:scale-105 hover:border-primary/40'
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