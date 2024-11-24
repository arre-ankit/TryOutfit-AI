import React from 'react';
import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';
import { Testimonials } from '@/components/Testimonial';


export const runtime = 'edge'

export default function Home() {
  return (
    <div className='grid-cols-3'>
      <NavBar />
      <Hero/>
      <Testimonials/>
    </div>
  );
}
