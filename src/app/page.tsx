import React from 'react';
import HeroSection from '@/components/HeroSection';
import EndSection from '@/components/EndSection';
import ModeToggle from '@/components/Toggle';

export const runtime = 'edge'

export default function Home() {
  return (
    <div className='grid-cols-3'>
      <div className='flex justify-end mx-4 my-4'>
      <ModeToggle />
      </div>
      <HeroSection />
      <EndSection/>
    </div>
  );
}
