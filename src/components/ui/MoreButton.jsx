import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function MoreButton({ handleLoadMore, loading, disabled }) {
  return (
    <div className="text-center mt-10">
      <button
          // ✅ correct
        onClick={handleLoadMore}
          className="bg-gray-900 te text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2 group"
        data-testid="load-more-button"
        disabled={loading || disabled}
        >
        View More Insights
      <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  );
}