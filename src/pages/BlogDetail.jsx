import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Header';
import { BlogCard } from '../components/ui/BlogCard';
import { blogPosts } from '../data/blogData';
import { ArrowLeft, Share2, Printer, Mail, TrendingUp, CheckCircle2, ChevronRight } from 'lucide-react';
import Footer from '../components/Footer';
import LivePulse from '../Add/LivePulse';
import Join from '../Add/Join';
import SocialLinks from '../Add/SocialLinks';
import BackBotton from '../components/ui/BackBotton';
export const BlogDetail = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);
  const [email, setEmail] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
      <Navbar/>
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Link to="/" className="text-teal-600 hover:text-teal-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar/>

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
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight" data-testid="article-title">
                {post.title}
              </h1>

              {/* Author Info */}
              {/* <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900" data-testid="author-name">{post.author.name}</p>
                    <p className="text-sm text-gray-500">
                      {post.author.title} • {post.date}
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Share" data-testid="share-button">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Print" data-testid="print-button">
                    <Printer className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors" data-testid="send-analysis-button">
                    Send Analysis
                  </button>
                </div>
              </div> */}

              {/* Featured Chart/Image */}
              <div className="relative mb-8 rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto"
                />
              </div>

              {/* Article Introduction */}
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {post.description}
                </p>
              </div>

              {/* Section Heading */}
              {/* <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">The End of the Zero-Bound Era</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The transition from a zero-interest rate environment to a structural floor of 3-4% has redefined how capital is allocated. Unlike the post-2008 era (when the TINA "There Is No Alternative" mantra drove equities to historic valuations), today, the resurgence of fixed income as a viable yield-generator is siphoning speculative capital away from growth stocks.
                </p>
              </div> */}

              {/* Quote Callout */}
              <div className="bg-gray-50 border-l-4 border-gray-900 p-6 mb-8 rounded-r-lg">
                <blockquote className="text-xl md:text-2xl font-semibold text-gray-900 italic mb-3">
                  "We aren't just looking at a minor correction. We are witnessing the systematic repricing of risk for the next decade."
                </blockquote>
                <p className="text-sm text-gray-600 uppercase tracking-wide">— MARKETPULSE ELITE STRATEGY BOARD</p>
              </div>

              {/* Section with Bullet Points */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Emerging Markets: The New Alpha?</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  While domestic markets face compression, selected emerging corridors are showing resilience. High-precision data from the last quarter suggests that the correlation between traditional safe havens and large-cap growth is breaking down, opening a window for sophisticated diversification.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">Direct capital flow into Southeast Asian tech hubs has increased by 34% year over year.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">The US Dollar Index (DXY) continues to show signs of a long-term cyclical peak.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">Commodities remain a critical hedge against persistent structural inflation.</p>
                  </div>
                </div>
              </div>

              {/* Additional Content */}
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  The investment landscape is undergoing a fundamental transformation. Those who adapt their strategies to this new reality—focusing on yield, quality, and emerging market opportunities—will be positioned to capitalize on the next decade of market evolution.
                </p>
              </div>
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
   <Footer/>
    </div>
  );
};