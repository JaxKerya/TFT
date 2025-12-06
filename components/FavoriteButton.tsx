'use client';

import { motion } from 'framer-motion';
import { Lollipop } from 'lucide-react';
import { useFavorites } from '@/lib/favorites';

interface FavoriteButtonProps {
  itemId: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function FavoriteButton({ itemId, size = 'md' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(itemId);

  const sizeClasses = {
    sm: 'p-1 rounded-md',
    md: 'p-1.5 rounded-lg',
    lg: 'p-2 rounded-xl',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    toggleFavorite(itemId);
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`${sizeClasses[size]} z-20 bg-zinc-900/80 backdrop-blur-sm border transition-all duration-200 ${
        favorite
          ? 'border-pink-400/50 text-pink-400 hover:bg-pink-500/20'
          : 'border-zinc-700/50 text-zinc-500 hover:text-pink-400 hover:border-pink-400/30 hover:bg-zinc-800/80'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={favorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
    >
      <Lollipop
        className={`${iconSizes[size]} transition-all duration-200 ${
          favorite ? 'fill-current' : ''
        }`}
        strokeWidth={2.5}
      />
    </motion.button>
  );
}
