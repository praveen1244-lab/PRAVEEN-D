import React, { useState, useEffect, useMemo } from 'react';
import { SearchBar } from './components/SearchBar';
import { CategoryChips } from './components/CategoryChips';
import { PlaceCard } from './components/PlaceCard';
import { DirectionsPanel } from './components/DirectionsPanel';
import { MapControls } from './components/MapControls';
import { SavedPlacesModal } from './components/SavedPlacesModal';
import { StreetViewModal } from './components/StreetViewModal';
import { ApiKeyNotice } from './components/ApiKeyNotice';
import { GoogleMapView } from './components/GoogleMapView';
import { FallbackMapView } from './components/FallbackMapView';
import { POPULAR_PLACES, computeSimulatedRoute } from './data/mockPlaces';
import {
  Place,
  TravelMode,
  MapLayerType,
  BookmarkCategory,
  SavedPlaceItem,
  RouteOption,
  UserLocation,
} from './types';

export default function App() {
  const apiKey = (import.meta as unknown as { env: Record<string, string> }).env?.VITE_GOOGLE_MAPS_API_KEY || '';

  // App & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(POPULAR_PLACES[0]);

  // Directions & Routing State
  const [isDirectionsOpen, setIsDirectionsOpen] = useState(false);
  const [travelMode, setTravelMode] = useState<TravelMode>('DRIVING');
  const [origin, setOrigin] = useState<{ lat: number; lng: number; name: string }>({
    lat: 37.7825,
    lng: -122.4075,
    name: 'Blue Bottle Coffee, Mint Plaza',
  });
  const [destination, setDestination] = useState<{ lat: number; lng: number; name: string } | null>({
    lat: POPULAR_PLACES[0].lat,
    lng: POPULAR_PLACES[0].lng,
    name: POPULAR_PLACES[0].name,
  });
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  // Map Controls & Views State
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 37.795,
    lng: -122.42,
  });
  const [mapZoom, setMapZoom] = useState(13);
  const [layerType, setLayerType] = useState<MapLayerType>('roadmap');
  const [showTraffic, setShowTraffic] = useState(false);
  const [showTransit, setShowTransit] = useState(false);

  // Geolocation
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Saved Bookmarks
  const [savedItems, setSavedItems] = useState<SavedPlaceItem[]>(() => {
    try {
      const saved = localStorage.getItem('maps_saved_places');
      return saved
        ? JSON.parse(saved)
        : [
            { id: '1', placeId: 'sf-golden-gate', category: 'favorites', savedAt: new Date().toISOString() },
            { id: '2', placeId: 'sf-ferry-building', category: 'want_to_go', savedAt: new Date().toISOString() },
          ];
    } catch {
      return [];
    }
  });
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  // Street View Modal
  const [isStreetViewOpen, setIsStreetViewOpen] = useState(false);
  const [streetViewPlace, setStreetViewPlace] = useState<Place | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync saved places to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('maps_saved_places', JSON.stringify(savedItems));
    } catch {
      // ignore
    }
  }, [savedItems]);

  // Filtered Places list
  const filteredPlaces = useMemo(() => {
    return POPULAR_PLACES.filter((p) => {
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchQuery =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.city.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Compute Routes when origin or destination changes
  const computedRoutes = useMemo<RouteOption[]>(() => {
    if (!origin || !destination) return [];
    return computeSimulatedRoute(origin, destination, travelMode);
  }, [origin, destination, travelMode]);

  const activeRoute = isDirectionsOpen && computedRoutes.length > 0 ? computedRoutes[selectedRouteIndex] : null;

  // Actions
  const handleSelectPlace = (place: Place) => {
    setSelectedPlace(place);
    setMapCenter({ lat: place.lat, lng: place.lng });
    setMapZoom(15);
    if (isDirectionsOpen) {
      setDestination({ lat: place.lat, lng: place.lng, name: place.name });
    }
  };

  const handleStartDirections = (place: Place) => {
    setDestination({ lat: place.lat, lng: place.lng, name: place.name });
    setIsDirectionsOpen(true);
    setSelectedRouteIndex(0);
    // Pan to midpoint
    setMapCenter({
      lat: (origin.lat + place.lat) / 2,
      lng: (origin.lng + place.lng) / 2,
    });
    setMapZoom(13);
  };

  const handleSwapLocations = () => {
    if (!destination) return;
    const oldOrigin = { ...origin };
    setOrigin({ lat: destination.lat, lng: destination.lng, name: destination.name });
    setDestination(oldOrigin);
  };

  const handleSavePlace = (place: Place, category: BookmarkCategory) => {
    const existingIndex = savedItems.findIndex((item) => item.placeId === place.id);
    if (existingIndex >= 0) {
      // update category
      const updated = [...savedItems];
      updated[existingIndex].category = category;
      setSavedItems(updated);
      showToast(`Updated "${place.name}" in saved list.`);
    } else {
      const newItem: SavedPlaceItem = {
        id: Date.now().toString(),
        placeId: place.id,
        category,
        savedAt: new Date().toISOString(),
      };
      setSavedItems([...savedItems, newItem]);
      showToast(`Saved "${place.name}" to your ${category.replace('_', ' ')}.`);
    }
  };

  const handleRemoveSaved = (placeId: string) => {
    setSavedItems(savedItems.filter((i) => i.placeId !== placeId));
    showToast('Removed from saved places.');
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported in this browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        };
        setUserLocation(coords);
        setMapCenter({ lat: coords.lat, lng: coords.lng });
        setMapZoom(15);
        setOrigin({ lat: coords.lat, lng: coords.lng, name: 'Your Current Location' });
        setIsLocating(false);
        showToast('Located your position.');
      },
      () => {
        setIsLocating(false);
        // Fallback gracefully to San Francisco downtown
        const defaultLoc = { lat: 37.7749, lng: -122.4194 };
        setUserLocation(defaultLoc);
        setMapCenter(defaultLoc);
        setMapZoom(14);
        setOrigin({ lat: defaultLoc.lat, lng: defaultLoc.lng, name: 'San Francisco (Current Location)' });
        showToast('Location permission denied or unavailable. Centering on SF.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-100 flex flex-col font-sans select-none">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900/90 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm animate-in fade-in slide-in-from-top-2 flex items-center space-x-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ApiKeyNotice (top-right information) */}
      <ApiKeyNotice hasKey={Boolean(apiKey)} />

      {/* Main Map Viewport */}
      <div className="absolute inset-0 w-full h-full z-0">
        {apiKey ? (
          <GoogleMapView
            apiKey={apiKey}
            center={mapCenter}
            zoom={mapZoom}
            places={filteredPlaces}
            selectedPlace={selectedPlace}
            onSelectPlace={handleSelectPlace}
            activeRoute={activeRoute}
            layerType={layerType}
            showTraffic={showTraffic}
            showTransit={showTransit}
            userLocation={userLocation}
            onMapClick={() => {
              if (!isDirectionsOpen) {
                setSelectedPlace(null);
              }
            }}
          />
        ) : (
          <FallbackMapView
            center={mapCenter}
            zoom={mapZoom}
            places={filteredPlaces}
            selectedPlace={selectedPlace}
            onSelectPlace={handleSelectPlace}
            activeRoute={activeRoute}
            layerType={layerType}
            showTraffic={showTraffic}
            showTransit={showTransit}
            userLocation={userLocation}
            onMapClick={() => {
              if (!isDirectionsOpen) {
                setSelectedPlace(null);
              }
            }}
          />
        )}
      </div>

      {/* Top Floating Overlay (Search Bar & Category Chips) */}
      <div className="absolute top-4 left-4 right-4 md:right-auto md:w-[410px] z-30 flex flex-col space-y-2 pointer-events-none">
        {/* Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={(q) => {
            const matched = POPULAR_PLACES.find((p) =>
              p.name.toLowerCase().includes(q.toLowerCase())
            );
            if (matched) {
              handleSelectPlace(matched);
            }
          }}
          onSelectPlace={handleSelectPlace}
          onOpenDirections={() => {
            setIsDirectionsOpen(!isDirectionsOpen);
            if (!isDirectionsOpen && selectedPlace) {
              setDestination({
                lat: selectedPlace.lat,
                lng: selectedPlace.lng,
                name: selectedPlace.name,
              });
            }
          }}
          onOpenSaved={() => setIsSavedModalOpen(true)}
          allPlaces={POPULAR_PLACES}
          isDirectionsOpen={isDirectionsOpen}
        />

        {/* Category Filter Chips */}
        {!isDirectionsOpen && (
          <CategoryChips
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              if (cat !== 'all') {
                const firstMatch = POPULAR_PLACES.find((p) => p.category === cat);
                if (firstMatch) {
                  setMapCenter({ lat: firstMatch.lat, lng: firstMatch.lng });
                }
              }
            }}
          />
        )}

        {/* Side Panel on Desktop: Directions OR Place Details */}
        <div className="hidden md:block pt-1 pointer-events-none">
          {isDirectionsOpen ? (
            <DirectionsPanel
              originName={origin.name}
              destinationName={destination?.name || ''}
              travelMode={travelMode}
              routes={computedRoutes}
              selectedRouteIndex={selectedRouteIndex}
              onSelectRouteIndex={setSelectedRouteIndex}
              onChangeTravelMode={setTravelMode}
              onSwapLocations={handleSwapLocations}
              onClose={() => {
                setIsDirectionsOpen(false);
                setIsNavigating(false);
              }}
              onStartNavigation={() => {
                setIsNavigating(true);
                showToast('Turn-by-turn navigation started.');
              }}
              isNavigating={isNavigating}
              onStopNavigation={() => setIsNavigating(false)}
              availablePlaces={POPULAR_PLACES}
              onSelectDestinationPlace={(place) => {
                setDestination({ lat: place.lat, lng: place.lng, name: place.name });
                setMapCenter({ lat: place.lat, lng: place.lng });
              }}
            />
          ) : selectedPlace ? (
            <PlaceCard
              place={selectedPlace}
              onClose={() => setSelectedPlace(null)}
              onGetDirections={handleStartDirections}
              onSavePlace={handleSavePlace}
              isSaved={savedItems.some((i) => i.placeId === selectedPlace.id)}
              savedCategory={savedItems.find((i) => i.placeId === selectedPlace.id)?.category}
              onFindNearby={(place) => {
                setSelectedCategory('all');
                setSearchQuery('');
                setMapCenter({ lat: place.lat, lng: place.lng });
                setMapZoom(15);
                showToast(`Showing spots near ${place.name}`);
              }}
            />
          ) : null}
        </div>
      </div>

      {/* Mobile Bottom Sheet for PlaceCard or Directions */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 z-30 pointer-events-none p-3 max-h-[70vh] flex flex-col justify-end">
        {isDirectionsOpen ? (
          <DirectionsPanel
            originName={origin.name}
            destinationName={destination?.name || ''}
            travelMode={travelMode}
            routes={computedRoutes}
            selectedRouteIndex={selectedRouteIndex}
            onSelectRouteIndex={setSelectedRouteIndex}
            onChangeTravelMode={setTravelMode}
            onSwapLocations={handleSwapLocations}
            onClose={() => {
              setIsDirectionsOpen(false);
              setIsNavigating(false);
            }}
            onStartNavigation={() => {
              setIsNavigating(true);
              showToast('Turn-by-turn navigation started.');
            }}
            isNavigating={isNavigating}
            onStopNavigation={() => setIsNavigating(false)}
            availablePlaces={POPULAR_PLACES}
            onSelectDestinationPlace={(place) => {
              setDestination({ lat: place.lat, lng: place.lng, name: place.name });
              setMapCenter({ lat: place.lat, lng: place.lng });
            }}
          />
        ) : selectedPlace ? (
          <PlaceCard
            place={selectedPlace}
            onClose={() => setSelectedPlace(null)}
            onGetDirections={handleStartDirections}
            onSavePlace={handleSavePlace}
            isSaved={savedItems.some((i) => i.placeId === selectedPlace.id)}
            savedCategory={savedItems.find((i) => i.placeId === selectedPlace.id)?.category}
            onFindNearby={(place) => {
              setSelectedCategory('all');
              setSearchQuery('');
              setMapCenter({ lat: place.lat, lng: place.lng });
              setMapZoom(15);
            }}
          />
        ) : null}
      </div>

      {/* Floating Map Controls in Bottom-Right */}
      <div className="absolute bottom-6 right-4 z-20">
        <MapControls
          onZoomIn={() => setMapZoom((prev) => Math.min(prev + 1, 19))}
          onZoomOut={() => setMapZoom((prev) => Math.max(prev - 1, 3))}
          onLocateMe={handleLocateMe}
          isLocating={isLocating}
          layerType={layerType}
          onChangeLayerType={setLayerType}
          showTraffic={showTraffic}
          onToggleTraffic={() => {
            setShowTraffic(!showTraffic);
            showToast(!showTraffic ? 'Traffic layer enabled' : 'Traffic layer disabled');
          }}
          showTransit={showTransit}
          onToggleTransit={() => {
            setShowTransit(!showTransit);
            showToast(!showTransit ? 'Transit layer enabled' : 'Transit layer disabled');
          }}
          onResetBearing={() => {
            setMapCenter({ lat: 37.7749, lng: -122.4194 });
            setMapZoom(13);
            showToast('Reset map to default view');
          }}
          onOpenStreetView={() => {
            if (selectedPlace) {
              setStreetViewPlace(selectedPlace);
              setIsStreetViewOpen(true);
            } else {
              setStreetViewPlace(POPULAR_PLACES[0]);
              setIsStreetViewOpen(true);
            }
          }}
        />
      </div>

      {/* Saved Places Modal */}
      <SavedPlacesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedItems={savedItems}
        allPlaces={POPULAR_PLACES}
        onSelectPlace={handleSelectPlace}
        onRemoveSaved={handleRemoveSaved}
        onGetDirections={handleStartDirections}
      />

      {/* Street View Modal */}
      <StreetViewModal
        isOpen={isStreetViewOpen}
        onClose={() => setIsStreetViewOpen(false)}
        place={streetViewPlace}
      />
    </div>
  );
}
