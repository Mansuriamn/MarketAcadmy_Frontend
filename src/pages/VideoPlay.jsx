import React, { useState } from "react";
import {
  Share2,
  Bookmark,
  Download,
  Play,
  CheckCircle2,
  Lock,
} from "lucide-react";
import Navbar from "../components/Header";
import Footer from "../components/Footer";
import BackBotton from "../components/ui/BackBotton";
const VideoPlay = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const lesson = {
    title: "Mastering RSI Divergence",
    duration: "24 Minutes",
    thumbnail:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  };

  return (
  <>
  <Navbar />
   <div className="bg-gray-50 border-b border-gray-200">
    <BackBotton />
</div>
    <div className="bg-[#f5f7fb] min-h-screen py-6 px-4 lg:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">

          {/* VIDEO */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm">
            {!isPlaying ? (
              <>
                <img
                  src={lesson.thumbnail}
                  alt=""
                  className="w-full h-full object-cover aspect-video"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 transition"
                  >
                    <Play className="text-white w-8 h-8 ml-1" fill="white" />
                  </button>
                </div>

                {/* bottom text */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="text-white text-2xl font-bold">
                    {lesson.title}
                  </h2>
                  <p className="text-gray-300 text-sm">
                    Module 4 • Lesson 12 • {lesson.duration}
                  </p>
                </div>
              </>
            ) : (
              <iframe
                className="w-full aspect-video"
                src={`${lesson.youtubeUrl}?autoplay=1`}
                allow="autoplay"
                allowFullScreen
                title="video"
              />
            )}
          </div>

          {/* INSTRUCTOR + ACTION */}
      

          {/* DESCRIPTION + CONCEPT */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* DESCRIPTION */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-green-500 rounded"></span>
                Lesson Description
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Learn how RSI divergence helps identify market reversals before
                they happen. This lesson focuses on advanced trading signals.
              </p>

              <h4 className="text-xs font-semibold text-gray-500 mb-3 tracking-wider">
                LEARNING GOALS
              </h4>

              <div className="space-y-2">
                <div className="flex gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="text-green-500" size={16} />
                  Distinguish divergence types
                </div>
                <div className="flex gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="text-green-500" size={16} />
                  Master RSI settings
                </div>
                <div className="flex gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="text-green-500" size={16} />
                  Execute smart entries
                </div>
              </div>
            </div>

            {/* CORE CONCEPT */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-black rounded"></span>
                Core Concepts
              </h3>

              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-sm">
                    Momentum Oscillator
                  </h4>
                  <p className="text-xs text-gray-500">
                    RSI measures price movement speed between 0–100.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-sm">
                    Bearish Divergence
                  </h4>
                  <p className="text-xs text-gray-500">
                    Price up, RSI down → weak trend signal.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-sm">
                    Failure Swings
                  </h4>
                  <p className="text-xs text-gray-500">
                    RSI-based confirmation signals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* COURSE */}
       

          {/* RESOURCES */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h4 className="text-xs font-semibold text-gray-500 mb-3">
              LESSON RESOURCES
            </h4>

            <div className="space-y-3">
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                <span className="text-sm">PDF Cheat Sheet</span>
                <Download size={16} />
              </div>

              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                <span className="text-sm">RSI Calculator</span>
                <Download size={16} />
              </div>
            </div>
          </div>

          {/* UP NEXT */}
         

        </div>
      </div>
    </div>
    <Footer />
  </>
  );
};

export default VideoPlay;