export const tr = {
  // Site Meta
  site: {
    title: 'TFT Item Rehberi',
    description: 'TFT item üretme ve etkileri için premium rehber',
  },

  // Navigation
  nav: {
    brand: 'TFT Rehberi',
    subtitle: 'Item Üretme Şeysi',
    allItems: 'Tüm Itemler',
    baseItems: 'Temel Itemler',
    favorites: 'Favoriler',
  },

  // Home Page
  home: {
    title: 'TFT Itemlerini Öğreniyoruz',
    subtitle: 'WUUUUUHUUHUHUUHUHUHUUUUUUUUUUU',
    searchPlaceholder: 'İsim, etki veya role göre arayın...',
    itemsFound: (count: number) => `${count} şey bulundu`,
    resetFilters: 'Filtreleri sıfırla',
    noItemsFound: 'Hiçbir şey bulunamadı',
    noItemsHint: 'Aramayı veya filtreleri değiştirmeyi deneyin',
  },

  // Filters
  filters: {
    type: 'Tür',
    roles: 'Roller',
    clear: 'Temizle',
    typeAll: 'Tümü',
    typeFull: 'Tam',
    typeBase: 'Temel',
    typeArtifact: 'Artifact',
    showFavorites: 'Sadece Favoriler',
  },

  // Item Types
  itemType: {
    full: 'Tam Item',
    base: 'Temel Item',
    artifact: 'Artifact Item',
  },

  // Item Modal
  modal: {
    effect: 'Etki',
    craftingRecipe: 'Üretim Tarifi',
    buildsInto: 'Neye Dönüşür',
    itemsCount: (count: number) => `${count} item`,
  },

  // Base Items Page
  baseItems: {
    title: 'Temel Itemler',
    subtitle: 'Güçlü şeyler yapmak için temel bileşenler',
    available: (count: number) => `${count} temel item mevcut`,
    notFound: 'Temel şey bulunamadı',
    notFoundHint: 'Temel şey verisi henüz eklenmedi',
  },

  // Item Detail Page
  itemDetail: {
    backToAll: 'Tüm itemlere dön',
    effect: 'Etki',
    buildsInto: 'Neye Dönüşür',
    buildsIntoHint: (count: number) => 
      `Bu temel item ${count} farklı tam item yapmak için kullanılabilir.`,
  },

  // 404 Page
  notFound: {
    title: 'Item Bulunamadı',
    description: 'Aradığınız item mevcut değil veya henüz veritabanına eklenmedi.',
    backHome: 'Ana Sayfaya Dön',
  },

  // Favorites
  favorites: {
    title: 'Favori Itemlerim',
    subtitle: 'Favorilere eklediğiniz itemler burada görünür',
    empty: 'Henüz favori eklemediniz',
    emptyHint: 'Item kartlarındaki lolipop ikonuna tıklayarak favorilere ekleyebilirsiniz',
    addToFavorites: 'Favorilere ekle',
    removeFromFavorites: 'Favorilerden çıkar',
    count: (count: number) => `${count} favori item`,
  },

  // Footer
  footer: {
    builtWith: '🍭 L 🍭 O 🍭 L 🍭 İ 🍭 P 🍭 O 🍭 P 🍭',
  },
} as const;

export type Locale = typeof tr;

