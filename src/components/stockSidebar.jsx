import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

// Mutable default stocks array — exported so parent can read updated list
export let DEFAULT_STOCKS = [
  { name: 'Reliance'  },
  {  name: 'TCS'       },
  {  name: 'Infosys'   },
  {  name: 'HDFCBank' },
  { name: 'ICICI Bank'},
  { id: 'SBIN',      name: 'SBI'       },
];

export default function StockSidebar({ selectedStock, fetchStockData, }) {

  const getSavedStocks = () => {
    try {
      const saved = localStorage.getItem('market_recent_stocks');
      if (saved) return JSON.parse(saved);
    } catch (e) { console.error(e); }
    return [];
  };

  const [recentStocks,  setRecentStocks]  = useState(getSavedStocks());
  const [defaultStocks, setDefaultStocks] = useState(DEFAULT_STOCKS);
  const [searchQuery,   setSearchQuery]   = useState('');
  const [stocks,        setStocks]        = useState([]);

  // ─── helpers ──────────────────────────────────────────────────────────────

  // Strips .NS suffix and uppercases — used as the canonical unique key
  const toRaw = (val = '') => val.toUpperCase().replace(/\.NS$/i, '');

  // Always sends SYMBOL.NS to the parent / data layer
  const toNSETicker = (raw = '') => toRaw(raw) + '.NS';

  const getCombinedStocks = (defaults = defaultStocks) => {
    const all  = [...recentStocks, ...defaults];
    const seen = new Set();
    return all.filter(s => {
      const key = toRaw(s.symbol || s.id || '');
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  // ─── add a stock to the default list (and sync the export) ────────────────
  const addToDefaults = (stockObj) => {
    const rawId = toRaw(stockObj.symbol || stockObj.id || '');
    const alreadyExists = defaultStocks.some(
      s => toRaw(s.symbol || s.id || '') === rawId
    );
    if (alreadyExists) return;

    const newEntry = { id: rawId, name: stockObj.name || rawId };

    setDefaultStocks(prev => {
      const updated = [...prev, newEntry];
      DEFAULT_STOCKS = updated;             // keep exported reference in sync
      return updated;
    });

    // Notify parent so it can update its own state / re-render sidebar list
    if (typeof onStockAdded === 'function') {
      onStockAdded(newEntry);
    }
  };

  // ─── select / click a stock ───────────────────────────────────────────────
  const handleSelectStock = (stockObj) => {
    if (!stockObj) return;

    const rawId  = toRaw(stockObj.symbol || stockObj.id || '');
    const ticker = rawId + '.NS';

    // Save to recents
    setRecentStocks(prev => {
      const filtered = prev.filter(s => toRaw(s.symbol || s.id || '') !== rawId);
      const updated  = [{ ...stockObj, id: rawId }, ...filtered].slice(0, 20);
      localStorage.setItem('market_recent_stocks', JSON.stringify(updated));
      return updated;
    });

    // Add to defaults if not already there
    addToDefaults(stockObj);

    // Send SYMBOL.NS to parent
    fetchStockData(ticker);
  };

  // ─── Enter key handler ────────────────────────────────────────────────────
  const handleSearch = (e) => {
    if (e.key !== 'Enter' || !searchQuery.trim()) return;

    const clean = toRaw(searchQuery.trim());

    const exactMatch = stocks.find(s =>
      toRaw(s.symbol || s.id || '') === clean ||
      (s.name || '').toUpperCase() === clean
    ); 

    const bestMatch = exactMatch || stocks[0];
       console.log('bestMatch', bestMatch);
    // if (bestMatch) {
    //   handleSelectStock(bestMatch);
    // } else {
    //   // Unknown symbol typed — create on the fly, add to defaults, send to parent
    //   const newStock = { id: clean, name: clean };
    //   addToDefaults(newStock);
    //   handleSelectStock(newStock);
    // }

    setSearchQuery(''); // clear search box after selection
  };

  // ─── local filter ─────────────────────────────────────────────────────────
  const localFilter = (query) => {
    const q = query.toLowerCase().replace(/\.ns$/i, '').trim();
    return getCombinedStocks().filter(s => {
      const id   = toRaw(s.symbol || s.id || '').toLowerCase();
      const name = (s.name || '').toLowerCase();
      return id.includes(q) || name.includes(q);
    });
  };

  // ─── debounced search effect ──────────────────────────────────────────────
  useEffect(() => {
    const delay = setTimeout(async () => {
      const clean = searchQuery.trim();

      if (!clean) {
        setStocks(getCombinedStocks());
        return;
      }

      const local = localFilter(clean);
      if (local.length > 0) setStocks(local);

      if (clean.length >= 3) {
        try {
          const backendQuery = toRaw(clean);
          const res  = await fetch(`/api/search?q=${backendQuery}`);
          if (res.ok) {
            const data = await res.json();
            if (data?.length > 0) setStocks(data);
          }
        } catch (err) {
          console.error('Backend search error:', err);
        }
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [searchQuery, defaultStocks]);

  // ─── sync list when defaults or recents change ────────────────────────────
  useEffect(() => {
    if (!searchQuery) setStocks(getCombinedStocks());
  }, [recentStocks, defaultStocks]);

  // ─── initial load ─────────────────────────────────────────────────────────
  useEffect(() => {
    setStocks(getCombinedStocks());
  }, []);

  // ─── render ───────────────────────────────────────────────────────────────
  return (
    <aside className="guide-sidebar">
      <h3 className="section-title">Stocks</h3>

      <div className="search-box">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Search or type NSE symbol + Enter"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      <div
        className="stock-list custom-scrollbar"
        style={{ maxHeight: '600px', overflowY: 'auto', paddingRight: '8px' }}
      >
        {stocks.map(stock => {
          const rawId    = toRaw(stock.symbol || stock.id || '');
          const isActive = selectedStock === rawId + '.NS';
          return (
            <div
              key={rawId}
              className={`stock-item ${isActive ? 'active' : ''}`}
              onClick={() => handleSelectStock(stock)}
            >
              <span className="stock-symbol">{stock.name}</span>
            </div>
          );
        })}
      </div>
    </aside>
  );
}