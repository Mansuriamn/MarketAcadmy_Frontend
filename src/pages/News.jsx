import React, { useState, useEffect, useCallback } from 'react';
import { apiCall } from '../api/config';
import Navbar from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import BreakingNewsTicker from '../components/BreakingNewsTicker';
import CategorieButtons from '../components/ui/CategorieButtons';
import { PageTabs } from '../data/PageTabs';
import Headline from '../advertise/CryptoNews';
import { TrendingNow } from '../data/adverData';
import Membership from '../advertise/Membership';
import TrustSection from '../advertise/TrustSection';
import { trustData, resultsData } from '../data/adverData';
import ResultsSection from '../advertise/ResultsSection';
import { BlogCard } from '../components/ui/BlogCard';
import MoreButton from '../components/ui/MoreButton';
import useDebounce from '../hooks/useDebounce';
import { useDataCache } from '../context/CacheContext';

const LIMIT = 10;

const News =() => {
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
    const cacheKey = `news-${category}-${query}-${pageNum}`;

    // 🚀 INSTANT UI: Show cached data immediately if it's the first page
    const cached = getCachedData(cacheKey);
    if (cached && pageNum === 0) {
      setPosts(cached);
      setHasMore(cached.length === LIMIT);
    } else if (!cached) {
      setLoading(true);
    }

    try {
      let endpoint;

      if (query.trim().length >= 2) {
        endpoint = `/api/news/search?q=${encodeURIComponent(query.trim())}`;
      } else if (category === "All Insights") {
        endpoint = `/api/news?limit=${LIMIT}&offset=${offset}`;
      } else {
        endpoint = `/api/news/category/${category}?limit=${LIMIT}&offset=${offset}&category=${encodeURIComponent(category)}`;
      }

      const incoming = await apiCall(endpoint);

      // Save to cache
      if (pageNum === 0) {
        setCachedData(cacheKey, incoming);
      }

      // page 0 → replace | page 1+ → append
      setPosts(prev => pageNum === 0 ? incoming : [...prev, ...incoming]);
      setHasMore(incoming.length === LIMIT);

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
      <BreakingNewsTicker />
    <div className='pt-12'>
     <Hero page="news" />
    </div>
      <CategorieButtons
         handleCategoryChange={handleCategoryChange}
         activeCategory={activeCategory}
         categories={PageTabs.news}
       />
 
       <div className="min-h-screen bg-gray-50">
         <section className="py-8 md:py-12">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 
               <div className="lg:col-span-2">
 
                 {/* Skeleton — first load only */}
                 {loading && posts.length === 0 && (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {Array.from({ length: LIMIT }).map((_, i) => (
                       <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
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
                       <BlogCard key={post._id} post={post} page="news" />
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
                     You've reached the end.
                   </p>
                 )}
 
               </div>
 
               {/* Sidebar */}
               <div className="space-y-6">
                 <Headline />
                 <Membership />
                 <TrustSection data={trustData} />
                 <ResultsSection data={resultsData} />
               </div>
 
             </div>
           </div>
         </section>
       </div>
 
       <Footer />
    
    </>
  )
}


export default News