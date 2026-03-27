import React from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/AdminLayout';
import { TrendingUp, FileText, Eye, Users, ArrowUp, ArrowDown } from 'lucide-react';

export const AdminDashboard = () => {
  const stats = [
    { name: 'Total Posts', value: '48', change: '+12%', trend: 'up', icon: FileText },
    { name: 'Total Views', value: '125.4K', change: '+23%', trend: 'up', icon: Eye },
    { name: 'Engagement Rate', value: '8.3%', change: '-2.1%', trend: 'down', icon: TrendingUp },
    { name: 'Subscribers', value: '45.2K', change: '+18%', trend: 'up', icon: Users },
  ];

  const recentPosts = [
    {
      id: 1,
      title: 'The 2024 Tech Pivot: Why Semiconductors are Leading the Next Bull Run',
      status: 'Published',
      views: '12.4K',
      date: 'Aug 15, 2024',
    },
    {
      id: 2,
      title: 'Upcoming Fintech IPOs to Watch in Q3 2024',
      status: 'Published',
      views: '8.2K',
      date: 'Aug 14, 2024',
    },
    {
      id: 3,
      title: 'Mastering Delta Neutral Strategies for Volatile Markets',
      status: 'Draft',
      views: '0',
      date: 'Aug 13, 2024',
    },
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="dashboard-title">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your content.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                data-testid={`stat-${stat.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? (
                      <ArrowUp className="w-4 h-4" />
                    ) : (
                      <ArrowDown className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.name}</div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/admin/create"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              data-testid="create-post-button"
            >
              <FileText className="w-5 h-5" />
              Create New Post
            </Link>
            <Link
              to="/admin/posts"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              data-testid="view-posts-button"
            >
              View All Posts
            </Link>
            <Link
              to="/admin/settings"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              data-testid="settings-button"
            >
              Settings
            </Link>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Recent Posts</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="recent-posts-table">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50" data-testid={`post-row-${post.id}`}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 line-clamp-2">{post.title}</div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        post.status === 'Published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">{post.views}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 hidden sm:table-cell">{post.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-200">
            <Link
              to="/admin/posts"
              className="text-sm font-medium text-teal-600 hover:text-teal-700"
              data-testid="view-all-link"
            >
              View all posts →
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};