'use client';
import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import Link from "next/link";
import { useRouter } from 'next/navigation'; // Ensure this path is correct
import { Button } from "./ui/button"; // Make sure Button component is correctly defined

export default function EndSection() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/try");
  };

  return (
    <div className="relative flex flex-col min-h-screen">
        <MacbookScroll
          title={
            <span>
              Try Now <br /> No kidding.
            </span>
          }
          badge={
            <Link href="https://github.com/arre-ankit">
              <Badge className="h-10 w-10 transform -rotate-12" />
            </Link>
          }
          src={`/code.webp`}
          showGradient={false}
        />

        <Button onClick={handleClick} className="mb-40 mx-96 ">
          Try Now
        </Button>
    </div>
  );
}

const Badge = ({ className }: { className?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 0C5.372 0 0 5.372 0 12c0 5.304 3.438 9.794 8.164 11.387.596.113.82-.258.82-.576v-2.059c-3.338.728-4.04-1.608-4.04-1.608-.545-1.382-1.333-1.749-1.333-1.749-1.089-.743.083-.728.083-.728 1.206.084 1.837 1.235 1.837 1.235 1.07 1.832 2.809 1.304 3.494.997.106-.774.418-1.305.763-1.606-2.665-.304-5.466-1.333-5.466-5.933 0-1.31.468-2.377 1.237-3.22-.124-.303-.536-1.52.117-3.166 0 0 1.006-.323 3.298 1.235a11.489 11.489 0 0 1 3.003-.406c1.02.003 2.045.137 3.003.406 2.292-1.558 3.298-1.235 3.298-1.235.655 1.646.242 2.863.118 3.166.77.844 1.237 1.91 1.237 3.22 0 4.606-2.81 5.627-5.482 5.93.43.371.814 1.103.814 2.222v3.293c0 .321.222.692.825.576C20.565 21.794 24 17.305 24 12 24 5.372 18.628 0 12 0z"
        fill="#181717"
      />
    </svg>
  );
};
