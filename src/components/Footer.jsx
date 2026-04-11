import { Link } from "react-router-dom";
import { Globe, Rss, AtSign } from "lucide-react";

const Footer = () => (
<footer className="bg-primary px-4  w-full sm:px-6 text-white mt-16">
  <div className="container mx-auto py-12">

    <div className="flex flex-col lg:flex-row justify-between gap-10">

      {/* LEFT */}
      <div className="text-center lg:text-left">
        <h4 className="font-display text-lg sm:text-xl font-semibold mb-3 tracking-wide">
          Market<span className="text-accent">Acad</span>
        </h4>

        <p className="text-xs text-white/40 uppercase tracking-[2px] max-w-xs mx-auto lg:mx-0 leading-relaxed">
          © 2024 MarketAcad. All rights reserved. Precision in every trade.
        </p>
      </div>

      {/* 🔥 HIDDEN ON MOBILE */}
      <div className="hidden md:flex flex-col sm:flex-row justify-center gap-12 sm:gap-20 text-center sm:text-left">

        <div>
          <h5 className="text-xs font-semibold tracking-[3px] text-white/50 mb-4">
            RESOURCES
          </h5>
          <ul className="space-y-3 text-sm text-white/70">
            <li><Link to="/" className="hover:text-accent">About Us</Link></li>
            <li><Link to="/" className="hover:text-accent">Contact</Link></li>
            <li><Link to="/" className="hover:text-accent">Careers</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-xs font-semibold tracking-[3px] text-white/50 mb-4">
            LEGAL
          </h5>
          <ul className="space-y-3 text-sm text-white/70">
            <li><Link to="/" className="hover:text-accent">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:text-accent">Terms of Service</Link></li>
            <li><Link to="/" className="hover:text-accent">Risk Disclosure</Link></li>
          </ul>
        </div>

      </div>

      {/* RIGHT ICONS */}
      <div className="flex justify-center lg:justify-end items-center gap-4">
        {[Globe, Rss, AtSign].map((Icon, index) => (
          <button
            key={index}
            className="w-10 h-10 rounded-full border border-white/20 
            flex items-center justify-center text-white/60
            hover:text-accent hover:border-accent
            hover:scale-110 transition-all duration-300"
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>

    </div>

  </div>
</footer>
);

export default Footer;
