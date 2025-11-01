"use client";

interface Essential {
  id: string;
  type: "gas" | "hospital";
  name: string;
  distance: string;
  coordinates: [number, number];
}

interface NearbyEssentialsProps {
  essentials: Essential[];
  onEssentialClick?: (id: string, type: string) => void;
}

export default function NearbyEssentials({ essentials, onEssentialClick }: NearbyEssentialsProps) {
  const gasStations = essentials.filter((e) => e.type === "gas");
  const hospitals = essentials.filter((e) => e.type === "hospital");

  if (essentials.length === 0) {
    return (
      <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 rounded-2xl p-8 border border-white/20 dark:border-white/10 shadow-xl text-center">
        <p className="text-slate-600 dark:text-slate-400">No nearby essentials found.</p>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 rounded-2xl p-6 sm:p-8 border border-white/20 dark:border-white/10 shadow-xl">
      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Nearby Essentials
      </h3>

      {/* Gas Stations */}
      {gasStations.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
            <span className="text-lg">⛽</span>
            Gas Stations
          </h4>
          <div className="space-y-2">
            {gasStations.map((station) => (
              <button
                key={station.id}
                onClick={() => onEssentialClick?.(station.id, station.type)}
                className="w-full text-left p-3 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-white/20 dark:border-white/10 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-900 dark:text-white">
                    {station.name}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {station.distance}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hospitals */}
      {hospitals.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
            <span className="text-lg">🏥</span>
            Hospitals
          </h4>
          <div className="space-y-2">
            {hospitals.map((hospital) => (
              <button
                key={hospital.id}
                onClick={() => onEssentialClick?.(hospital.id, hospital.type)}
                className="w-full text-left p-3 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-white/20 dark:border-white/10 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-900 dark:text-white">
                    {hospital.name}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {hospital.distance}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

