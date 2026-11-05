/**
 * Asino Kustom Hub — TypeScript Type Definitions
 * File: types.ts
 * 
 * Defines all TypeScript interfaces and types for items, state, I18N, and navigation.
 */

export type KustomType = 'KLWP' | 'KWGT' | 'KLCK';
export type TabLocation = 'home' | 'katalog';
export type PriceFilter = 'all' | 'free' | 'paid' | 'fav';
export type BadgeType = 'NEW' | 'HOT' | 'SALE' | 'BEST' | null;
export type LanguageCode = 'id' | 'en' | 'ja';

export interface KustomItem {
  id: string;
  name: string;
  author: string;
  category: string;
  type: KustomType;
  price: string;
  priceid: string;
  priceen: string;
  pricejp: string;
  originalPrice: string | null;
  oripriceid: string | null;
  oripriceen: string | null;
  oripricejp: string | null;
  isFree: boolean;
  buyUrl: string | null;
  whatsappUrl: string;
  downloadUrl: string | null;
  description: string;
  descid: string;
  descen: string;
  descjp: string;
  descriptionid?: string;
  descriptionen?: string;
  descriptionjp?: string;
  images: string[];
  badge: BadgeType;
  highlights: string[];
  tab: TabLocation;
  video: string | null;
  size: string;
  version?: string;
  quality?: string;
  packageName?: string;
  updated: string;
  info: string;
  infoid?: string;
  infoen?: string;
  infojp?: string;
}

export interface ImageViewerState {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  scale: number;
  posX: number;
  posY: number;
}

export interface AppState {
  activeTab: 'home' | 'katalog' | 'panduan';
  activeCategory: string;
  activeType: string;
  activePriceFilter: PriceFilter;
  searchQuery: string;
  katalogSearchQuery: string;
  activeLang: LanguageCode;
  items: KustomItem[];
  favorites: Set<string>;
  detailStack: string[];
  carouselIndex: { [layer: number]: number };
  savedScrollY: number;
  viewer: ImageViewerState;
}

export interface I18nCatalog {
  navHome: string;
  navKatalog: string;
  navPanduan: string;
  searchPlaceholder: string;
  katalogSearchPlaceholder: string;
  allCategories: string;
  allTypes: string;
  allPrices: string;
  freePrice: string;
  paidPrice: string;
  favorites: string;
  itemsCount: (count: number) => string;
  featuredTag: string;
  installTheme: string;
  buyTheme: string;
  orderWhatsApp: string;
  watchGuide: string;
  emptyTitle: string;
  emptyDesc: string;
  resetFilters: string;
  favSaved: string;
  favRemoved: string;
  emptyFavs: string;
  byAuthor: string;
  specsHeader: string;
  descriptionHeader: string;
  highlightsHeader: string;
  appsHeader: string;
  relatedHeader: string;
  screenRatio: string;
  novaPages: string;
  fileSize: string;
  lastUpdated: string;
  copiedLink: string;
  statusSyncSuccess: string;
  statusSyncError: string;
  retry: string;
  guideTitle: string;
  guideSubtitle: string;
  step1Title: string;
  step1Text: string;
  step2Title: string;
  step2Text: string;
  step3Title: string;
  step3Text: string;
  step4Title: string;
  step4Text: string;
  guideVideoHeading: string;
  guideVideoSubheading: string;
  guideVideoCardTitle: string;
  guideVideoCardDesc: string;
  guideVideoWatchBtn: string;
  faqHeading: string;
  faqQ1: string;
  faqAns1: string;
  faqQ2: string;
  faqAns2: string;
  faqQ3: string;
  faqAns3: string;
  faqQ4: string;
  faqAns4: string;
  creatorBio: string;
  creatorStoreBtn: string;
  creatorWaBtn: string;
  creatorChannelBtn: string;
  downloadApk: string;
  downloadApkToast: string;
  apkModalTitle: string;
  apkModalBadge: string;
  apkModalDesc: string;
  apkStep1: string;
  apkStep2: string;
  apkStep3: string;
  apkStep4: string;
  apkDownloadBtn: string;
  modalClose: string;
}
