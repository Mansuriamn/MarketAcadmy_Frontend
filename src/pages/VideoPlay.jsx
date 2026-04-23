import React, { useState, useEffect } from "react";
import { apiCall } from "../api/config";
import {
  Share2,
  Bookmark,
  Download,
  Play,
  CheckCircle2,
  Lock,
} from "lucide-react";
import DOMPurify from "dompurify";
import Navbar from "../components/Header";
import Footer from "../components/Footer";
import BackBotton from "../components/ui/BackBotton";
import { useParams } from "react-router-dom";
import QuoteCallout from "../components/QuoteCallout";
import Trending from "../advertise/Trending";
import Join from "../advertise/Join";

const VideoPlay = () => {
  const { id } = useParams();
  
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // ✅ Fetch data properly
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        const data = await apiCall(`/api/courses/${id}`);
        setLesson(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  // ✅ YouTube Embed Helper
  const getEmbedUrl = (url) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("v=")) {
      videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("/embed/")) {
      return url; // already embed
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  // ✅ Loading UI
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20">Loading...</div>
        <Footer />
      </>
    );
  }

  // ✅ Error UI
  if (error) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20 text-red-500">{error}</div>
        <Footer />
      </>
    );
  }

  // ✅ No data
  if (!lesson) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20">No lesson found</div>
        <Footer />
      </>
    );
  }

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
          <div className="mb-4 pl-3 max-w-3xl">

              {/* Meta row */}
              <div className="flex items-center gap-3 mb-3.5">
                <span className="inline-flex items-center gap-1.5 text-[11.5px] font-medium tracking-wide uppercase text-teal-500 bg-blue-50 border border-blue-100 rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                  Now Playing
                </span>
              </div>

               <div className="mb-4">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  {lesson?.category}
                </span>
              </div>

              {/* Title */}
              <h2 className=" text-[clamp(1.3rem,3vw,1.9rem)] font-semibold leading-snug tracking-tight text-gray-900 mb-4">
                {lesson?.title}
              </h2>
            </div>

            {/* VIDEO */}
            <div className="relative rounded-2xl overflow-hidden shadow-sm">
              {!isPlaying ? (
                <>
                  <img
                    src={lesson?.image}
                  
                    className="w-full h-full object-cover aspect-video"
                  />

                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 transition"
                    >
                      <Play
                        className="text-white w-5 h-5 md:w-6 md:h-6 ml-1"
                        fill="white"
                      />
                    </button>
                  </div>
                </>
              ) : (
                <iframe
                  className="w-full aspect-video"
                  src={`${getEmbedUrl(lesson?.url)}?autoplay=1`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="video"
                />
              )}
            </div>

            {/* DESCRIPTION + CONCEPT */}
            <div className="space-y-6">

              {/* DESCRIPTION */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <span className="w-1 h-5 bg-green-500 rounded"></span>
                  Lesson Description
                </h3>

                <div
  className="text-gray-600 text-sm leading-relaxed mb-4"
  dangerouslySetInnerHTML={{
    __html: lesson?.description
      ? DOMPurify.sanitize(lesson.description)
      : "No description available",
  }}
/>
                

               

                
              </div>
               {/* Quote Callout */}
                           <QuoteCallout />

              {/* CORE CONCEPT */}
           
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6 lg:mt-[136px]">
            {/* <div className="bg-white rounded-2xl shadow-sm p-5">
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
            </div> */}
            <Join/>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default VideoPlay;