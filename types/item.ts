export type ItemType = 'full' | 'base' | 'artifact';

export type ItemRole = 
  | 'AD' 
  | 'AP' 
  | 'Tank' 
  | 'Nişancı'
  | '~Yakın Dövüşçü'
  | 'Yakın Dövüşçü';

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  roles: ItemRole[];
  description: string;
  summary?: string; // Short one-line effect summary
  craftsFrom?: string[]; // Array of base item IDs (for full items)
  buildsInto?: string[]; // Array of full item IDs (for base items)
  image: string; // Path to item icon
}

export interface FilterState {
  search: string;
  type: ItemType | 'all';
  roles: ItemRole[];
}

