import React, { useState } from 'react';
import {
  Car,
  Train,
  Footprints,
  Bike,
  ArrowUpDown,
  X,
  Navigation,
  CornerDownRight,
  CornerDownLeft,
  ArrowUp,
  Flag,
  MapPin,
  Clock,
  Radio,
  Play,
  CheckCircle,
} from 'lucide-react';
import { TravelMode, RouteOption, Place } from '../types';

interface DirectionsPanelProps {
  originName: string;
  destinationName: string;
  travelMode: TravelMode;
  routes: RouteOption[];
  selectedRouteIndex: number;
  onSelectRouteIndex: (index: number) => void;
  onChangeTravelMode: (mode: TravelMode) => void;
  onSwapLocations: () => void;
  onClose: () => void;
  onStartNavigation: () => void;
  isNavigating: boolean;
  onStopNavigation: () => void;
  onOriginChange?: (val: string) => void;
  onDestinationChange?: (val: string) => void;
  availablePlaces: Place[];
  onSelectDestinationPlace: (place: Place) => void;
}

export const DirectionsPanel: React.FC<DirectionsPanelProps> = ({
  originName,
  destinationName,
  travelMode,
  routes,
  selectedRouteIndex,
  onSelectRouteIndex,
  onChangeTravelMode,
  onSwapLocations,
  onClose,
  onStartNavigation,
  isNavigating,
  onStopNavigation,
  availablePlaces,
  onSelectDestinationPlace,
}) => {
  const [showStepDetails, setShowStepDetails] = useState(true);
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  const activeRoute = routes[selectedRouteIndex] || routes[0];

  const travelModes: { mode: TravelMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'DRIVING', label: 'Drive', icon: <Car className="w-4 h-4" /> },
    { mode: 'TRANSIT', label: 'Transit', icon: <Train className="w-4 h-4" /> },
    { mode: 'WALKING', label: 'Walk', icon: <Footprints className="w-4 h-4" /> },
    { mode: 'BICYCLING', label: 'Cycle', icon: <Bike className="w-4 h-4" /> },
  ];

  const getManeuverIcon = (maneuver?: string) => {
    switch (maneuver) {
      case 'turn-left':
        return <CornerDownLeft className="w-4 h-4 text-blue-600" />;
      case 'turn-right':
        return <CornerDownRight className="w-4 h-4 text-blue-600" />;
      case 'merge':
        return <Navigation className="w-4 h-4 text-blue-600 transform rotate-45" />;
      case 'destination':
        return <Flag className="w-4 h-4 text-red-600" />;
      default:
        return <ArrowUp className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div
      id="maps-directions-panel"
      className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[85vh] w-full md:w-[410px] pointer-events-auto transition-all animate-in fade-in slide-in-from-top-2 md:slide-in-from-left-2 duration-200"
    >
      {/* Top Header with Close and Travel Mode Tabs */}
      <div className="bg-white p-4 border-b border-gray-100 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900 flex items-center">
            <Navigation className="w-4 h-4 mr-2 text-blue-600 transform rotate-45" />
            Directions
          </h2>
          <button
            type="button"
            id="btn-close-directions"
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Travel Mode Pills */}
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-gray-100 rounded-xl">
          {travelModes.map(({ mode, label, icon }) => {
            const isActive = travelMode === mode;
            return (
              <button
                key={mode}
                type="button"
                id={`mode-btn-${mode}`}
                onClick={() => onChangeTravelMode(mode)}
                className={`flex items-center justify-center py-2 px-1 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="mr-1.5">{icon}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Origin & Destination Inputs */}
        <div className="mt-4 flex items-center space-x-2">
          {/* Visual dots */}
          <div className="flex flex-col items-center justify-between h-16 py-1">
            <div className="w-3 h-3 rounded-full border-2 border-blue-600 bg-white" />
            <div className="w-0.5 h-6 border-l border-dashed border-gray-300" />
            <div className="w-3 h-3 rounded-full bg-red-600" />
          </div>

          <div className="flex-1 space-y-2">
            {/* Origin Box */}
            <div className="bg-gray-50 rounded-xl px-3 py-2 border border-gray-200 flex items-center">
              <span className="text-xs font-medium text-gray-800 truncate flex-1">
                {originName || 'Your Location'}
              </span>
            </div>

            {/* Destination Box */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDestDropdown(!showDestDropdown)}
                className="w-full text-left bg-gray-50 rounded-xl px-3 py-2 border border-gray-200 flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <span className="text-xs font-medium text-gray-800 truncate flex-1">
                  {destinationName || 'Choose destination...'}
                </span>
                <span className="text-[10px] text-blue-600 font-semibold uppercase">Change</span>
              </button>

              {showDestDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-48 overflow-y-auto p-1 animate-in fade-in">
                  <div className="text-[10px] font-bold uppercase text-gray-400 px-2 py-1">
                    Select a Destination
                  </div>
                  {availablePlaces.map((place) => (
                    <button
                      key={place.id}
                      type="button"
                      onClick={() => {
                        onSelectDestinationPlace(place);
                        setShowDestDropdown(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 hover:bg-blue-50 text-xs rounded-lg flex items-center"
                    >
                      <MapPin className="w-3.5 h-3.5 text-red-500 mr-2 shrink-0" />
                      <div className="truncate flex-1">
                        <div className="font-semibold text-gray-800 truncate">{place.name}</div>
                        <div className="text-[10px] text-gray-500 truncate">{place.city}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Swap Button */}
          <button
            type="button"
            id="btn-swap-locations"
            onClick={onSwapLocations}
            title="Reverse starting point and destination"
            className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border border-gray-200"
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Active HUD */}
      {isNavigating && (
        <div className="bg-emerald-600 text-white p-4 shrink-0 flex items-center justify-between shadow-inner">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
              <Navigation className="w-6 h-6 transform rotate-45" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-emerald-100 font-semibold flex items-center">
                <Radio className="w-3 h-3 mr-1 animate-ping" />
                Turn-by-turn Navigation Active
              </div>
              <div className="text-sm font-bold mt-0.5">
                {activeRoute?.steps[0]?.instruction || 'Proceed onto route'}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onStopNavigation}
            className="bg-white text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors shadow-sm"
          >
            Exit
          </button>
        </div>
      )}

      {/* Route Options List & Details */}
      <div className="overflow-y-auto flex-1 p-4 space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Route Options
        </div>

        {routes.map((route, index) => {
          const isSelected = index === selectedRouteIndex;
          return (
            <div
              key={route.id}
              onClick={() => onSelectRouteIndex(index)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/50 shadow-sm ring-1 ring-blue-600'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline space-x-2">
                  <span className="text-lg font-bold text-gray-900">{route.durationText}</span>
                  <span className="text-xs text-gray-500 font-medium">({route.distanceText})</span>
                </div>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    route.trafficCondition === 'Fast'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {route.trafficCondition === 'Fast' ? 'Fastest route' : 'Normal traffic'}
                </span>
              </div>
              <div className="text-xs text-gray-600 mt-1">{route.summary}</div>
              {route.departureTime && route.arrivalTime && (
                <div className="flex items-center text-[11px] text-gray-500 mt-1 space-x-2">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span>
                    Depart {route.departureTime} · Arrive {route.arrivalTime}
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {/* Start Navigation Action Button */}
        {activeRoute && !isNavigating && (
          <button
            type="button"
            id="btn-start-navigation"
            onClick={onStartNavigation}
            className="w-full mt-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all hover:shadow-lg"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start Navigation</span>
          </button>
        )}

        {/* Turn-by-Turn Steps Accordion */}
        {activeRoute && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowStepDetails(!showStepDetails)}
              className="w-full flex items-center justify-between text-xs font-semibold text-gray-700 py-2 border-t border-gray-100"
            >
              <span>Turn-by-turn Directions ({activeRoute.steps.length} steps)</span>
              <span className="text-blue-600 font-medium">
                {showStepDetails ? 'Hide' : 'Show'}
              </span>
            </button>

            {showStepDetails && (
              <div className="space-y-2 mt-2">
                {activeRoute.steps.map((step, idx) => (
                  <div
                    key={step.id}
                    className="flex items-start space-x-3 p-2.5 rounded-lg bg-gray-50 text-xs border border-gray-100"
                  >
                    <div className="mt-0.5 p-1 rounded-md bg-white border border-gray-200">
                      {getManeuverIcon(step.maneuver)}
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-800 font-medium leading-tight">
                        {step.instruction}
                      </div>
                      <div className="text-gray-400 text-[11px] mt-0.5">
                        {step.distance} ({step.duration})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
