export const tr = {
  // Site Meta
  site: {
    title: 'TFT Item Rehberi',
    description: 'TFT item üretme ve etkileri için premium rehber',
  },

  // Navigation
  nav: {
    brand: 'TFT Rehberi',
    subtitle: 'Item Üretme',
    allItems: 'Tüm Itemler',
    baseItems: 'Temel Itemler',
  },

  // Home Page
  home: {
    title: 'TFT Item Rehberi',
    subtitle: 'Item üretme bilgileriyle stratejinizde ustalaşın',
    searchPlaceholder: 'İsim, etki veya role göre arayın...',
    itemsFound: (count: number) => `${count} item bulundu`,
    resetFilters: 'Filtreleri sıfırla',
    noItemsFound: 'Item bulunamadı',
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
    subtitle: 'Güçlü itemler yapmak için temel bileşenler',
    available: (count: number) => `${count} temel item mevcut`,
    notFound: 'Temel item bulunamadı',
    notFoundHint: 'Temel item verisi henüz eklenmedi',
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

  // Footer
  footer: {
    builtWith: 'Next.js • TypeScript • Tailwind CSS ile geliştirildi',
  },
} as const;

export type Locale = typeof tr;

