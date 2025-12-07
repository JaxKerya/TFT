import { ItemRole } from '@/types/item';

export const roleTranslations: Record<ItemRole, { tr: string; en: string }> = {
  'AD': { tr: 'AD', en: 'AD' },
  'AP': { tr: 'AP', en: 'AP' },
  'Tank': { tr: 'Tank', en: 'Tank' },
  'Nişancı': { tr: 'Nişancı', en: 'Marksman' },
  'Yakın Dövüşçü': { tr: 'Yakın Dövüşçü', en: 'Melee' },
  '~Yakın Dövüşçü': { tr: '~Yakın Dövüşçü', en: '~Melee' },
};

export function translateRole(role: ItemRole, language: 'tr' | 'en'): string {
  return roleTranslations[role][language];
}
