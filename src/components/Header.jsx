import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { navLinks } from '../data/navLinks';
import SearchBox from './ui/SearchBox';
const Navbar = ({ searchQuery = "", onSearchChange }) => {
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [find, setFind] = useState("");
  const navigate = useNavigate();
 


  // ✅ Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && find.trim()) {
      navigate(`/search?q=${find}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="hidden md:block sticky top-0 z-50 bg-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] transition-all duration-300">
      <div className="flex flex-col">

        {/* === TOP ROW: SEARCH & AUTH === */}
        <div className="flex items-center justify-between px-6 py-4 md:px-10 lg:px-12 bg-white">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/logo192.png" 
              alt="Market Academy Logo" 
              className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform duration-300 group-hover:scale-110" 
            />
            {/* <h1 className="hidden sm:flex text-xl md:text-2xl font-black tracking-tighter items-center gap-1">
              <span className="bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">
                Market
              </span>
              <span className="text-gray-800">Academy</span>
            </h1> */}
          </Link>
          {/* Mobile Menu Button */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-primary hover:text-accent-blue hover:bg-primary/5 p-2 rounded-lg transition-all duration-300 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
            <div className="hidden md:block w-7"></div>
          </div>

          {/* Search Bar Desktop */}
          <SearchBox 
           value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search ..."
            
          />

          {/* Auth */}
          <div className="flex items-center gap-3">
            <Link to="/account">
              <button className="px-6  py-2.5 bg-[#0f2a4a] text-white text-[0.95rem] font-semibold rounded-lg 
hover:bg-[#0d213f] hover:shadow-[0_8px_16px_-6px_rgba(13,33,63,0.4)] hover:-translate-y-[2px] hover:scale-[1.02]
active:translate-y-0 active:shadow-none active:scale-[0.98]
focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0d213f]
transition-all duration-300 ease-in-out">
                Sign Up/In
              </button>
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-100" />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center justify-center px-6 py-3 md:px-10 lg:px-12 gap-3 bg-gray-50/40">
          {navLinks.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              className={({ isActive }) => `px-6 py-[0.4rem] text-[0.95rem] font-bold rounded-full transition-all duration-300 ${isActive
                ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                : 'text-text-muted hover:text-primary hover:bg-white hover:shadow-sm hover:scale-105'
                }`}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu */}
      <div
  className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
    isMobileMenuOpen
      ? "max-h-[500px] border-b border-gray-100 opacity-100 shadow-xl"
      : "max-h-0 opacity-0"
  }`}
>
  <div className="flex flex-col px-4 py-4 bg-white space-y-1">

    {/* Mobile Search */}
    <div className="relative flex items-center mb-4 group">
      <Search
        className="absolute left-3 sm:left-4 text-text-muted w-4 h-4 sm:w-[18px] sm:h-[18px] group-focus-within:text-primary transition-colors"
      />

      <input
        type="text"
        className="w-full pl-10 sm:pl-11 pr-4 py-2 sm:py-[0.7rem] text-[0.9rem] sm:text-[0.95rem] font-medium bg-gray-50 border border-gray-200 rounded-xl text-text-main placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-[4px] focus:ring-primary/10 transition-all"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search ..."
      />
    </div>

    {/* Navigation Links */}
    {navLinks.map((link, idx) => (
      <NavLink
        key={idx}
        to={link.path}
        onClick={() => setIsMobileMenuOpen(false)}
        className={({ isActive }) =>
          `px-4 py-3 rounded-xl text-[1rem] font-semibold transition-all duration-300 ${
            isActive
              ? "bg-primary/10 text-primary scale-[1.02]"
              : "text-text-muted hover:bg-gray-50 hover:text-primary hover:translate-x-1"
          }`
        }
      >
        {link.name}
      </NavLink>
    ))}

  </div>
</div>

      </div>
    </nav>
  );
};

export default Navbar;