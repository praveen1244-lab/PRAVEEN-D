import React, { useState } from 'react';
import { X, Heart, BookmarkPlus, Star, Trash2, MapPin, ExternalLink, Navigation } from 'lucide-react';
import { Place, SavedPlaceItem, BookmarkCategory } from '../types';

interface SavedPlacesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems: SavedPlaceItem[];
  allPlaces: Place[];
  onSelectPlace: (place: Place) => void;
  onRemoveSaved: (placeId: string) => void;
  onGetDirections: (place: Place) => void;
}

export const SavedPlacesModal: React.FC<SavedPlacesModalProps> = ({
  isOpen,
  onClose,
  savedItems,
  allPlaces,
  onSelectPlace,
  onRemoveSaved,
  onGetDirections,
}) => {
  const [activeTab, setActiveTab] = useState<BookmarkCategory>('favorites');

  if (!isOpen) return null;

  const currentTabItems = savedItems.filter((item) => item.category === activeTab);

  const tabs: { id: BookmarkCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'favorites', label: 'Favorites', icon: <Heart className="w-4 h-4 text-rose-500 mr-1.5" /> },
    { id: 'want_to_go', label: 'Want to go', icon: <BookmarkPlus className="w-4 h-4 text-emerald-500 mr-1.5" /> },
    { id: 'starred', label: 'Starred places', icon: <Star className="w-4 h-4 text-amber-500 mr-1.5" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
      <div
        id="saved-places-modal-content"
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-bold text-gray-900">Saved Places</h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
              {savedItems.length} saved
            </span>
          </div>
          <button
            type="button"
            id="btn-close-saved-modal"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-3 border-b border-gray-100 bg-gray-50/70 p-1.5 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              id={`tab-saved-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center py-2 px-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* List of Saved Places */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {currentTabItems.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-sm">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 text-gray-400">
                <MapPin className="w-6 h-6" />
              </div>
              <p className="font-medium text-gray-700">No places saved in this list yet.</p>
              <p className="text-xs text-gray-400 mt-1">
                Explore places on the map and click "Save" to organize your favorite spots.
              </p>
            </div>
          ) : (
            currentTabItems.map((item) => {
              const place = allPlaces.find((p) => p.id === item.placeId);
              if (!place) return null;

              return (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 p-3 rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all group"
                >
                  <img
                    src={place.photoUrl}
                    alt={place.name}
                    className="w-16 h-16 rounded-lg object-cover shrink-0 cursor-pointer"
                    onClick={() => {
                      onSelectPlace(place);
                      onClose();
                    }}
                  />

                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => {
                      onSelectPlace(place);
                      onClose();
                    }}
                  >
                    <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                      {place.name}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">{place.address}</p>
                    <div className="flex items-center space-x-2 mt-1 text-[11px] text-gray-400">
                      <span className="text-amber-600 font-semibold">★ {place.rating}</span>
                      <span>•</span>
                      <span>{place.categoryLabel}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        onGetDirections(place);
                        onClose();
                      }}
                      title="Directions"
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Navigation className="w-4 h-4 transform rotate-45" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveSaved(item.placeId)}
                      title="Remove from saved"
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
