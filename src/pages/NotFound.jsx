import React from "react";
import { Link } from "react-router-dom";
import BackBotton from "../components/ui/BackBotton";


const NotFound = () => {
  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
      
      {/* 404 Text */}
      <h1 className="text-7xl font-extrabold text-gray-800">404</h1>

      {/* Message */}
      <h2 className="mt-4 text-2xl font-semibold text-gray-700">
        Oops! Page not found
      </h2>

      <p className="mt-2 text-gray-500 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Buttons */}
     <BackBotton />

      {/* Optional Illustration */}
      <div className="mt-10 text-teal-400 text-sm">
        Error Code: 404 | Not Found
      </div>
    </div>
  );
};

export default NotFound;