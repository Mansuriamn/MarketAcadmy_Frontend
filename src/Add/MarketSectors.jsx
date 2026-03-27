import React from 'react'
import { TrendingUp, ChevronRight } from 'lucide-react';

export default function MarketSectors() {
  return (
         <>
          <div className="bg-white rounded-xl p-6 shadow-sm" data-testid="market-sectors">
                         <h3 className="font-bold text-lg text-gray-900 mb-4">Market Sectors</h3>
                         <div className="space-y-3">
                           <button className="w-full flex items-center justify-between py-2 text-gray-700 hover:text-gray-900" data-testid="sector-technology">
                             <span className="text-sm font-medium">Technology</span>
                             <ChevronRight className="w-4 h-4" />
                           </button>
                           <button className="w-full flex items-center justify-between py-2 text-gray-700 hover:text-gray-900" data-testid="sector-financials">
                             <span className="text-sm font-medium">Financials</span>
                             <ChevronRight className="w-4 h-4" />
                           </button>
                           <button className="w-full flex items-center justify-between py-2 text-gray-700 hover:text-gray-900" data-testid="sector-energy">
                             <span className="text-sm font-medium">Energy</span>
                             <ChevronRight className="w-4 h-4" />
                           </button>
                         </div>
                       </div>
         </>
  )
}
