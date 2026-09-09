import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Place, MapLayerType, RouteOption } from '../types';

interface FallbackMapViewProps {
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

export const FallbackMapView: React.FC<FallbackMapViewProps> = ({
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
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const routeLayerRef = useRef<L.Polyline | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!containerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(containerRef.current, {
      center: [center.lat, center.lng],
      zoom: zoom,
      zoomControl: false, // We use custom controls
      attributionControl: false,
    });

    map.on('click', () => {
      onMapClick?.();
    });

    mapInstanceRef.current = map;
    markersLayerRef.current = L.layerGroup().addTo(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Center & Zoom
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.setView([center.lat, center.lng], zoom, { animate: true });
  }, [center.lat, center.lng, zoom]);

  // Update Base Tile Layer based on layerType
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    let url = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
    let subdomains = 'abcd';
    let maxZoom = 20;

    if (layerType === 'satellite') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      subdomains = 'abc';
      maxZoom = 19;
    } else if (layerType === 'terrain') {
      url = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      subdomains = 'abc';
      maxZoom = 17;
    }

    const tileLayer = L.tileLayer(url, {
      subdomains,
      maxZoom,
    }).addTo(map);

    tileLayerRef.current = tileLayer;
  }, [layerType]);

  // Update Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    const getPinSvg = (color: string, isSelected: boolean) => `
      <svg width="${isSelected ? 36 : 28}" height="${isSelected ? 44 : 34}" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.37 0 0 5.37 0 12C0 20.25 12 30 12 30C12 30 24 20.25 24 12C24 5.37 18.63 0 12 0Z" fill="${color}" stroke="#FFFFFF" stroke-width="2"/>
        <circle cx="12" cy="11" r="4.5" fill="#FFFFFF"/>
      </svg>
    `;

    places.forEach((place) => {
      const isSelected = selectedPlace?.id === place.id;
      let color = '#EF4444'; // Red default
      if (place.category === 'restaurant') color = '#EA580C';
      else if (place.category === 'cafe') color = '#D97706';
      else if (place.category === 'hotel') color = '#9333EA';
      else if (place.category === 'gas') color = '#2563EB';
      else if (place.category === 'grocery') color = '#16A34A';
      else if (place.category === 'park') color = '#059669';
      else if (place.category === 'attraction' || place.category === 'landmark') color = '#E11D48';

      if (isSelected) color = '#2563EB';

      const icon = L.divIcon({
        className: 'custom-map-marker',
        html: getPinSvg(color, isSelected),
        iconSize: [isSelected ? 36 : 28, isSelected ? 44 : 34],
        iconAnchor: [isSelected ? 18 : 14, isSelected ? 44 : 34],
      });

      const marker = L.marker([place.lat, place.lng], { icon });

      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        onSelectPlace(place);
      });

      // Tooltip on hover
      marker.bindTooltip(
        `<div class="text-xs font-semibold py-0.5 px-1">${place.name}</div>`,
        { direction: 'top', offset: [0, -28] }
      );

      markersGroup.addLayer(marker);
    });
  }, [places, selectedPlace]);

  // Update Route Polyline
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (routeLayerRef.current) {
      map.removeLayer(routeLayerRef.current);
      routeLayerRef.current = null;
    }

    if (activeRoute && activeRoute.polyline.length > 0) {
      const latlngs: L.LatLngTuple[] = activeRoute.polyline.map(([lat, lng]) => [lat, lng]);
      const polyline = L.polyline(latlngs, {
        color: '#2563EB',
        weight: 6,
        opacity: 0.9,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map);

      routeLayerRef.current = polyline;

      // Fit map to route bounds
      map.fitBounds(polyline.getBounds(), { padding: [80, 80] });
    }
  }, [activeRoute]);

  // User Location Marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (userMarkerRef.current) {
      map.removeLayer(userMarkerRef.current);
      userMarkerRef.current = null;
    }

    if (userLocation) {
      const userIcon = L.divIcon({
        className: 'user-location-marker',
        html: `
          <div class="relative flex items-center justify-center w-8 h-8">
            <div class="w-8 h-8 rounded-full bg-blue-500/40 animate-ping absolute"></div>
            <div class="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-md relative z-10"></div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon }).addTo(map);
      userMarkerRef.current = marker;
    }
  }, [userLocation]);

  return (
    <div
      ref={containerRef}
      id="fallback-leaflet-map"
      className="w-full h-full relative z-0"
      style={{ height: '100%', width: '100%' }}
    />
  );
};
