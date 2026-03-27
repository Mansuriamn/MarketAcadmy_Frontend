import React from 'react'
import Navbar from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import { BlogList } from './BlogList'
export default function Home() {
  return (
   <>

   <Navbar />
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className="hidden md:flex flex-col items-start justify-start  pt-2  md:pt-5  lg:pt-5 w-full text-left">
      <h1 className="text-3xl sm:pl-2 lg:pl-4 md:text-4xl lg:text-[3.2rem] font-extrabold text-primary tracking-tight leading-[1.1] mb-6 max-w-5xl">
        Latest Market Insights <br />
        & <span className="text-text-muted bg-clip-text text-transparent bg-gradient-to-r from-text-muted to-gray-400">Smart Investing Ideas</span>
      </h1>
    </div>
    </div>
   <Hero />
  
   <BlogList />
   
   <Footer />

   </>
  )
}
