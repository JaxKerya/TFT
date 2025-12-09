import { Item, ItemType, ItemRole } from '@/types/item';
import baseItemsData from '@/data/base-items.json';
import fullItemsData from '@/data/full-items.json';
import artifactItemsData from '@/data/artifact-items.json';

// 🍭 Easter Egg: Secret Lolipop Item
const LOLIPOP_EASTER_EGG: Item = {
  id: 'easter-egg-lolipop',
  name: "Almira's Lollipop",
  type: 'artifact',
  roles: ['AD', 'AP', 'Tank', 'Nişancı', 'Yakın Dövüşçü'],
  description: '✨ WUHUHUHUUHUHUUHUHUHUHUUHUHUHUHUHU',
  description_en: '✨ WUHUHUHUUHUHUUHUHUHUHUUHUHUHUHUHU',
  summary: "Lolipop'un tadına bakmak için tıklayın! 🎉",
  image: '/images/items/lollipop.png', // Using spatula as placeholder
  isEasterEgg: true,
  easterEggUrl: 'https://www.youtube.com/shorts/XjJuAodeR3Y', // Rick Roll or you can change this!
};

// Tüm itemları birleştir
const allItemsData = [
  ...baseItemsData.items,
  ...fullItemsData.items,
  ...artifactItemsData.items,
];

export function getAllItems(): Item[] {
  return (allItemsData as Item[]).sort((a, b) => a.name.localeCompare(b.name, 'tr'));
}

export function getItemById(id: string): Item | undefined {
  return getAllItems().find(item => item.id === id);
}

export function getItemsByType(type: ItemType): Item[] {
  return getAllItems()
    .filter(item => item.type === type)
    .sort((a, b) => a.name.localeCompare(b.name, 'tr'));
}

export function getBaseItems(): Item[] {
  return (baseItemsData.items as Item[]).sort((a, b) => a.name.localeCompare(b.name, 'tr'));
}

export function getFullItems(): Item[] {
  return (fullItemsData.items as Item[]).sort((a, b) => a.name.localeCompare(b.name, 'tr'));
}

export function getArtifactItems(): Item[] {
  return (artifactItemsData.items as Item[]).sort((a, b) => a.name.localeCompare(b.name, 'tr'));
}

export function searchItems(query: string): Item[] {
  const lowercaseQuery = query.toLowerCase().trim();
  
  // 🍭 Easter Egg: If user searches exactly "lolipop", return only the secret item
  if (lowercaseQuery === 'lolipop' || lowercaseQuery === 'lollipop') {
    return [LOLIPOP_EASTER_EGG];
  }
  
  return getAllItems()
    .filter(item => 
      item.name.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery) ||
      item.roles.some(role => role.toLowerCase().includes(lowercaseQuery))
    )
    .sort((a, b) => a.name.localeCompare(b.name, 'tr'));
}

export function filterItems(
  items: Item[],
  type: ItemType | 'all',
  roles: ItemRole[]
): Item[] {
  let filtered = items;

  // Filter by type
  if (type !== 'all') {
    filtered = filtered.filter(item => item.type === type);
  }

  // Filter by roles (item must have ALL of the selected roles)
  if (roles.length > 0) {
    filtered = filtered.filter(item =>
      roles.every(role => item.roles.includes(role))
    );
  }

  return filtered;
}
