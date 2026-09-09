export type TravelMode = 'DRIVING' | 'TRANSIT' | 'WALKING' | 'BICYCLING';

export type MapLayerType = 'roadmap' | 'satellite' | 'terrain';

export type BookmarkCategory = 'favorites' | 'want_to_go' | 'starred';

export interface PlaceReview {
  id: string;
  authorName: string;
  authorPhoto?: string;
  rating: number;
  relativeTimeDescription: string;
  text: string;
}

export interface Place {
  id: string;
  name: string;
  category: 'restaurant' | 'cafe' | 'hotel' | 'gas' | 'grocery' | 'attraction' | 'park' | 'pharmacy' | 'landmark' | 'other';
  categoryLabel: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  priceLevel?: string; // '$', '$$', '$$$', '$$$$'
  photoUrl: string;
  photos?: string[];
  openNow: boolean;
  hours: string[];
  phone: string;
  website: string;
  description: string;
  popularTimes?: number[]; // 24 values representing busyness
  reviews: PlaceReview[];
  features?: string[];
}

export interface RouteStep {
  id: string;
  instruction: string;
  distance: string;
  duration: string;
  maneuver?: 'turn-left' | 'turn-right' | 'straight' | 'merge' | 'uturn' | 'destination' | 'depart';
  roadName?: string;
}

export interface RouteOption {
  id: string;
  summary: string;
  durationMinutes: number;
  distanceMiles: number;
  durationText: string;
  distanceText: string;
  trafficCondition: 'Fast' | 'Normal' | 'Slow';
  polyline: [number, number][];
  steps: RouteStep[];
  departureTime?: string;
  arrivalTime?: string;
}

export interface SavedPlaceItem {
  id: string;
  placeId: string;
  category: BookmarkCategory;
  savedAt: string;
  note?: string;
}

export interface UserLocation {
  lat: number;
  lng: number;
  accuracy?: number;
}
