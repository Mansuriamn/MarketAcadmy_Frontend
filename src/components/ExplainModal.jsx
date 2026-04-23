import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Info, 
  ChevronRight, 
  Activity, 
  BarChart3, 
  X,
  AlertTriangle,
} from 'lucide-react';
export default function ExplainModal({ stockDetail }) {
         const [showExplainModal, setShowExplainModal] = useState(false);
  return (
    <>
       <aside className="explain-section">
            {stockDetail && (
              <div className="insight-panel">
                <div className="insight-header">
                  <Activity className="ai-icon" size={28} />
                  <div style={{ fontWeight:800, fontSize:'1.2rem', fontFamily:'var(--font-outfit)' }}>AI Market Insight</div>
                </div>
                <div className="insight-stats">
                  <div className="stat-row">
                    <span className="stat-label"><TrendingUp size={18} /> Trend</span>
                    <span className={`stat-value ${stockDetail.change >= 0 ? 'pos' : 'neg'}`}>{stockDetail.trend}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label"><BarChart3 size={18} /> Volume</span>
                    <span className="stat-value">{stockDetail.volume}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Candles</span>
                    <span className="stat-value">{stockDetail.candles?.length}</span>
                  </div>
                </div>
                <div className="insight-explanation">
                  <p>{stockDetail.insight}</p>
                </div>
              </div>
            )}

            <button className="explain-btn" onClick={() => setShowExplainModal(true)}>
              <Info size={22} /> How to Read Candles
            </button>

            <div className="main-card" style={{ padding:'24px', background:'linear-gradient(135deg, white 0%, #f0fdfa 100%)' }}>
              <h4 style={{ margin:'0 0 16px 0', fontSize:'1.1rem', fontWeight:700, fontFamily:'var(--font-outfit)' }}>Safe & Educational</h4>
              <p style={{ fontSize:'0.9rem', color:'var(--guide-text-light)', margin:0, lineHeight:1.6 }}>
                Candlestick charts show Open, High, Low &amp; Close for each period. AI converts this into simple, beginner-friendly insights.
              </p>
            </div>
          </aside>

           {/* ── Explain Modal ── */}
     {showExplainModal && (
            <div className="modal-overlay" onClick={() => setShowExplainModal(false)}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setShowExplainModal(false)} aria-label="Close modal"><X size={24} /></button>
                <h2 className="modal-title">🕯️ Candlestick Chart 101</h2>
                <div className="modal-body">
                  <div className="concept-card">
                    <div className="concept-icon" style={{ background:'#f0fdf4', color:'#10b981' }}>
                      <svg width="28" height="28" viewBox="0 0 28 28"><rect x="10" y="4" width="8" height="16" rx="1.5" fill="#10b981"/><line x1="14" y1="1" x2="14" y2="4" stroke="#10b981" strokeWidth="2"/><line x1="14" y1="20" x2="14" y2="27" stroke="#10b981" strokeWidth="2"/></svg>
                    </div>
                    <div className="concept-info">
                      <h4>Bullish Candle (Green 🟢)</h4>
                      <p>The closing price is <strong>higher</strong> than the opening price. Buyers were in control. The body shows Open→Close, and the wicks show the High and Low of the period.</p>
                    </div>
                  </div>
                  <div className="concept-card">
                    <div className="concept-icon" style={{ background:'#fef2f2', color:'#ef4444' }}>
                      <svg width="28" height="28" viewBox="0 0 28 28"><rect x="10" y="8" width="8" height="16" rx="1.5" fill="#ef4444"/><line x1="14" y1="1" x2="14" y2="8" stroke="#ef4444" strokeWidth="2"/><line x1="14" y1="24" x2="14" y2="27" stroke="#ef4444" strokeWidth="2"/></svg>
                    </div>
                    <div className="concept-info">
                      <h4>Bearish Candle (Red 🔴)</h4>
                      <p>The closing price is <strong>lower</strong> than the opening price. Sellers dominated. The wicks still show how far prices swung during the period.</p>
                    </div>
                  </div>
                  <div className="concept-card">
                    <div className="concept-icon" style={{ background:'#f8fafc', color:'#64748b' }}>
                      <BarChart3 size={28} />
                    </div>
                    <div className="concept-info">
                      <h4>Volume Bars</h4>
                      <p>The small colored bars at the bottom show trading volume. Green volume = more buyers; Red volume = more sellers. High volume confirms a strong price move.</p>
                    </div>
                  </div>
                  <div className="concept-card">
                    <div className="concept-icon" style={{ background:'#f8fafc', color:'#64748b' }}>
                      <TrendingUp size={28} />
                    </div>
                    <div className="concept-info">
                      <h4>Hover for OHLC Data</h4>
                      <p>Move your cursor over any candle to see its exact Open, High, Low, Close, and Volume values in a popup tooltip.</p>
                    </div>
                  </div>
                </div>
                <button className="explain-btn" style={{ marginTop:'32px', width:'100%' }} onClick={() => setShowExplainModal(false)}>
                  Got it — Let me Read Charts!
                </button>
              </div>
            </div>
          )}
    </>
  )
}
