import React, { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from 'react';
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
import Navbar from '../components/Header';
import Footer from '../components/Footer';
import { apiCall } from '../api/config';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


const INITIAL_STOCKS = [
  { id: 'HDFCBANK',    name: 'HDFC Bank',                 desc: 'Banking & Financial services' },
  { id: 'ICICIBANK',   name: 'ICICI Bank',                desc: 'Leading private sector bank' },
  { id: 'WIPRO',       name: 'Wipro Limited',             desc: 'IT & Consulting' },
  { id: 'BHARTIARTL',  name: 'Bharti Airtel',             desc: 'Telecom giant' },
  { id: 'SBIN',        name: 'State Bank of India',       desc: 'Largest public sector bank' },
  { id: 'LT',          name: 'Larsen & Toubro',        desc: 'Engineering & Infrastructure' },
  { id: 'KOTAKBANK',   name: 'Kotak Mahindra Bank',    desc: 'Private sector bank' },
  { id: 'AXISBANK',    name: 'Axis Bank',              desc: 'Banking & Financial services' },
  { id: 'ASIANPAINT',  name: 'Asian Paints',           desc: 'Paint industry leader' },
  { id: 'MARUTI',      name: 'Maruti Suzuki',          desc: 'Automobile manufacturer' },
  { id: 'HINDUNILVR',  name: 'Hindustan Unilever',     desc: 'FMCG giant' },
  { id: 'ITC',         name: 'ITC Limited',            desc: 'FMCG & Tobacco' },
  { id: 'BAJFINANCE',  name: 'Bajaj Finance',          desc: 'NBFC leader' },
  { id: 'SUNPHARMA',   name: 'Sun Pharma',             desc: 'Pharmaceutical leader' },
  { id: 'ADANIENT',    name: 'Adani Enterprises',      desc: 'Diversified conglomerate' },
   { id: 'TATAMOTORS',  name: 'Tata Motors',           desc: 'Automobile manufacturer' },
  { id: 'TATASTEEL',   name: 'Tata Steel',            desc: 'Steel production giant' },
  { id: 'POWERGRID',   name: 'Power Grid Corp',       desc: 'Power transmission' },
  { id: 'NTPC',        name: 'NTPC Limited',          desc: 'Power generation company' },
  { id: 'ONGC',        name: 'ONGC',                  desc: 'Oil & gas exploration' },
  { id: 'COALINDIA',   name: 'Coal India',            desc: 'Coal mining giant' },
  { id: 'ULTRACEMCO',  name: 'UltraTech Cement',      desc: 'Cement leader' },
  { id: 'GRASIM',      name: 'Grasim Industries',     desc: 'Cement & textiles' },
  { id: 'TECHM',       name: 'Tech Mahindra',         desc: 'IT services' },
  { id: 'HCLTECH',     name: 'HCL Technologies',      desc: 'IT consulting' },
  { id: 'DRREDDY',     name: 'Dr Reddy’s Labs',       desc: 'Pharmaceuticals' },
  { id: 'CIPLA',       name: 'Cipla',                 desc: 'Pharma company' },
  { id: 'EICHERMOT',   name: 'Eicher Motors',         desc: 'Royal Enfield parent' },
  { id: 'HEROMOTOCO',  name: 'Hero MotoCorp',         desc: 'Two-wheeler leader' },
  { id: 'JSWSTEEL',    name: 'JSW Steel',             desc: 'Steel manufacturer' },
   { id: 'RELIANCE',    name: 'Reliance Industries',       desc: 'Energy & Retail giant' },
  { id: 'TCS',         name: 'Tata Consultancy Services', desc: 'IT Services leader' },
  { id: 'INFY',        name: 'Infosys Limited',           desc: 'Digital conversion expert' },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Pure-SVG Candlestick Chart Component
   ───────────────────────────────────────────────────────────────────────────── */
const CandlestickChart = ({ candles, onLoadMore, isLoadingPast }) => {
  const [tooltip, setTooltip]       = useState(null); 
  const [dragState, setDragState]   = useState({ isDragging: false, startX: 0, initialOffset: 0 });
  const [scrollOffset, setScrollOffset] = useState(0); // Offset in pixels from the right
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  const candleViewWidth = 14; 
  const H = 340;
  const PADDING = useMemo(() => ({ top: 20, right: 70, bottom: 60, left: 10 }), []);
  const VOL_H = 60; 
  const CHART_H = H - PADDING.top - PADDING.bottom - VOL_H;

  const dataAvailable = candles && candles.length >= 2;

  // Scales logic


  /* ── scales ── */
  const { priceMin, priceRange, pricePadded, maxVolume } = useMemo(() => {
    if (!dataAvailable) return { priceMin:0, priceRange:1, pricePadded:0, maxVolume:1 };
    const highs = candles.map(c => c.high);
    const lows = candles.map(c => c.low);
    const pMax = Math.max(...highs);
    const pMin = Math.min(...lows);
    const pRange = pMax - pMin || 1;
    const vls = candles.map(c => c.volume || 0);
    return { priceMin: pMin, priceRange: pRange, pricePadded: pRange * 0.08, maxVolume: Math.max(...vls) || 1 };
  }, [candles, dataAvailable]);

  const toY = useCallback((price) =>
    PADDING.top + CHART_H - ((price - priceMin + pricePadded) / (priceRange + 2 * pricePadded)) * CHART_H
  , [CHART_H, PADDING.top, priceMin, pricePadded, priceRange]);

  // X coordinate: 0 is far left (oldest), totalWidth is far right (newest)
  const toX = useCallback((i) => {
    return PADDING.left + i * candleViewWidth + candleViewWidth / 2;
  }, [PADDING.left, candleViewWidth]);

  const ticks = useMemo(() => {
    const tickCount = 6;
    const tickStep  = (priceRange + 2 * pricePadded) / (tickCount - 1);
    return Array.from({ length: tickCount }, (_, i) =>
      priceMin - pricePadded + i * tickStep
    );
  }, [priceMin, pricePadded, priceRange]);

  // Calculate total width based on number of candles
  const totalWidth = candles.length * candleViewWidth + PADDING.left + PADDING.right;

  const [containerSize, setContainerSize] = useState({ width: 1000, height: 340 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleMouseUp = () => setDragState(prev => ({ ...prev, isDragging: false }));

  const candleW = Math.max(1, candleViewWidth * 0.75);
  const volTop  = PADDING.top + CHART_H + 12;
  const volToH  = useCallback((v) => ((v / maxVolume) * (VOL_H - 10)), [maxVolume, VOL_H]);

  const BULL = 'var(--color-guide-positive)';
  const BEAR = 'var(--color-guide-negative)';

  // Scroll to right edge when data changes (initial load or timeframe switch)
  useLayoutEffect(() => {
    if (dataAvailable && !isLoadingPast) {
      const maxScroll = Math.max(0, totalWidth - containerSize.width);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setScrollOffset(maxScroll);
    }
  }, [candles.length, containerSize.width, dataAvailable, isLoadingPast, totalWidth]); // Reset on length change (timeframe switch) 


  const handleMouseDown = (e) => {
    setDragState({
      isDragging: true,
      startX: e.clientX,
      initialOffset: scrollOffset
    });
  };

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    if (dragState.isDragging) {
      const deltaX = e.clientX - dragState.startX;
      let newOffset = dragState.initialOffset - deltaX;
      const maxScroll = Math.max(0, totalWidth - rect.width);
      
      // Clamp
      newOffset = Math.max(0, Math.min(maxScroll, newOffset));
      setScrollOffset(newOffset);

      // Trigger "Load More" when hitting the left edge (near 0)
      if (newOffset <= 120 && !isLoadingPast && onLoadMore) {
        onLoadMore();
      }
      return;
    }
    if (!dataAvailable) return;
    const svgX = (e.clientX - rect.left) + scrollOffset;
    const idx = Math.floor((svgX - PADDING.left) / candleViewWidth);
    const clampedIdx = Math.max(0, Math.min(candles.length - 1, idx));
    setTooltip({ x: toX(clampedIdx), y: e.clientY - rect.top, candle: candles[clampedIdx], idx: clampedIdx });
  };

  const handleWheel = (e) => {
    const maxScroll = Math.max(0, totalWidth - containerSize.width);
    // Use deltaX or deltaY depending on which is available/dominant
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    let newOffset = scrollOffset + delta; 
    newOffset = Math.max(0, Math.min(maxScroll, newOffset));
    setScrollOffset(newOffset);
    if (newOffset <= 120 && !isLoadingPast && onLoadMore) onLoadMore();
  };

  if (!dataAvailable) {
    return (
      <div className="flex flex-col items-center justify-center bg-guide-bg rounded-2xl border-2 border-dashed border-guide-border min-h-[320px]">
        <BarChart3 size={32} className="text-slate-300" />
        <p className="mt-3 text-slate-400 font-medium italic">Select a stock to view detailed chart</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-[340px] my-5 overflow-hidden select-none touch-none rounded-xl border border-slate-100 ${dragState.isDragging ? 'cursor-grabbing' : 'cursor-crosshair'}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => { handleMouseUp(); setTooltip(null); }}
      onWheel={handleWheel}
      onTouchStart={(e) => handleMouseDown(e.touches[0])}
      onTouchMove={(e) => handleMouseMove(e.touches[0])}
      onTouchEnd={handleMouseUp}
    >
      {/* Scroll indicator for loading state */}
      {isLoadingPast && (
        <div className="absolute left-1/2 top-4 -translate-x-1/2 z-40 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border border-teal-100 flex items-center gap-3 animate-bounce">
          <Activity size={16} className="text-teal-500 animate-spin" />
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">Loading History...</span>
        </div>
      )}

      {/* Tooltip card */}
      {tooltip && (
        <div 
          className="absolute top-3 z-30 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-xl p-3 min-w-[140px] shadow-2xl pointer-events-none transition-all duration-150"
          style={{
            left: tooltip.x - scrollOffset,
            transform: (tooltip.x - scrollOffset) > (containerSize.width - 160) ? 'translateX(-110%)' : 'translateX(12px)',
          }}
        >
          <div className="text-[10px] text-slate-400 mb-1.5 font-bold uppercase tracking-tighter">
            {new Date(tooltip.candle.time * 1000).toLocaleString('en-IN', { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' })}
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <span className="text-[10px] text-slate-500 font-bold uppercase">Open</span>
            <span className="text-xs font-mono font-bold text-right text-slate-200">{tooltip.candle.open?.toFixed(2)}</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase">High</span>
            <span className="text-xs font-mono font-bold text-right text-emerald-400">{tooltip.candle.high?.toFixed(2)}</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase">Low</span>
            <span className="text-xs font-mono font-bold text-right text-rose-400">{tooltip.candle.low?.toFixed(2)}</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase">Close</span>
            <span className={`text-xs font-mono font-bold text-right ${tooltip.candle.close >= tooltip.candle.open ? 'text-emerald-400' : 'text-rose-400'}`}>
              {tooltip.candle.close?.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* Price Axis (Sticky Right) */}
      <div className="absolute top-0 right-0 h-full w-[70px] bg-white/80 backdrop-blur-md z-20 pointer-events-none border-l border-slate-100">
        {ticks.map((tick, i) => (
          <div 
            key={i} 
            className="absolute text-[10px] font-bold text-slate-700"
            style={{ top: toY(tick) - 6, right: 8 }}
          >
            {tick >= 1000 ? (tick / 1000).toFixed(1) + 'K' : tick.toFixed(0)}
          </div>
        ))}
      </div>

      <svg
        ref={svgRef}
        viewBox={`${scrollOffset} 0 ${containerSize.width} 340`}
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        {/* Horizontal Grid Lines */}
        {ticks.map((tick, i) => (
          <line
            key={i}
            x1={scrollOffset} y1={toY(tick)}
            x2={scrollOffset + containerSize.width} y2={toY(tick)}
            stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3"
          />
        ))}

        <line x1={0} y1={volTop - 2} x2={totalWidth} y2={volTop - 2} stroke="#f1f5f9" strokeWidth="1" />

        {/* Candles and Volume */}
        {candles.map((c, i) => {
          const isBull = c.close >= c.open;
          const color  = isBull ? BULL : BEAR;
          const cx     = toX(i);
          
          // Only render candles that are visible in the viewport for performance
          if (cx < scrollOffset - 50 || cx > scrollOffset + containerSize.width + 50) return null;

          const bodyTop    = toY(Math.max(c.open, c.close));
          const bodyBottom = toY(Math.min(c.open, c.close));
          const bodyH      = Math.max(1, bodyBottom - bodyTop);
          const vH = volToH(c.volume || 0);
          const vy = volTop + (VOL_H - 10) - vH;

          return (
            <g key={i}>
              <line x1={cx} y1={toY(c.high)} x2={cx} y2={toY(c.low)} stroke={color} strokeWidth="1.5" />
              <rect x={cx - candleW / 2} y={bodyTop} width={candleW} height={bodyH} fill={color} rx={1} />
              <rect x={cx - candleW / 2} y={vy} width={candleW} height={vH} fill={color} fillOpacity="0.2" rx="1" />
            </g>
          );
        })}


        {/* Vertical Crosshair Line */}
        {tooltip && (
          <line
            x1={tooltip.x} y1={PADDING.top}
            x2={tooltip.x} y2={H - PADDING.bottom}
            stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4"
            pointerEvents="none"
          />
        )}
      </svg>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Senior-level Loading Skeleton
   ───────────────────────────────────────────────────────────────────────────── */
const StockSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <div className="flex items-start mb-6">
          <div className="w-full">
            <div className="h-9 w-64 bg-slate-200 rounded-lg mb-4"></div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-32 bg-slate-200 rounded-md"></div>
              <div className="h-5 w-16 bg-slate-100 rounded-md"></div>
            </div>
            <div className="flex gap-2 mt-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-8 w-12 bg-slate-50 rounded-full border border-slate-100"></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Chart Skeleton */}
        <div className="w-full h-[340px] bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center">
           <div className="w-full h-full p-8 flex items-end gap-1 justify-around">
             {[30, 50, 40, 70, 45, 60, 35, 80, 55, 40, 65, 30, 50, 45, 75, 40, 60, 35, 50, 40].map((h, i) => (
               <div key={i} className="bg-slate-200 rounded-t-sm w-full" style={{ height: `${h}%` }}></div>
             ))}
           </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-8">
          <div className="flex flex-col gap-2">
            <div className="h-3 w-16 bg-slate-100 rounded"></div>
            <div className="h-6 w-24 bg-slate-200 rounded"></div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-3 w-16 bg-slate-100 rounded"></div>
            <div className="h-6 w-24 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-7 h-48">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-slate-200 rounded-xl"></div>
            <div className="h-6 w-32 bg-slate-200 rounded-md"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 w-full bg-slate-100 rounded"></div>
            <div className="h-4 w-5/6 bg-slate-100 rounded"></div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="h-16 w-full bg-slate-900/10 rounded-2xl"></div>
          <div className="h-24 w-full bg-slate-50 rounded-2xl border border-slate-100"></div>
        </div>
      </div>
    </div>
  );
};



const StockGuide = () => {
  const [selectedStock, setSelectedStock]     = useState(null);
  const [stockDetail,   setStockDetail]       = useState(null);
  const [searchQuery,   setSearchQuery]       = useState('');
  const [timeFilter,    setTimeFilter]        = useState('5D');
  const [showExplainModal, setShowExplainModal] = useState(false);
  const [isLoaded,      setIsLoaded]          = useState(false);
  const [isLoading,     setLoading]           = useState(false);
  const [loadingPast,   setLoadingPast]       = useState(false);
  const [error,         setError]             = useState(null);

  const [customStocks,  __setCustomStocks]      = useState([]);
  const [__lastUpdated,   setLastUpdated]       = useState(null);
  const abortControllerRef = useRef(null);
  const currentSymbol = useRef('RELIANCE');
  const pastFetchOffset = useRef(0); // number of days back we've fetched

  const fetchStockData = useCallback(async (symbol, range = '5d', interval = '15m', isPrepend = false) => {
    if (abortControllerRef.current && !isPrepend) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    const cleanedSymbol = symbol.replace(/\s+/g, '').toUpperCase();
    if (!cleanedSymbol) return;

    currentSymbol.current = cleanedSymbol;
    if (isPrepend) setLoadingPast(true); else {
      setLoading(true);
      NProgress.start();
    }
    setError(null);


    try {
      let finalRange = range;
      let finalInterval = interval;
      
      // If prepending, we calculate a custom range in the past
      if (isPrepend) {
        pastFetchOffset.current += 1; // Load next unit (day/month/year)
        
        // Map current filter to appropriate historical growth
        if (timeFilter === '1D') {
           finalRange = `${1 + pastFetchOffset.current}d`;
           finalInterval = '5m';
        } else if (timeFilter === '5D') {
           finalRange = `${5 + pastFetchOffset.current}d`;
           finalInterval = '15m';
        } else if (timeFilter === '1M') {
           finalRange = `${1 + pastFetchOffset.current}mo`;
           finalInterval = '90m';
        } else if (timeFilter === '1Y') {
           finalRange = `${1 + pastFetchOffset.current}y`;
           finalInterval = '1d';
        }
      } else {
        pastFetchOffset.current = 0;
      }

      const url = `/api/stock/${cleanedSymbol}?range=${finalRange}&interval=${finalInterval}`;
      const envelope = await apiCall(url, { unwrap: false, signal: abortControllerRef.current.signal });
      const rawCandles = envelope?.data ?? [];
      const candles = rawCandles.filter(c => c != null && c.open !== null);

      if (isPrepend) {
        setStockDetail(prev => {
          const existingTimes = new Set(prev.candles.map(c => c.time));
          const newOnes = candles.filter(c => !existingTimes.has(c.time));
          const merged = [...newOnes, ...prev.candles].sort((a,b) => a.time - b.time);
          
          return {
            ...prev,
            candles: merged,
            high: Math.max(prev.high, ...newOnes.map(c => c.high)),
            low: Math.min(prev.low, ...newOnes.map(c => c.low)),
          };
        });
      } else {
        const knownStock = INITIAL_STOCKS.find(s => s.id === cleanedSymbol) || customStocks.find(s => s.id === cleanedSymbol);
        const activeStockInfo = knownStock || { id: cleanedSymbol, name: cleanedSymbol, desc: 'External Result' };

        setStockDetail({
          symbol:       cleanedSymbol,
          name:         activeStockInfo.name,
          desc:         activeStockInfo.desc,
          currentPrice: envelope?.currentPrice ?? 0,
          change:       envelope?.change       ?? 0,
          candles,
          high:         Math.max(...candles.map(c => c.high)),
          low:          Math.min(...candles.map(c => c.low)),
          trend:        (envelope?.change ?? 0) >= 0 ? 'Uptrend' : 'Downtrend',
          volume: String(candles.at(-1)?.volume ?? 0),
          insight: (envelope?.change ?? 0) >= 0 ? 'Bulls are leading.' : 'Bears are leading.',
        });
        setSelectedStock(activeStockInfo);
      }
      setLastUpdated(new Date());
    } catch (err) {
      if (err.name === 'AbortError') return; 
      setError(`Failed to fetch ${cleanedSymbol}`);
    } finally {
      if (isPrepend) setLoadingPast(false); else {
        setLoading(false);
        NProgress.done();
      }
    }

  }, [customStocks, timeFilter]);

  useEffect(() => {
    setIsLoaded(true);
    fetchStockData('RELIANCE');
    return () => { if (abortControllerRef.current) abortControllerRef.current.abort(); };
  }, [fetchStockData]);

  const handleLoadMorePast = () => {
    // Works for all intraday and daily scales
    fetchStockData(currentSymbol.current, timeFilter.toLowerCase(), '15m', true);
  };

  const handleTimeFilter = (f) => {
    setTimeFilter(f);
    const s = currentSymbol.current;
    if (f === '1D') fetchStockData(s, '1d', '5m');
    else if (f === '5D') fetchStockData(s, '5d', '15m');
    else if (f === '1M') fetchStockData(s, '1mo', '90m');
    else fetchStockData(s, '1y', '1d');
  };

  const filteredStocks = useMemo(() => {
    const rawSearch = searchQuery.trim().toUpperCase();
    const all = [...INITIAL_STOCKS, ...customStocks];
    let filtered = all.filter(s => s.id.includes(rawSearch) || s.name.toUpperCase().includes(rawSearch));
    
    // If we have a exact match or a potential new symbol, ensure it's selectable
    if (rawSearch && !all.some(s => s.id === rawSearch)) {
      filtered.push({ id: rawSearch, name: `🔍 Search: ${rawSearch}`, isSearchPlaceholder: true });
    }
    return filtered;
  }, [searchQuery, customStocks]);

  return (
    <>
      <Navbar />
      <div className={`max-w-[1280px] mx-auto p-4 md:p-8 min-h-screen font-inter transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          <aside className="bg-guide-card p-6 rounded-3xl border border-guide-border premium-shadow h-fit lg:sticky top-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-guide-primary/10 p-2.5 rounded-xl text-guide-primary">
                <BarChart3 size={20} />
              </div>
              <h3 className="text-xl font-outfit font-extrabold tracking-tight text-slate-900">Market Watch</h3>
            </div>
            
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text" placeholder="Search symbol..."
                className="w-full py-3.5 pl-11 pr-4 bg-guide-bg border border-guide-border rounded-2xl outline-none focus:border-guide-primary font-bold text-sm transition-all"
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && fetchStockData(searchQuery.trim())}
              />
            </div>
            
            <div className="flex flex-col gap-2.5 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredStocks.map(stock => (
                <div 
                  key={stock.id} 
                  onClick={() => fetchStockData(stock.id)} 
                  className={`p-4 rounded-2xl cursor-pointer border transition-all hover-lift ${
                    selectedStock?.id === stock.id 
                      ? 'bg-guide-primary-light border-guide-primary/30 text-guide-primary shadow-sm' 
                      : 'border-transparent hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className={`text-sm font-bold ${selectedStock?.id === stock.id ? 'text-guide-primary' : 'text-slate-800'}`}>
                        {stock.id}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter truncate max-w-[150px]">
                        {stock.name}
                      </span>
                    </div>
                    {selectedStock?.id === stock.id && <ChevronRight size={16} className="text-guide-primary" />}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-50 flex items-center gap-3 text-slate-400">
               <Activity size={14} />
               <span className="text-[10px] font-bold uppercase tracking-widest text-[#0d9488]">Real-time NSE Feed</span>
            </div>
          </aside>

          <main className="flex flex-col gap-6">
            {isLoading && !loadingPast ? (
              <StockSkeleton />
            ) : error ? (
              <div className="bg-white rounded-2xl border-2 border-dashed border-rose-100 p-12 flex flex-col items-center text-center">
                <div className="bg-rose-50 p-4 rounded-full text-rose-500 mb-4">
                  <AlertTriangle size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Oops! Something went wrong</h3>
                <p className="text-slate-500 max-w-xs mb-6">{error}</p>
                <button 
                  onClick={() => fetchStockData(currentSymbol.current)}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
                >
                  Try Again
                </button>
              </div>
            ) : stockDetail ? (
              <>
                <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
                  <div className="flex items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-extrabold">{stockDetail.name}</h2>
                     
                      <div className="flex items-center gap-3 mt-2">
                         <span className="text-2xl font-bold">₹{stockDetail.currentPrice.toLocaleString('en-IN')}</span>
                         <span className={`text-sm font-bold ${stockDetail.change >= 0 ? 'text-guide-positive' : 'text-guide-negative'}`}>
                          {stockDetail.change >= 0 ? '+' : ''}{stockDetail.change}%
                         </span>
                      </div>
                      <br></br>
                        <div className="flex gap-2">
                      {['1D', '5D', '1M', '1Y'].map(f => (
                        <button key={f} onClick={() => handleTimeFilter(f)} className={`px-4 py-1.5 rounded-full text-xs font-bold border ${timeFilter === f ? 'bg-slate-900 text-white' : 'hover:border-teal-500'}`}>
                          {f}
                        </button>
                      ))}
                    </div>
                    </div>
                  
                  </div>

                  <CandlestickChart 
                    key={`${stockDetail.symbol}-${timeFilter}`}
                    candles={stockDetail.candles} 
                    onLoadMore={handleLoadMorePast} 
                    isLoadingPast={loadingPast}
                  />
                  
                  <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-8 text-sm items-center">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Day High</span>
                      <span className="text-lg font-outfit font-bold text-emerald-600 tracking-tight">₹{stockDetail.high.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Day Low</span>
                      <span className="text-lg font-outfit font-bold text-rose-600 tracking-tight">₹{stockDetail.low.toLocaleString('en-IN')}</span>
                    </div>
                  
                    <div className="ml-auto flex items-center gap-2.5 px-4 py-2 bg-slate-50 rounded-xl text-slate-400 border border-slate-100/50">
                      <Activity size={14} className="text-teal-500" />
                      <span className="text-[11px] font-bold italic">Drag chart to explore history</span>
                    </div>
                  </div>
                </div>
                
                {/* ── Insight Panel ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 bg-gradient-to-br from-white to-teal-50/30">
                    <div className="flex items-center gap-3.5 pb-5 border-b border-slate-100 mb-5 text-slate-900">
                      <Activity className="bg-teal-500 text-white p-2 rounded-xl shadow-lg" size={32} />
                      <div className="font-bold text-lg tracking-tight">AI Market Insight</div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center text-sm font-bold">
                        <span className="flex items-center gap-2 text-slate-400 uppercase tracking-wider text-[11px]"><TrendingUp size={16} /> Trend</span>
                        <span className={`${stockDetail.change >= 0 ? 'text-teal-500' : 'text-rose-500'}`}>{stockDetail.trend}</span>
                      </div>
                    </div>
                    <div className="mt-7 flex flex-col gap-4">
                      <div className="p-5 bg-white border-l-4 border-teal-500 rounded-r-2xl shadow-sm italic text-slate-600 text-[15px] leading-relaxed">
                        <p>{stockDetail.insight}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-6">
                    <button className="flex items-center justify-center gap-3 w-full py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all" onClick={() => setShowExplainModal(true)}>
                      <Info size={22} /> How to Read Candles
                    </button>
                    <div className="p-6 bg-white rounded-2xl border border-slate-100 flex flex-col justify-center flex-1 bg-gradient-to-br from-white to-slate-50">
                      <h4 className="text-lg font-bold mb-3 text-slate-800">Safe & Educational</h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">
                        Candlestick charts show price movement for each period. Green means the price went up, and Red means it went down.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl border-2 border-dashed border-guide-border p-20 flex flex-col items-center justify-center text-center">
                 <div className="bg-slate-50 p-6 rounded-full text-slate-300 mb-6">
                    <BarChart3 size={48} />
                 </div>
                 <h3 className="text-2xl font-extrabold text-slate-800 mb-2">No Stock Selected</h3>
                 <p className="text-slate-400 font-medium max-w-sm">
                   Select a stock from the market watch or search for a symbol to get started.
                 </p>
              </div>
            )}
          </main>

        </div>

        <footer className="mt-20 text-center p-8 border-t border-slate-100 bg-white rounded-3xl">
          <p className="text-xs text-slate-400 max-w-[700px] mx-auto leading-relaxed font-medium">
            ⚠️ <strong>Disclaimer:</strong> This platform is for educational purposes only and does not provide financial advice. Trading stocks involves risk. Consult a professional before making investment decisions.
          </p>
        </footer>
      </div>
      <Footer />

      {/* ── Explain Modal ── */}
      {showExplainModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/40 backdrop-blur-md" onClick={() => setShowExplainModal(false)}>
          <div className="bg-white rounded-3xl p-8 md:p-10 max-w-[540px] w-full mx-4 shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-5 right-5 bg-slate-50 text-slate-400 w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 hover:text-slate-900 transition-all border border-slate-100" onClick={() => setShowExplainModal(false)}><X size={24} /></button>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-8 text-slate-900 tracking-tight"> Interactive Trading Charts</h2>
            <div className="flex flex-col gap-6">
               <p className="text-slate-600 leading-relaxed">
                 1. <strong>Drag with Mouse</strong>: Click and drag anywhere on the chart to move through time, just like professional platforms.<br/><br/>
                 2. <strong>Load More</strong>: When you drag to the far left, the chart automatically fetches older historical data for you.<br/><br/>
                 3. <strong>Color Code</strong>: Green candles show price growth, while Red candles show a price drop.
               </p>
            </div>
            <button className="mt-8 w-full font-bold py-4 rounded-xl bg-teal-500 hover:bg-teal-600 text-white transition-all shadow-lg shadow-teal-500/20" onClick={() => setShowExplainModal(false)}>
              Got it — Let me Trade!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default StockGuide;
