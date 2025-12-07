'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Item } from '@/types/item';
import { getItemById } from '@/lib/items';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

interface CraftDiagramProps {
  item: Item;
}

export default function CraftDiagram({ item }: CraftDiagramProps) {
  const { locale } = useLanguage();
  // Only show for full items with crafting recipe
  if (item.type !== 'full' || !item.craftsFrom || item.craftsFrom.length === 0) {
    return null;
  }

  const baseItems = item.craftsFrom
    .map(id => getItemById(id))
    .filter((item): item is Item => item !== undefined);

  if (baseItems.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-zinc-800/30 border border-zinc-800/50 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-neutral-200 mb-4 text-center uppercase tracking-wide">
          {locale.modal.craftingRecipe}
        </h3>

        <div className="flex flex-col items-center gap-4">
          {/* Base Items */}
          <div className="flex items-center gap-3">
            {baseItems.map((baseItem, index) => (
              <div key={`${baseItem.id}-${index}`} className="flex items-center gap-3">
                {index > 0 && (
                  <span className="text-xl text-accent font-bold">+</span>
                )}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center gap-1.5 group cursor-pointer"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-zinc-900/50 ring-2 ring-zinc-700/50 group-hover:ring-accent/50 transition-all duration-300">
                    <Image
                      src={baseItem.image}
                      alt={baseItem.name}
                      fill
                      className="object-contain p-2"
                      sizes="64px"
                    />
                  </div>
                  <span className="text-[10px] text-neutral-400 font-medium text-center max-w-[64px]">
                    {baseItem.name}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Arrow */}
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-6 h-6 text-accent" />
          </motion.div>

          {/* Result Item */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-accent/20 rounded-lg blur-xl" />
            <div className="relative flex flex-col items-center gap-1.5">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-zinc-900/50 ring-2 ring-accent shadow-glow-sm">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-3"
                  sizes="80px"
                />
              </div>
              <span className="text-xs text-accent font-bold text-center">
                {item.name}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
