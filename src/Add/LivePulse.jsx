import React from 'react'
import { ArrowLeft, Share2, Printer, Mail, TrendingUp, CheckCircle2, ChevronRight } from 'lucide-react';

export default function LivePulse() {
  return (
   <>
      <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-34" data-testid="live-pulse-widget">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-teal-500" />
                  <h3 className="font-bold text-lg text-gray-900">LIVE PULSE</h3>
                  <span className="ml-auto text-xs text-gray-500">REAL-TIME</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-700">S&P 500</span>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">5,843.10</div>
                      <div className="text-xs text-green-600">+0.82%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-700">NASDAQ 100</span>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">18,342.30</div>
                      <div className="text-xs text-green-600">+1.12%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pb-3">
                    <span className="text-sm font-medium text-gray-700">US 10Y BOND</span>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">4.214%</div>
                      <div className="text-xs text-red-600">-0.08%</div>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors" data-testid="view-dashboard-button">
                  VIEW FULL DASHBOARD
                </button>
              </div>
   </>
  )
}
