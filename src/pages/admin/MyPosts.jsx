import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/AdminLayout';
import { Search, Plus, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';

export const MyPosts = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const posts = [
    {
      id: 1,
      title: 'The 2024 Tech Pivot: Why Semiconductors are Leading the Next Bull Run',
      category: 'FEATURED REPORT',
      status: 'Published',
      views: '12.4K',
      date: 'Aug 15, 2024',
      author: 'Marcus Sterling',
    },
    {
      id: 2,
      title: 'Upcoming Fintech IPOs to Watch in Q3 2024',
      category: 'IPO WATCH',
      status: 'Published',
      views: '8.2K',
      date: 'Aug 14, 2024',
      author: 'Elena Rossi',
    },
    {
      id: 3,
      title: 'Mastering Delta Neutral Strategies for Volatile Markets',
      category: 'OPTIONS',
      status: 'Draft',
      views: '0',
      date: 'Aug 13, 2024',
      author: 'David Chen',
    },
    {
      id: 4,
      title: 'The Impact of Interest Rate Decisions on Global Bonds',
      category: 'MACRO',
      status: 'Published',
      views: '6.8K',
      date: 'Aug 11, 2024',
      author: 'Sarah Jenkins',
    },
  ];
  

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="my-posts-title">My Posts</h1>
            <p className="text-gray-600">Manage your published and draft articles</p>
          </div>
          <Link
            to="/admin/create"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            data-testid="create-new-post-button"
          >
            <Plus className="w-5 h-5" />
            Create New Post
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border bg-gray-100 focus:bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  data-testid="search-posts-input"
                />
              </div>
            </div>

            {/* Filter Tabs */}
          
          </div>
        </div>

        {/* Posts Grid */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full" data-testid="posts-table">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                 
                 
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50" data-testid={`post-row-${post.id}`}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 max-w-md">{post.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold text-gray-600">{post.category}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{post.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg" title="View" data-testid={`view-${post.id}`}>
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg" title="Delete" data-testid={`delete-${post.id}`}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-gray-200">
            {posts.map((post) => (
              <div key={post.id} className="p-4" data-testid={`post-card-${post.id}`}>
                <div className="flex items-start justify-between mb-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    post.status === 'Published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {post.status}
                  </span>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.views} views</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    View
                  </button>
                  <button className="flex-1 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm font-medium">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};