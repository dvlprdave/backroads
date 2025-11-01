// Sample route detail data
import { Comment, Photo, PullOff, Essential } from "@/app/routes/[id]/page";

export function getRouteDetail(id: string) {
  // Sample route data - in production, this would fetch from API
  const routes: Record<string, any> = {
    "1": {
      id: "1",
      name: "Pacific Coast Highway",
      location: "Big Sur, California",
      duration: "3h 45m",
      distance: "85 miles",
      difficulty: "easy" as const,
      routeType: "scenic" as const,
      coordinates: generateScenicPath([-121.8, 36.3], [-122.0, 36.5]),
      startMarker: [-121.8, 36.3] as [number, number],
      endMarker: [-122.0, 36.5] as [number, number],
      isClosed: false,
      roadCondition: "smooth" as const,
      closureReason: null,
    },
    "2": {
      id: "2",
      name: "Tail of the Dragon",
      location: "Deals Gap, Tennessee",
      duration: "1h 15m",
      distance: "11 miles",
      difficulty: "hard" as const,
      routeType: "twisty" as const,
      coordinates: generateTwistyPath([-83.85, 35.5], [-83.9, 35.52]),
      startMarker: [-83.85, 35.5] as [number, number],
      endMarker: [-83.9, 35.52] as [number, number],
      isClosed: true,
      roadCondition: "rough" as const,
      closureReason: "Winter maintenance - Closed until March 15th",
    },
  };

  return routes[id] || routes["1"];
}

export function getPullOffs(routeId: string): PullOff[] {
  return [
    {
      id: "poi-1",
      name: "Bixby Bridge Overlook",
      description: "Iconic bridge viewpoint with parking",
      coordinates: [-121.9, 36.4],
      type: "viewpoint",
    },
    {
      id: "poi-2",
      name: "McWay Falls Scenic Spot",
      description: "Waterfall overlook with picnic area",
      coordinates: [-121.88, 36.35],
      type: "scenic",
    },
    {
      id: "poi-3",
      name: "Pfeiffer Big Sur Rest Area",
      description: "Restrooms and parking",
      coordinates: [-121.85, 36.32],
      type: "restroom",
    },
  ];
}

export function getPhotos(routeId: string): Photo[] {
  return [
    {
      id: "photo-1",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200",
      author: "Sarah Johnson",
      caption: "Amazing coastal views!",
      timestamp: "2 days ago",
    },
    {
      id: "photo-2",
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      thumbnailUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200",
      author: "Mike Chen",
      caption: "Perfect for sunrise drives",
      timestamp: "1 week ago",
    },
    {
      id: "photo-3",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
      thumbnailUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200",
      author: "Emma Davis",
      timestamp: "2 weeks ago",
    },
    {
      id: "photo-4",
      url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
      thumbnailUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=200",
      author: "Alex Rivera",
      caption: "Must-see route!",
      timestamp: "3 weeks ago",
    },
  ];
}

export function getComments(routeId: string): Comment[] {
  return [
    {
      id: "comment-1",
      author: "Sarah Johnson",
      text: "Absolutely stunning drive! The coastal views are breathtaking. Make sure to stop at Bixby Bridge.",
      timestamp: "2 days ago",
      rating: 5,
    },
    {
      id: "comment-2",
      author: "Mike Chen",
      text: "Perfect route for a weekend getaway. Road conditions are excellent. Highly recommend!",
      timestamp: "1 week ago",
      rating: 5,
    },
    {
      id: "comment-3",
      author: "Emma Davis",
      text: "Beautiful scenery but can get crowded on weekends. Early morning is the best time to drive.",
      timestamp: "2 weeks ago",
      rating: 4,
    },
  ];
}

export function getNearbyEssentials(routeId: string): Essential[] {
  return [
    {
      id: "gas-1",
      type: "gas",
      name: "Shell Station",
      distance: "2.3 miles",
      coordinates: [-121.82, 36.31],
    },
    {
      id: "gas-2",
      type: "gas",
      name: "Chevron Big Sur",
      distance: "5.7 miles",
      coordinates: [-121.75, 36.28],
    },
    {
      id: "hospital-1",
      type: "hospital",
      name: "Community Hospital",
      distance: "12.4 miles",
      coordinates: [-121.7, 36.25],
    },
  ];
}

// Helper functions for generating coordinates
function generateScenicPath(start: [number, number], end: [number, number]): [number, number][] {
  const coords: [number, number][] = [];
  const points = 30;
  for (let i = 0; i <= points; i++) {
    const t = i / points;
    const lng = start[0] + (end[0] - start[0]) * t;
    const lat = start[1] + (end[1] - start[1]) * t;
    const curve = Math.sin(t * Math.PI * 2) * 0.02;
    coords.push([lng + curve, lat + curve * 0.5]);
  }
  return coords;
}

function generateTwistyPath(start: [number, number], end: [number, number]): [number, number][] {
  const coords: [number, number][] = [];
  const points = 40;
  for (let i = 0; i <= points; i++) {
    const t = i / points;
    const lng = start[0] + (end[0] - start[0]) * t;
    const lat = start[1] + (end[1] - start[1]) * t;
    const curve = Math.sin(t * Math.PI * 4) * 0.015;
    coords.push([lng + curve, lat]);
  }
  return coords;
}

