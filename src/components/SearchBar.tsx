import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Mic, ArrowRight, Clock, MapPin, Navigation, Menu, Bookmark, Sparkles } from 'lucide-react';
import { Place } from '../types';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (query: string) => void;
  onSelectPlace: (place: Place) => void;
  onOpenDirections: () => void;
  onOpenSaved: () => void;
  allPlaces: Place[];
  isDirectionsOpen: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onSelectPlace,
  onOpenDirections,
  onOpenSaved,
  allPlaces,
  isDirectionsOpen,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Golden Gate Bridge',
    'Blue Bottle Coffee',
    'Ferry Building Marketplace'
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredPlaces = searchQuery.trim()
    ? allPlaces.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.city.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleVoiceSearch = () => {
    // Check for Web Speech API
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const windowObj = window as any;
    const SpeechRecognition = windowObj.SpeechRecognition || windowObj.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice search is not supported in this browser environment. You can type in the search bar.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);
      recognition.start();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onSearchChange(transcript);
        onSearchSubmit(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } catch {
      setIsListening(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (filteredPlaces.length > 0) {
      onSelectPlace(filteredPlaces[0]);
    }
    if (!recentSearches.includes(searchQuery.trim())) {
      setRecentSearches([searchQuery.trim(), ...recentSearches.slice(0, 4)]);
    }
    onSearchSubmit(searchQuery);
    setIsFocused(false);
  };

  const handleSelectSuggestion = (place: Place) => {
    onSelectPlace(place);
    if (!recentSearches.includes(place.name)) {
      setRecentSearches([place.name, ...recentSearches.slice(0, 4)]);
    }
    setIsFocused(false);
  };

  const handleSelectRecent = (term: string) => {
    onSearchChange(term);
    onSearchSubmit(term);
    const matched = allPlaces.find((p) => p.name.toLowerCase().includes(term.toLowerCase()));
    if (matched) {
      onSelectPlace(matched);
    }
    setIsFocused(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md pointer-events-auto select-none">
      <form
        onSubmit={handleSubmit}
        id="maps-search-form"
        className={`flex items-center bg-white rounded-full shadow-lg border transition-all duration-200 px-3.5 py-2.5 ${
          isFocused ? 'ring-2 ring-blue-500 border-transparent shadow-xl' : 'border-gray-200 hover:shadow-xl'
        }`}
      >
        <button
          type="button"
          onClick={onOpenSaved}
          id="btn-open-menu-saved"
          title="Menu & Saved Places"
          className="p-1.5 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors mr-1"
        >
          <Menu className="w-5 h-5" />
        </button>

        <input
          ref={inputRef}
          id="maps-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search Google Maps"
          className="flex-1 bg-transparent border-none outline-none text-gray-800 text-[15px] placeholder-gray-500 px-2 font-normal"
        />

        {searchQuery ? (
          <button
            type="button"
            id="btn-clear-search"
            onClick={() => {
              onSearchChange('');
              inputRef.current?.focus();
            }}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        ) : null}

        <button
          type="button"
          id="btn-voice-search"
          onClick={handleVoiceSearch}
          title="Search by voice"
          className={`p-1.5 rounded-full transition-colors ml-0.5 ${
            isListening
              ? 'bg-red-50 text-red-600 animate-pulse'
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          <Mic className="w-4 h-4" />
        </button>

        <button
          type="submit"
          id="btn-search-submit"
          title="Search"
          className="p-1.5 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors ml-0.5"
        >
          <Search className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-6 bg-gray-200 mx-1.5" />

        <button
          type="button"
          id="btn-toggle-directions"
          onClick={onOpenDirections}
          title="Get Directions"
          className={`p-2 rounded-full transition-all ${
            isDirectionsOpen
              ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700'
              : 'text-blue-600 hover:bg-blue-50'
          }`}
        >
          <Navigation className="w-4 h-4 transform rotate-45" />
        </button>
      </form>

      {/* Autocomplete & Recents Dropdown */}
      {isFocused && (
        <div
          id="search-autocomplete-dropdown"
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {filteredPlaces.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Locations & Places
              </div>
              {filteredPlaces.map((place) => (
                <button
                  key={place.id}
                  type="button"
                  id={`suggested-place-${place.id}`}
                  onClick={() => handleSelectSuggestion(place)}
                  className="w-full flex items-center px-4 py-2.5 hover:bg-gray-50 text-left transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-3 shrink-0 group-hover:bg-blue-100">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{place.name}</div>
                    <div className="text-xs text-gray-500 truncate">{place.address}</div>
                  </div>
                  <div className="text-xs text-gray-400 ml-2 shrink-0">{place.categoryLabel}</div>
                </button>
              ))}
            </div>
          ) : searchQuery.trim() ? (
            <div className="px-5 py-4 text-center text-sm text-gray-500">
              No matching locations found for "{searchQuery}". Press Enter to search everywhere.
            </div>
          ) : (
            <div className="py-2">
              {recentSearches.length > 0 && (
                <>
                  <div className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center justify-between">
                    <span>Recent Searches</span>
                    <button
                      type="button"
                      onClick={() => setRecentSearches([])}
                      className="text-gray-400 hover:text-gray-600 text-[11px] normal-case"
                    >
                      Clear
                    </button>
                  </div>
                  {recentSearches.map((term, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSelectRecent(term)}
                      className="w-full flex items-center px-4 py-2.5 hover:bg-gray-50 text-left transition-colors"
                    >
                      <Clock className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
                      <span className="text-sm text-gray-700 truncate">{term}</span>
                    </button>
                  ))}
                </>
              )}

              <div className="border-t border-gray-100 my-1" />

              <div className="px-4 py-2">
                <button
                  type="button"
                  onClick={() => {
                    onOpenSaved();
                    setIsFocused(false);
                  }}
                  className="w-full flex items-center px-2 py-1.5 rounded-lg hover:bg-gray-50 text-left text-sm text-gray-700"
                >
                  <Bookmark className="w-4 h-4 text-blue-600 mr-3" />
                  <span>View Saved Places</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
