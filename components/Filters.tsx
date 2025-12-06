'use client';

import { ItemType, ItemRole } from '@/types/item';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Zap, X, Lollipop } from 'lucide-react';
import { locale } from '@/locales';

interface FiltersProps {
  selectedType: ItemType | 'all';
  onTypeChange: (type: ItemType | 'all') => void;
  selectedRoles: ItemRole[];
  onRoleToggle: (role: ItemRole) => void;
  showOnlyFavorites?: boolean;
  onToggleFavorites?: () => void;
  favoritesCount?: number;
}

const itemTypes: { value: ItemType | 'all'; label: string; icon: any }[] = [
  { value: 'all', label: locale.filters.typeAll, icon: Sparkles },
  { value: 'full', label: locale.filters.typeFull, icon: Zap },
  { value: 'base', label: locale.filters.typeBase, icon: Shield },
  { value: 'artifact', label: locale.filters.typeArtifact, icon: Sparkles },
];

const availableRoles: ItemRole[] = [
  'AD',
  'AP',
  'Tank',
  'Nişancı',
  '~Yakın Dövüşçü',
  'Yakın Dövüşçü'
];

export default function Filters({
  selectedType,
  onTypeChange,
  selectedRoles,
  onRoleToggle,
  showOnlyFavorites = false,
  onToggleFavorites,
  favoritesCount = 0,
}: FiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="w-full space-y-4"
    >
      {/* Type Filter */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
          {locale.filters.type}
        </h3>
        <div className="flex flex-wrap gap-2">
          {itemTypes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => onTypeChange(value)}
              className={`group px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                selectedType === value
                  ? 'bg-accent text-white shadow-glow-sm'
                  : 'bg-zinc-900/40 text-neutral-400 border border-zinc-800/50 hover:border-accent/30 hover:bg-zinc-800/40 hover:text-neutral-300'
              }`}
            >
              <Icon className={`w-3 h-3 ${selectedType === value ? '' : 'opacity-50 group-hover:opacity-100'}`} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Role Filter & Favorites */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            {locale.filters.roles}
          </h3>
          {selectedRoles.length > 0 && (
            <button
              onClick={() => selectedRoles.forEach(role => onRoleToggle(role))}
              className="text-[10px] text-neutral-500 hover:text-accent transition-colors flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              {locale.filters.clear}
            </button>
          )}
        </div>
        <div className="flex items-start gap-3">
          {/* Role Buttons */}
          <div className="flex flex-wrap gap-1.5 flex-1">
            {availableRoles.map(role => (
              <button
                key={role}
                onClick={() => onRoleToggle(role)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-200 ${
                  selectedRoles.includes(role)
                    ? 'bg-accent/20 text-accent border border-accent/50'
                    : 'bg-zinc-900/40 text-neutral-500 border border-zinc-800/50 hover:border-zinc-700 hover:text-neutral-400'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
          
          {/* Favorites Toggle */}
          {onToggleFavorites && (
            <button
              onClick={onToggleFavorites}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                showOnlyFavorites
                  ? 'bg-pink-500/20 text-pink-300 border border-pink-400/30'
                  : 'bg-zinc-900/40 text-neutral-400 border border-zinc-800/50 hover:border-pink-400/30 hover:text-pink-400'
              }`}
            >
              <Lollipop className={`w-3 h-3 ${showOnlyFavorites ? 'fill-current' : ''}`} />
              {locale.filters.showFavorites}
              {favoritesCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.5 bg-zinc-800/50 rounded text-[10px]">
                  {favoritesCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
