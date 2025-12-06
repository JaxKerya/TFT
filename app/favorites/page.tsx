'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Lollipop, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ItemCard from '@/components/ItemCard';
import ItemModal from '@/components/ItemModal';
import { getItemById } from '@/lib/items';
import { Item } from '@/types/item';
import { locale } from '@/locales';
import { useFavorites } from '@/lib/favorites';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const favoriteItems = useMemo(() => {
    return favorites
      .map(id => getItemById(id))
      .filter((item): item is Item => item !== undefined);
  }, [favorites]);

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-accent transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {locale.itemDetail.backToAll}
        </Link>

        <div className="text-center space-y-3 py-6">
          <div className="flex items-center justify-center gap-3">
            <Lollipop className="w-8 h-8 text-pink-400 fill-current" />
            <h1 className="text-4xl font-bold gradient-text">
              {locale.favorites.title}
            </h1>
          </div>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto">
            {locale.favorites.subtitle}
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center"
      >
        <div className="px-4 py-2 bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-lg">
          <span className="text-xs text-neutral-500">
            {locale.favorites.count(favoriteItems.length)}
          </span>
        </div>
      </motion.div>

      {/* Items Grid or Empty State */}
      {favoriteItems.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3"
        >
          {favoriteItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02, duration: 0.2 }}
            >
              <ItemCard item={item} onClick={() => handleItemClick(item)} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <Lollipop className="w-16 h-16 mx-auto text-neutral-700 mb-4" />
          <h3 className="text-xl font-semibold text-neutral-300 mb-2">
            {locale.favorites.empty}
          </h3>
          <p className="text-sm text-neutral-500 mb-6">
            {locale.favorites.emptyHint}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {locale.itemDetail.backToAll}
          </Link>
        </motion.div>
      )}

      {/* Item Modal */}
      <ItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
