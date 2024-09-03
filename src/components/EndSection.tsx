"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "Amazon Link",
    description:
    "Got an Amazon link to some fire outfits?🔥 Drop it here and instantly see how they look on you. No more guessing—just pure, real-time style that’s all about you. Upgrade your fit game and see the drip before you buy.",
    content: (
        <Image
          src="/amazon.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
    ),
  },
  {
    title: "Upload your picture",
    description:
    "Upload your picture from your device and watch how the clothes look on you in real-time. No more guessing—just see how each outfit fits your style perfectly before you make a decision. It’s all about effortless, instant style",
    content: (
        <Image
          src="/demo.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
    ),
  },
  {
    title: "Result",
    description:
      "Instantly see yourself in the latest looks. No hassle, no lag—just snap, style, and slay. Just snap a pic, and instantly see yourself in the hottest looks. Say goodbye to the guesswork—stay fresh, stay fierce, and keep your vibe on point without breaking a sweat. Get ready to slay every day!",
    content: (
        <Image
          src="/result.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
    ),
  },
];
export default function EndSection() {
  return (
    <div className="p-10 my-14">
      <StickyScroll content={content} />
    </div>
  );
}