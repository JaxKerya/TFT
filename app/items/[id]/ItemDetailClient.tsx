'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Item } from '@/types/item';
import CraftDiagram from '@/components/CraftDiagram';
import { locale } from '@/locales';

interface ItemDetailClientProps {
  item: Item;
}

const getItemTypeLabel = (type: string) => {
  if (type === 'full') return locale.itemType.full;
  if (type === 'base') return locale.itemType.base;
  return locale.itemType.artifact;
};

export default function ItemDetailClient({ item }: ItemDetailClientProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-accent transition-colors duration-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{locale.itemDetail.backToAll}</span>
        </Link>
      </motion.div>

      {/* Item Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-8 space-y-6"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Item Image */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-accent/20 rounded-xl blur-2xl" />
            <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-zinc-900/50 ring-2 ring-accent/50 shadow-glow">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain p-6"
                sizes="128px"
                priority
              />
            </div>
          </div>

          {/* Item Info */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h1 className="text-3xl font-bold text-neutral-100">
              {item.name}
            </h1>

            {/* Type Badge */}
            <div className="inline-flex items-center px-3 py-1.5 bg-accent/10 border border-accent/30 rounded-lg">
              <span className="text-xs font-semibold text-accent uppercase tracking-wide">
                {getItemTypeLabel(item.type)}
              </span>
            </div>

            {/* Role Tags */}
            {item.roles.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {item.roles.map(role => (
                  <span
                    key={role}
                    className="px-2.5 py-1 text-xs font-medium bg-zinc-800/50 text-neutral-300 border border-zinc-700/50 rounded-md"
                  >
                    {role}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-8 space-y-4"
      >
        <h2 className="text-lg font-bold text-neutral-100">{locale.itemDetail.effect}</h2>
        <p className="text-sm text-neutral-300 leading-relaxed">
          {item.description}
        </p>
      </motion.div>

      {/* Craft Diagram */}
      {item.type === 'full' && item.craftsFrom && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <CraftDiagram item={item} />
        </motion.div>
      )}

      {/* Builds Into Section (for base items) */}
      {item.type === 'base' && item.buildsInto && item.buildsInto.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-8 space-y-4"
        >
          <h2 className="text-lg font-bold text-neutral-100">{locale.itemDetail.buildsInto}</h2>
          <p className="text-sm text-neutral-400">
            {locale.itemDetail.buildsIntoHint(item.buildsInto.length)}
          </p>
        </motion.div>
      )}
    </div>
  );
}
