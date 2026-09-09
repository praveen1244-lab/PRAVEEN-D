import { Place, RouteOption, TravelMode } from '../types';

export const POPULAR_PLACES: Place[] = [
  {
    id: 'sf-golden-gate',
    name: 'Golden Gate Bridge',
    category: 'landmark',
    categoryLabel: 'Suspension Bridge & Landmark',
    address: 'Golden Gate Bridge, San Francisco, CA 94129',
    city: 'San Francisco',
    lat: 37.8199,
    lng: -122.4783,
    rating: 4.8,
    reviewCount: 64120,
    photoUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&auto=format&fit=crop&q=80',
    photos: [
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80'
    ],
    openNow: true,
    hours: [
      'Monday: Open 24 hours',
      'Tuesday: Open 24 hours',
      'Wednesday: Open 24 hours',
      'Thursday: Open 24 hours',
      'Friday: Open 24 hours',
      'Saturday: Open 24 hours',
      'Sunday: Open 24 hours'
    ],
    phone: '(415) 921-5858',
    website: 'https://www.goldengate.org',
    description: 'Iconic 1.7-mile suspension bridge connecting San Francisco to Marin County, featuring pedestrian walkways and sweeping bay views.',
    popularTimes: [5, 5, 5, 10, 15, 30, 45, 65, 80, 95, 100, 90, 85, 75, 60, 45, 30, 20, 15, 10, 5, 5, 5, 5],
    features: ['Wheelchair accessible', 'Scenic viewpoints', 'Bike friendly', 'Gift shop'],
    reviews: [
      {
        id: 'r1',
        authorName: 'Sarah Jenkins',
        authorPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        relativeTimeDescription: '2 days ago',
        text: 'Breathtaking experience walking across! The fog was rolling in, giving it that classic San Francisco mystical vibe. Wear a warm jacket!'
      },
      {
        id: 'r2',
        authorName: 'David Chen',
        authorPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        relativeTimeDescription: 'a week ago',
        text: 'Rented bikes from Fisherman Wharf and cycled across into Sausalito. Top tier highlight of our California trip.'
      }
    ]
  },
  {
    id: 'sf-ferry-building',
    name: 'Ferry Building Marketplace',
    category: 'grocery',
    categoryLabel: 'Artisan Food Hall & Ferry Terminal',
    address: '1 Ferry Building, San Francisco, CA 94105',
    city: 'San Francisco',
    lat: 37.7955,
    lng: -122.3937,
    rating: 4.7,
    reviewCount: 18450,
    priceLevel: '$$',
    photoUrl: 'https://images.unsplash.com/photo-1541464522988-31b420f688b9?w=800&auto=format&fit=crop&q=80',
    photos: [
      'https://images.unsplash.com/photo-1541464522988-31b420f688b9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80'
    ],
    openNow: true,
    hours: [
      'Monday: 7:00 AM – 8:00 PM',
      'Tuesday: 7:00 AM – 8:00 PM',
      'Wednesday: 7:00 AM – 8:00 PM',
      'Thursday: 7:00 AM – 8:00 PM',
      'Friday: 7:00 AM – 8:00 PM',
      'Saturday: 7:00 AM – 8:00 PM',
      'Sunday: 7:00 AM – 6:00 PM'
    ],
    phone: '(415) 983-8030',
    website: 'https://www.ferrybuildingmarketplace.com',
    description: 'Historic transit hub converted into a vibrant food hall featuring local artisan vendors, farmers markets, cheese mongers, and oyster bars.',
    popularTimes: [0, 0, 0, 0, 0, 0, 15, 35, 60, 85, 95, 100, 85, 70, 50, 35, 20, 10, 5, 0, 0, 0, 0, 0],
    features: ['Farmers Market on Sat', 'Outdoor seating', 'Waterfront view', 'Restrooms'],
    reviews: [
      {
        id: 'r3',
        authorName: 'Elena Rostova',
        rating: 5,
        relativeTimeDescription: '3 days ago',
        text: 'The Saturday farmers market is unbeatable. Fresh peaches, incredible artisanal pastries, and a view of the Bay Bridge!'
      }
    ]
  },
  {
    id: 'sf-blue-bottle',
    name: 'Blue Bottle Coffee - Mint Plaza',
    category: 'cafe',
    categoryLabel: 'Specialty Coffee Shop',
    address: '66 Mint Plaza, San Francisco, CA 94103',
    city: 'San Francisco',
    lat: 37.7825,
    lng: -122.4075,
    rating: 4.6,
    reviewCount: 3290,
    priceLevel: '$$',
    photoUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80',
    openNow: true,
    hours: [
      'Monday–Friday: 6:30 AM – 5:00 PM',
      'Saturday–Sunday: 7:00 AM – 5:00 PM'
    ],
    phone: '(510) 653-3394',
    website: 'https://bluebottlecoffee.com',
    description: 'Renowned third-wave roaster preparing single-origin pour-overs, New Orleans iced coffees, and liege waffles in a restored alleyway.',
    popularTimes: [0, 0, 0, 0, 0, 0, 30, 80, 95, 80, 60, 55, 45, 30, 20, 10, 0, 0, 0, 0, 0, 0, 0, 0],
    features: ['Outdoor patio', 'Free Wi-Fi', 'Dairy-free milk options', 'Mobile ordering'],
    reviews: [
      {
        id: 'r4',
        authorName: 'Marcus Miller',
        rating: 5,
        relativeTimeDescription: '5 hours ago',
        text: 'Best New Orleans iced coffee in the bay. Relaxing plaza seating away from the Market Street bustle.'
      }
    ]
  },
  {
    id: 'sf-house-of-prime-rib',
    name: 'House of Prime Rib',
    category: 'restaurant',
    categoryLabel: 'Classic American Steakhouse',
    address: '1906 Van Ness Ave, San Francisco, CA 94109',
    city: 'San Francisco',
    lat: 37.7933,
    lng: -122.4228,
    rating: 4.7,
    reviewCount: 9820,
    priceLevel: '$$$',
    photoUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    openNow: false,
    hours: [
      'Monday–Thursday: 5:00 PM – 10:00 PM',
      'Friday: 4:30 PM – 10:00 PM',
      'Saturday–Sunday: 4:00 PM – 10:00 PM'
    ],
    phone: '(415) 885-4605',
    website: 'https://houseofprimerib.net',
    description: 'San Francisco institution serving top-quality prime rib carved tableside from stainless steel domed carts, paired with sourdough and creamed spinach.',
    popularTimes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 90, 100, 95, 75, 40, 10, 0],
    features: ['Full bar', 'Valet parking', 'Reservations required', 'Cozy fireplace'],
    reviews: [
      {
        id: 'r5',
        authorName: 'Claire T.',
        rating: 5,
        relativeTimeDescription: 'Yesterday',
        text: 'The English cut was melt-in-your-mouth perfection. The salad spun at the table is legendary!'
      }
    ]
  },
  {
    id: 'sf-palace-hotel',
    name: 'Palace Hotel, a Luxury Collection Hotel',
    category: 'hotel',
    categoryLabel: '5-Star Historic Hotel',
    address: '2 New Montgomery St, San Francisco, CA 94105',
    city: 'San Francisco',
    lat: 37.7881,
    lng: -122.4019,
    rating: 4.6,
    reviewCount: 4620,
    priceLevel: '$$$$',
    photoUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
    openNow: true,
    hours: ['Open 24 hours'],
    phone: '(415) 512-1111',
    website: 'https://www.marriott.com',
    description: 'Grand historic hotel opened in 1875, famed for the stained-glass dome in The Garden Court restaurant and luxury suites.',
    features: ['Indoor heated pool', 'Fitness center', 'Valet parking', 'Historic dining room'],
    reviews: [
      {
        id: 'r6',
        authorName: 'Arthur Pendelton',
        rating: 5,
        relativeTimeDescription: '2 weeks ago',
        text: 'Afternoon tea under the crystal chandeliers in the Garden Court is an experience everyone must try.'
      }
    ]
  },
  {
    id: 'sf-dolores-park',
    name: 'Mission Dolores Park',
    category: 'park',
    categoryLabel: 'City Park & Recreation Area',
    address: 'Dolores St & 19th St, San Francisco, CA 94114',
    city: 'San Francisco',
    lat: 37.7596,
    lng: -122.4269,
    rating: 4.8,
    reviewCount: 14210,
    photoUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&auto=format&fit=crop&q=80',
    openNow: true,
    hours: ['Daily: 6:00 AM – 10:00 PM'],
    phone: '(415) 831-2700',
    website: 'https://sfrecpark.org',
    description: 'Beloved 16-acre hillside park with lush lawns, tennis courts, playground, and panoramic views of the city skyline.',
    popularTimes: [0, 0, 0, 0, 0, 0, 10, 20, 35, 55, 75, 90, 100, 95, 80, 60, 40, 20, 10, 5, 0, 0, 0, 0],
    features: ['Dog friendly', 'Tennis & pickleball courts', 'Skyline view', 'Restrooms'],
    reviews: [
      {
        id: 'r7',
        authorName: 'Kenji Sato',
        rating: 5,
        relativeTimeDescription: '4 days ago',
        text: 'Grab a burrito on Valencia Street and head up to the top hill of Dolores. Stunning city views and great people watching.'
      }
    ]
  },
  {
    id: 'sf-chevron-gas',
    name: 'Chevron Gas Station & Car Wash',
    category: 'gas',
    categoryLabel: 'Gas Station & Convenience',
    address: '1298 Howard St, San Francisco, CA 94103',
    city: 'San Francisco',
    lat: 37.7762,
    lng: -122.4132,
    rating: 4.2,
    reviewCount: 420,
    priceLevel: '$$',
    photoUrl: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?w=800&auto=format&fit=crop&q=80',
    openNow: true,
    hours: ['Open 24 hours'],
    phone: '(415) 861-1200',
    website: 'https://www.chevron.com',
    description: '24-hour service station with Techron fuel, automated touchless car wash, EV chargers, and a snack mini-mart.',
    features: ['EV Fast Charging', 'Car Wash', 'Air & Water', 'ATM'],
    reviews: [
      {
        id: 'r8',
        authorName: 'Jason Lee',
        rating: 4,
        relativeTimeDescription: '1 month ago',
        text: 'Clean pumps, bright lighting at night, and quick automated car wash.'
      }
    ]
  },
  {
    id: 'sf-walgreens',
    name: 'Walgreens Pharmacy',
    category: 'pharmacy',
    categoryLabel: 'Pharmacy & Convenience Store',
    address: '135 Powell St, San Francisco, CA 94102',
    city: 'San Francisco',
    lat: 37.7865,
    lng: -122.4081,
    rating: 4.1,
    reviewCount: 890,
    priceLevel: '$',
    photoUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&auto=format&fit=crop&q=80',
    openNow: true,
    hours: ['Daily: 8:00 AM – 9:00 PM'],
    phone: '(415) 391-7222',
    website: 'https://www.walgreens.com',
    description: 'Full-service pharmacy offering prescription fulfillment, over-the-counter medicine, vaccinations, health essentials, and groceries.',
    features: ['Flu shots', 'Photo printing', 'Prescription pick-up', 'Wheelchair accessible'],
    reviews: [
      {
        id: 'r9',
        authorName: 'Maria Gomez',
        rating: 4,
        relativeTimeDescription: '3 weeks ago',
        text: 'Friendly pharmacy staff, got my vaccine walk-in without a long wait.'
      }
    ]
  },
  {
    id: 'sf-alcatraz',
    name: 'Alcatraz Island',
    category: 'attraction',
    categoryLabel: 'Historic Island & National Park',
    address: 'Pier 33, San Francisco, CA 94133',
    city: 'San Francisco',
    lat: 37.8269,
    lng: -122.4230,
    rating: 4.8,
    reviewCount: 42100,
    photoUrl: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?w=800&auto=format&fit=crop&q=80',
    openNow: true,
    hours: ['Ferries depart: 8:45 AM – 4:00 PM'],
    phone: '(415) 561-4900',
    website: 'https://www.nps.gov/alca',
    description: 'Former notorious federal maximum-security prison on an island in San Francisco Bay, now featuring cellhouse audio tours and historic gardens.',
    features: ['Audio tour included', 'Ferry access', 'Ranger talks', 'Scenic Bay views'],
    reviews: [
      {
        id: 'r10',
        authorName: 'Thomas Wright',
        rating: 5,
        relativeTimeDescription: '3 days ago',
        text: 'The audio tour narrated by former inmates and guards is one of the best museum tours in the world!'
      }
    ]
  },
  {
    id: 'nyc-central-park',
    name: 'Central Park',
    category: 'park',
    categoryLabel: 'Urban Park & Historic Landmark',
    address: 'Central Park, New York, NY 10024',
    city: 'New York',
    lat: 40.785091,
    lng: -73.968285,
    rating: 4.9,
    reviewCount: 275000,
    photoUrl: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&auto=format&fit=crop&q=80',
    openNow: true,
    hours: ['Daily: 6:00 AM – 1:00 AM'],
    phone: '(212) 310-6600',
    website: 'https://www.centralparknyc.org',
    description: 'Sprawling 843-acre urban oasis in the heart of Manhattan with walking paths, lake boating, Belvedere Castle, and sprawling meadows.',
    popularTimes: [0, 0, 0, 0, 0, 0, 15, 30, 50, 70, 85, 95, 100, 90, 80, 65, 45, 25, 15, 5, 0, 0, 0, 0],
    features: ['Ice skating in winter', 'Rowboat rentals', 'Carousel', 'Restrooms'],
    reviews: [
      {
        id: 'r11',
        authorName: 'Emily Watson',
        rating: 5,
        relativeTimeDescription: 'a week ago',
        text: 'A green masterpiece. Walk around The Ramble, rent a rowboat at Loeb Boathouse, or relax at Sheep Meadow.'
      }
    ]
  },
  {
    id: 'nyc-times-square',
    name: 'Times Square',
    category: 'landmark',
    categoryLabel: 'Commercial Intersection & Tourist Hub',
    address: 'Broadway & 7th Ave, New York, NY 10036',
    city: 'New York',
    lat: 40.758896,
    lng: -73.985130,
    rating: 4.7,
    reviewCount: 310000,
    photoUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&auto=format&fit=crop&q=80',
    openNow: true,
    hours: ['Open 24 hours'],
    phone: '(212) 768-1560',
    website: 'https://www.timessquarenyc.org',
    description: 'Electrifying neon entertainment epicenter packed with giant digital billboards, Broadway theaters, street performers, and flagship stores.',
    features: ['Pedestrian plazas', 'TKTS discount tickets booth', 'Subway hub', 'Live entertainment'],
    reviews: [
      {
        id: 'r12',
        authorName: 'Lucas Bernard',
        rating: 5,
        relativeTimeDescription: '2 days ago',
        text: 'Unmatched energy day and night. The red stairs offer a great view of the entire canyon of lights.'
      }
    ]
  }
];

