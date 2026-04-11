import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search } from "lucide-react";

export default function SearchBox({ value, onChange, placeholder = "Search..." }) {
 

  return (
    <div className="hidden md:flex flex-1 max-w-xl mx-auto relative items-center group">
      
      {/* Icon */}
      <Search className="absolute left-4 text-gray-400 w-[18px] h-[18px] group-focus-within:text-teal-500 transition-colors duration-300" />

      {/* Input */}
      <input
        type="text"
        placeholder={placeholder}
         value={value}
       onChange={(e) => onChange(e.target.value)}
        className="w-full pl-11 pr-4 py-[0.7rem] text-[0.95rem] font-medium 
        bg-gray-50 border border-gray-200 rounded-xl 
        text-gray-800 placeholder:text-gray-400 
        hover:border-gray-300 
        focus:outline-none focus:border-teal-500 focus:bg-white 
        focus:ring-[4px] focus:ring-teal-500/10 
        transition-all duration-300 shadow-sm"
      />
    </div>
  );
}