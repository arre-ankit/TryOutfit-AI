import React from 'react';
import HeroSection from '@/components/HeroSection';
import EndSection from '@/components/EndSection';
import ModeToggle from '@/components/Toggle';
import { FaGithub } from "react-icons/fa";


export const runtime = 'edge'

export default function Home() {
  return (
    <div className='grid-cols-3'>
      <div className='flex justify-end mx-4 my-4'>
      <a href="https://github.com/arre-ankit/TryOutfit-AI-" target="_blank" rel="noopener noreferrer">
      <FaGithub className='w-7 h-8 mx-6' />
      </a>
      <ModeToggle />
      </div>
      <section style={{backgroundImage: `url('/stars.png')`}}>
      <HeroSection />
      <EndSection/>
      </section>
    </div>
  );
}
