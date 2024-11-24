import Link from "next/link"
import { Shirt } from 'lucide-react';
import { FaGithub } from "react-icons/fa"
import ModeToggle from "@/components/Toggle"

export default function NavBar() {
  return (
      <header className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Shirt className="h-6 w-6" />
              <span className="font-semibold text-lg">Try Outfit AI</span>
            </Link>
            <div className="flex items-center space-x-4">
              <a href="https://github.com/arre-ankit/TryOutfit-AI-" target="_blank" rel="noopener noreferrer">
                <FaGithub className='w-7 h-8 mx-6' />
              </a>
              <ModeToggle/>
            </div>
          </nav>
        </div>
      </header>
    );
    }