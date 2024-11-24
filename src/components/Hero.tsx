'use client';
import { Button } from "@/components/ui/button"
import { ArrowRight} from 'lucide-react'
import { Compare } from "@/components/ui/compare"
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover" 
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const imageUrl = "https://www.outfitsai.com/_next/image?url=/Original.jpg&w=640&q=75";
const productUrl = "https://image1.superdry.com/static/images/optimised/zoom/upload9223368955665344016.jpg";
const outfitUrl = "https://www.outfitsai.com/_next/image?url=/s2.jpg&w=640&q=75";

export default function Hero() {
  const router = useRouter();
  return (
    <div className="min-h-screen text-white">
      <main>
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-8">
              <h1 className="p-4 text-4xl md:text-6xl font-bold tracking-tight bg-black dark:bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Try On Your Clothes
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Virtually try on clothes by grabing amazon Link by uploading your photo.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                  <Button size="lg" className=" bg-white text-black hover:bg-gray-200 min-w-[200px]" onClick={() =>{router.push('try')} }>
                    Try Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
              </div>
            </div>

            <div className="mt-20 relative">
              <div className="h-auto min-h-[600px] rounded-lg border border-white/10 bg-black/30 backdrop-blur p-4">
                <div className="flex justify-center items-center h-full mt-20">
                  <div className="flex flex-col lg:flex-row lg:space-x-8 items-center lg:space-y-0 space-y-10 max-w-full overflow-x-auto">
                    <div className="min-w-[250px]">
                      <DirectionAwareHover imageUrl={imageUrl} className="h-[200px] w-[200px] sm:h-[250px] sm:w-[250px] lg:h-[300px] lg:w-[300px]">
                        <p className="font-bold text-xl">Your Picture</p>
                      </DirectionAwareHover>
                      <p className="font-bold text-2xl mt-4 lg:mt-6 text-center">You</p>
                    </div>

                    <div className="min-w-[250px]">
                      <DirectionAwareHover imageUrl={productUrl} className="h-[200px] w-[200px] sm:h-[250px] sm:w-[250px] lg:h-[300px] lg:w-[300px] relative overflow-hidden rounded-lg">
                        <p className="font-bold text-xl">Amazon Outfit</p>
                      </DirectionAwareHover>
                      <p className="font-bold text-2xl mt-4 lg:mt-6 text-center">Amazon Outfit</p>
                    </div>

                    <div className="min-w-[250px]">
                      <Compare
                        firstImage={imageUrl}
                        secondImage={outfitUrl}
                        firstImageClassName="object-cover object-left-top"
                        secondImageClassname="object-cover object-left-top"
                        className="h-[200px] w-[200px] sm:h-[250px] sm:w-[250px] lg:h-[300px] lg:w-[300px]"
                        slideMode="hover"
                      />
                      <p className="font-bold text-2xl mt-4 lg:mt-6 text-center">Your's Look</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6 rounded-lg border border-gray-200 bg-gray-50">
                <h3 className="text-xl font-semibold mb-2 text-black">Real-time Try-On</h3>
                <p className="text-gray-600">Experience products virtually in real-time with our advanced AI technology</p>
              </div>
              <div className="p-6 rounded-lg border border-gray-200 bg-gray-50">
                <h3 className="text-xl font-semibold mb-2 text-black">Suit you vibe</h3>
                <p className="text-gray-600">Try on your clothes and see how they fit you vibe</p>
              </div>
              <div className="p-6 rounded-lg border border-gray-200 bg-gray-50">
                <h3 className="text-xl font-semibold mb-2 text-black">No Hassle Shopping</h3>
                <p className="text-gray-600 ">No need to worry about size, just try on your clothes</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

