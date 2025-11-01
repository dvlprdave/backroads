"use client";

interface PullOff {
  id: string;
  name: string;
  description?: string;
  coordinates: [number, number];
  type?: "scenic" | "restroom" | "picnic" | "viewpoint";
}

interface PullOffsSectionProps {
  pullOffs: PullOff[];
  onPullOffClick?: (id: string) => void;
}

export default function PullOffsSection({ pullOffs, onPullOffClick }: PullOffsSectionProps) {
  const typeIcons = {
    scenic: "🌲",
    restroom: "🚻",
    picnic: "🧺",
    viewpoint: "👁️",
  };

  const typeLabels = {
    scenic: "Scenic Spot",
    restroom: "Restroom",
    picnic: "Picnic Area",
    viewpoint: "Viewpoint",
  };

  if (pullOffs.length === 0) {
    return (
      <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 rounded-2xl p-8 border border-white/20 dark:border-white/10 shadow-xl text-center">
        <p className="text-slate-600 dark:text-slate-400">No pull-offs documented yet.</p>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 rounded-2xl p-6 sm:p-8 border border-white/20 dark:border-white/10 shadow-xl">
      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Pull-Offs & Points of Interest ({pullOffs.length})
      </h3>
      <div className="space-y-3">
        {pullOffs.map((pullOff) => (
          <button
            key={pullOff.id}
            onClick={() => onPullOffClick?.(pullOff.id)}
            className="w-full text-left p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-white/20 dark:border-white/10 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl flex-shrink-0">
                {pullOff.type ? typeIcons[pullOff.type] : "📍"}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {pullOff.name}
                  </h4>
                  {pullOff.type && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300">
                      {typeLabels[pullOff.type]}
                    </span>
                  )}
                </div>
                {pullOff.description && (
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {pullOff.description}
                  </p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

