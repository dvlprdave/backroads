"use client";

import { useState } from "react";
import RouteCard, { Route } from "@/components/RouteCard";
import { savedRoutes, suggestedRoutes } from "@/lib/routeData";
import ThemeToggle from "@/components/ThemeToggle";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"saved" | "suggested">("saved");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Dashboard
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Your routes and recommendations
              </p>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              {/* User avatar placeholder */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Tab Navigation */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/20 dark:border-white/10 p-1 shadow-lg">
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                activeTab === "saved"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Saved Routes
            </button>
            <button
              onClick={() => setActiveTab("suggested")}
              className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                activeTab === "suggested"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Suggested Routes
            </button>
          </div>
        </div>

        {/* Routes Grid */}
        <div className="space-y-8 sm:space-y-12">
          {activeTab === "saved" ? (
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8">
                Your Saved Routes
              </h2>
              {savedRoutes.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                  <div className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 rounded-2xl p-8 sm:p-12 border border-white/20 dark:border-white/10">
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      No saved routes yet. Start exploring to save your favorites!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {savedRoutes.map((route, index) => (
                    <RouteCard
                      key={route.id}
                      route={route}
                      variant={index % 2 === 0 ? "default" : "alternate"}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8">
                Suggested for You
              </h2>
              {suggestedRoutes.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                  <div className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 rounded-2xl p-8 sm:p-12 border border-white/20 dark:border-white/10">
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      No suggestions available at the moment.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {suggestedRoutes.map((route, index) => (
                    <RouteCard
                      key={route.id}
                      route={route}
                      variant={index % 2 === 0 ? "default" : "alternate"}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

