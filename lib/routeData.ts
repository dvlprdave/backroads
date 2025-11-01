// Sample route data with polyline coordinates
import { Route } from "@/components/RouteCard";

// Helper function to generate coordinates along a path
function generateCoordinates(
  start: [number, number],
  end: [number, number],
  points: number = 20
): [number, number][] {
  const coords: [number, number][] = [];
  for (let i = 0; i <= points; i++) {
    const t = i / points;
    const lng = start[0] + (end[0] - start[0]) * t;
    const lat = start[1] + (end[1] - start[1]) * t;
    // Add some curvature variation
    const offset = Math.sin(t * Math.PI) * 0.01;
    coords.push([lng + offset, lat]);
  }
  return coords;
}

// Scenic routes (winding paths)
function scenicPath(start: [number, number], end: [number, number]): [number, number][] {
  const coords: [number, number][] = [];
  const points = 30;
  for (let i = 0; i <= points; i++) {
    const t = i / points;
    const lng = start[0] + (end[0] - start[0]) * t;
    const lat = start[1] + (end[1] - start[1]) * t;
    // More pronounced curves for scenic routes
    const curve = Math.sin(t * Math.PI * 2) * 0.02;
    coords.push([lng + curve, lat + curve * 0.5]);
  }
  return coords;
}

// Twisty routes (sharp turns)
function twistyPath(start: [number, number], end: [number, number]): [number, number][] {
  const coords: [number, number][] = [];
  const points = 40;
  for (let i = 0; i <= points; i++) {
    const t = i / points;
    const lng = start[0] + (end[0] - start[0]) * t;
    const lat = start[1] + (end[1] - start[1]) * t;
    // Sharp alternating curves
    const curve = Math.sin(t * Math.PI * 4) * 0.015;
    coords.push([lng + curve, lat]);
  }
  return coords;
}

export const savedRoutes: Route[] = [
  {
    id: "1",
    name: "Pacific Coast Highway",
    location: "Big Sur, California",
    type: "scenic",
    difficulty: "easy",
    duration: "3h 45m",
    coordinates: scenicPath([-121.8, 36.3], [-122.0, 36.5]),
    center: [-121.9, 36.4],
  },
  {
    id: "2",
    name: "Tail of the Dragon",
    location: "Deals Gap, Tennessee",
    type: "twisty",
    difficulty: "hard",
    duration: "1h 15m",
    coordinates: twistyPath([-83.85, 35.5], [-83.9, 35.52]),
    center: [-83.875, 35.51],
  },
  {
    id: "3",
    name: "Blue Ridge Parkway",
    location: "Asheville, North Carolina",
    type: "scenic",
    difficulty: "medium",
    duration: "4h 20m",
    coordinates: scenicPath([-82.5, 35.6], [-82.6, 35.7]),
    center: [-82.55, 35.65],
  },
  {
    id: "4",
    name: "Mojave Desert Trail",
    location: "Mojave, California",
    type: "off-road",
    difficulty: "hard",
    duration: "2h 30m",
    coordinates: generateCoordinates([-118.0, 35.0], [-117.8, 35.2], 25),
    center: [-117.9, 35.1],
  },
];

export const suggestedRoutes: Route[] = [
  {
    id: "5",
    name: "Mountain Pass Scenic Drive",
    location: "Rocky Mountains, Colorado",
    type: "scenic",
    difficulty: "medium",
    duration: "2h 45m",
    coordinates: scenicPath([-105.5, 39.7], [-105.6, 39.8]),
    center: [-105.55, 39.75],
  },
  {
    id: "6",
    name: "Cascade Loop",
    location: "North Cascades, Washington",
    type: "twisty",
    difficulty: "medium",
    duration: "3h 10m",
    coordinates: twistyPath([-121.2, 48.5], [-121.3, 48.6]),
    center: [-121.25, 48.55],
  },
  {
    id: "7",
    name: "Red Rock Canyon",
    location: "Las Vegas, Nevada",
    type: "scenic",
    difficulty: "easy",
    duration: "1h 45m",
    coordinates: scenicPath([-115.4, 36.1], [-115.5, 36.2]),
    center: [-115.45, 36.15],
  },
  {
    id: "8",
    name: "Forest Service Road 550",
    location: "Ozark Mountains, Arkansas",
    type: "off-road",
    difficulty: "medium",
    duration: "2h 0m",
    coordinates: generateCoordinates([-93.5, 35.8], [-93.6, 35.9], 20),
    center: [-93.55, 35.85],
  },
  {
    id: "9",
    name: "Highway 1 to Stinson Beach",
    location: "Marin County, California",
    type: "scenic",
    difficulty: "easy",
    duration: "1h 30m",
    coordinates: scenicPath([-122.6, 37.9], [-122.7, 38.0]),
    center: [-122.65, 37.95],
  },
  {
    id: "10",
    name: "Dragon's Back",
    location: "Santa Monica Mountains, California",
    type: "twisty",
    difficulty: "hard",
    duration: "1h 20m",
    coordinates: twistyPath([-118.7, 34.1], [-118.8, 34.2]),
    center: [-118.75, 34.15],
  },
];

