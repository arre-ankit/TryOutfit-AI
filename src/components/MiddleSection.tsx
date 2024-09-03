"use client";

import PlaceholdersAndVanishInput from "@/components/ui/placeholders-and-vanish-input";
import React from "react";
import { Compare } from "@/components/ui/compare";
import { PiArrowBendRightDownBold } from "react-icons/pi";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";


const imageUrl ="https://pbs.twimg.com/profile_images/1818301278193344512/jaLsFM6-_400x400.jpg";
const imgUrl = "https://m.media-amazon.com/images/I/71mmZUZ6JbL._SY741_.jpg";

export default function MiddleSection() {
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
        console.log("submitted");
      };
    
  return (
    <div>
    <div className="h-[30rem] flex flex-col justify-center  items-center px-4">
      <h2 className="mb-5 sm:mb-10 text-xl text-center sm:text-5xl dark:text-white text-black">
        Amanzon Link
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
      <PiArrowBendRightDownBold className="w-[10rem] h-28"/>
    </div>

    <div className="flex justify-around">

      <DirectionAwareHover imageUrl={imageUrl} className="h-[250px] w-[250px] md:h-[500px] md:w-[400px] ">
        <p className="font-bold text-xl">Your Picture</p>
      </DirectionAwareHover>

      <DirectionAwareHover imageUrl={imgUrl} className="h-[250px] w-[250px] md:h-[500px] md:w-[400px] relative overflow-hidden rounded-lg">
        <p className="font-bold text-xl">Amazon Product</p>
      </DirectionAwareHover>
    <div>
      <Compare
        firstImage="https://pbs.twimg.com/profile_images/1818301278193344512/jaLsFM6-_400x400.jpg"
        secondImage="https://nymbo-virtual-try-on.hf.space/file=/tmp/gradio/81df7495100310c18c7dab00b20a36036f2681ca/image.png"
        firstImageClassName="object-cover object-left-top"
        secondImageClassname="object-cover object-left-top"
        className="h-[250px] w-[250px] md:h-[500px] md:w-[400px]"
        slideMode="hover"
      />
      <p className="font-bold text-4xl flex justify-center">Result</p>
      </div>
      </div>
    </div>
  );
}



