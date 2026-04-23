import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Newspaper, BookOpen, TrendingUp, ShieldCheck, FileText, PenSquare, Settings, LayoutDashboard, Info } from 'lucide-react';

const MobileBottomNav = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  const publicNav = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'News', path: '/news', icon: Newspaper },
    { name: 'Guide', path: '/stock-guide', icon: TrendingUp },
    { name: 'Courses', path: '/learn', icon: BookOpen },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Admin', path: '/admin/posts', icon: ShieldCheck },
  ];

  const adminNav = [
    { name: 'Posts', path: '/admin/posts', icon: FileText },
    { name: 'Blog', path: '/admin/blog-post', icon: PenSquare },
    { name: 'Course', path: '/admin/course-post', icon: BookOpen },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
    { name: 'Exit', path: '/', icon: Home },
  ];

  const navItems = isAdminPath ? adminNav : publicNav;
  const activeColor = "#0f172a"; 

  return (
    <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[94%] max-w-md">
      <div className="flex justify-around items-center bg-white/95 backdrop-blur-md border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.06)] rounded-[1.5rem] px-2 py-2.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className="relative flex flex-col items-center justify-center flex-1 py-1"
            >
              {({ isActive }) => (
                <>
                  <div className={`flex flex-col items-center transition-all duration-300 ${isActive ? 'scale-105' : 'scale-100'}`}>
                    <Icon 
                      style={{ color: isActive ? activeColor : '#94a3b8' }}
                      className={`w-[22px] h-[22px] sm:w-6 sm:h-6 transition-all duration-300 ${
                        isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'
                      }`} 
                    />
                    
                    <span 
                      style={{ color: isActive ? activeColor : '#64748b' }}
                      className={`text-[10px] font-bold tracking-tight uppercase mt-1.5 transition-all duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-60'
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>

                  {isActive && (
                    <div 
                      style={{ backgroundColor: activeColor }}
                      className="absolute -bottom-0.5  w-1 h-1 rounded-full animate-in fade-in zoom-in duration-300"
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
