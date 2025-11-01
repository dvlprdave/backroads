"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface RouteMapPreviewProps {
  // Polyline coordinates in [lng, lat] format
  coordinates: [number, number][];
  // Optional center point, defaults to midpoint of route
  center?: [number, number];
  // Optional zoom level
  zoom?: number;
  // Route color
  routeColor?: string;
}

export default function RouteMapPreview({
  coordinates,
  center,
  zoom = 11,
  routeColor = "#3b82f6",
}: RouteMapPreviewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate center point from coordinates if not provided
  const calculatedCenter: [number, number] = center || (() => {
    if (coordinates.length === 0) return [-121.5, 47.6];
    const sum = coordinates.reduce(
      (acc, coord) => [acc[0] + coord[0], acc[1] + coord[1]],
      [0, 0]
    );
    return [sum[0] / coordinates.length, sum[1] / coordinates.length];
  })();

  // Use Intersection Observer to only initialize map when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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

  // Initialize map and draw route
  useEffect(() => {
    if (!isVisible || !mapContainer.current || mapRef.current) return;

    const container = mapContainer.current;
    let timer: NodeJS.Timeout | null = null;
    let mounted = true;

    function initializeMap() {
      if (!mounted || !mapContainer.current || mapRef.current) return;

      const containerEl = mapContainer.current;

      if (containerEl.offsetWidth === 0 || containerEl.offsetHeight === 0) {
        return;
      }

      try {
        const map = new maplibregl.Map({
          container: containerEl,
          style: "https://tiles.openfreemap.org/styles/positron",
          center: calculatedCenter,
          zoom: zoom,
          interactive: false,
        });

        mapRef.current = map;

        map.on("load", () => {
          if (!mapRef.current || !mounted) return;

          // Add route source
          map.addSource("route", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: coordinates,
              },
            },
          });

          // Add route layer
          map.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": routeColor,
              "line-width": 4,
              "line-opacity": 0.8,
            },
          });

          // Fit bounds to route
          if (coordinates.length > 0) {
            const bounds = coordinates.reduce(
              (bounds, coord) => {
                return bounds.extend(coord as maplibregl.LngLatLike);
              },
              new maplibregl.LngLatBounds(coordinates[0] as maplibregl.LngLatLike, coordinates[0] as maplibregl.LngLatLike)
            );
            map.fitBounds(bounds, {
              padding: 20,
              duration: 0,
            });
          }

          setError(null);
        });

        map.on("error", (e) => {
          console.error("Map error:", e);
          setError("Failed to load map");
        });
      } catch (err) {
        console.error("Failed to initialize map:", err);
        setError(err instanceof Error ? err.message : "Failed to initialize map");
      }
    }

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
  }, [isVisible, coordinates, calculatedCenter, zoom, routeColor]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
      <div
        ref={mapContainer}
        className="w-full h-full"
        style={{ minHeight: "200px" }}
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}

