import React, { useState, useEffect, useCallback } from 'react';
import { apiCall } from '../../api/config';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/AdminLayout';
import { Search, Plus, Eye, Trash2, MoreVertical } from 'lucide-react';
import MoreButton from '../../components/ui/MoreButton';
import useDebounce from '../../hooks/useDebounce';

const LIMIT = 7;

// Tab → API endpoint mapping
const TAB_ENDPOINTS = {
  Blogs:   "blogs",
  News:    "news",
  Courses: "courses",
};

const MyPosts = () => {
  const [activeTab, setActiveTab] = useState("Blogs");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(searchQuery, 400);

  // ─── Core fetch ─────────────────────────────────────────────────────────
  const fetchPosts = useCallback(async (pageNum, tab, query = "") => {
    setLoading(true);
    setError(null);

    try {
      const offset = pageNum * LIMIT;
      const endpointPrefix = TAB_ENDPOINTS[tab];
      let endpoint;

      if (query.trim().length >= 2) {
        endpoint = `/api/${endpointPrefix}/search?limit=${LIMIT}&offset=${offset}&q=${encodeURIComponent(query.trim())}`;
      } else {
        endpoint = `/api/${endpointPrefix}?limit=${LIMIT}&offset=${offset}`;
      }

      const incoming = await apiCall(endpoint);
      setPosts(prev => pageNum === 0 ? incoming : [...prev, ...incoming]);
      setHasMore(incoming.length === LIMIT);

    } catch (err) {
      console.error("fetchPosts error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // ─── Search effect ───────────────────────────────────────────────────────
  useEffect(() => {
    if (debouncedQuery.length === 1) return;

    setPosts([]);
    setPage(0);
    setHasMore(true);
    fetchPosts(0, activeTab, debouncedQuery);

  }, [debouncedQuery, activeTab, fetchPosts]);

  // ─── Tab / mount effect ──────────────────────────────────────────────────
  useEffect(() => {
    if (debouncedQuery.length >= 2) return;

    setPosts([]);
    setPage(0);
    setHasMore(true);
    fetchPosts(0, activeTab, "");

  }, [activeTab, fetchPosts, debouncedQuery.length]);

  // ─── Load More ───────────────────────────────────────────────────────────
  const handleLoadMore = () => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage, activeTab, debouncedQuery);
  };

  // ─── Tab switch ──────────────────────────────────────────────────────────
  const handleTabChange = useCallback((tab) => {
    if (tab === activeTab) return;
    setSearchQuery("");
    setActiveTab(tab);
  }, [activeTab]);

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    
    try {
      const endpointPrefix = TAB_ENDPOINTS[activeTab];
      await apiCall(`/api/${endpointPrefix}/delete/${id}`, {
        method: "DELETE",
      });
      fetchPosts(0, activeTab, debouncedQuery);
    } catch (err) {
      alert("Failed to delete post: " + err.message);
    }
  }

  const showSkeleton  = loading && posts.length === 0;
  const showEmpty     = !loading && !error && posts.length === 0;
  const showError     = !loading && !!error;
  const showLoadMore  = hasMore && !loading && posts.length > 0;
  const showSpinner   = loading && posts.length > 0;
  const showEndOfFeed = !hasMore && posts.length > 0;

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Posts</h1>
            <p className="text-gray-600">Manage your published and draft articles</p>
          </div>
          <Link
            to="/admin/blog-post"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Create New Post
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={`Search ${activeTab.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border bg-gray-100 focus:bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                data-testid="search-posts-input"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {Object.keys(TAB_ENDPOINTS).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab
                      ? "bg-gray-900 text-white shadow"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {showSkeleton && (
            <div className="p-6 space-y-3">
              {Array.from({ length: LIMIT }).map((_, i) => (
                <div key={i} className="h-12 bg-gray-100 animate-pulse rounded-lg" />
              ))}
            </div>
          )}

          {showError && (
            <div className="p-6 text-center text-red-500 font-medium">
              ⚠️ {error}
            </div>
          )}

          {showEmpty && (
            <div className="p-12 text-center text-gray-500">
              {searchQuery
                ? `No ${activeTab.toLowerCase()} found for "${searchQuery}"`
                : `No ${activeTab.toLowerCase()} yet. Create your first one!`
              }
            </div>
          )}

          {posts.length > 0 && (
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 max-w-md truncate">{post.title}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">{post.category}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleDelete(post._id)} 
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors group" 
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {posts.length > 0 && (
            <div className="md:hidden divide-y divide-gray-200">
              {posts.map((post) => (
                <div key={post._id} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-xs text-gray-400 mb-3">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleDelete(post._id)} 
                      className="flex-1 px-3 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showSpinner && (
            <div className="flex justify-center py-6">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {showLoadMore && (
            <div className="p-4 border-t border-gray-100 text-center">
              <MoreButton
                handleLoadMore={handleLoadMore}
                loading={loading}
                disabled={loading}
              />
            </div>
          )}

          {showEndOfFeed && (
            <p className="text-center text-gray-400 text-sm py-6 border-t border-gray-100 italic">
              You've seen all {activeTab.toLowerCase()}.
            </p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default MyPosts;