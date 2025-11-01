"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MapPreview() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Use Intersection Observer to only initialize map when visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.25, rootMargin: "100px" }
        );

        if (mapContainer.current) {
            observer.observe(mapContainer.current);
        }

        return () => {
            if (mapContainer.current) {
                observer.unobserve(mapContainer.current);
            }
        };
    }, [isVisible]);

    // Initialize map when visible and container is ready
    useEffect(() => {
        if (!isVisible || !mapContainer.current || mapRef.current) return;

        const container = mapContainer.current;
        let timer: NodeJS.Timeout | null = null;
        let mounted = true;

        function initializeMap() {
            if (!mounted || !mapContainer.current || mapRef.current) return;

            const containerEl = mapContainer.current;

            // Ensure container has dimensions
            if (containerEl.offsetWidth === 0 || containerEl.offsetHeight === 0) {
                console.warn("Map container has no dimensions, retrying...");
                return;
            }

            try {
                console.log("Initializing MapLibre map...", {
                    width: containerEl.offsetWidth,
                    height: containerEl.offsetHeight,
                });

                mapRef.current = new maplibregl.Map({
                    container: containerEl,
                    style: "https://tiles.openfreemap.org/styles/positron",
                    center: [-121.5, 47.6],
                    zoom: 8.5,
                    pitch: 45,   // adds 3D tilt
                    bearing: -20, // adds slight rotation
                    interactive: false,

                });

                mapRef.current.on("load", () => {
                    console.log("Map loaded successfully");
                    setError(null);
                });

                mapRef.current.on("error", (e) => {
                    console.error("Map error:", e);
                    setError("Failed to load map tiles");
                });
            } catch (err) {
                console.error("Failed to initialize map:", err);
                setError(err instanceof Error ? err.message : "Failed to initialize map");
            }
        }

        // Check if container has dimensions, if not wait a bit
        if (container.offsetWidth === 0 || container.offsetHeight === 0) {
            timer = setTimeout(() => {
                if (mounted) {
                    initializeMap();
                }
            }, 100);
        } else {
            initializeMap();
        }

        return () => {
            mounted = false;
            if (timer) clearTimeout(timer);
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [isVisible]);

    return (
        <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-slate-100 dark:bg-slate-800">
            <div
                ref={mapContainer}
                className="w-full h-full"
                style={{ minHeight: "400px" }}
            />
            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    <div className="text-center">
                        <p className="text-sm">{error}</p>
                        <p className="text-xs mt-2">Check browser console for details</p>
                    </div>
                </div>
            )}
        </div>
    );
}

