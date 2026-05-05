import React, { useState, useEffect, useCallback } from 'react';
import { apiCall } from '../api/config';
import { PageTabs } from '../data/PageTabs';
import {  quickGuideSteps } from "../data/adverData";
import { Play, ArrowRight, TrendingUp, ChevronRight } from "lucide-react";
import Navbar from "../components/Header";
import Footer from "../components/Footer";
import { VideoCard } from "../components/VideoCard";
import {  trendingTopics2 } from '../data/adverData';
import CategorieButtons from "../components/ui/CategorieButtons";
import Trending from "../advertise/Trending";
import MoreButton from "../components/ui/MoreButton";
import Guide from "../advertise/Guide";
import useDebounce from '../hooks/useDebounce';
import { useDataCache } from '../context/CacheContext';
import BlogSkeleton from '../components/ui/BlogSkeleton';

const LIMIT = 10;
const Learn =()=> {
  const { getCachedData, setCachedData } = useDataCache();
  const [searchQuery, setSearchQuery]       = useState("");
  const [activeCategory, setActiveCategory] = useState("All Insights");
  const [posts, setPosts]                   = useState([]);
  const [page, setPage]                     = useState(0);
  const [hasMore, setHasMore]               = useState(true);
  const [loading, setLoading]               = useState(false);

  const debouncedQuery = useDebounce(searchQuery, 400);

  // ─── Single unified fetch ──────────────────────────────────────────────
  const fetchPosts = useCallback(async (pageNum, category, query = "") => {
    const offset = pageNum * LIMIT;
    const cacheKey = `posts-${category}-${query}-${pageNum}`;
    
    // 🚀 INSTANT UI: If we have cached data, show it immediately
    const cached = getCachedData(cacheKey);
    if (cached && pageNum === 0) {
      setPosts(cached);
      setHasMore(cached.length === LIMIT);
      // We still proceed to fetch fresh data in the background
    } else if (!cached) {
      setLoading(true);
    }

    try {
      let endpoint;
      if (query.trim().length >= 2) {
        endpoint = `/api/courses/search?q=${encodeURIComponent(query.trim())}`;
      } else if (category === "All Insights") {
        endpoint = `/api/courses?limit=${LIMIT}&offset=${offset}`;
      } else {
        endpoint = `/api/courses/category/${category}?limit=${LIMIT}&offset=${offset}&category=${encodeURIComponent(category)}`;
      }

      const incoming = await apiCall(endpoint);
      
      // Update state and cache
      const newPosts = pageNum === 0 ? incoming : [...posts, ...incoming];
      setPosts(prev => pageNum === 0 ? incoming : [...prev, ...incoming]);
      setHasMore(incoming.length === LIMIT);
      setCachedData(cacheKey, incoming); // only cache the "chunk"

    } catch (err) {
      console.error("fetchPosts error:", err);
    } finally {
      setLoading(false);
    }
  }, [getCachedData, setCachedData]);
  

  // ─── Search effect ─────────────────────────────────────────────────────
  useEffect(() => {
    if (debouncedQuery.length === 1) return; // too short, skip

    setPosts([]);
    setPage(0);
    setHasMore(true);
    fetchPosts(0, activeCategory, debouncedQuery);

  }, [debouncedQuery, activeCategory, fetchPosts]);

  // ─── Category / mount effect ────────────────────────────────────────────
  useEffect(() => {
    if (debouncedQuery.length >= 2) return; // ✅ don't override active search

    setPosts([]);
    setPage(0);
    setHasMore(true);
    fetchPosts(0, activeCategory, "");

  }, [activeCategory, fetchPosts, debouncedQuery.length]);

  // ─── Load More ──────────────────────────────────────────────────────────
  const handleLoadMore = () => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage, activeCategory, debouncedQuery); // ✅ passes current search too
  };

  // ─── Category switch ────────────────────────────────────────────────────
  const handleCategoryChange = useCallback((category) => {
    if (category === activeCategory) return;
    setSearchQuery("");       // ✅ clear search when switching category
    setActiveCategory(category);
  }, [activeCategory]);



  return (

    <>
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
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
       <CategorieButtons
               handleCategoryChange={handleCategoryChange}
               activeCategory={activeCategory}
               categories={PageTabs.course}
             />
      </div>
      
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Blog Grid */}
            <div className="lg:col-span-2">
          
                          {/* Skeleton — first load only */}
                          {loading && posts.length === 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {Array.from({ length: LIMIT }).map((_, i) => (
                                <BlogSkeleton key={i} />
                              ))}
                            </div>
                          )}
          
                          {/* Empty state */}
                          {!loading && posts.length === 0 && (
                            <p className="text-center text-gray-500 py-12">
                              No posts found{activeCategory !== "All Insights" ? ` in "${activeCategory}"` : ""}.
                            </p>
                          )}
          
                          {/* Posts grid */}
                          {posts.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="blog-grid">
                              {posts.map((post) => (
                                <VideoCard key={post._id} video={post} />
                              ))}
                            </div>
                          )}
          
                          {/* Load More */}
                          {hasMore && !loading && posts.length > 0 && (
                            <MoreButton
                              handleLoadMore={handleLoadMore}
                              loading={loading}
                              disabled={loading}
                            />
                          )}
          
                          {/* Append spinner */}
                          {loading && posts.length > 0 && (
                            <div className="flex justify-center py-6">
                              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            </div>
                          )}
          
                          {/* End of feed */}
                          {!hasMore && posts.length > 0 && (
                            <p className="text-center text-gray-400 text-sm mt-8">
                              You&apos;ve reached the end.
                            </p>
                          )}
          
                        </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Now */}
           <Trending  data ={trendingTopics2}/>

              {/* Membership CTA */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white" data-testid="membership-cta">
                <div className="text-sm font-semibold text-teal-400 mb-2">PREMIUM</div>
                <h3 className="text-2xl font-bold mb-3">Never Miss a Pulse</h3>
                <p className="text-gray-300 text-sm mb-6">
                  Join 150k+ traders who get our deep-dive analysis delivered straight to their feed. Subscribe on YouTube.
                </p>
                <a 
                  href="https://youtu.be/4-9hiOPQsEE?si=RZ3lFLUBe_tH8iPS" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition-colors"
                  data-testid="premium-cta-button"
                >
                  Subscribe on YouTube
                </a>
              </div>


              {/* Market Sectors */}
            <Guide data={quickGuideSteps} />
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