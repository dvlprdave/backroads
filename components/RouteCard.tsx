"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import map to avoid SSR issues
const RouteMapPreview = dynamic(() => import("./maps/RouteMapPreview"), {
  ssr: false,
});

export interface Route {
  id: string;
  name: string;
  location: string;
  type: "scenic" | "twisty" | "off-road";
  difficulty: "easy" | "medium" | "hard";
  duration: string; // e.g., "2h 30m"
  coordinates: [number, number][];
  center?: [number, number];
}

interface RouteCardProps {
  route: Route;
  variant?: "default" | "alternate";
}

export default function RouteCard({ route, variant = "default" }: RouteCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Type badge colors
  const typeColors = {
    scenic: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    twisty: "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30",
    "off-road": "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30",
  };

  // Difficulty badge colors
  const difficultyColors = {
    easy: "bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30",
    medium: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/30",
    hard: "bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/30",
  };

  // Route color based on type
  const routeColor = {
    scenic: "#10b981", // emerald
    twisty: "#3b82f6", // blue
    "off-road": "#f59e0b", // amber
  }[route.type];

  return (
    <Link href={`/routes/${route.id}`}>
      <div
        className="group relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      {/* Glassmorphism overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5 backdrop-blur-sm transition-opacity duration-300 z-10 pointer-events-none ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Map Preview */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <RouteMapPreview
          coordinates={route.coordinates}
          center={route.center}
          routeColor={routeColor}
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 relative z-10">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">
            {route.name}
          </h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {route.location}
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium border backdrop-blur-sm ${typeColors[route.type]}`}
          >
            {route.type === "off-road" ? "Off-Road" : route.type.charAt(0).toUpperCase() + route.type.slice(1)}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium border backdrop-blur-sm ${difficultyColors[route.difficulty]}`}
          >
            {route.difficulty.charAt(0).toUpperCase() + route.difficulty.slice(1)}
          </span>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm sm:text-base font-medium">{route.duration}</span>
        </div>
      </div>

      {/* Hover effect border */}
      <div
        className={`absolute inset-0 rounded-2xl border-2 border-white/40 dark:border-white/20 transition-opacity duration-300 pointer-events-none ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
      </div>
    </Link>
  );
}

