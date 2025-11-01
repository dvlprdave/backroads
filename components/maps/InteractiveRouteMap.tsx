"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface InteractiveRouteMapProps {
  coordinates: [number, number][];
  startMarker?: [number, number];
  endMarker?: [number, number];
  pullOffs?: Array<{ id: string; name: string; coordinates: [number, number] }>;
  nearbyEssentials?: Array<{
    id: string;
    type: "gas" | "hospital";
    name: string;
    coordinates: [number, number];
  }>;
  interactive?: boolean;
  onMarkerClick?: (id: string, type: string) => void;
}

export default function InteractiveRouteMap({
  coordinates,
  startMarker,
  endMarker,
  pullOffs = [],
  nearbyEssentials = [],
  interactive = true,
  onMarkerClick,
}: InteractiveRouteMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate center from coordinates
  const center: [number, number] = (() => {
    if (coordinates.length === 0) return [-121.5, 47.6];
    const sum = coordinates.reduce(
      (acc, coord) => [acc[0] + coord[0], acc[1] + coord[1]],
      [0, 0]
    );
    return [sum[0] / coordinates.length, sum[1] / coordinates.length];
  })();

  // Intersection Observer for lazy loading
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

  // Initialize map and add markers
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
          center: center,
          zoom: 11,
          interactive: interactive,
        });

        mapRef.current = map;

        map.on("load", () => {
          if (!mapRef.current || !mounted) return;

          // Add route source and layer
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

          map.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#3b82f6",
              "line-width": 5,
              "line-opacity": 0.8,
            },
          });

          // Add start marker
          if (startMarker) {
            const startEl = document.createElement("div");
            startEl.className = "w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg";
            startEl.style.cursor = "pointer";
            
            const startMarkerObj = new maplibregl.Marker({ element: startEl })
              .setLngLat(startMarker)
              .addTo(map);
            
            markersRef.current.push(startMarkerObj);
            
            if (onMarkerClick) {
              startEl.addEventListener("click", () => onMarkerClick("start", "start"));
            }
          }

          // Add end marker
          if (endMarker) {
            const endEl = document.createElement("div");
            endEl.className = "w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg";
            endEl.style.cursor = "pointer";
            
            const endMarkerObj = new maplibregl.Marker({ element: endEl })
              .setLngLat(endMarker)
              .addTo(map);
            
            markersRef.current.push(endMarkerObj);
            
            if (onMarkerClick) {
              endEl.addEventListener("click", () => onMarkerClick("end", "end"));
            }
          }

          // Add pull-off markers
          pullOffs.forEach((pullOff) => {
            const el = document.createElement("div");
            el.className = "w-5 h-5 bg-blue-400 rounded-full border-2 border-white shadow-md";
            el.style.cursor = "pointer";
            
            const marker = new maplibregl.Marker({ element: el })
              .setLngLat(pullOff.coordinates)
              .addTo(map);
            
            markersRef.current.push(marker);
            
            if (onMarkerClick) {
              el.addEventListener("click", () => onMarkerClick(pullOff.id, "pulloff"));
            }
          });

          // Add nearby essentials markers
          nearbyEssentials.forEach((essential) => {
            const el = document.createElement("div");
            const iconClass = essential.type === "gas" 
              ? "w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow-md"
              : "w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-md";
            el.className = iconClass;
            el.style.cursor = "pointer";
            
            const marker = new maplibregl.Marker({ element: el })
              .setLngLat(essential.coordinates)
              .addTo(map);
            
            markersRef.current.push(marker);
            
            if (onMarkerClick) {
              el.addEventListener("click", () => onMarkerClick(essential.id, essential.type));
            }
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
              padding: 50,
              duration: 1000,
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
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isVisible, coordinates, startMarker, endMarker, pullOffs, nearbyEssentials, interactive, onMarkerClick, center]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
      <div
        ref={mapContainer}
        className="w-full h-full"
        style={{ minHeight: "400px" }}
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}

