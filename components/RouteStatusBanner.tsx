"use client";

interface RouteStatusBannerProps {
  isClosed: boolean;
  closureReason?: string | null;
}

export default function RouteStatusBanner({ isClosed, closureReason }: RouteStatusBannerProps) {
  if (!isClosed) return null;

  return (
    <div className="backdrop-blur-xl bg-red-500/90 dark:bg-red-600/90 rounded-2xl p-4 sm:p-6 border-2 border-red-400/50 dark:border-red-500/50 shadow-2xl mb-6 sm:mb-8">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
            Route Currently Closed
          </h3>
          {closureReason && (
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              {closureReason}
            </p>
          )}
          {!closureReason && (
            <p className="text-sm sm:text-base text-white/90">
              This route is temporarily closed. Please check back later for updates.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

