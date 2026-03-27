import React, { useState, useMemo } from "react";
import { learningTracks, quickGuideSteps } from "../data/content";
import { Play, ArrowRight, TrendingUp, ChevronRight } from "lucide-react";
import Navbar from "../components/Header";
import Footer from "../components/Footer";
import { VideoCard } from "../components/VideoCard";
import { blogPosts, trendingTopics1 } from '../data/blogData';
import CategorieButtons from "../components/ui/CategorieButtons";
import Trending from "../Add/Trending";
import MoreButton from "../components/ui/MoreButton";
import Guide from "../Add/Guide";

function Learn() {
  const categories = [
    "All Insights",
    "Technical",
    "Options",
    "macro",
    "crypto"

  ];
  const [activeCategory, setActiveCategory] = useState("All Insights");
 const [count, setCount] = useState(0); // [Count]
  return (

    <>
      <Navbar />
      <div className="">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#1a2838] via-[#1e2f42] to-[#1a2838] px-4 md:px-8 py-16 md:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <span className="inline-block bg-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide mb-4">
                Free Curriculum
              </span>

              <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Master the Markets with Free Insights
              </h1>

              <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed max-w-2xl">
                Unlock our premium YouTube-based learning tracks. Professional-grade
                financial education, curated for the modern investor.
              </p>

            </div>
          </div>
        </section>
      </div>
      <div className="w-full flex justify-center px-6 md:px-12 mt-12 mb-8">
        {/* Scrollable container on mobile, centered horizontal list on desktop */}
       <CategorieButtons setActiveCategory={setActiveCategory} activeCategory={activeCategory} categories={categories}  />
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="blog-grid">
  {learningTracks?.map((video) => (
    <VideoCard key={video.id} video={video} />
  ))}
</div> */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Blog Grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="blog-grid">
                {learningTracks?.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>

              {/* Load More Button */}
           <MoreButton setCount={setCount}/>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Now */}
           <Trending />

              {/* Membership CTA */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white" data-testid="membership-cta">
                <div className="text-sm font-semibold text-teal-400 mb-2">PREMIUM</div>
                <h3 className="text-2xl font-bold mb-3">Never Miss a Pulse</h3>
                <p className="text-gray-300 text-sm mb-6">
                  Join 150k+ traders who get our deep-dive analysis delivered straight to their feed. Subscribe on YouTube.
                </p>
                <button className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition-colors" data-testid="premium-cta-button">
                  Subscribe on YouTube
                </button>
              </div>

              {/* Market Sectors */}
            <Guide />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Guide */}
        

      <Footer />
    </>
  );
}

export default Learn;