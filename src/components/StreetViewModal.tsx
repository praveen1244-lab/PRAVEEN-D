import React from 'react';
import { X, Eye, Compass, Maximize2 } from 'lucide-react';
import { Place } from '../types';

interface StreetViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  place: Place | null;
}

export const StreetViewModal: React.FC<StreetViewModalProps> = ({
  isOpen,
  onClose,
  place,
}) => {
  if (!isOpen || !place) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div
        id="street-view-modal-content"
        className="bg-black text-white w-full max-w-3xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 relative"
      >
        {/* Top Control Bar */}
        <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between pointer-events-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center shadow">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{place.name}</h3>
              <p className="text-xs text-white/70">360° Street View & Surroundings</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white bg-black/40 hover:bg-black/70 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Panorama / 360 viewer canvas */}
        <div className="relative w-full h-[500px] overflow-hidden bg-gray-950 flex items-center justify-center">
          <img
            src={place.photoUrl}
            alt={place.name}
            className="w-full h-full object-cover filter brightness-95 scale-105 transition-transform duration-1000 ease-out"
          />

          {/* Street View UI Compass overlay */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs">
            <Compass className="w-4 h-4 text-red-400" />
            <span className="font-mono">Heading: 312° NW</span>
            <span className="text-white/40">|</span>
            <span>{place.lat.toFixed(4)}, {place.lng.toFixed(4)}</span>
          </div>

          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs flex items-center text-white/90">
            <span className="mr-2">Imagery: Google Street View (Simulation)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
