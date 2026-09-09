import React from 'react';
import {
  Compass,
  Utensils,
  Coffee,
  Hotel,
  Fuel,
  ShoppingBag,
  Landmark,
  Trees,
  Pill,
} from 'lucide-react';
import { CATEGORY_FILTERS } from '../data/mockPlaces';

interface CategoryChipsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-3.5 h-3.5 mr-1.5" />,
  Utensils: <Utensils className="w-3.5 h-3.5 mr-1.5 text-orange-500" />,
  Coffee: <Coffee className="w-3.5 h-3.5 mr-1.5 text-amber-600" />,
  Hotel: <Hotel className="w-3.5 h-3.5 mr-1.5 text-purple-600" />,
  Fuel: <Fuel className="w-3.5 h-3.5 mr-1.5 text-blue-600" />,
  ShoppingBag: <ShoppingBag className="w-3.5 h-3.5 mr-1.5 text-green-600" />,
  Landmark: <Landmark className="w-3.5 h-3.5 mr-1.5 text-rose-500" />,
  Trees: <Trees className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />,
  Pill: <Pill className="w-3.5 h-3.5 mr-1.5 text-red-500" />,
};

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2 px-1 flex gap-2 pointer-events-auto">
      {CATEGORY_FILTERS.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            id={`category-chip-${cat.id}`}
            type="button"
            onClick={() => onSelectCategory(isSelected ? 'all' : cat.id)}
            className={`flex items-center shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm ${
              isSelected
                ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {iconMap[cat.icon]}
            <span className="whitespace-nowrap">{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
};
