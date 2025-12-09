'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Item } from '@/types/item';
import { getItemById } from '@/lib/items';
import { Sparkles, Hexagon, Box, Ban } from 'lucide-react';
import FavoriteButton from './FavoriteButton';
import { useLanguage } from '@/lib/language-context';
import { translateRole } from '@/lib/role-translations';

interface ItemCardProps {
  item: Item;
  onClick?: () => void;
}

export default function ItemCard({ item, onClick }: ItemCardProps) {
  const { locale, language } = useLanguage();
  
  // 🍭 Easter Egg Check
  const isEasterEgg = item.isEasterEgg === true;

  const getTypeBadge = () => {
    switch (item.type) {
      case 'full':
        return { 
          Icon: Hexagon, 
          color: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
          label: locale.itemCard.fullItem
        };
      case 'artifact':
        return { 
          Icon: Sparkles, 
          color: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
          label: locale.itemCard.artifactItem
        };
      case 'base':
        return { 
          Icon: Box, 
          color: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
          label: locale.itemCard.baseItem
        };
      default:
        return { Icon: Box, color: '', label: '' };
    }
  };

  const typeBadge = getTypeBadge();

  return (
    <motion.div
      onClick={onClick}
      className={`group relative rounded-xl p-4 cursor-pointer overflow-hidden transition-all duration-300 min-h-[280px] flex flex-col transform-gpu will-change-transform ${
        isEasterEgg 
          ? 'bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-amber-500/20 border-2 border-pink-400/60 hover:border-pink-300 shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:shadow-[0_0_50px_rgba(236,72,153,0.5)]'
          : 'bg-zinc-900/70 border border-zinc-800/60 hover:bg-zinc-800/70 hover:border-accent/50 hover:shadow-glow-sm'
      }`}
      whileHover={{ y: -4, scale: isEasterEgg ? 1.05 : 1 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        ...(isEasterEgg && {
          boxShadow: [
            '0 0 30px rgba(236,72,153,0.3)',
            '0 0 50px rgba(236,72,153,0.5)',
            '0 0 30px rgba(236,72,153,0.3)',
          ]
        })
      }}
      transition={{ 
        duration: 0.2,
        ...(isEasterEgg && {
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        })
      }}
    >
      {/* Type Badge & Favorite Button - Hidden for Easter Eggs */}
      {!isEasterEgg && (
        <div className="absolute top-2 left-0 right-0 z-20 flex items-start justify-between px-2">
          {/* Favorite Button */}
          <FavoriteButton itemId={item.id} size="sm" />
          
          {/* Type Badge */}
          <div className={`group/badge p-1.5 rounded-full border backdrop-blur-sm ${typeBadge.color}`}>
            <typeBadge.Icon className="w-3 h-3" strokeWidth={2.5} />
            
            {/* Tooltip */}
            <span className="absolute top-full right-0 mt-2 px-2 py-1 bg-zinc-900/95 backdrop-blur-sm border border-zinc-700/50 rounded text-[10px] font-medium text-neutral-200 whitespace-nowrap opacity-0 group-hover/badge:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg">
              {typeBadge.label}
            </span>
          </div>
        </div>
      )}

      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-300 ${
        isEasterEgg 
          ? 'from-pink-400/20 via-purple-400/20 to-amber-400/20 opacity-100 group-hover:opacity-100'
          : 'from-accent/0 via-accent/0 to-accent/5 opacity-0 group-hover:opacity-100'
      }`} />
      
      {/* Glow effect */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${
        isEasterEgg ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}>
        <div className={`absolute inset-0 blur-xl ${
          isEasterEgg ? 'bg-pink-400/10' : 'bg-accent/5'
        }`} />
      </div>
      
      {/* 🍭 Easter Egg Special Effects */}
      {isEasterEgg && (
        <>
          {/* Animated sparkles */}
          <motion.div
            className="absolute top-2 left-2 text-yellow-300"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute bottom-2 right-2 text-pink-300"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -10, 10, 0],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            ✨
          </motion.div>
        </>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        {/* Item Image */}
        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-zinc-900/50 ring-1 ring-zinc-700/50 group-hover:ring-accent/50 transition-all duration-300 group-hover:scale-105">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain p-2"
            sizes="80px"
          />
        </div>

        {/* Item Name */}
        <h3 className={`font-semibold text-neutral-100 text-center leading-tight transition-colors duration-200 px-1 ${
          isEasterEgg 
            ? 'text-lg line-clamp-3 min-h-[3rem] group-hover:text-pink-200' 
            : 'text-sm line-clamp-2 min-h-[2rem] group-hover:text-accent-light'
        }`}>
          {item.name}
        </h3>

        {/* Role Tags - Hidden for Easter Eggs */}
        {!isEasterEgg && (
          <div className="flex flex-wrap gap-1 justify-center items-start h-[48px] content-start overflow-hidden">
            {item.roles.map(role => (
              <span
                key={role}
                className="px-2 py-0.5 text-[10px] font-medium bg-accent/10 text-accent-light rounded border border-accent/20 h-fit"
              >
                {translateRole(role, language)}
              </span>
            ))}
          </div>
        )}

        {/* Craft Preview for Full Items - Hidden for Easter Eggs */}
        {!isEasterEgg && item.type === 'full' && item.craftsFrom && item.craftsFrom.length > 0 && (() => {
          const baseItems = item.craftsFrom
            .map(id => getItemById(id))
            .filter((baseItem): baseItem is Item => baseItem !== undefined);
          
          if (baseItems.length === 0) return null;
          
          return (
            <div className="flex items-center gap-1 pt-2 mt-1 border-t border-zinc-800/50 w-full justify-center">
              {baseItems.map((baseItem, index) => (
                <div key={`${baseItem.id}-${index}`} className="flex items-center gap-1">
                  {index > 0 && (
                    <span className="text-[10px] text-neutral-600 font-bold">+</span>
                  )}
                  <div className="relative w-6 h-6 rounded bg-zinc-900/80 ring-1 ring-zinc-800/50 group-hover:ring-accent/30 transition-all duration-300 overflow-hidden">
                    <Image
                      src={baseItem.image}
                      alt={baseItem.name}
                      fill
                      className="object-contain p-0.5"
                      sizes="24px"
                    />
                  </div>
                </div>
              ))}
            </div>
          );
        })()}

        {/* Non-Craftable Badge for Base & Artifact Items - Hidden for Easter Eggs */}
        {!isEasterEgg && (item.type === 'base' || item.type === 'artifact') && (
          <div className="flex items-center justify-center gap-1.5 pt-2 mt-1 border-t border-zinc-800/50 w-full">
            <Ban className="w-3 h-3 text-neutral-600" strokeWidth={2} />
            <span className="text-[9px] text-neutral-600 font-medium uppercase tracking-wide">
              {locale.itemCard.notCraftable}
            </span>
          </div>
        )}
        
        {/* Easter Egg Description */}
        {isEasterEgg && item.summary && (
          <div className="pt-2 mt-2 border-t border-pink-400/20 w-full">
            <p className="text-xs text-center text-pink-200/80 leading-relaxed">
              {item.summary}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