export const CATEGORY_FILTERS = [
  { id: 'all', label: 'Explore', icon: 'Compass' },
  { id: 'restaurant', label: 'Restaurants', icon: 'Utensils' },
  { id: 'cafe', label: 'Coffee', icon: 'Coffee' },
  { id: 'hotel', label: 'Hotels', icon: 'Hotel' },
  { id: 'gas', label: 'Gas', icon: 'Fuel' },
  { id: 'grocery', label: 'Groceries', icon: 'ShoppingBag' },
  { id: 'attraction', label: 'Attractions', icon: 'Landmark' },
  { id: 'park', label: 'Parks', icon: 'Trees' },
  { id: 'pharmacy', label: 'Pharmacies', icon: 'Pill' }
];

export function computeSimulatedRoute(
  origin: { lat: number; lng: number; name: string },
  destination: { lat: number; lng: number; name: string },
  mode: TravelMode
): RouteOption[] {
  // Calculate distance in miles using Haversine formula
  const R = 3958.8; // Earth radius in miles
  const dLat = ((destination.lat - origin.lat) * Math.PI) / 180;
  const dLng = ((destination.lng - origin.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((origin.lat * Math.PI) / 180) *
      Math.cos((destination.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightDist = R * c;

  // Road factor based on street network
  const roadFactor = mode === 'WALKING' ? 1.25 : mode === 'BICYCLING' ? 1.3 : 1.35;
  const distanceMiles = Math.max(0.4, Number((straightDist * roadFactor).toFixed(1)));

  // Speed assumptions (mph)
  const speeds: Record<TravelMode, number> = {
    DRIVING: 28,
    TRANSIT: 18,
    WALKING: 3.1,
    BICYCLING: 11
  };
  const durationMinutes = Math.max(
    2,
    Math.round((distanceMiles / speeds[mode]) * 60)
  );

  // Generate intermediate points for polyline
  const numSteps = 7;
  const polyline: [number, number][] = [];
  polyline.push([origin.lat, origin.lng]);

  // Add realistic street turn jogs
  for (let i = 1; i < numSteps; i++) {
    const fraction = i / numSteps;
    const baseLat = origin.lat + (destination.lat - origin.lat) * fraction;
    const baseLng = origin.lng + (destination.lng - origin.lng) * fraction;
    // slight curve offset
    const curveOffset = Math.sin(fraction * Math.PI) * 0.003 * (i % 2 === 0 ? 1 : -0.8);
    polyline.push([baseLat + curveOffset, baseLng + curveOffset * 0.5]);
  }
  polyline.push([destination.lat, destination.lng]);

  const steps = [
    {
      id: 's1',
      instruction: `Head out from ${origin.name}`,
      distance: '0.2 mi',
      duration: '1 min',
      maneuver: 'depart' as const,
      roadName: 'Main Blvd'
    },
    {
      id: 's2',
      instruction: 'Turn right onto Grand Avenue',
      distance: `${(distanceMiles * 0.4).toFixed(1)} mi`,
      duration: `${Math.round(durationMinutes * 0.4)} min`,
      maneuver: 'turn-right' as const,
      roadName: 'Grand Ave'
    },
    {
      id: 's3',
      instruction: 'Continue straight through the intersection',
      distance: `${(distanceMiles * 0.3).toFixed(1)} mi`,
      duration: `${Math.round(durationMinutes * 0.3)} min`,
      maneuver: 'straight' as const,
      roadName: 'Grand Ave'
    },
    {
      id: 's4',
      instruction: `Turn left toward ${destination.name}`,
      distance: '0.1 mi',
      duration: '1 min',
      maneuver: 'turn-left' as const,
      roadName: 'Destination Way'
    },
    {
      id: 's5',
      instruction: `Arrive at ${destination.name}. Your destination is on the right.`,
      distance: '0.1 mi',
      duration: '1 min',
      maneuver: 'destination' as const
    }
  ];

  const now = new Date();
  const arrivalTime = new Date(now.getTime() + durationMinutes * 60000);
  const timeFormat = (d: Date) =>
    d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

  const route1: RouteOption = {
    id: 'primary-route',
    summary: mode === 'DRIVING' ? 'via US-101 & Main Blvd' : mode === 'TRANSIT' ? 'Line 38R Rapid' : 'Fastest path',
    durationMinutes,
    distanceMiles,
    durationText: `${durationMinutes} min`,
    distanceText: `${distanceMiles} mi`,
    trafficCondition: durationMinutes > 30 ? 'Normal' : 'Fast',
    polyline,
    steps,
    departureTime: timeFormat(now),
    arrivalTime: timeFormat(arrivalTime)
  };

  // Alternative route
  const altDist = Number((distanceMiles * 1.12).toFixed(1));
  const altDur = Math.round(durationMinutes * 1.18);
  const altArrival = new Date(now.getTime() + altDur * 60000);

  const route2: RouteOption = {
    id: 'alt-route-1',
    summary: mode === 'DRIVING' ? 'via Scenic Parkway' : mode === 'TRANSIT' ? 'Metro Red Line' : 'via Park Promenade',
    durationMinutes: altDur,
    distanceMiles: altDist,
    durationText: `${altDur} min`,
    distanceText: `${altDist} mi`,
    trafficCondition: 'Normal',
    polyline: polyline.map(([lat, lng], idx) => [
      lat + (idx % 2 === 0 ? 0.002 : -0.001),
      lng + (idx % 2 === 0 ? -0.002 : 0.001)
    ]),
    steps: [
      {
        id: 'alt-s1',
        instruction: `Head out from ${origin.name}`,
        distance: '0.3 mi',
        duration: '2 min',
        maneuver: 'depart',
        roadName: 'Parkway West'
      },
      {
        id: 'alt-s2',
        instruction: 'Take the ramp onto Skyline Boulevard',
        distance: `${(altDist * 0.6).toFixed(1)} mi`,
        duration: `${Math.round(altDur * 0.6)} min`,
        maneuver: 'merge',
        roadName: 'Skyline Blvd'
      },
      {
        id: 'alt-s3',
        instruction: `Arrive at ${destination.name}`,
        distance: '0.2 mi',
        duration: '2 min',
        maneuver: 'destination'
      }
    ],
    departureTime: timeFormat(now),
    arrivalTime: timeFormat(altArrival)
  };

  return [route1, route2];
}
