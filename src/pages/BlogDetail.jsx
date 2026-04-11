import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../api/config';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Header';
import { BlogCard } from '../components/ui/BlogCard';
import { ArrowLeft, Share2, Printer, Mail, TrendingUp, CheckCircle2, ChevronRight } from 'lucide-react';
import Footer from '../components/Footer';
import LivePulse from '../advertise/LivePulse';
import Join from '../advertise/Join';
import SocialLinks from '../advertise/SocialLinks';
import BackBotton from '../components/ui/BackBotton';
import DOMPurify from "dompurify";
import QuoteCallout from '../components/QuoteCallout';

 const BlogDetail = () => {
  const { page, id } = useParams();
  const [post, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPost = async () => {
   
      try {
        let url;
        if(page === "news"){
          url = `${API_BASE_URL}/api/news/${id}`;
        }
        else{
           url = `${API_BASE_URL}/api/blogs/${id}`;
        }
        
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        setLoading(true);
        const incoming = await res.json();
        setPosts(incoming);
        setLoading(false);
      } catch (err) {
        console.error("fetchPosts error:", err);
      }
    };

    fetchPost();
  }, [page, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <p className="text-gray-600 text-sm tracking-wide animate-pulse">
            Fetching latest insights...
          </p>
        </div>
      </div>
    );
  };


  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Link to="/" className="text-teal-600 hover:text-teal-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <BackBotton />

      {/* Article Content */}
      <article className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Category & Breadcrumb */}
              <div className="mb-4">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  {post.category}
                </span>
              </div>


              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight" data-testid={`article-title-${id}`}>
                {post.title}
              </h1>

              {/* Featured Chart/Image */}
              <div className="relative mb-8 rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={post.image}
                
                  className="w-full h-auto"
                />
              </div>

              {/* Article Introduction */}
              <div className="prose prose-lg max-w-none mb-8">
               <div
  className="text-lg text-gray-700 leading-relaxed"
  dangerouslySetInnerHTML={{ __html: post.description }}
/>
              </div>

              {/* Section Heading */}
              {/* <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">The End of the Zero-Bound Era</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The transition from a zero-interest rate environment to a structural floor of 3-4% has redefined how capital is allocated. Unlike the post-2008 era (when the TINA "There Is No Alternative" mantra drove equities to historic valuations), today, the resurgence of fixed income as a viable yield-generator is siphoning speculative capital away from growth stocks.
                </p>
              </div> */}

              {/* Quote Callout */}
             <QuoteCallout />

            

              {/* Additional Content */}
             
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Live Pulse Widget */}
              <LivePulse />

              {/* Newsletter Signup */}
              <Join />

              {/* Social Links */}
              <SocialLinks />
            </div>
          </div>
        </div>
      </article>

      {/* Continue Reading Section */}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogDetail