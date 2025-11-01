"use client";

import { useState } from "react";

interface Photo {
  id: string;
  url: string;
  thumbnailUrl?: string;
  author: string;
  authorAvatar?: string;
  caption?: string;
  timestamp: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  if (photos.length === 0) {
    return (
      <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 rounded-2xl p-8 border border-white/20 dark:border-white/10 shadow-xl text-center">
        <p className="text-slate-600 dark:text-slate-400">No photos yet. Be the first to share!</p>
      </div>
    );
  }

  return (
    <>
      <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 rounded-2xl p-6 sm:p-8 border border-white/20 dark:border-white/10 shadow-xl">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Photos ({photos.length})
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {photos.map((photo) => (
            <button
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative aspect-square rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 hover:scale-105 transition-transform duration-300"
            >
              <img
                src={photo.thumbnailUrl || photo.url}
                alt={photo.caption || "Route photo"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </button>
          ))}
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption || "Route photo"}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                    {selectedPhoto.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {selectedPhoto.author}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {selectedPhoto.timestamp}
                    </p>
                  </div>
                </div>
                {selectedPhoto.caption && (
                  <p className="text-slate-700 dark:text-slate-300">{selectedPhoto.caption}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

