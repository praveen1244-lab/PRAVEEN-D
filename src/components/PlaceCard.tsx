import React, { useState } from 'react';
import {
  X,
  Star,
  Navigation,
  Bookmark,
  Share2,
  MapPin,
  Clock,
  Phone,
  Globe,
  ChevronDown,
  ChevronUp,
  Check,
  Heart,
  BookmarkPlus,
  Compass,
  ExternalLink,
} from 'lucide-react';
import { Place, BookmarkCategory } from '../types';

interface PlaceCardProps {
  place: Place;
  onClose: () => void;
  onGetDirections: (place: Place) => void;
  onSavePlace: (place: Place, category: BookmarkCategory) => void;
  isSaved: boolean;
  savedCategory?: BookmarkCategory;
  onFindNearby: (place: Place) => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  onClose,
  onGetDirections,
  onSavePlace,
  isSaved,
  savedCategory,
  onFindNearby,
}) => {
  const [showHours, setShowHours] = useState(false);
  const [showSaveMenu, setShowSaveMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const photos = place.photos && place.photos.length > 0 ? place.photos : [place.photoUrl];

  const handleShare = () => {
    navigator.clipboard.writeText(`${place.name} - ${place.address}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      id={`place-card-detail-${place.id}`}
      className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[85vh] w-full md:w-[410px] pointer-events-auto transition-all animate-in fade-in slide-in-from-bottom-2 md:slide-in-from-left-2 duration-200"
    >
      {/* Photo Header */}
      <div className="relative h-48 w-full bg-gray-100 shrink-0">
        <img
          src={photos[activePhotoIndex]}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          id="btn-close-place-card"
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-colors"
          title="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Multi-photo indicators */}
        {photos.length > 1 && (
          <div className="absolute bottom-3 right-3 flex space-x-1.5 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
            {photos.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePhotoIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activePhotoIndex === idx ? 'bg-white w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* City tag on photo */}
        <div className="absolute bottom-3 left-3 flex items-center bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-white text-xs font-medium">
          <MapPin className="w-3 h-3 mr-1 text-red-400" />
          {place.city}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="p-5 overflow-y-auto flex-1 space-y-4">
        {/* Title & Ratings */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">{place.name}</h2>
          <div className="flex items-center space-x-2 mt-1.5 text-sm">
            <div className="flex items-center text-amber-500 font-semibold">
              <span className="mr-1">{place.rating.toFixed(1)}</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(place.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : i < place.rating
                        ? 'fill-amber-200 text-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">({place.reviewCount.toLocaleString()})</span>
            {place.priceLevel && (
              <>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600 font-medium">{place.priceLevel}</span>
              </>
            )}
          </div>
          <div className="text-xs text-gray-500 font-medium mt-1">{place.categoryLabel}</div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-2 pt-1 border-t border-b border-gray-100 py-3">
          <button
            type="button"
            id="btn-place-directions"
            onClick={() => onGetDirections(place)}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center mb-1 shadow-sm">
              <Navigation className="w-4 h-4 transform rotate-45" />
            </div>
            <span className="text-xs font-medium">Directions</span>
          </button>

          <div className="relative">
            <button
              type="button"
              id="btn-place-save"
              onClick={() => setShowSaveMenu(!showSaveMenu)}
              className={`w-full flex flex-col items-center justify-center p-2 rounded-xl transition-colors ${
                isSaved ? 'bg-amber-50 text-amber-700' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center mb-1 shadow-sm ${
                  isSaved ? 'bg-amber-500 text-white' : 'bg-white border border-gray-200 text-gray-700'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
              </div>
              <span className="text-xs font-medium">{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            {/* Save dropdown options */}
            {showSaveMenu && (
              <div className="absolute left-0 bottom-full mb-2 bg-white rounded-xl shadow-xl border border-gray-200 p-1.5 w-44 z-50 animate-in fade-in zoom-in-95">
                <div className="text-[11px] font-semibold text-gray-400 px-2 py-1 uppercase">
                  Save to list
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onSavePlace(place, 'favorites');
                    setShowSaveMenu(false);
                  }}
                  className="w-full flex items-center px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-500 mr-2" />
                  <span>Favorites</span>
                  {isSaved && savedCategory === 'favorites' && <Check className="w-3.5 h-3.5 ml-auto text-blue-600" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSavePlace(place, 'want_to_go');
                    setShowSaveMenu(false);
                  }}
                  className="w-full flex items-center px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <BookmarkPlus className="w-3.5 h-3.5 text-emerald-500 mr-2" />
                  <span>Want to go</span>
                  {isSaved && savedCategory === 'want_to_go' && <Check className="w-3.5 h-3.5 ml-auto text-blue-600" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSavePlace(place, 'starred');
                    setShowSaveMenu(false);
                  }}
                  className="w-full flex items-center px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <Star className="w-3.5 h-3.5 text-amber-500 mr-2" />
                  <span>Starred places</span>
                  {isSaved && savedCategory === 'starred' && <Check className="w-3.5 h-3.5 ml-auto text-blue-600" />}
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            id="btn-place-nearby"
            onClick={() => onFindNearby(place)}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-700 flex items-center justify-center mb-1 shadow-sm">
              <Compass className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium">Nearby</span>
          </button>

          <button
            type="button"
            id="btn-place-share"
            onClick={handleShare}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-700 flex items-center justify-center mb-1 shadow-sm">
              {copiedLink ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
            </div>
            <span className="text-xs font-medium">{copiedLink ? 'Copied!' : 'Share'}</span>
          </button>
        </div>

        {/* Overview Description */}
        <p className="text-sm text-gray-600 leading-relaxed">{place.description}</p>

        {/* Metadata Details */}
        <div className="space-y-3 pt-2 text-sm text-gray-700">
          {/* Address */}
          <div className="flex items-start space-x-3">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <div className="flex-1 text-gray-800 text-sm leading-tight">{place.address}</div>
          </div>

          {/* Opening Hours */}
          <div className="flex flex-col">
            <div
              onClick={() => setShowHours(!showHours)}
              className="flex items-center justify-between cursor-pointer py-1 group"
            >
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                <span className={`font-medium ${place.openNow ? 'text-green-700' : 'text-rose-700'}`}>
                  {place.openNow ? 'Open' : 'Closed'}
                </span>
                <span className="text-xs text-gray-500">
                  {place.hours[0] ? `· ${place.hours[0].split(': ')[1] || 'See schedule'}` : ''}
                </span>
              </div>
              {showHours ? (
                <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              )}
            </div>

            {showHours && place.hours && (
              <div className="ml-7 mt-1.5 space-y-1 text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                {place.hours.map((hour, idx) => (
                  <div key={idx} className="flex justify-between py-0.5">
                    <span className="font-medium text-gray-700">{hour.split(':')[0]}</span>
                    <span>{hour.split(':').slice(1).join(':')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Phone */}
          {place.phone && (
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-gray-400 shrink-0" />
              <a
                href={`tel:${place.phone}`}
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                {place.phone}
              </a>
            </div>
          )}

          {/* Website */}
          {place.website && (
            <div className="flex items-center space-x-3">
              <Globe className="w-4 h-4 text-gray-400 shrink-0" />
              <a
                href={place.website}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline text-sm truncate flex items-center"
              >
                <span className="truncate">{place.website.replace(/^https?:\/\//, '')}</span>
                <ExternalLink className="w-3 h-3 ml-1 shrink-0" />
              </a>
            </div>
          )}
        </div>

        {/* Popular Times Histogram */}
        {place.popularTimes && (
          <div className="pt-3 border-t border-gray-100">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
              Popular Times (Typical Busyness)
            </div>
            <div className="h-16 flex items-end gap-1 px-1 bg-gray-50 rounded-lg p-2 border border-gray-100">
              {place.popularTimes.map((val, idx) => (
                <div
                  key={idx}
                  title={`${idx}:00 - ${val}% busy`}
                  className="flex-1 bg-blue-400/80 hover:bg-blue-600 rounded-t transition-all cursor-pointer"
                  style={{ height: `${Math.max(4, val)}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 px-1 mt-1 font-mono">
              <span>6 AM</span>
              <span>12 PM</span>
              <span>6 PM</span>
              <span>11 PM</span>
            </div>
          </div>
        )}

        {/* Features Chips */}
        {place.features && place.features.length > 0 && (
          <div className="pt-2">
            <div className="flex flex-wrap gap-1.5">
              {place.features.map((feat, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium"
                >
                  ✓ {feat}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-900">User Reviews</h3>
            <span className="text-xs text-gray-500">Google Community</span>
          </div>

          <div className="space-y-3">
            {place.reviews.map((rev) => (
              <div key={rev.id} className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs">
                <div className="flex items-center space-x-2 mb-1.5">
                  {rev.authorPhoto ? (
                    <img
                      src={rev.authorPhoto}
                      alt={rev.authorName}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[10px]">
                      {rev.authorName.charAt(0)}
                    </div>
                  )}
                  <span className="font-semibold text-gray-800">{rev.authorName}</span>
                  <span className="text-gray-400 ml-auto">{rev.relativeTimeDescription}</span>
                </div>
                <div className="flex items-center text-amber-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 leading-normal">{rev.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
