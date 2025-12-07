export const en = {
  // Site Meta
  site: {
    title: 'TFT Item Guide',
    description: 'Premium guide for TFT item crafting and effects',
  },

  // Navigation
  nav: {
    brand: 'TFT Guide',
    subtitle: 'Item Crafting Thing',
    allItems: 'All Items',
    baseItems: 'Base Items',
    favorites: 'Favorites',
  },

  // Home Page
  home: {
    title: 'Learning TFT Items',
    subtitle: 'WUUUUUHUUHUHUUHUHUHUUUUUUUUUUU',
    searchPlaceholder: 'Search by name, effect or role...',
    itemsFound: (count: number) => `${count} items found`,
    resetFilters: 'Reset filters',
    noItemsFound: 'No items found',
    noItemsHint: 'Try changing your search or filters',
  },

  // Filters
  filters: {
    type: 'Type',
    roles: 'Roles',
    clear: 'Clear',
    typeAll: 'All',
    typeFull: 'Full',
    typeBase: 'Base',
    typeArtifact: 'Artifact',
    showFavorites: 'Favorites Only',
  },

  // Item Types
  itemType: {
    full: 'Full Item',
    base: 'Base Item',
    artifact: 'Artifact Item',
  },

  // Item Card
  itemCard: {
    fullItem: 'Full Item',
    baseItem: 'Base Item',
    artifactItem: 'Artifact Item',
    notCraftable: 'Not Craftable',
  },

  // Item Modal
  modal: {
    effect: 'Effect',
    craftingRecipe: 'Crafting Recipe',
    buildsInto: 'Builds Into',
    itemsCount: (count: number) => `${count} items`,
  },

  // Base Items Page
  baseItems: {
    title: 'Base Items',
    subtitle: 'Basic components to craft powerful items',
    available: (count: number) => `${count} base items available`,
    notFound: 'Base items not found',
    notFoundHint: 'Base item data has not been added yet',
  },

  // Item Detail Page
  itemDetail: {
    backToAll: 'Back to all items',
    effect: 'Effect',
    buildsInto: 'Builds Into',
    buildsIntoHint: (count: number) => 
      `This base item can be used to craft ${count} different full items.`,
  },

  // 404 Page
  notFound: {
    title: 'Item Not Found',
    description: 'The item you are looking for does not exist or has not been added to the database yet.',
    backHome: 'Back to Home',
  },

  // Favorites
  favorites: {
    title: 'My Favorite Items',
    subtitle: 'Items you have added to favorites appear here',
    empty: 'You have not added any favorites yet',
    emptyHint: 'You can add items to favorites by clicking the lollipop icon on item cards',
    addToFavorites: 'Add to favorites',
    removeFromFavorites: 'Remove from favorites',
    count: (count: number) => `${count} favorite items`,
  },

  // Footer
  footer: {
    builtWith: '🍭 L 🍭 O 🍭 L 🍭 I 🍭 P 🍭 O 🍭 P 🍭',
  },
};
