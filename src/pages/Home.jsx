import React, { useState, useEffect, useCallback } from 'react';
import { apiCall } from '../api/config';
import Navbar from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import { BlogCard } from '../components/ui/BlogCard';
import { TrendingNow } from '../data/adverData';
import CategorieButtons from '../components/ui/CategorieButtons';
import MoreButton from '../components/ui/MoreButton';
import Membership from '../advertise/Membership';
import TrustSection from '../advertise/TrustSection';
import ResultsSection from '../advertise/ResultsSection';
import { trustData, resultsData as __resultsData } from '../data/adverData';
import { PageTabs } from '../data/PageTabs';
import useDebounce from '../hooks/useDebounce';
import { TrendingUp, ShieldCheck, MessageCircle } from "lucide-react";


import BlogSkeleton from '../components/ui/BlogSkeleton';
import { useDataCache } from '../context/CacheContext';

const LIMIT = 10;

const Home = () =>{
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
    const cacheKey = `blogs-${category}-${query}-${pageNum}`;

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
        endpoint = `/api/blogs/search?q=${encodeURIComponent(query.trim())}`;
      } else if (category === "All Insights") {
        endpoint = `/api/blogs?limit=${LIMIT}&offset=${offset}`;
      } else {
        endpoint = `/api/blogs/category/${category}?limit=${LIMIT}&offset=${offset}&category=${encodeURIComponent(category)}`;
      }

      const incoming = await apiCall(endpoint);

      setPosts(prev => pageNum === 0 ? incoming : [...prev, ...incoming]);
      setHasMore(incoming.length === LIMIT);
      setCachedData(cacheKey, incoming);

    } catch (err) {
      console.error("fetchPosts error:", err);
    } finally {
      setLoading(false);
    }
  }, [getCachedData, setCachedData]);
  

  // ─── Search effect ─────────────────────────────────────────────────────
  /**
   * Fires when debounced search query changes.
   * Skips if exactly 1 char (too short).
   * Resets to page 0 on every new search.
   */
  useEffect(() => {
    if (debouncedQuery.length === 1) return; // too short, skip

    setPosts([]);
    setPage(0);
    setHasMore(true);
    fetchPosts(0, activeCategory, debouncedQuery);

  }, [debouncedQuery, activeCategory, fetchPosts]); // ✅ only fires when query changes, not on category

  // ─── Category / mount effect ────────────────────────────────────────────
  /**
   * Fires on mount and whenever category tab changes.
   * Does NOT fire when search changes (debouncedQuery not in deps).
   * Skips if an active search is running — search takes priority.
   */
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden md:flex flex-col items-start justify-start pt-2 md:pt-5 lg:pt-5 w-full text-left">
          <h1 className="text-3xl sm:pl-2 lg:pl-4 md:text-4xl lg:text-[3.2rem] font-extrabold text-primary tracking-tight leading-[1.1] mb-6 max-w-5xl">
            Start Investing Today  <br />
            with{" "}
            <span className="text-text-muted bg-clip-text text-transparent bg-gradient-to-r from-text-muted to-gray-400">
              Expert Guidance
            </span>
          </h1>
        </div>
      </div>

      <Hero page="blogs" />

      <CategorieButtons
        handleCategoryChange={handleCategoryChange}
        activeCategory={activeCategory}
        categories={PageTabs.blog}
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
                      <BlogSkeleton key={i} />
                    ))}
                  </div>
                )}

                {/* Empty state */}
                {!loading && posts.length === 0 && (
                  <p className="text-center text-gray-500 py-12">
                    {searchQuery
                      ? `No results for "${searchQuery}"`
                      : `No posts found${activeCategory !== "All Insights" ? ` in "${activeCategory}"` : ""}.`
                    }
                  </p>
                )}

                {/* Posts grid */}
                {posts.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="blog-grid">
                    {posts.map((post) => (
                      <BlogCard key={post._id} post={post} page="blogs" /> // ✅ _id not id
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
                <Trust/>
                <Membership />
                <TrustSection data={trustData} />
                
              </div>

            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Home






  function Trust() {
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(false);

  const points = [
    {
      id: 1,
      title: "Helping 1000+ Clients Grow in Stock Market",
      summary:
        "Real Guidance | Strong Trading Psychology | 100% Free Support",
      icon: TrendingUp,
    },
    {
      id: 2,
      title: "Start Your Investment Journey Today",
      summary:
        "Get step-by-step guidance designed for beginners and serious investors.",
      icon: MessageCircle,
    },
    {
      id: 3,
      title: "I guide you the way I invest my own money.",
      summary:
        "No fake promises, only real strategies tested in live markets.",
      icon: ShieldCheck,
    },
    {
      id: 4,
      title: "Focus on long-term wealth, not quick profits.",
      summary:
        "We believe in consistency, discipline, and strong trading psychology.",
      icon: TrendingUp,
    },
  ];

  const handleJoinCommunity = () => {
    const inviteLink =
      "https://chat.whatsapp.com/Hcl3srYljmMFnU7aOsMLWH";
    const isMobile = /Android|iPhone|iPad|iPod/i.test(
      navigator.userAgent
    );

    if (isMobile) {
      window.location.href = inviteLink;
    } else {
      window.open(inviteLink, "_blank");
    }
  };

  const handleJoin = () => {
    setLoading(true);
    setTimeout(() => {
      handleJoinCommunity();
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* Tag */}
      <div className="text-xs font-semibold text-teal-600 mb-2 tracking-wide">
        TRUST & VALUE
      </div>

      {/* Heading */}
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Why Choose Our Trading Community
      </h3>

      {/* Points */}
      <div className="space-y-4">
        {points.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              onMouseEnter={() => setActiveId(item.id)}
              onMouseLeave={() => setActiveId(null)}
              className="group flex items-start gap-3 cursor-pointer transition-all duration-300"
            >
              {/* Icon */}
              <div className="bg-teal-50 p-2 rounded-lg group-hover:bg-teal-100 transition">
                <Icon className="w-5 h-5 text-teal-600" />
              </div>

              {/* Text */}
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {item.title}
                </p>

                <p
                  className={`text-xs text-gray-500 mt-1 transition-all duration-300 overflow-hidden ${
                    activeId === item.id
                      ? "max-h-20 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {item.summary}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <button
        onClick={handleJoin}
        disabled={loading}
        className={`
          mt-6 w-full flex items-center justify-center gap-2
          font-semibold py-3 rounded-lg transition-all duration-200
          bg-teal-500 hover:bg-teal-600 active:scale-95 text-white
          ${loading ? "opacity-70 cursor-not-allowed" : ""}
        `}
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </>
        ) : (
          "Join WhatsApp Community"
        )}
      </button>
    </div>
  );
}