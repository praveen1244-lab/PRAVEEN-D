import React, { useState } from 'react';
import {
  Layers,
  Locate,
  Plus,
  Minus,
  Compass,
  Car,
  Train,
  Check,
  Eye,
} from 'lucide-react';
import { MapLayerType } from '../types';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onLocateMe: () => void;
  isLocating: boolean;
  layerType: MapLayerType;
  onChangeLayerType: (type: MapLayerType) => void;
  showTraffic: boolean;
  onToggleTraffic: () => void;
  showTransit: boolean;
  onToggleTransit: () => void;
  onResetBearing: () => void;
  onOpenStreetView?: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onLocateMe,
  isLocating,
  layerType,
  onChangeLayerType,
  showTraffic,
  onToggleTraffic,
  showTransit,
  onToggleTransit,
  onResetBearing,
  onOpenStreetView,
}) => {
  const [showLayersMenu, setShowLayersMenu] = useState(false);

  return (
    <div className="flex flex-col items-end space-y-2.5 pointer-events-auto select-none">
      {/* Layers Menu Popover */}
      {showLayersMenu && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 mb-1 w-64 animate-in fade-in zoom-in-95">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Map Type
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3">
            {/* Default Roadmap */}
            <button
              type="button"
              id="layer-type-roadmap"
              onClick={() => onChangeLayerType('roadmap')}
              className={`flex flex-col items-center p-2 rounded-xl border transition-all ${
                layerType === 'roadmap'
                  ? 'border-blue-600 bg-blue-50/70 text-blue-700 font-bold'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center mb-1 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-amber-50 relative flex items-center justify-center">
                  <div className="w-full h-1 bg-amber-400 rotate-12" />
                </div>
              </div>
              <span className="text-[11px]">Default</span>
            </button>

            {/* Satellite */}
            <button
              type="button"
              id="layer-type-satellite"
              onClick={() => onChangeLayerType('satellite')}
              className={`flex flex-col items-center p-2 rounded-xl border transition-all ${
                layerType === 'satellite'
                  ? 'border-blue-600 bg-blue-50/70 text-blue-700 font-bold'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-600 flex items-center justify-center mb-1 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-900 to-emerald-950 flex items-center justify-center">
                  <span className="text-[10px] text-white/80 font-mono">SAT</span>
                </div>
              </div>
              <span className="text-[11px]">Satellite</span>
            </button>

            {/* Terrain */}
            <button
              type="button"
              id="layer-type-terrain"
              onClick={() => onChangeLayerType('terrain')}
              className={`flex flex-col items-center p-2 rounded-xl border transition-all ${
                layerType === 'terrain'
                  ? 'border-blue-600 bg-blue-50/70 text-blue-700 font-bold'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center mb-1 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                  <span className="text-[10px] text-amber-900 font-mono">TER</span>
                </div>
              </div>
              <span className="text-[11px]">Terrain</span>
            </button>
          </div>

          <div className="border-t border-gray-100 pt-2 space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              Map Details
            </div>

            {/* Traffic Toggle */}
            <button
              type="button"
              id="btn-toggle-traffic"
              onClick={onToggleTraffic}
              className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-colors ${
                showTraffic ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Car className="w-4 h-4 mr-2 text-emerald-600" />
                <span>Traffic</span>
              </div>
              {showTraffic && <Check className="w-4 h-4 text-emerald-600" />}
            </button>

            {/* Transit Toggle */}
            <button
              type="button"
              id="btn-toggle-transit"
              onClick={onToggleTransit}
              className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-colors ${
                showTransit ? 'bg-blue-50 text-blue-800 font-semibold' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Train className="w-4 h-4 mr-2 text-blue-600" />
                <span>Transit lines</span>
              </div>
              {showTransit && <Check className="w-4 h-4 text-blue-600" />}
            </button>
          </div>
        </div>
      )}

      {/* Layer Switcher Button */}
      <button
        type="button"
        id="btn-map-layers"
        onClick={() => setShowLayersMenu(!showLayersMenu)}
        title="Map layers & styles"
        className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all ${
          showLayersMenu
            ? 'bg-blue-600 text-white'
            : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
        }`}
      >
        <Layers className="w-5 h-5" />
      </button>

      {/* Street View / Pegman Button */}
      {onOpenStreetView && (
        <button
          type="button"
          id="btn-street-view-toggle"
          onClick={onOpenStreetView}
          title="Street View preview"
          className="w-10 h-10 rounded-full shadow-lg bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center transition-all border border-amber-600"
        >
          <Eye className="w-5 h-5" />
        </button>
      )}

      {/* Reset Compass Bearing */}
      <button
        type="button"
        id="btn-reset-compass"
        onClick={onResetBearing}
        title="Reset North direction"
        className="w-10 h-10 rounded-full shadow-lg bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 flex items-center justify-center transition-all"
      >
        <Compass className="w-5 h-5 text-red-500" />
      </button>

      {/* My Location GPS Button */}
      <button
        type="button"
        id="btn-locate-me"
        onClick={onLocateMe}
        title="Your Location"
        className={`w-10 h-10 rounded-full shadow-lg bg-white hover:bg-gray-50 border border-gray-200 flex items-center justify-center transition-all ${
          isLocating ? 'text-blue-600 animate-spin' : 'text-gray-700 hover:text-blue-600'
        }`}
      >
        <Locate className="w-5 h-5" />
      </button>

      {/* Zoom In & Out Stack */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col">
        <button
          type="button"
          id="btn-zoom-in"
          onClick={onZoomIn}
          title="Zoom in"
          className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors border-b border-gray-100"
        >
          <Plus className="w-5 h-5" />
        </button>
        <button
          type="button"
          id="btn-zoom-out"
          onClick={onZoomOut}
          title="Zoom out"
          className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Minus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
