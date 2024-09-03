"use client";

import React from "react";
import PlaceholdersAndVanishInput from "@/components/ui/placeholders-and-vanish-input";
import { Compare } from "@/components/ui/compare";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { useRouter } from 'next/navigation';

const imageUrl = "https://pbs.twimg.com/profile_images/1818301278193344512/jaLsFM6-_400x400.jpg";
const imgUrl = "https://m.media-amazon.com/images/I/71mmZUZ6JbL._SY741_.jpg";

function HeroSection() {

  const router = useRouter(); 

  const placeholders = [
    "https://amazon.com/product/1234",
    "https://amazon.com/product/5678",
    "https://amazon.com/product/9101",
    "https://amazon.com/product/1121",
    "https://amazon.com/product/3141",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/try");
    console.log("submitted");
  };

  return (
    <div className="h-[80rem] sm:h-[90rem] lg:h-[50rem] relative w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="relative z-20 text-center space-y-12">
        <h1 className="md:text-6xl text-4xl lg:text-7xl font-bold">
          Try Outfit AI
        </h1>

        <div className="flex flex-col items-center justify-center">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
          <button className= "bg-slate-800 my-4 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block"
          onClick={()=>router.push("/try")}>
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full py-0.5 px-4 ring-1 ring-white/10 ">
              <span>{`Try Now`}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M10.75 8.75L14.25 12L10.75 15.25"
                ></path>
              </svg>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-8 items-center lg:space-y-0 space-y-10">
          <div>
            <DirectionAwareHover imageUrl={imageUrl} className="h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] lg:h-[400px] lg:w-[300px]">
              <p className="font-bold text-xl">Your Picture</p>
            </DirectionAwareHover>
            <p className="font-bold text-2xl mt-4 lg:mt-6">You</p>
          </div>

          <div>
            <DirectionAwareHover imageUrl={imgUrl} className="h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] lg:h-[400px] lg:w-[300px] relative overflow-hidden rounded-lg">
              <p className="font-bold text-xl">Amazon Outfit</p>
            </DirectionAwareHover>
            <p className="font-bold text-2xl mt-4 lg:mt-6">Amazon Outfit</p>
          </div>

          <div>
            <Compare
              firstImage={imageUrl}
              secondImage="https://nymbo-virtual-try-on.hf.space/file=/tmp/gradio/81df7495100310c18c7dab00b20a36036f2681ca/image.png"
              firstImageClassName="object-cover object-left-top"
              secondImageClassname="object-cover object-left-top"
              className="h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] lg:h-[400px] lg:w-[300px]"
              slideMode="hover"
            />
            <p className="font-bold text-2xl mt-4 lg:mt-6">Your's Look</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
