import { Link } from "react-router-dom";
import { Globe, Rss, AtSign } from "lucide-react";

const Footer = () => (
<footer className="hidden md:block bg-primary px-4  w-full sm:px-6 text-white mt-16">
  <div className="container mx-auto py-12">

    <div className="flex flex-col lg:flex-row justify-between gap-10">

      {/* LEFT */}
      <div className="text-center lg:text-left">
          {/* <Link to="/" className="flex items-center justify-center lg:justify-start gap-3 mb-4 group">
            <img 
              src="/logo192.png" 
              alt="Footer Logo" 
              className="w-10 h-10 grayscale brightness-200 group-hover:grayscale-0 transition-all duration-500" 
            />
            <h4 className="text-xl md:text-2xl font-black tracking-tighter">
              Market Academy
            </h4>
          </Link> */}
       
        <p className="text-[10px] text-white/40 uppercase tracking-[2px] max-w-xs mx-auto lg:mx-0 leading-relaxed">
          © 2024 Market Academy. All rights reserved. Precision in every trade.
        </p>

        <p className="font-display tx-sm sm:text-sm font-semibold mb-3 tracking-wide">
          Connect Now: 9340077499
        </p>
      </div>

      {/* 🔥 HIDDEN ON MOBILE */}
      <div className="hidden md:flex flex-col sm:flex-row justify-center gap-12 sm:gap-20 text-center sm:text-left">

        <div>
          <h5 className="text-xs font-semibold tracking-[3px] text-white/50 mb-4">
            RESOURCES
          </h5>
          <ul className="space-y-3 text-sm text-white/70">
            <li><Link to="/" className="hover:text-teal-500">About Us</Link></li>
            <li><Link to="/" className="hover:text-teal-500">Contact</Link></li>
            <li><Link to="/" className="hover:text-teal-500">Careers</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-xs font-semibold tracking-[3px] text-white/50 mb-4">
            LEGAL
          </h5>
          <ul className="space-y-3 text-sm text-white/70">
            <li><Link to="/" className="hover:text-teal-500">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:text-teal-500">Terms of Service</Link></li>
            <li><Link to="/" className="hover:text-teal-500">Risk Disclosure</Link></li>
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
            hover:text-teal-500 hover:border-teal-500
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
