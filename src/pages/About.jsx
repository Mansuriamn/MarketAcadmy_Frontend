import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Navbar from '../components/Header';
import Footer from '../components/Footer';
import { values, stats } from '../data/adverData';
import Editorial from '../advertise/Editorial';
import Curators from '../components/ui/Curators';
import JoinCircle from '../advertise/JoinCircle';

 const About = () => {
 


  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gray-50 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight" data-testid="hero-title">
                Democratizing
                <br />
                Financial Intelligence
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Market Plus Academy is a professional financial education and market support platform dedicated to helping individuals learn, understand, and grow in the stock market.
              </p>
             
               <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
               Our mission is to empower traders and investors with the right knowledge, practical strategies, and disciplined risk management to achieve consistent growth.
              </p>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                alt="Financial data"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 py-12 md:py-16" data-testid="stats-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center" data-testid={`stat-${idx}`}>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm md:text-base uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop"
                alt="Trading screens"
                className="rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6" data-testid="origin-heading">
                The Origin of Pulse
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                What began as a proprietary internal tool for a boutique Manhattan hedge fund is now a public platform that millions of investors rely on. Founded by traders fed with tech of expert curation.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                MarketAcad team was born in 2018 to bridge that gap. We didn't just report financial news—we built a public platform that pioneered a shift towards a more equitable financial landscape.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Institutional-Grade Data</h3>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Global Market Reach</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Integrity Section */}
     <Editorial />

      {/* Team Section */}
    <Curators />

      {/* Newsletter CTA Section */}
     <JoinCircle />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About