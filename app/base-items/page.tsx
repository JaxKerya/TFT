'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ItemCard from '@/components/ItemCard';
import ItemModal from '@/components/ItemModal';
import { getBaseItems } from '@/lib/items';
import { Item } from '@/types/item';
import { Package } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function BaseItemsPage() {
  const { locale } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const baseItems = getBaseItems();

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
        className="text-center space-y-3 py-6"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Package className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-4xl font-bold gradient-text">
          {locale.baseItems.title}
        </h1>
        <p className="text-sm text-neutral-400 max-w-xl mx-auto">
          {locale.baseItems.subtitle}
        </p>
      </motion.div>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xs text-neutral-500"
      >
        {locale.baseItems.available(baseItems.length)}
      </motion.div>

      {/* Items Grid */}
      {baseItems.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3"
        >
          {baseItems.map(item => (
            <div key={item.id} className="transform-gpu will-change-transform">
              <ItemCard item={item} onClick={() => handleItemClick(item)} />
            </div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <Package className="w-16 h-16 mx-auto text-neutral-700 mb-4" />
          <h3 className="text-xl font-semibold text-neutral-300 mb-2">
            {locale.baseItems.notFound}
          </h3>
          <p className="text-sm text-neutral-500">
            {locale.baseItems.notFoundHint}
          </p>
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
