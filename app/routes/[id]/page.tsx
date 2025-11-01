"use client";

import { use } from "react";
import dynamic from "next/dynamic";
import InteractiveRouteMap from "@/components/maps/InteractiveRouteMap";
import RouteDetailsCard from "@/components/RouteDetailsCard";
import RouteStatusBanner from "@/components/RouteStatusBanner";
import PullOffsSection from "@/components/PullOffsSection";
import PhotoGallery from "@/components/PhotoGallery";
import CommentsSection from "@/components/CommentsSection";
import NearbyEssentials from "@/components/NearbyEssentials";
import MobileSectionMenu from "@/components/MobileSectionMenu";
import ThemeToggle from "@/components/ThemeToggle";
import {
  getRouteDetail,
  getPullOffs,
  getPhotos,
  getComments,
  getNearbyEssentials,
} from "@/lib/routeDetailData";

// Export types for use in other files
export interface Photo {
  id: string;
  url: string;
  thumbnailUrl?: string;
  author: string;
  authorAvatar?: string;
  caption?: string;
  timestamp: string;
}

export interface Comment {
  id: string;
  author: string;
  authorAvatar?: string;
  text: string;
  timestamp: string;
  rating?: number;
}

export interface PullOff {
  id: string;
  name: string;
  description?: string;
  coordinates: [number, number];
  type?: "scenic" | "restroom" | "picnic" | "viewpoint";
}

export interface Essential {
  id: string;
  type: "gas" | "hospital";
  name: string;
  distance: string;
  coordinates: [number, number];
}

// Dynamically import map to avoid SSR issues
const RouteMap = dynamic(() => import("@/components/maps/InteractiveRouteMap"), {
  ssr: false,
});

interface RouteDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function RouteDetailPage({ params }: RouteDetailPageProps) {
  const { id } = use(params);

  const route = getRouteDetail(id);
  const pullOffs = getPullOffs(id);
  const photos = getPhotos(id);
  const comments = getComments(id);
  const essentials = getNearbyEssentials(id);

  const handleMarkerClick = (markerId: string, type: string) => {
    console.log("Marker clicked:", markerId, type);
    // In production, this would scroll to relevant section or show details
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: route.name,
        text: `Check out this scenic route: ${route.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Route link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <a
              href="/dashboard"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              ← Back to Dashboard
            </a>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={handleShare}
                className="px-4 py-2 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-white/20 dark:border-white/10 hover:bg-white/80 dark:hover:bg-slate-800/80 text-slate-900 dark:text-white font-medium transition-all duration-200 flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section with Map */}
        <section className="relative">
          {/* Map */}
          <div className="h-[400px] sm:h-[500px] lg:h-[600px] w-full">
            <RouteMap
              coordinates={route.coordinates}
              startMarker={route.startMarker}
              endMarker={route.endMarker}
              pullOffs={pullOffs}
              nearbyEssentials={essentials}
              interactive={true}
              onMarkerClick={handleMarkerClick}
            />
          </div>

          {/* Glass Overlay with Route Details - Desktop Only */}
          <div className="hidden lg:block absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 pointer-events-none">
            <div className="max-w-7xl mx-auto">
              <div className="pointer-events-auto">
                <div className="backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-white/20 dark:border-white/10 shadow-2xl max-w-md">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                    {route.name}
                  </h1>
                  <RouteDetailsCard
                    location={route.location}
                    duration={route.duration}
                    distance={route.distance}
                    difficulty={route.difficulty}
                    routeType={route.routeType}
                    roadCondition={route.roadCondition}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Route Details Card - Tablet and Mobile (Below Hero) */}
        <section id="route-details" className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-10 scroll-mt-20">
          <div className="backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-white/20 dark:border-white/10 shadow-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {route.name}
            </h1>
            <RouteDetailsCard
              location={route.location}
              duration={route.duration}
              distance={route.distance}
              difficulty={route.difficulty}
              routeType={route.routeType}
              roadCondition={route.roadCondition}
            />
          </div>
        </section>

        {/* Content Sections */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-12">
          {/* Route Status Banner */}
          <div id="status" className="scroll-mt-20">
            <RouteStatusBanner isClosed={route.isClosed} closureReason={route.closureReason} />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              Start Navigation
            </button>
            <button className="flex-1 px-6 py-4 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 hover:scale-105 shadow-lg border border-white/20 dark:border-white/10 backdrop-blur-sm flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Copy / Modify Route
            </button>
          </div>

          {/* Pull-Offs and Nearby Essentials - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div id="pull-offs" className="scroll-mt-20">
              <PullOffsSection pullOffs={pullOffs} onPullOffClick={handleMarkerClick} />
            </div>
            <div id="nearby-essentials" className="scroll-mt-20">
              <NearbyEssentials essentials={essentials} onEssentialClick={handleMarkerClick} />
            </div>
          </div>

          {/* Photos Section */}
          <div id="photos" className="scroll-mt-20">
            <PhotoGallery photos={photos} />
          </div>

          {/* Comments Section */}
          <div id="comments" className="scroll-mt-20">
            <CommentsSection comments={comments} />
          </div>
        </section>

        {/* Mobile Section Menu */}
        <MobileSectionMenu
          sections={[
            {
              id: "route-details",
              label: "Route Details",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              ),
            },
            {
              id: "pull-offs",
              label: "Pull-Offs & POI",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
            },
            {
              id: "nearby-essentials",
              label: "Nearby Essentials",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              ),
            },
            {
              id: "photos",
              label: "Photos",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ),
            },
            {
              id: "comments",
              label: "Comments",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              ),
            },
          ]}
        />
      </main>
    </div>
  );
}

