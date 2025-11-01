"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import ThemeToggle from "@/components/ThemeToggle";

// Dynamically import MapLibre to avoid SSR issues
const MapPreview = dynamic(() => import("../components/MapPreview"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
      <div className="text-slate-400">Loading map...</div>
    </div>
  ),
});

// Hook for scroll animations using Intersection Observer
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
}


// Scenic Road SVG Placeholder
const ScenicRoadImage = () => (
  <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-emerald-700/30 via-teal-600/20 to-blue-700/30 relative">
    <svg
      className="w-full h-full"
      viewBox="0 0 1200 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sky gradient */}
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#2d4a6b" />
        </linearGradient>
        <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2d4a6b" />
          <stop offset="100%" stopColor="#1a2e47" />
        </linearGradient>
      </defs>
      <rect width="1200" height="600" fill="url(#skyGrad)" />
      {/* Mountains */}
      <path
        d="M0,300 L200,150 L400,200 L600,100 L800,180 L1000,120 L1200,200 L1200,600 L0,600 Z"
        fill="url(#mountainGrad)"
        opacity="0.8"
      />
      {/* Road */}
      <path
        d="M0,500 Q300,450 600,400 T1200,350"
        stroke="#4a5568"
        strokeWidth="80"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M0,500 Q300,450 600,400 T1200,350"
        stroke="#2d3748"
        strokeWidth="60"
        fill="none"
        strokeLinecap="round"
      />
      {/* Road lines */}
      <path
        d="M0,500 Q300,450 600,400 T1200,350"
        stroke="#ffffff"
        strokeWidth="4"
        strokeDasharray="20,20"
        fill="none"
        opacity="0.5"
      />
    </svg>
  </div>
);

// App UI Mockup Placeholder
const AppMockupImage = () => (
  <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 relative backdrop-blur-sm border border-white/10">
    <div className="absolute inset-0 p-8 flex flex-col">
      <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 mb-4 border border-white/20">
        <div className="h-4 bg-white/20 rounded w-3/4 mb-2" />
        <div className="h-3 bg-white/10 rounded w-1/2" />
      </div>
      <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 mb-4 border border-white/20">
        <div className="h-4 bg-white/20 rounded w-2/3 mb-2" />
        <div className="h-3 bg-white/10 rounded w-1/2" />
      </div>
      <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20">
        <div className="h-4 bg-white/20 rounded w-4/5 mb-2" />
        <div className="h-3 bg-white/10 rounded w-3/5" />
      </div>
    </div>
  </div>
);

// Community Profile Icons
const CommunityImage = () => (
  <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-900/30 via-pink-800/20 to-indigo-900/30 relative flex items-center justify-center">
    <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-purple-400/40 to-pink-500/40 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-white text-2xl font-bold shadow-lg"
          style={{
            transform: `rotate(${i * 60}deg) translateY(-${i * 10}px)`,
          }}
        >
          {String.fromCharCode(64 + i)}
        </div>
      ))}
    </div>
  </div>
);

export default function Home() {
  const section1 = useScrollAnimation();
  const section2 = useScrollAnimation();
  const section3 = useScrollAnimation();
  const section4 = useScrollAnimation();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Transparent Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Backroad Drivers
            </div>
            <div className="hidden sm:flex items-center gap-4 lg:gap-6">
              <a
                href="#features"
                className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors text-sm lg:text-base"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors text-sm lg:text-base"
              >
                About
              </a>
              <a
                href="#cta"
                className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors text-sm lg:text-base font-medium"
              >
                Join Beta
              </a>
              <ThemeToggle />
            </div>
            <div className="flex items-center gap-3 sm:hidden">
              <ThemeToggle />
              <button className="text-slate-700 dark:text-slate-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 pt-16 sm:pt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMWUyOTM5Ii8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiMyZDM4NDciLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxZTI5MzkiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNMCw0MDBMMTIwMCw0MDBMMTIwMCw4MDBMMCw4MDBaIiBmaWxsPSJ1cmwoI2EpIi8+PHBhdGggZD0iTTAsNDAwTDMwMCwzMDBMNjAwLDM1MEwxMjAwLDI1MEwxMjAwLDQwMEwwLDQwMFoiIGZpbGw9IiMzYjQ4NTUiIG9wYWNpdHk9IjAuNiIvPjwvc3ZnPg==')] bg-cover bg-center" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-5xl text-center space-y-8 sm:space-y-10">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            Find Roads Worth Driving
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-slate-600 dark:text-slate-400 font-light max-w-3xl mx-auto leading-relaxed">
            Discover, share, and navigate the most scenic drives near you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
            <button className="group px-8 sm:px-10 py-4 sm:py-5 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-base sm:text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              Start Exploring
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
            <a
              href="#cta"
              className="px-8 sm:px-10 py-4 sm:py-5 text-slate-900 dark:text-white font-semibold text-base sm:text-lg hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              Join Beta
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-400 dark:border-slate-600 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-slate-400 dark:bg-slate-600 rounded-full" />
          </div>
        </div>
      </section>

      {/* Feature Section 1: Discover Scenic Routes */}
      <section
        id="features"
        ref={section1.ref}
        className={`py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 transition-all duration-1000 ${
          section1.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8">
                Discover Scenic Routes
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Explore curated scenic drives and hidden gems discovered by
                fellow backroad enthusiasts. Every route is verified for its
                beauty, accessibility, and driving experience.
              </p>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                From winding mountain passes to coastal highways, find your next
                unforgettable journey.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <ScenicRoadImage />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 2: Offline Maps */}
      <section
        ref={section2.ref}
        className={`py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 transition-all duration-1000 ${
          section2.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8">
                Offline Maps for Every Adventure
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Download maps for offline use and navigate remote areas without
                connectivity. Never lose your way, even when you're off the
                grid.
              </p>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                Perfect for exploring national parks, mountain ranges, and
                remote scenic routes where cell service is unreliable.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <MapPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 3: Share Your Favorite Drives */}
      <section
        ref={section3.ref}
        className={`py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 transition-all duration-1000 ${
          section3.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <AppMockupImage />
            </div>
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8">
                Share Your Favorite Drives
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Upload your own routes, add photos, and share the stories behind
                your favorite drives. Help others discover the roads less
                traveled.
              </p>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                Our intuitive interface makes it easy to create and share routes
                with the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 4: Community Driven */}
      <section
        ref={section4.ref}
        className={`py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 transition-all duration-1000 ${
          section4.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <CommunityImage />
            </div>
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8">
                Community Driven Insights
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Connect with a community of passionate drivers who share
                detailed reviews, route conditions, and insider tips. Learn
                from those who've been there.
              </p>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                Every route includes ratings, difficulty levels, and real
                experiences from fellow explorers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        id="cta"
        className="py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 sm:p-12 lg:p-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8">
              Join the beta and start exploring the roads less traveled.
            </h2>
            <button className="group px-10 sm:px-12 py-5 sm:py-6 bg-white hover:bg-slate-100 text-slate-900 font-semibold text-lg sm:text-xl rounded-full transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105 backdrop-blur-sm border border-white/30">
              Join Beta
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              © {new Date().getFullYear()} Backroad Drivers. All rights
              reserved.
            </div>
            <div className="flex items-center gap-6">
              {/* Social Icons */}
              <a
                href="#"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.005.07 1.533 1.032 1.533 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base">
              <a
                href="#"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
