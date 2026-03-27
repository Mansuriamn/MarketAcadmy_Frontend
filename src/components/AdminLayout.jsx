import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, PenSquare, Settings, Menu, X, Bell, Search, User } from 'lucide-react';

export const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
//     { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'My Posts', href: '/admin/posts', icon: FileText },
    { name: 'Create New Post', href: '/admin/create', icon: PenSquare },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        data-testid="admin-sidebar"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <Link to="/admin" className="flex flex-col" data-testid="admin-logo">
              <span className="text-xl font-bold text-gray-900">MarketAcademy</span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Elite Admin</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3" data-testid="admin-user-profile">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-teal-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              data-testid="mobile-menu-button"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg" data-testid="search-button">
                {/* <Search className="w-5 h-5 text-gray-600" /> */}
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg relative" data-testid="notifications-button">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};