'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ItemCard from '@/components/ItemCard';
import SearchBar from '@/components/SearchBar';
import Filters from '@/components/Filters';
import ItemModal from '@/components/ItemModal';
import { getAllItems, filterItems, searchItems } from '@/lib/items';
import { Item, ItemType, ItemRole } from '@/types/item';
import { Package, Lollipop } from 'lucide-react';
import { locale } from '@/locales';
import { useFavorites } from '@/lib/favorites';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<ItemType | 'all'>('all');
  const [selectedRoles, setSelectedRoles] = useState<ItemRole[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { favorites } = useFavorites();

  const handleRoleToggle = (role: ItemRole) => {
    setSelectedRoles(prev =>
      prev.includes(role)
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const filteredItems = useMemo(() => {
    let items = getAllItems();

    // Apply search
    if (searchQuery.trim()) {
      items = searchItems(searchQuery);
    }

    // Apply filters
    items = filterItems(items, selectedType, selectedRoles);

    // Apply favorites filter
    if (showOnlyFavorites) {
      items = items.filter(item => favorites.includes(item.id));
    }

    return items;
  }, [searchQuery, selectedType, selectedRoles, showOnlyFavorites, favorites]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Modal açıksa veya input zaten focus'taysa çık
      if (isModalOpen || document.activeElement === searchInputRef.current) return;
      
      if (e.key === '/') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isModalOpen]);

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3 py-6"
      >
        <h1 className="text-4xl font-bold gradient-text">
          {locale.home.title}
        </h1>
        <p className="text-sm text-neutral-400 max-w-xl mx-auto">
          {locale.home.subtitle}
        </p>
      </motion.div>

      {/* Search & Filters */}
      <div className="flex flex-col items-center gap-4">
        <SearchBar
          ref={searchInputRef}
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={locale.home.searchPlaceholder}
        />
        
        <Filters
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          selectedRoles={selectedRoles}
          onRoleToggle={handleRoleToggle}
        />
        
        {/* Favorites Toggle */}
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
            showOnlyFavorites
              ? 'bg-pink-500/20 text-pink-300 border border-pink-400/30 shadow-glow-sm'
              : 'bg-zinc-900/40 text-neutral-400 border border-zinc-800/50 hover:border-pink-400/30 hover:text-pink-400'
          }`}
        >
          <Lollipop className={`w-3.5 h-3.5 ${showOnlyFavorites ? 'fill-current' : ''}`} />
          {locale.filters.showFavorites}
          {favorites.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 bg-zinc-800/50 rounded text-[10px]">
              {favorites.length}
            </span>
          )}
        </motion.button>
      </div>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between text-xs"
      >
        <span className="text-neutral-500">
          {locale.home.itemsFound(filteredItems.length)}
        </span>
{(searchQuery || selectedType !== 'all' || selectedRoles.length > 0 || showOnlyFavorites) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedType('all');
              setSelectedRoles([]);
              setShowOnlyFavorites(false);
            }}
            className="text-neutral-500 hover:text-accent transition-colors"
          >
            {locale.home.resetFilters}
          </button>
        )}
      </motion.div>

      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3"
        >
          {filteredItems.map((item, index) => (
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
          <Package className="w-16 h-16 mx-auto text-neutral-700 mb-4" />
          <h3 className="text-xl font-semibold text-neutral-300 mb-2">
            {locale.home.noItemsFound}
          </h3>
          <p className="text-sm text-neutral-500">
            {locale.home.noItemsHint}
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
