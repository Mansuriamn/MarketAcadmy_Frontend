import React, { useState, useEffect, useCallback } from 'react';
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
import Headline from '../advertise/Headline';
import { trustData, resultsData } from '../data/adverData';
import { PageTabs } from '../data/PageTabs';
import useDebounce from '../hooks/useDebounce';

const LIMIT = 10;

const Home = () =>{
  const [searchQuery, setSearchQuery]       = useState("");
  const [activeCategory, setActiveCategory] = useState("All Insights");
  const [posts, setPosts]                   = useState([]);
  const [page, setPage]                     = useState(0);
  const [hasMore, setHasMore]               = useState(true);
  const [loading, setLoading]               = useState(false);

  const debouncedQuery = useDebounce(searchQuery, 400);

  // ─── Single unified fetch ──────────────────────────────────────────────
  /**
   * One function handles all three cases:
   * 1. Search query present → /api/blogs/search?q=...
   * 2. Category selected    → /api/blogs/category?category=...
   * 3. Default              → /api/blogs
   */
  const fetchPosts = useCallback(async (pageNum, category, query = "") => {
    setLoading(true);

    try {
      const offset = pageNum * LIMIT;

      let url;

      if (query.trim().length >= 2) {
        // ✅ Case 1: Search — ignores category filter while searching
        url = `/server/api/blogs/search?q=${encodeURIComponent(query.trim())}`;

      } else if (category === "All Insights") {
        // ✅ Case 2: No search, all categories
        url = `/server/api/blogs?limit=${LIMIT}&offset=${offset}`;

      } else {
        // ✅ Case 3: No search, specific category
        url = `/server/api/blogs/category/${category}?limit=${LIMIT}&offset=${offset}&category=${encodeURIComponent(category)}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const incoming = await res.json(); // ✅ always an array from backend

      // page 0 → replace | page 1+ → append
      setPosts(prev => pageNum === 0 ? incoming : [...prev, ...incoming]);
      setHasMore(incoming.length === LIMIT);

    } catch (err) {
      console.error("fetchPosts error:", err);
    } finally {
      setLoading(false);
    }
  }, []);
  

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

  }, [debouncedQuery]); // ✅ only fires when query changes, not on category

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

  }, [activeCategory, fetchPosts]);

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
            Latest Market Insights <br />
            &{" "}
            <span className="text-text-muted bg-clip-text text-transparent bg-gradient-to-r from-text-muted to-gray-400">
              Smart Investing Ideas
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
                      <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
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
                <Headline  />
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
  );
}

export default Home