import "../App.css";
import { newsItems } from "../Add/newsItems";
export default function BreakingNewsTicker() {
  return (
    <div className="w-full bg-slate-900 border-y border-slate-700 overflow-hidden">
      <div className="flex items-center h-12">
        <div className="px-4 text-red-400 font-bold text-xs tracking-widest whitespace-nowrap border-r border-slate-700 h-full flex items-center">
          ● BREAKING
        </div>
        <div className="flex-1 overflow-hidden ticker-scroll-area">
          <div className="ticker-track">
            {[...newsItems, ...newsItems].map((item, index) => (
              <div
                key={index}
                className="px-7 text-white text-sm flex items-center gap-2 whitespace-nowrap"
              >
                <span className="ticker-dot" />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}