// Source: Google Maps Platform Code Assist
import React, { useEffect, useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
} from '@vis.gl/react-google-maps';
import { Place, MapLayerType, RouteOption } from '../types';

interface GoogleMapViewProps {
  apiKey: string;
  center: { lat: number; lng: number };
  zoom: number;
  places: Place[];
  selectedPlace: Place | null;
  onSelectPlace: (place: Place) => void;
  activeRoute: RouteOption | null;
  layerType: MapLayerType;
  showTraffic: boolean;
  showTransit: boolean;
  userLocation: { lat: number; lng: number } | null;
  onMapClick?: () => void;
}

// Map Updater Component to handle camera changes and traffic layer
const MapController: React.FC<{
  center: { lat: number; lng: number };
  zoom: number;
  showTraffic: boolean;
  showTransit: boolean;
  activeRoute: RouteOption | null;
}> = ({ center, zoom, showTraffic, showTransit, activeRoute }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    map.panTo(center);
    map.setZoom(zoom);
  }, [map, center, zoom]);

  // Handle Traffic Layer
  useEffect(() => {
    if (!map || typeof google === 'undefined' || !google.maps) return;
    let trafficLayer: google.maps.TrafficLayer | null = null;

    if (showTraffic) {
      trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);
    }

    return () => {
      if (trafficLayer) {
        trafficLayer.setMap(null);
      }
    };
  }, [map, showTraffic]);

  // Handle Transit Layer
  useEffect(() => {
    if (!map || typeof google === 'undefined' || !google.maps) return;
    let transitLayer: google.maps.TransitLayer | null = null;

    if (showTransit) {
      transitLayer = new google.maps.TransitLayer();
      transitLayer.setMap(map);
    }

    return () => {
      if (transitLayer) {
        transitLayer.setMap(null);
      }
    };
  }, [map, showTransit]);

  // Draw Polyline for active route
  useEffect(() => {
    if (!map || !activeRoute || typeof google === 'undefined' || !google.maps) return;

    const path = activeRoute.polyline.map(([lat, lng]) => ({ lat, lng }));
    const polyline = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: '#2563EB',
      strokeOpacity: 0.9,
      strokeWeight: 6,
      map,
    });

    // Fit bounds to polyline
    const bounds = new google.maps.LatLngBounds();
    path.forEach((pt) => bounds.extend(pt));
    map.fitBounds(bounds, { top: 80, bottom: 80, left: 80, right: 80 });

    return () => {
      polyline.setMap(null);
    };
  }, [map, activeRoute]);

  return null;
};

export const GoogleMapView: React.FC<GoogleMapViewProps> = ({
  apiKey,
  center,
  zoom,
  places,
  selectedPlace,
  onSelectPlace,
  activeRoute,
  layerType,
  showTraffic,
  showTransit,
  userLocation,
  onMapClick,
}) => {
  const [hoveredPlace, setHoveredPlace] = useState<Place | null>(null);

  const getMarkerColor = (category: Place['category']) => {
    switch (category) {
      case 'restaurant':
        return '#EA580C'; // orange
      case 'cafe':
        return '#D97706'; // amber
      case 'hotel':
        return '#9333EA'; // purple
      case 'gas':
        return '#2563EB'; // blue
      case 'grocery':
        return '#16A34A'; // green
      case 'attraction':
      case 'landmark':
        return '#E11D48'; // rose
      case 'park':
        return '#059669'; // emerald
      default:
        return '#EF4444'; // red
    }
  };

  return (
    <div className="w-full h-full relative" id="google-maps-canvas-container">
      <APIProvider apiKey={apiKey} libraries={['places', 'routes', 'marker', 'geometry']}>
        <Map
          id="google-main-map"
          defaultCenter={{ lat: center.lat, lng: center.lng }}
          defaultZoom={zoom}
          mapId="DEMO_MAP_ID"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          mapTypeId={layerType}
          disableDefaultUI={true}
          gestureHandling="greedy"
          onClick={() => onMapClick?.()}
          style={{ width: '100%', height: '100%' }}
        >
          <MapController
            center={center}
            zoom={zoom}
            showTraffic={showTraffic}
            showTransit={showTransit}
            activeRoute={activeRoute}
          />

          {/* User Location Pulse Marker */}
          {userLocation && (
            <AdvancedMarker position={{ lat: userLocation.lat, lng: userLocation.lng }}>
              <div className="relative flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-500 rounded-full animate-ping absolute opacity-75" />
                <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-md relative z-10" />
              </div>
            </AdvancedMarker>
          )}

          {/* Place Markers */}
          {places.map((place) => {
            const isSelected = selectedPlace?.id === place.id;
            const pinBg = getMarkerColor(place.category);

            return (
              <AdvancedMarker
                key={place.id}
                position={{ lat: place.lat, lng: place.lng }}
                onClick={() => onSelectPlace(place)}
                onMouseEnter={() => setHoveredPlace(place)}
                onMouseLeave={() => setHoveredPlace(null)}
                title={place.name}
              >
                <Pin
                  background={isSelected ? '#2563EB' : pinBg}
                  borderColor="#FFFFFF"
                  glyphColor="#FFFFFF"
                  scale={isSelected ? 1.25 : 1.0}
                />
              </AdvancedMarker>
            );
          })}

          {/* Place hover InfoWindow */}
          {hoveredPlace && !selectedPlace && (
            <InfoWindow
              position={{ lat: hoveredPlace.lat, lng: hoveredPlace.lng }}
              headerDisabled={true}
            >
              <div className="p-1 text-xs max-w-[200px]">
                <div className="font-bold text-gray-900 truncate">{hoveredPlace.name}</div>
                <div className="text-gray-500 text-[11px] truncate">{hoveredPlace.categoryLabel}</div>
                <div className="text-amber-500 font-semibold text-[11px]">★ {hoveredPlace.rating}</div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
};
