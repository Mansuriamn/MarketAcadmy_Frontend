import React, { useEffect, useState } from 'react';
import { apiCall } from '../api/config';
import { stripHtml } from '../utils/stripHtml';
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

  // 🚀 SEO Utility: Dynamically update meta tags for social share previews
  const updateMetaTag = (property, content) => {
    let tag = document.querySelector(`meta[property="${property}"]`) || 
              document.querySelector(`meta[name="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      if (property.startsWith('og:')) tag.setAttribute('property', property);
      else tag.name = property;
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);

        let endpoint;
        if (page === "news") {
          endpoint = `/api/news/${id}`;
        } else if (page === "blogs") {
          endpoint = `/api/blogs/${id}`;
        } else {
          endpoint = `/api/get/trending/${id}`;
        }

        const documentData = await apiCall(endpoint);
        setPosts(documentData);
        
        // 🚀 SEO: Update dynamic page title & meta
        if (documentData?.title) {
          document.title = `${documentData.title} | MarketAcademy`;
          
          const plainText = stripHtml(documentData.description).slice(0, 160);
          
          updateMetaTag('description', plainText);
          updateMetaTag('og:title', documentData.title);
          updateMetaTag('og:description', plainText);
          updateMetaTag('og:image', documentData.image);
          updateMetaTag('twitter:card', 'summary_large_image');
        }
      } catch (err) {
        console.error("fetchPosts error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    
    // Cleanup title on unmount
    return () => {
      document.title = "MarketAcademy | Precision Insights";
    };
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
      <BackBotton />

      <article className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  {post.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight" data-testid={`article-title-${id}`}>
                {post.title}
              </h1>

              <div className="relative mb-8 rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={post.image}
                  alt="blog"
                  className="w-full h-[220px] sm:h-[280px] md:h-[320px] lg:h-[420px] xl:h-[480px] object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="prose prose-lg max-w-none mb-8">
                <div
                  className="text-lg text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description) }}
                />
              </div>

              <QuoteCallout />
            </div>

            <div className="space-y-6">
              <Join />
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogDetail;