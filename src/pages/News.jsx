import React from 'react'
import Navbar from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import BreakingNewsTicker from '../components/BreakingNewsTicker';
import { BlogList } from './BlogList';
export default function News() {
       
  return (
    <>
    <Navbar/>
    
      <BreakingNewsTicker />
    <div className='pt-12'>
     <Hero />
    </div>
    <BlogList />
    <Footer />
    
    </>
  )
}
