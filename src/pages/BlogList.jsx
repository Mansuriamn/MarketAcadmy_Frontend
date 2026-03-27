import React, { useState , useEffect} from 'react';
import Navbar from '../components/Header';
import {BlogCard} from '../components/ui/BlogCard';
import { blogPosts, trendingTopics } from '../data/blogData';
import { TrendingUp, ChevronRight } from 'lucide-react';
import CategorieButtons from '../components/ui/CategorieButtons';
import MoreButton from '../components/ui/MoreButton';
import Membership from '../Add/Membership';
import MarketSectors from '../Add/MarketSectors';

const categories = [
  "All Insights",
  "Stocks",
  "Crypto",
  "Forex",
  "Tech",
  "Personal Finance",
  "Investing 101"
];

export const BlogList = () => {
  const [activeCategory, setActiveCategory] = useState("All Insights");
 
   
   useEffect(() => {
    console.log("Active Category:", activeCategory);
  }, [activeCategory]);


   const regularPosts = blogPosts.slice(1);
   const [count, setCount] = useState(0);
   
  return (
  <>
  {/* Categories  Buttons*/}
  
   <CategorieButtons setActiveCategory={setActiveCategory} activeCategory={activeCategory} categories={categories}  />
   {/* Blogs */}

    <div className="min-h-screen bg-gray-50">

      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Blog Grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="blog-grid">
                {regularPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {/* Load More Button */}
           <MoreButton setCount={setCount} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Now */}
              <div className="bg-white rounded-xl p-6 shadow-sm" data-testid="trending-section">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-teal-500" />
                  <h3 className="font-bold text-lg text-gray-900">Trending Now</h3>
                </div>
                <div className="space-y-4">
                  {trendingTopics.map((topic) => (
                    <div key={topic.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0" data-testid={`trending-item-${topic.id}`}>
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-xs font-semibold text-teal-600">{topic.category}</span>
                        <span className="text-xs text-gray-400">• {topic.time}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 leading-snug">{topic.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Membership CTA */}
            <Membership  />

              {/* Market Sectors */}
             <MarketSectors />
            </div>
          </div>
        </div>
      </section>

      
    </div>
  </>
  );
};



 

