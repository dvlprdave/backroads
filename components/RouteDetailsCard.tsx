"use client";

interface RouteDetailsCardProps {
  location: string;
  duration: string;
  distance: string;
  difficulty: "easy" | "medium" | "hard";
  routeType: "scenic" | "twisty" | "off-road";
  roadCondition?: "smooth" | "rough";
}

export default function RouteDetailsCard({
  location,
  duration,
  distance,
  difficulty,
  routeType,
  roadCondition,
}: RouteDetailsCardProps) {
  const difficultyColors = {
    easy: "bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30",
    medium: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/30",
    hard: "bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/30",
  };

  const typeColors = {
    scenic: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    twisty: "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30",
    "off-road": "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30",
  };

  return (
    <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 rounded-2xl p-6 sm:p-8 border border-white/20 dark:border-white/10 shadow-xl">
      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Route Details
      </h3>
      
      <div className="space-y-4">
        {/* Location */}
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-0.5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Location</p>
            <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white">
              {location}
            </p>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-0.5 flex-shrink-0"
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
          <div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Duration</p>
            <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white">
              {duration}
            </p>
          </div>
        </div>

        {/* Distance */}
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-0.5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          <div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Distance</p>
            <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white">
              {distance}
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span
            className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border backdrop-blur-sm ${difficultyColors[difficulty]}`}
          >
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
          <span
            className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border backdrop-blur-sm ${typeColors[routeType]}`}
          >
            {routeType === "off-road" ? "Off-Road" : routeType.charAt(0).toUpperCase() + routeType.slice(1)}
          </span>
          {roadCondition && (
            <span
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border backdrop-blur-sm ${
                roadCondition === "smooth"
                  ? "bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30"
                  : "bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/30"
              }`}
            >
              {roadCondition === "smooth" ? "🛣️ Smooth" : "⚠️ Rough"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

