'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Item } from '@/types/item';
import CraftDiagram from './CraftDiagram';
import { useEffect } from 'react';
import { useLanguage } from '@/lib/language-context';
import { translateRole } from '@/lib/role-translations';

interface ItemModalProps {
  item: Item | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ItemModal({ item, isOpen, onClose }: ItemModalProps) {
  const { locale, language } = useLanguage();

  const getItemTypeLabel = (type: string) => {
    if (type === 'full') return locale.itemType.full;
    if (type === 'base') return locale.itemType.base;
    return locale.itemType.artifact;
  };

  const getItemDescription = (item: Item) => {
    return language === 'en' && item.description_en ? item.description_en : item.description;
  };
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black/85 backdrop-blur-md z-[100]"
            style={{ margin: 0, padding: 0 }}
          />

          {/* Modal */}
          <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.4, bounce: 0.3 }}
              className="pointer-events-auto relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-900/95 backdrop-blur-xl border border-zinc-800/50 rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-lg border border-zinc-700/50 hover:border-accent/50 transition-all duration-200"
              >
                <X className="w-4 h-4 text-neutral-300" />
              </button>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col items-center gap-4 text-center">
                  {/* Item Image */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-accent/20 rounded-xl blur-2xl" />
                    <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-zinc-800/50 ring-2 ring-accent/50 shadow-glow">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-4"
                        sizes="112px"
                        priority
                      />
                    </div>
                  </motion.div>

                  {/* Item Name */}
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-2xl font-bold text-neutral-100"
                  >
                    {item.name}
                  </motion.h2>

                  {/* Type Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="px-3 py-1.5 bg-accent/10 border border-accent/30 rounded-lg flex items-center"
                  >
                    <span className="text-xs font-semibold text-accent uppercase tracking-wide">
                      {getItemTypeLabel(item.type)}
                    </span>
                  </motion.div>

                  {/* Role Tags */}
                  {item.roles.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="flex flex-wrap gap-1.5 justify-center"
                    >
                      {item.roles.map(role => (
                        <span
                          key={role}
                          className="px-2.5 py-1 text-xs font-medium bg-zinc-800/50 text-neutral-300 border border-zinc-700/50 rounded-md"
                        >
                          {translateRole(role, language)}
                        </span>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <h3 className="text-sm font-semibold text-neutral-200 uppercase tracking-wide">
                    {locale.modal.effect}
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed bg-zinc-800/30 p-4 rounded-lg border border-zinc-800/50">
                    {getItemDescription(item)}
                  </p>
                </motion.div>

                {/* Craft Diagram */}
                {item.type === 'full' && item.craftsFrom && (
                  <CraftDiagram item={item} />
                )}

                {/* Builds Into (for base items) */}
                {item.type === 'base' && item.buildsInto && item.buildsInto.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="space-y-2"
                  >
                    <h3 className="text-sm font-semibold text-neutral-200 uppercase tracking-wide">
                      {locale.modal.buildsInto}
                    </h3>
                    <p className="text-xs text-neutral-400">
                      {locale.modal.itemsCount(item.buildsInto.length)}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
