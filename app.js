/**
 * Asino Kustom Hub — Vanilla ES6+ Application Core
 * Strict SWR Data Pipeline, 2-Layer Pre-rendered Detail Stack,
 * RFC-4180 CSV Parser, Multilingual Support, and Fullscreen Zoom Viewer.
 */

(() => {
  'use strict';

  // =========================================================================
  // 1. CONFIGURATION & STATE
  // =========================================================================

  const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1I598WoO2hjIeH-d2idKLR_sOLFKnDBsupB52EKlV6SA/export?format=csv';
  const GITHUB_JSON_URL = 'https://raw.githubusercontent.com/asino-presets/kustom-presets/main/store_catalog.json';
  const STORAGE_KEY_CACHE = 'asino_catalog_cache_v4';
  const STORAGE_KEY_LANG = 'asino_lang_v1';
  const STORAGE_KEY_FAVS = 'asino_favs_v1';

  // Creator Official WhatsApp Contact (089686441030)
  const DEFAULT_WA_NUMBER = '6289686441030';
  const DEFAULT_WA_URL = 'https://wa.me/6289686441030';

  // Configurable Guide Video: Provide YouTube link or Video ID here when available.
  // Left empty by default as requested: the video tutorial section remains hidden until a valid link is provided.
  const GUIDE_VIDEO_SOURCE = '';

  // Configurable Android APK Download URL
  // Creator can replace this with their direct hosted APK release link
  const APK_DOWNLOAD_URL = '';

  function extractYouTubeId(urlOrId) {
    if (!urlOrId || typeof urlOrId !== 'string') return null;
    const str = urlOrId.trim();
    if (!str) return null;
    if (/^[a-zA-Z0-9_-]{11}$/.test(str)) return str;
    const match = str.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  }

  // Embedded Fallback Data (Balanced mix of Minimalist, Glassmorphism, and Data Dashboard)
  const EMBEDDED_PRESETS = [
    {
      id: 'neoglass-dashboard',
      name: 'NeoGlass Dashboard Pro',
      author: 'Asino',
      category: 'Dashboard',
      type: 'KLWP',
      price: 'Free',
      priceid: 'Gratis',
      priceen: 'Free',
      pricejp: '無料',
      originalPrice: null,
      isFree: true,
      buyUrl: null,
      whatsappUrl: 'https://wa.me/6289686441030',
      downloadUrl: 'https://github.com/asino-presets/releases/download/v1.0/NeoGlass_Dashboard.klwp',
      description: 'Antarmuka multi-panel modern yang memadukan fluid liquid glass dengan tata letak dasbor produktivitas harian. Menampilkan pelacak cuaca adaptif, kontrol pemutar musik animasi gelombang, dan feed agenda kalender tersinkronisasi.\n\nDirancang khusus untuk pengalaman satu tangan dengan ergonomi jempol di area bawah.',
      descid: 'Antarmuka multi-panel modern yang memadukan fluid liquid glass dengan tata letak dasbor produktivitas harian. Menampilkan pelacak cuaca adaptif, kontrol pemutar musik animasi gelombang, dan feed agenda kalender tersinkronisasi.\n\nDirancang khusus untuk pengalaman satu tangan dengan ergonomi jempol di area bawah.',
      descen: 'A modern multi-panel interface combining liquid glass aesthetics with daily productivity dashboard layouts. Features adaptive weather tracking, animated music visualizer controls, and calendar agenda feed.\n\nTailored for comfortable one-handed navigation.',
      descjp: 'モダンなマルチパネルインターフェース。リキッドガラスの質感と日常のダッシュボードをシームレスに統合。天気予報、動的ミュージックプレイヤー、カレンダーイベントを搭載しています。',
      images: [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80'
      ],
      badge: 'NEW',
      highlights: ['3 Halaman Nova Launcher responsif', 'Widget cuaca multi-kota adaptif', 'Kontrol audio dinamis dengan visualizer', 'Mode gelap/terang otomatis mengikuti sistem'],
      tab: 'home',
      video: '4KqMmsVlO6U',
      size: '12.4 MB',
      updated: '24 Okt 2026',
      info: 'Dibuat dengan KLWP 3.75+ untuk Android 11 hingga Android 15.'
    },
    {
      id: 'monolith-cyber',
      name: 'Monolith Minimal Cyber',
      author: 'Asino',
      category: 'Minimal',
      type: 'KLWP',
      price: 'Free',
      priceid: 'Gratis',
      priceen: 'Free',
      pricejp: '無料',
      originalPrice: null,
      isFree: true,
      buyUrl: null,
      whatsappUrl: 'https://wa.me/6289686441030',
      downloadUrl: 'https://github.com/asino-presets/releases/download/v1.0/Monolith_Cyber.klwp',
      description: 'Tata letak ultra-minimal monokrom dengan aksen tipografi Schibsted yang tajam. Dibuat bagi pengguna yang menginginkan homescreen bersih tanpa gangguan visual, dengan akses cepat ke aplikasi esensial.',
      descid: 'Tata letak ultra-minimal monokrom dengan aksen tipografi Schibsted yang tajam. Dibuat bagi pengguna yang menginginkan homescreen bersih tanpa gangguan visual, dengan akses cepat ke aplikasi esensial.',
      descen: 'Ultra-minimal monochrome layout with sharp typography. Designed for users who appreciate distraction-free homescreens with rapid essential app triggers.',
      descjp: 'モノクロームの極限ミニマリズム。ノイズを排除した集中できるホーム画面を提供します。',
      images: [
        'https://images.unsplash.com/photo-1507499739999-097706ad8914?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'
      ],
      badge: 'HOT',
      highlights: ['1 Halaman setup instan', 'Statistik baterai dan waktu presisi tinggi', 'Pintasan 6 aplikasi favorit tersembunyi', 'Konsumsi daya layar AMOLED 0% idle'],
      tab: 'home',
      video: null,
      size: '6.8 MB',
      updated: '20 Okt 2026',
      info: 'Mendukung semua rasio layar 18:9, 19.5:9, dan 20:9.'
    },
    {
      id: 'glass-widgets-pack',
      name: 'GlassOS Modular Widgets',
      author: 'Asino',
      category: 'Glassmorphism',
      type: 'KWGT',
      price: 'Free',
      priceid: 'Gratis',
      priceen: 'Free',
      pricejp: '無料',
      originalPrice: null,
      isFree: true,
      buyUrl: null,
      whatsappUrl: 'https://wa.me/6289686441030',
      downloadUrl: 'https://github.com/asino-presets/releases/download/v1.0/GlassOS_KWGT.zip',
      description: 'Koleksi 18 widget modular berbasis liquid glass: jam digital tebal, widget cuaca transparan, widget baterai cincin melingkar, dan kalender ringkas yang dapat dikombinasikan secara bebas.',
      descid: 'Koleksi 18 widget modular berbasis liquid glass: jam digital tebal, widget cuaca transparan, widget baterai cincin melingkar, dan kalender ringkas yang dapat dikombinasikan secara bebas.',
      descen: 'A suite of 18 modular liquid glass widgets: bold digital clocks, transparent weather monitors, battery rings, and compact calendars.',
      descjp: '18種類のリキッドガラスモジュラーウィジェットパック。自由な組み合わせが可能です。',
      images: [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80'
      ],
      badge: null,
      highlights: ['18 Variasi widget siap pakai', 'Mendukung penskalaan global otomatis', 'Kompatibel dengan semua launcher Android'],
      tab: 'home',
      video: null,
      size: '18.2 MB',
      updated: '18 Okt 2026',
      info: 'Memerlukan aplikasi KWGT Pro.'
    },
    {
      id: 'aurora-cards-pro',
      name: 'Aurora Cards Studio',
      author: 'Asino',
      category: 'Dashboard',
      type: 'KLWP',
      price: 'Rp 25.000',
      priceid: 'Rp 25.000',
      priceen: '$2.00',
      pricejp: '¥300',
      originalPrice: 'Rp 40.000',
      oripriceid: 'Rp 40.000',
      oripriceen: '$3.50',
      oripricejp: '¥500',
      isFree: false,
      buyUrl: 'https://gumroad.com',
      whatsappUrl: 'https://wa.me/6289686441030',
      downloadUrl: null,
      description: 'Edisi premium terlengkap dari Asino. Sistem kartu modular yang mengelompokkan notifikasi interaktif, kontrol media Spotify/YouTube Music, serta pemantauan data performa memori dan CPU telepon secara real-time.\n\nDilengkapi pengaturan tema warna global (12 palet warna bawaan).',
      descid: 'Edisi premium terlengkap dari Asino. Sistem kartu modular yang mengelompokkan notifikasi interaktif, kontrol media Spotify/YouTube Music, serta pemantauan data performa memori dan CPU telepon secara real-time.\n\nDilengkapi pengaturan tema warna global (12 palet warna bawaan).',
      descen: 'The definitive premium preset from Asino. Modular card deck aggregating interactive notifications, media controls, and real-time hardware telemetry.\n\nIncludes 12 curated global color presets.',
      descjp: 'Asinoのプレミアムエディション。通知、メディアコントロール、ハードウェア監視をカード形式で美しく集約。12種のカラーパレット内蔵。',
      images: [
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
      ],
      badge: 'BEST',
      highlights: ['12 Tema warna built-in', 'Panel kontrol audio interaktif', 'Dukungan instalasi personal via WhatsApp', 'Pembaruan gratis berkala'],
      tab: 'katalog',
      video: '4KqMmsVlO6U',
      size: '22.0 MB',
      updated: '22 Okt 2026',
      info: 'Termasuk file komponen dan wallpaper resolusi tinggi 4K.'
    },
    {
      id: 'cyberdesk-os',
      name: 'CyberDesk Executive',
      author: 'Asino',
      category: 'Dashboard',
      type: 'KLWP',
      price: 'Rp 20.000',
      priceid: 'Rp 20.000',
      priceen: '$1.50',
      pricejp: '¥250',
      originalPrice: 'Rp 35.000',
      oripriceid: 'Rp 35.000',
      oripriceen: '$3.00',
      oripricejp: '¥450',
      isFree: false,
      buyUrl: 'https://gumroad.com',
      whatsappUrl: 'https://wa.me/6289686441030',
      downloadUrl: null,
      description: 'Preset produktivitas bagi profesional yang membutuhkan ringkasan to-do list, catatan cepat, jam dunia multi-zona, dan jadwal meeting di layar pertama Android.',
      descid: 'Preset produktivitas bagi profesional yang membutuhkan ringkasan to-do list, catatan cepat, jam dunia multi-zona, dan jadwal meeting di layar pertama Android.',
      descen: 'Productivity-focused executive preset with task summaries, quick scratchpad, world clock, and meeting agendas right on your homescreen.',
      descjp: 'プロフェッショナル向けビジネスプリセット。タスク管理、簡易メモ、世界時計、会議予定を直感的に表示。',
      images: [
        'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507499739999-097706ad8914?w=800&auto=format&fit=crop&q=80'
      ],
      badge: 'SALE',
      highlights: ['Jam dunia 4 kota', 'Widget catatan cepat Kustom', 'Desain typography industrial elegan', 'Hemat baterai'],
      tab: 'katalog',
      video: null,
      size: '14.5 MB',
      updated: '15 Okt 2026',
      info: 'Mendukung Nova Launcher & Niagara Launcher.'
    },
    {
      id: 'zenith-minimal-kwgt',
      name: 'Zenith Typography Widgets',
      author: 'Asino',
      category: 'Minimal',
      type: 'KWGT',
      price: 'Rp 15.000',
      priceid: 'Rp 15.000',
      priceen: '$1.00',
      pricejp: '¥150',
      originalPrice: null,
      isFree: false,
      buyUrl: 'https://gumroad.com',
      whatsappUrl: 'https://wa.me/6289686441030',
      downloadUrl: null,
      description: 'Kumpulan widget tipografi elegan dengan penekanan pada keterbacaan tinggi dan komposisi proporsional ala broadsheet Swiss modern.',
      descid: 'Kumpulan widget tipografi elegan dengan penekanan pada keterbacaan tinggi dan komposisi proporsional ala broadsheet Swiss modern.',
      descen: 'Elegant typographic widget pack focusing on readability and proportional Swiss design compositions.',
      descjp: 'スイススタイルを基調としたミニマルタイポグラフィウィジェットパック。',
      images: [
        'https://images.unsplash.com/photo-1507499739999-097706ad8914?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
      ],
      badge: null,
      highlights: ['14 Pilihan widget tipografi', 'Dukungan dark mode adaptif', 'Pengaturan padding fleksibel'],
      tab: 'katalog',
      video: null,
      size: '9.1 MB',
      updated: '12 Okt 2026',
      info: 'Cocok untuk wallpaper monokrom dan fotografi alam.'
    }
  ];

  // Internationalization Strings
  const I18N = {
    id: {
      navHome: 'Beranda',
      navKatalog: 'Katalog',
      navPanduan: 'Panduan',
      searchPlaceholder: 'Cari nama preset, kategori, atau fitur...',
      katalogSearchPlaceholder: 'Cari nama preset di katalog toko...',
      allCategories: 'Semua',
      allTypes: 'Semua Tipe',
      allPrices: 'Semua',
      freePrice: 'Gratis',
      paidPrice: 'Berbayar',
      favorites: 'Favorit',
      itemsCount: count => `Menampilkan ${count} tema`,
      featuredTag: 'Tema Terbaru',
      installTheme: 'Unduh tema',
      buyTheme: 'Beli tema',
      orderWhatsApp: 'Pesan via WhatsApp',
      watchGuide: 'Tonton Panduan',
      emptyTitle: 'Tema tidak ditemukan',
      emptyDesc: 'Coba gunakan kata kunci lain atau reset filter yang sedang aktif.',
      resetFilters: 'Reset filter',
      favSaved: 'Disimpan ke favorit',
      favRemoved: 'Dihapus dari favorit',
      emptyFavs: 'Belum ada favorit. Ketuk ikon hati di tema yang kamu suka.',
      byAuthor: 'Karya',
      specsHeader: 'Spesifikasi Teknis',
      descriptionHeader: 'Deskripsi Tema',
      highlightsHeader: 'Fitur & Kemampuan',
      appsHeader: 'Aplikasi yang Dibutuhkan',
      relatedHeader: 'Tema Terkait',
      screenRatio: 'Rasio Layar',
      novaPages: 'Halaman Launcher',
      fileSize: 'Ukuran File',
      lastUpdated: 'Diperbarui',
      copiedLink: 'Tautan disalin ke papan klip',
      statusSyncSuccess: 'Katalog berhasil diperbarui.',
      statusSyncError: 'Katalog tidak bisa dimuat secara langsung. Menampilkan data cadangan.',
      retry: 'Coba lagi',
      // Panduan Guide Translations
      guideTitle: 'Panduan Pemasangan',
      guideSubtitle: 'Ikuti langkah mudah berikut untuk memasang tema Asino di perangkat Android kamu.',
      step1Title: 'Buka Aplikasi Tema',
      step1Text: 'Unduh dan pasang aplikasi tema Asino di perangkat Android kamu, lalu buka aplikasinya.',
      step2Title: 'Pilih Tema yang Diinginkan',
      step2Text: 'Di dalam aplikasi, pilih dan klik tema yang ingin kamu pasang dari daftar tema yang tersedia.',
      step3Title: 'Izinkan Izin yang Diperlukan',
      step3Text: 'Berikan izin sistem yang diminta (seperti izin penyimpanan dan wallpaper) agar tema dapat dimuat secara optimal.',
      step4Title: 'Simpan dan Terapkan Tema',
      step4Text: 'Klik tombol Simpan (Save) lalu pilih Terapkan (Apply) untuk langsung menjadikannya sebagai Wallpaper Layar Utama perangkat kamu.',
      guideVideoHeading: 'Video Panduan Praktis',
      guideVideoSubheading: 'Tonton langkah visual pengaturan layar dari awal hingga selesai.',
      guideVideoCardTitle: 'Tutorial Lengkap Setup Tema di Android',
      guideVideoCardDesc: 'Langkah mudah pengaturan aplikasi, pemberian izin, dan penerapan wallpaper.',
      guideVideoWatchBtn: 'Tonton sekarang',
      faqHeading: 'Pertanyaan yang Sering Diajukan (FAQ)',
      faqQ1: 'Apakah saya membutuhkan versi Pro dari KLWP atau KWGT?',
      faqAns1: 'Tergantung tema yang kamu pilih. Tema berbasis aplikasi Asino sudah dilengkapi petunjuk otomatis di dalam aplikasinya.',
      faqQ2: 'Bagaimana jika rasio layar ponsel saya bukan 19.5:9 atau 20:9?',
      faqAns2: 'Preset Asino dirancang menggunakan variabel skala global (Globals). Di dalam editor aplikasi, kamu dapat menyesuaikan skala atau padding sesuai lekukan kamera ponselmu.',
      faqQ3: 'Mengapa gesekan halaman tidak bergerak di layar utama?',
      faqAns3: 'Pastikan jumlah halaman di pengaturan Launcher ponselmu sesuai dengan kebutuhan tema, dan opsi "Wallpaper Scrolling" telah diaktifkan di launcher.',
      faqQ4: 'Bagaimana cara memperbarui tema jika kreator merilis versi baru?',
      faqAns4: 'Cukup perbarui atau unduh ulang file/aplikasi tema terbaru dari hub katalog ini, lalu terapkan kembali.',
      creatorBio: `Hai, selamat datang di Asino!\n\nDi sini aku membuat berbagai custom & preset KLWP, KWGT, dan KLCK untuk mempercantik dan membuat perangkat Android kamu lebih personal.\n\nTapi Asino nggak berhenti di customization saja. Ke depannya, aku juga akan terus mengembangkan aplikasi dan berbagai project Android lainnya.\n\nKalau kamu suka karya-karyaku, jangan lupa follow dan support dengan membeli tema yang aku buat!`,
      creatorStoreBtn: 'Store Eksternal',
      creatorWaBtn: 'Konsultasi WhatsApp',
      creatorChannelBtn: 'Saluran WhatsApp',
      downloadApk: 'Download',
      downloadApkToast: 'Memulai unduhan file Asino Official APK untuk Android...',
      // APK Modal Translations
      apkModalTitle: 'Download Asino APK',
      apkModalBadge: 'Versi Resmi Khusus Android • Asino v1.0',
      apkModalDesc: 'Pasang aplikasi resmi <strong>Asino Official</strong> langsung di perangkat Android Anda untuk menerapkan tema, wallpaper KLWP, dan widget KWGT secara instan.',
      apkStep1: 'Unduh file <strong>Asino_Official.apk</strong> menggunakan tombol di bawah.',
      apkStep2: 'Buka notifikasi unduhan atau cari file di folder <em>Download</em> ponsel.',
      apkStep3: 'Pilih <strong>Pasang (Install)</strong> dan izinkan pemasangan aplikasi jika diminta sistem.',
      apkStep4: 'Buka aplikasi Asino dan langsung terapkan tema favoritmu ke layar utama!',
      apkDownloadBtn: 'Unduh File APK Sekarang',
      modalClose: 'Tutup'
    },
    en: {
      navHome: 'Home',
      navKatalog: 'Catalog',
      navPanduan: 'Guide',
      searchPlaceholder: 'Search presets, categories, features...',
      katalogSearchPlaceholder: 'Search presets in store catalog...',
      allCategories: 'All',
      allTypes: 'All Types',
      allPrices: 'All',
      freePrice: 'Free',
      paidPrice: 'Paid',
      favorites: 'Favorites',
      itemsCount: count => `Showing ${count} themes`,
      featuredTag: 'Latest Theme',
      installTheme: 'Download theme',
      buyTheme: 'Buy theme',
      orderWhatsApp: 'Order via WhatsApp',
      watchGuide: 'Watch Guide',
      emptyTitle: 'No themes found',
      emptyDesc: 'Try a different keyword or reset the active filters.',
      resetFilters: 'Reset filters',
      favSaved: 'Added to favorites',
      favRemoved: 'Removed from favorites',
      emptyFavs: 'No favorites yet. Tap the heart icon on any theme you like.',
      byAuthor: 'By',
      specsHeader: 'Technical Specs',
      descriptionHeader: 'Theme Description',
      highlightsHeader: 'Features & Capabilities',
      appsHeader: 'Required Applications',
      relatedHeader: 'Related Themes',
      screenRatio: 'Screen Ratio',
      novaPages: 'Launcher Pages',
      fileSize: 'File Size',
      lastUpdated: 'Updated',
      copiedLink: 'Link copied to clipboard',
      statusSyncSuccess: 'Catalog updated successfully.',
      statusSyncError: 'Could not fetch live catalog. Showing cached presets.',
      retry: 'Try again',
      // Panduan Guide Translations
      guideTitle: 'Installation Guide',
      guideSubtitle: 'Follow these simple steps to install Asino themes on your Android device.',
      step1Title: 'Open Theme App',
      step1Text: 'Download and install the Asino theme app on your Android device, then launch the app.',
      step2Title: 'Select Your Desired Theme',
      step2Text: 'Inside the app, choose and tap the theme you want to install from the available list.',
      step3Title: 'Grant Required Permissions',
      step3Text: 'Grant the system permissions requested by the app (such as storage and wallpaper access) to ensure all components load properly.',
      step4Title: 'Save and Apply Theme',
      step4Text: 'Click the Save button and select Apply to set it as your device\'s Home Screen wallpaper.',
      guideVideoHeading: 'Hands-On Video Guide',
      guideVideoSubheading: 'Watch the visual walkthrough from scratch to finish.',
      guideVideoCardTitle: 'Complete Theme Setup Tutorial for Android',
      guideVideoCardDesc: 'Easy walkthrough for opening the app, granting permissions, and applying the setup.',
      guideVideoWatchBtn: 'Watch now',
      faqHeading: 'Frequently Asked Questions (FAQ)',
      faqQ1: 'Do I need the Pro version of KLWP or KWGT?',
      faqAns1: 'It depends on the theme selected. Standalone Asino theme apps provide embedded walkthroughs inside the app.',
      faqQ2: 'What if my phone has a different aspect ratio than 19.5:9 or 20:9?',
      faqAns2: 'Asino presets feature built-in global scale variables. Go to the Globals tab and adjust scale or padding to match your display cutout.',
      faqQ3: 'Why does page scrolling not work on my homescreen?',
      faqAns3: 'Ensure the number of launcher screens matches the preset requirements, and that "Wallpaper Scrolling" is turned on in your launcher settings.',
      faqQ4: 'How do I update a theme when the creator releases a new version?',
      faqAns4: 'Simply update or download the latest theme app from this catalog hub and reapply.',
      creatorBio: `Hi, welcome to Asino!\n\nHere I create various KLWP, KWGT, and KLCK presets & customizations to elevate and personalize your Android device.\n\nBut Asino doesn't stop at customization. Moving forward, I will also continue developing applications and various other Android projects.\n\nIf you enjoy my work, don't forget to follow and support by purchasing the themes I create!`,
      creatorStoreBtn: 'External Store',
      creatorWaBtn: 'WhatsApp Inquiry',
      creatorChannelBtn: 'WhatsApp Channel',
      downloadApk: 'Download',
      downloadApkToast: 'Starting Asino Official APK download for Android...',
      // APK Modal Translations
      apkModalTitle: 'Download Asino APK',
      apkModalBadge: 'Official Android Version • Asino v1.0',
      apkModalDesc: 'Install the official <strong>Asino Official</strong> app directly on your Android device to apply themes, KLWP wallpapers, and KWGT widgets instantly.',
      apkStep1: 'Download the <strong>Asino_Official.apk</strong> file using the button below.',
      apkStep2: 'Open the download notification or locate the file in your phone\'s <em>Download</em> folder.',
      apkStep3: 'Select <strong>Install</strong> and permit app installation if prompted by the system.',
      apkStep4: 'Launch the Asino app and apply your favorite theme to your home screen immediately!',
      apkDownloadBtn: 'Download APK File Now',
      modalClose: 'Close'
    },
    ja: {
      navHome: 'ホーム',
      navKatalog: 'カタログ',
      navPanduan: '導入ガイド',
      searchPlaceholder: 'プリセット名、カテゴリ、機能で検索...',
      katalogSearchPlaceholder: 'ストアカタログを検索...',
      allCategories: 'すべて',
      allTypes: '全タイプ',
      allPrices: 'すべて',
      freePrice: '無料',
      paidPrice: '有料',
      favorites: 'お気に入り',
      itemsCount: count => `${count}件のテーマを表示中`,
      featuredTag: '最新テーマ',
      installTheme: 'テーマをダウンロード',
      buyTheme: 'テーマを購入',
      orderWhatsApp: 'WhatsAppで注文',
      watchGuide: '動画ガイドを見る',
      emptyTitle: 'テーマが見つかりません',
      emptyDesc: '検索キーワードを変更するか、フィルターをリセットしてください。',
      resetFilters: 'フィルターをリセット',
      favSaved: 'お気に入りに追加しました',
      favRemoved: 'お気に入りから削除しました',
      emptyFavs: 'お気に入りはまだありません。ハートアイコンをタップして保存できます。',
      byAuthor: '作者',
      specsHeader: '仕様・環境',
      descriptionHeader: 'テーマ説明',
      highlightsHeader: '主な機能と特徴',
      appsHeader: '必要なアプリ',
      relatedHeader: '関連テーマ',
      screenRatio: '対応アスペクト比',
      novaPages: 'ランチャー画面数',
      fileSize: 'ファイル容量',
      lastUpdated: '更新日',
      copiedLink: 'リンクをクリップボードにコピーしました',
      statusSyncSuccess: 'カタログを最新に更新しました。',
      statusSyncError: 'オンラインカタログの取得に失敗しました。保存データを表示中。',
      retry: '再試行',
      // Panduan Guide Translations
      guideTitle: 'インストールガイド',
      guideSubtitle: 'AsinoテーマをAndroid端末に導入するための簡単な手順です。',
      step1Title: 'テーマアプリを開く',
      step1Text: 'Android端末にAsinoのテーマアプリをインストールし、アプリを起動します。',
      step2Title: 'お好みのテーマを選択',
      step2Text: 'アプリ内の一覧から、適用したいテーマを選択してタップします。',
      step3Title: '必要な権限を許可',
      step3Text: 'テーマが正常に機能するよう、アプリが要求する権限（ストレージや壁紙アクセスなど）を許可します。',
      step4Title: '保存してテーマを適用',
      step4Text: '保存（Save）ボタンをクリックし、適用（Apply）を選択してホーム画面に反映させます。',
      guideVideoHeading: '実践動画ガイド',
      guideVideoSubheading: '初期設定から完成までの流れを動画で確認できます。',
      guideVideoCardTitle: 'Android向けテーマセットアップチュートリアル',
      guideVideoCardDesc: 'アプリの起動、権限の付与、壁紙の適用までの簡単な流れ。',
      guideVideoWatchBtn: '今すぐ見る',
      faqHeading: 'よくある質問 (FAQ)',
      faqQ1: 'KLWPやKWGTのPro版は必要ですか？',
      faqAns1: '選択したテーマによります。スタンドアロン型Asinoテーマアプリにはアプリ内にガイドが組み込まれています。',
      faqQ2: '端末の画面比率が19.5:9や20:9と異なる場合はどうすればいいですか？',
      faqAns2: 'Asinoのプリセットはグローバル変数（Globals）でスケーリングできるよう設計されています。Globalsタブからscaleや上下パディングをお使いの端末に合わせて微調整してください。',
      faqQ3: 'ホーム画面で左右スワイプしてもページが動きません。',
      faqAns3: 'ランチャーの画面数がテーマ仕様と一致しているか確認し、ランチャー設定で「壁紙スクロール」が有効になっていることを確認してください。',
      faqQ4: 'クリエイターが新しいバージョンをリリースした際の更新手順は？',
      faqAns4: '本カタログハブから最新のテーマアプリを再ダウンロードまたはアップデートして再度適用してください。',
      creatorBio: `Asinoへようこそ！\n\nAndroid端末をより美しく、個性的に演出するためのKLWP、KWGT、KLCKカスタム・プリセットを制作しています。\n\nカスタマイズにとどまらず、今後はアプリや様々なAndroidプロジェクトの開発も進めていく予定です。\n\n作品を気に入っていただけたら、ぜひフォローとテーマ購入での応援をよろしくお願いします！`,
      creatorStoreBtn: 'ストアを見る',
      creatorWaBtn: 'WhatsAppでお問い合わせ',
      creatorChannelBtn: 'WhatsAppチャンネル',
      downloadApk: 'ダウンロード',
      downloadApkToast: 'Android専用Asino公式APKのダウンロードを開始しています...',
      // APK Modal Translations
      apkModalTitle: 'Asino APKをダウンロード',
      apkModalBadge: 'Android公式版 • Asino v1.0',
      apkModalDesc: '<strong>Asino Official</strong>公式アプリをAndroid端末に直接インストールして、テーマ、KLWP壁紙、KWGTウィジェットを即座に適用できます。',
      apkStep1: '下のボタンから<strong>Asino_Official.apk</strong>ファイルをダウンロードします。',
      apkStep2: 'ダウンロード通知を開くか、端末の<em>Download</em>フォルダでファイルを確認します。',
      apkStep3: '<strong>インストール</strong>を選択し、システムの要求に応じて提供元不明アプリの許可を行います。',
      apkStep4: 'Asinoアプリを起動し、お気に入りのテーマをホーム画面にすぐ適用できます！',
      apkDownloadBtn: '今すぐAPKファイルをダウンロード',
      modalClose: '閉じる'
    }
  };

  // Application State
  const state = {
    activeTab: 'home',
    activeLang: 'id',
    favorites: new Set(),
    items: [],
    searchQuery: '',
    katalogSearchQuery: '',
    selectedCategory: 'all',
    selectedType: 'all',
    selectedPriceFilter: 'all',
    // Detail Stack: depth 0 (closed), 1 (Level 1), 2 (Level 2)
    detailStack: [],
    savedScrollY: 0,
    // Carousel State per detail layer
    carouselIndex: { 1: 0, 2: 0 },
    // Viewer Modal State
    viewer: {
      isOpen: false,
      images: [],
      currentIndex: 0,
      scale: 1,
      startX: 0,
      startY: 0,
      posX: 0,
      posY: 0,
      isDragging: false,
      initialDistance: 0,
      lastTapTime: 0
    }
  };

  // Safe LocalStorage helpers
  function storageGet(key, fallback = null) {
    try {
      const val = localStorage.getItem(key);
      return val !== null ? JSON.parse(val) : fallback;
    } catch {
      return fallback;
    }
  }

  function storageSet(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignored in private/quota limits
    }
  }

  // =========================================================================
  // 2. RFC-4180 CSV PARSER (Self-written, robust)
  // =========================================================================

  function parseRFC4180CSV(csvText) {
    if (!csvText) return [];

    // Remove BOM if present
    if (csvText.charCodeAt(0) === 0xFEFF) {
      csvText = csvText.slice(1);
    }

    const rows = [];
    let currentRow = [];
    let currentField = '';
    let insideQuotes = false;
    let i = 0;
    const len = csvText.length;

    while (i < len) {
      const char = csvText[i];
      const nextChar = csvText[i + 1];

      if (insideQuotes) {
        if (char === '"') {
          if (nextChar === '"') {
            // Escaped quote: "" -> "
            currentField += '"';
            i += 2;
            continue;
          } else {
            // Closing quote
            insideQuotes = false;
            i++;
            continue;
          }
        } else {
          currentField += char;
          i++;
          continue;
        }
      } else {
        if (char === '"') {
          insideQuotes = true;
          i++;
          continue;
        } else if (char === ',') {
          currentRow.push(currentField);
          currentField = '';
          i++;
          continue;
        } else if (char === '\r') {
          if (nextChar === '\n') {
            i++;
          }
          currentRow.push(currentField);
          currentField = '';
          if (currentRow.length > 0 && currentRow.some(f => f.trim() !== '')) {
            rows.push(currentRow);
          }
          currentRow = [];
          i++;
          continue;
        } else if (char === '\n') {
          currentRow.push(currentField);
          currentField = '';
          if (currentRow.length > 0 && currentRow.some(f => f.trim() !== '')) {
            rows.push(currentRow);
          }
          currentRow = [];
          i++;
          continue;
        } else {
          currentField += char;
          i++;
          continue;
        }
      }
    }

    if (currentField !== '' || currentRow.length > 0) {
      currentRow.push(currentField);
      if (currentRow.some(f => f.trim() !== '')) {
        rows.push(currentRow);
      }
    }

    if (rows.length === 0) return [];

    // Normalize headers: lowercase, trim, remove whitespace and underscore
    const rawHeaders = rows[0];
    const headers = rawHeaders.map(h => h.trim().toLowerCase().replace(/[\s_-]+/g, ''));

    const parsedObjects = [];
    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      const obj = {};
      headers.forEach((h, idx) => {
        obj[h] = row[idx] !== undefined ? row[idx].trim() : '';
      });
      parsedObjects.push(obj);
    }

    return parsedObjects;
  }

  // Format and sanitize date strings, removing accidental brackets/parentheses and stray chars
  function formatCleanDate(rawDate, lang = 'id') {
    if (!rawDate) return 'Terbaru';

    // Remove all unnecessary parentheses, brackets, or stray closing parens like 08/)08/2026
    let clean = String(rawDate).replace(/[()[\]{}]/g, '').trim();

    // Remove time portion if present (e.g. 12:30:00)
    clean = clean.replace(/\s+\d{1,2}:\d{2}(?::\d{2})?.*$/, '').trim();

    // Check if numeric date DD/MM/YYYY or DD-MM-YYYY
    const dmyMatch = clean.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (dmyMatch) {
      const day = parseInt(dmyMatch[1], 10);
      const month = parseInt(dmyMatch[2], 10) - 1;
      const year = parseInt(dmyMatch[3], 10);
      const dateObj = new Date(year, month, day);
      if (!isNaN(dateObj.getTime())) {
        if (lang === 'id') {
          const monthsId = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
          return `${day} ${monthsId[month]} ${year}`;
        } else if (lang === 'en') {
          const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          return `${monthsEn[month]} ${day}, ${year}`;
        } else if (lang === 'ja' || lang === 'jp') {
          return `${year}年${month + 1}月${day}日`;
        }
      }
    }

    // Check if numeric date YYYY-MM-DD or YYYY/MM/DD
    const ymdMatch = clean.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
    if (ymdMatch) {
      const year = parseInt(ymdMatch[1], 10);
      const month = parseInt(ymdMatch[2], 10) - 1;
      const day = parseInt(ymdMatch[3], 10);
      const dateObj = new Date(year, month, day);
      if (!isNaN(dateObj.getTime())) {
        if (lang === 'id') {
          const monthsId = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
          return `${day} ${monthsId[month]} ${year}`;
        } else if (lang === 'en') {
          const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          return `${monthsEn[month]} ${day}, ${year}`;
        } else if (lang === 'ja' || lang === 'jp') {
          return `${year}年${month + 1}月${day}日`;
        }
      }
    }

    return clean || 'Terbaru';
  }

  // Normalizer: transforms arbitrary raw row object to clean KustomItem
  function normalizeItem(raw) {
    if (!raw) return null;

    const getField = (keys) => {
      for (const k of keys) {
        const normKey = k.toLowerCase().replace(/[\s_-]+/g, '');
        if (raw[normKey] !== undefined && raw[normKey] !== '') {
          return raw[normKey];
        }
      }
      return '';
    };

    const name = getField(['name', 'nama']);
    if (!name) return null;

    const rawId = getField(['id']);
    const id = rawId || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const author = getField(['author', 'creator']) || 'Asino';
    const category = getField(['category', 'kategori']) || 'Custom';
    const rawType = getField(['type', 'tipe']).toUpperCase();
    const type = rawType.includes('KWGT') ? 'KWGT' : rawType.includes('KLCK') ? 'KLCK' : 'KLWP';

    const rawTab = getField(['tab', 'location', 'lokasi']).toLowerCase();
    // Rule: Kosong -> data tidak ditampilkan.
    if (!rawTab) return null;
    const tab = (rawTab === 'home' || rawTab === 'beranda') ? 'home' : (rawTab === 'katalog' || rawTab === 'store') ? 'katalog' : null;
    if (!tab) return null;

    // Prices
    const rawPriceId = getField(['priceid', 'harga_id', 'price', 'harga']).trim();
    const rawPriceEn = getField(['priceen', 'price_en']).trim();
    const rawPriceJp = getField(['pricejp', 'price_jp']).trim();

    const rawOriPriceId = getField(['oripriceid', 'originalpriceid', 'originalprice', 'harga_asli', 'harga_coret']).trim();
    const rawOriPriceEn = getField(['oripriceen', 'originalpriceen']).trim();
    const rawOriPriceJp = getField(['oripricejp', 'originalpricejp']).trim();

    // Determine isFree
    const isFree = !rawPriceId ||
      rawPriceId.toLowerCase() === 'free' ||
      rawPriceId.toLowerCase() === 'gratis' ||
      rawPriceId === '0' ||
      rawPriceId === '-';

    const formatIdPrice = (val) => {
      if (!val) return '';
      let s = val.replace(/^rp\.?\s*/i, '').trim();
      return `Rp ${s}`;
    };

    const formatEnPrice = (val) => {
      if (!val) return '';
      let s = val.replace(/^\$\s*/, '').trim();
      return `$${s}`;
    };

    const formatJpPrice = (val) => {
      if (!val) return '';
      let s = val.replace(/^¥\s*/, '').trim();
      return `¥${s}`;
    };

    let priceid = 'Gratis';
    let priceen = 'Free';
    let pricejp = '無料';
    let price = 'Gratis';
    let originalPrice = null;
    let oripriceid = null;
    let oripriceen = null;
    let oripricejp = null;

    if (!isFree) {
      priceid = formatIdPrice(rawPriceId);
      priceen = rawPriceEn ? formatEnPrice(rawPriceEn) : priceid;
      pricejp = rawPriceJp ? formatJpPrice(rawPriceJp) : priceid;
      price = priceid;

      if (rawOriPriceId) {
        oripriceid = formatIdPrice(rawOriPriceId);
        oripriceen = rawOriPriceEn ? formatEnPrice(rawOriPriceEn) : oripriceid;
        oripricejp = rawOriPriceJp ? formatJpPrice(rawOriPriceJp) : oripriceid;
        originalPrice = oripriceid;
      }
    }

    const rawBuyUrl = getField(['buyurl', 'link', 'lynk', 'storeurl', 'toko', 'gumroad']).trim();
    const rawDownloadUrl = getField(['downloadurl', 'download', 'unduh', 'fileurl']).trim();
    const rawWa = getField(['whatsappurl', 'wa', 'whatsapp', 'nomorwa', 'telepon']).trim();

    const buyUrl = rawBuyUrl || 'https://lynk.id/asino';
    const downloadUrl = rawDownloadUrl || (isFree ? rawBuyUrl : null) || null;
    let whatsappUrl = DEFAULT_WA_URL;
    if (rawWa) {
      if (rawWa.startsWith('http://') || rawWa.startsWith('https://')) {
        whatsappUrl = rawWa;
      } else {
        let cleanNum = rawWa.replace(/[^0-9]/g, '');
        if (cleanNum.startsWith('0')) cleanNum = '62' + cleanNum.slice(1);
        whatsappUrl = `https://wa.me/${cleanNum || DEFAULT_WA_NUMBER}`;
      }
    }

    // Descriptions per language (fully handles Google Sheet columns: descriptionid, descriptionen, descriptionjp, etc.)
    const cleanDesc = (s) => (s ? s.replace(/\\n/g, '\n').trim() : '');

    const rawDescId = getField(['descriptionid', 'deskripsiid', 'descid', 'deskripsi_id', 'description_id', 'desc_id', 'keterangan_id']);
    const rawDescEn = getField(['descriptionen', 'deskripsien', 'descen', 'desc_en', 'description_en', 'keterangan_en']);
    const rawDescJp = getField(['descriptionjp', 'deskripsijp', 'descjp', 'desc_jp', 'description_jp', 'keterangan_jp']);
    const rawGenericDesc = getField(['description', 'deskripsi', 'keterangan', 'desc', 'detail']);

    const description = cleanDesc(rawGenericDesc || rawDescId || rawDescEn || rawDescJp || '');
    const descid = cleanDesc(rawDescId || description);
    const descen = cleanDesc(rawDescEn || description);
    const descjp = cleanDesc(rawDescJp || description);

    // Images normalizer: split by semicolon (;), newline, or comma to support multiple preview images
    const rawImagesStr = getField(['imageurl', 'image', 'gambar', 'images', 'preview', 'fotopreview', 'foto']);
    const rawImgList = rawImagesStr ? rawImagesStr.split(/[;\n,]+/).map(s => s.trim()).filter(Boolean) : [];
    const images = rawImgList.map(url => {
      const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (driveMatch && driveMatch[1]) {
        return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
      }
      return url;
    });

    // Badge
    const rawBadge = getField(['badge', 'tag']).toUpperCase();
    const badge = ['NEW', 'HOT', 'SALE', 'BEST'].includes(rawBadge) ? rawBadge : null;

    // Highlights
    const rawHighlights = getField(['highlights', 'fitur']);
    const highlights = rawHighlights ? rawHighlights.split(';').map(h => h.trim()).filter(Boolean) : [];

    // Video: extract YouTube ID
    const rawVideo = getField(['video', 'video_url', 'videourl']);
    let video = null;
    if (rawVideo) {
      const ytMatch = rawVideo.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/);
      video = ytMatch ? ytMatch[1] : rawVideo.length === 11 ? rawVideo : null;
    }

    const size = getField(['size', 'ukuran']) || '10 MB';
    const version = getField(['version', 'versi']) || '1.0';
    const quality = getField(['quality', 'kualitas']) || 'High Definition';
    const packageName = getField(['packagename', 'package_name', 'package']) || '';
    const rawUpdated = getField(['updated', 'update', 'tanggal']) || 'Terbaru';
    const updated = formatCleanDate(rawUpdated, 'id');
    const rawInfoId = getField(['infoid', 'info_id', 'info', 'keterangan']);
    const rawInfoEn = getField(['infoen', 'info_en']) || rawInfoId;
    const rawInfoJp = getField(['infojp', 'info_jp']) || rawInfoId;
    const info = rawInfoId || '';

    return {
      id,
      name,
      author,
      category,
      type,
      price,
      priceid,
      priceen,
      pricejp,
      originalPrice,
      oripriceid,
      oripriceen,
      oripricejp,
      isFree,
      buyUrl,
      whatsappUrl,
      downloadUrl,
      description,
      descid,
      descen,
      descjp,
      descriptionid: descid,
      descriptionen: descen,
      descriptionjp: descjp,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'],
      badge,
      highlights,
      tab,
      video,
      size,
      version,
      quality,
      packageName,
      updated,
      info,
      infoid: rawInfoId,
      infoen: rawInfoEn,
      infojp: rawInfoJp
    };
  }

  // =========================================================================
  // 3. DATA FETCHING & PIPELINE (STALE-WHILE-REVALIDATE)
  // =========================================================================

  async function loadCatalogData() {
    // 1. Show cached data immediately from localStorage
    const cached = storageGet(STORAGE_KEY_CACHE);
    if (Array.isArray(cached) && cached.length > 0) {
      state.items = cached;
      renderApp();
    } else {
      // Use embedded presets as instant starting point
      state.items = EMBEDDED_PRESETS;
      renderApp();
    }

    // 2. Fetch live Google Sheets CSV
    try {
      const response = await fetch(SHEET_CSV_URL, { cache: 'no-cache' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const text = await response.text();
      const rawRows = parseRFC4180CSV(text);
      const normalized = rawRows.map(normalizeItem).filter(Boolean);

      if (normalized.length > 0) {
        state.items = normalized;
        storageSet(STORAGE_KEY_CACHE, normalized);
        renderApp();
        showStatusBanner(I18N[state.activeLang].statusSyncSuccess, false);
        return;
      }
      throw new Error('Empty CSV parsed items');
    } catch (sheetErr) {
      // 3. Fallback to GitHub raw JSON
      try {
        const ghRes = await fetch(GITHUB_JSON_URL, { cache: 'no-cache' });
        if (!ghRes.ok) throw new Error(`HTTP ${ghRes.status}`);
        const ghData = await ghRes.json();
        if (Array.isArray(ghData) && ghData.length > 0) {
          const normalized = ghData.map(normalizeItem).filter(Boolean);
          if (normalized.length > 0) {
            state.items = normalized;
            storageSet(STORAGE_KEY_CACHE, normalized);
            renderApp();
            showStatusBanner(I18N[state.activeLang].statusSyncSuccess, false);
            return;
          }
        }
        throw new Error('Empty GitHub JSON');
      } catch (ghErr) {
        // 4. Fallback to embedded data + show clear message
        if (state.items.length === 0) {
          state.items = EMBEDDED_PRESETS;
          renderApp();
        }
        showStatusBanner(I18N[state.activeLang].statusSyncError, true);
      }
    }
  }

  function showStatusBanner(text, showRetry = false) {
    const banner = document.getElementById('status-banner');
    const statusText = document.getElementById('status-text');
    const retryBtn = document.getElementById('status-retry-btn');
    if (!banner || !statusText) return;

    statusText.textContent = text;
    banner.hidden = false;
    if (retryBtn) {
      retryBtn.style.display = showRetry ? 'inline-block' : 'none';
    }

    // Auto dismiss if it's just success
    if (!showRetry) {
      setTimeout(() => {
        banner.hidden = true;
      }, 4000);
    }
  }

  // Helper: Get item dynamic localized fields
  function getItemField(item, field) {
    if (!item) return '';
    const lang = state.activeLang;
    if (field === 'price') {
      if (item.isFree) return I18N[lang].freePrice;
      if (lang === 'id' && item.priceid) return item.priceid;
      if (lang === 'en' && item.priceen) return item.priceen;
      if (lang === 'jp' || lang === 'ja') return item.pricejp || item.price;
      return item.price;
    }
    if (field === 'originalPrice') {
      if (lang === 'id' && item.oripriceid) return item.oripriceid;
      if (lang === 'en' && item.oripriceen) return item.oripriceen;
      if ((lang === 'jp' || lang === 'ja') && item.oripricejp) return item.oripricejp;
      return item.originalPrice;
    }
    if (field === 'description') {
      if (lang === 'id' && (item.descid || item.descriptionid)) return item.descid || item.descriptionid;
      if (lang === 'en' && (item.descen || item.descriptionen)) return item.descen || item.descriptionen;
      if ((lang === 'jp' || lang === 'ja') && (item.descjp || item.descriptionjp)) return item.descjp || item.descriptionjp || item.description;
      return item.description || item.descid || item.descriptionid || item.descen || '';
    }
    if (field === 'info') {
      if (lang === 'id' && (item.infoid || item.info)) return item.infoid || item.info;
      if (lang === 'en' && (item.infoen || item.info)) return item.infoen || item.info;
      if ((lang === 'jp' || lang === 'ja') && (item.infojp || item.info)) return item.infojp || item.info;
      return item.info || item.infoid || '';
    }
    return item[field] || '';
  }

  // =========================================================================
  // 4. RENDERING & UI GENERATION
  // =========================================================================

  function renderApp() {
    renderSpotlightHero();
    renderCategoryChips();
    renderThemesGrid();
    renderKatalogStoreGrid();
    updateCreatorMetrics();
    updateDetailIfOpen();
  }

  // Spotlight: Latest or NEW badge item
  function renderSpotlightHero() {
    const homeItems = state.items.filter(item => item.tab === 'home');
    if (homeItems.length === 0) return;

    // Pick item with NEW badge or the very first item
    const featured = homeItems.find(i => i.badge === 'NEW') || homeItems[0];

    const slot = document.getElementById('featured-mockup-slot');
    const titleEl = document.getElementById('featured-title');
    const descEl = document.getElementById('featured-desc');
    const typeLabel = document.getElementById('featured-type-label');
    const openBtn = document.getElementById('featured-open-btn');
    const favBtn = document.getElementById('featured-fav-btn');

    if (!slot || !titleEl) return;

    // Clear and insert 9:16 portrait mockup
    slot.innerHTML = '';
    const img = document.createElement('img');
    img.className = 'featured-mockup-img';
    img.src = featured.images[0];
    img.alt = `Pratinjau ${featured.name}`;
    img.loading = 'eager';
    slot.appendChild(img);

    titleEl.textContent = featured.name;
    const desc = getItemField(featured, 'description');
    descEl.textContent = desc.slice(0, 160) + (desc.length > 160 ? '...' : '');
    if (typeLabel) typeLabel.textContent = featured.type;

    if (openBtn) {
      openBtn.onclick = () => openDetail(featured.id);
    }

    if (favBtn) {
      const isFav = state.favorites.has(featured.id);
      favBtn.classList.toggle('is-fav', isFav);
      const label = favBtn.querySelector('.btn-label-text');
      if (label) label.textContent = isFav ? I18N[state.activeLang].favorites : I18N[state.activeLang].favorites;
      favBtn.onclick = (e) => {
        e.stopPropagation();
        toggleFavorite(featured.id);
        renderSpotlightHero();
      };
    }
  }

  // Helper: Comprehensive Search Matcher (searches name, author, category, type, localized description, all descriptions, highlights, info)
  function matchesSearch(item, query) {
    if (!query || !query.trim()) return true;
    const q = query.trim().toLowerCase();

    // 1. Name & Author
    if (item.name && item.name.toLowerCase().includes(q)) return true;
    if (item.author && item.author.toLowerCase().includes(q)) return true;

    // 2. Category & Type
    if (item.category && item.category.toLowerCase().includes(q)) return true;
    if (item.type && item.type.toLowerCase().includes(q)) return true;

    // 3. Localized description in active language
    const currentDesc = getItemField(item, 'description');
    if (currentDesc && currentDesc.toLowerCase().includes(q)) return true;

    // 4. Descriptions in all supported languages (id, en, jp)
    if (item.descid && item.descid.toLowerCase().includes(q)) return true;
    if (item.descen && item.descen.toLowerCase().includes(q)) return true;
    if (item.descjp && item.descjp.toLowerCase().includes(q)) return true;
    if (item.description && item.description.toLowerCase().includes(q)) return true;

    // 5. Highlights and feature tags
    if (Array.isArray(item.highlights) && item.highlights.some(h => h && h.toLowerCase().includes(q))) return true;

    // 6. Technical info / specs
    if (item.info && item.info.toLowerCase().includes(q)) return true;

    return false;
  }

  // Dynamic Category Chips
  function renderCategoryChips() {
    const container = document.getElementById('home-category-chips');
    if (!container) return;

    // Extract unique categories across all items so paid/store categories are also accessible
    const categories = Array.from(new Set(state.items.map(i => i.category).filter(Boolean)));

    container.innerHTML = '';

    // "All" chip
    const allBtn = document.createElement('button');
    allBtn.type = 'button';
    allBtn.className = `filter-chip ${state.selectedCategory === 'all' ? 'active' : ''}`;
    allBtn.textContent = I18N[state.activeLang].allCategories;
    allBtn.onclick = () => {
      state.selectedCategory = 'all';
      renderCategoryChips();
      renderThemesGrid();
    };
    container.appendChild(allBtn);

    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `filter-chip ${state.selectedCategory === cat ? 'active' : ''}`;
      btn.textContent = cat;
      btn.onclick = () => {
        state.selectedCategory = cat;
        renderCategoryChips();
        renderThemesGrid();
      };
      container.appendChild(btn);
    });
  }

  // Filter items for Home Grid
  function getFilteredHomeItems() {
    const hasSearch = Boolean(state.searchQuery && state.searchQuery.trim());

    return state.items.filter(item => {
      // 1. Price Filter:
      // When user selects 'paid', show ALL paid themes (including those stored with tab: 'katalog')
      if (state.selectedPriceFilter === 'paid') {
        if (item.isFree) return false;
      } else if (state.selectedPriceFilter === 'free') {
        if (!item.isFree) return false;
        if (item.tab !== 'home') return false;
      } else if (state.selectedPriceFilter === 'favorites') {
        if (!state.favorites.has(item.id)) return false;
      } else {
        // 'all' price filter:
        // If user is actively searching, search through all items so nothing is missed.
        // Otherwise, show standard home presets.
        if (!hasSearch && item.tab !== 'home') {
          return false;
        }
      }

      // 2. Category filter
      if (state.selectedCategory !== 'all' && item.category !== state.selectedCategory) {
        return false;
      }

      // 3. Type filter
      if (state.selectedType !== 'all' && item.type !== state.selectedType) {
        return false;
      }

      // 4. Comprehensive Search Query Match
      if (hasSearch && !matchesSearch(item, state.searchQuery)) {
        return false;
      }

      return true;
    });
  }

  // Home Themes Grid
  function renderThemesGrid() {
    const grid = document.getElementById('home-themes-grid');
    const emptyState = document.getElementById('home-empty-state');
    const countEl = document.getElementById('home-items-count');
    if (!grid) return;

    const filtered = getFilteredHomeItems();
    if (countEl) {
      countEl.textContent = I18N[state.activeLang].itemsCount(filtered.length);
    }

    grid.innerHTML = '';

    if (filtered.length === 0) {
      if (emptyState) emptyState.hidden = false;
      return;
    }
    if (emptyState) emptyState.hidden = true;

    filtered.forEach(item => {
      grid.appendChild(createThemeCard(item));
    });
  }

  // Katalog Store Grid (tab = 'katalog' or 'store')
  function renderKatalogStoreGrid() {
    const grid = document.getElementById('katalog-themes-grid');
    const emptyState = document.getElementById('katalog-empty-state');
    if (!grid) return;

    let storeItems = state.items.filter(i => i.tab === 'katalog');

    if (state.katalogSearchQuery && state.katalogSearchQuery.trim()) {
      storeItems = storeItems.filter(item => matchesSearch(item, state.katalogSearchQuery));
    }

    grid.innerHTML = '';

    if (storeItems.length === 0) {
      if (emptyState) emptyState.hidden = false;
      return;
    }
    if (emptyState) emptyState.hidden = true;

    storeItems.forEach(item => {
      grid.appendChild(createThemeCard(item));
    });
  }

  // Card Component Generator
  function createThemeCard(item) {
    const card = document.createElement('article');
    card.className = 'theme-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Lihat detail tema ${item.name}`);

    // Thumbnail container (9:16 aspect ratio)
    const thumbHolder = document.createElement('div');
    thumbHolder.className = 'card-thumb-holder';

    const img = document.createElement('img');
    img.className = 'card-thumb-img loading';
    img.src = item.images[0];
    img.alt = `Thumbnail ${item.name}`;
    img.loading = 'lazy';
    img.onload = () => img.classList.remove('loading');
    img.onerror = () => {
      img.classList.remove('loading');
      img.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';
    };
    thumbHolder.appendChild(img);

    // Badge tag (NEW, HOT, SALE, BEST)
    if (item.badge) {
      const badgeTag = document.createElement('span');
      badgeTag.className = `card-badge-tag badge-${item.badge.toLowerCase()}`;
      badgeTag.textContent = item.badge;
      thumbHolder.appendChild(badgeTag);
    }

    // Favorite button
    const favBtn = document.createElement('button');
    favBtn.type = 'button';
    const isFav = state.favorites.has(item.id);
    favBtn.className = `card-fav-btn ${isFav ? 'is-fav' : ''}`;
    favBtn.setAttribute('aria-label', isFav ? 'Hapus dari favorit' : 'Simpan ke favorit');
    favBtn.innerHTML = `
      <svg class="svg-icon heart-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    `;
    favBtn.onclick = (e) => {
      e.stopPropagation();
      toggleFavorite(item.id);
      favBtn.classList.toggle('is-fav', state.favorites.has(item.id));
      favBtn.setAttribute('aria-label', state.favorites.has(item.id) ? 'Hapus dari favorit' : 'Simpan ke favorit');
      // If filtering by favorites, refresh
      if (state.selectedPriceFilter === 'favorites') {
        renderThemesGrid();
      }
    };
    thumbHolder.appendChild(favBtn);

    card.appendChild(thumbHolder);

    // Body
    const body = document.createElement('div');
    body.className = 'card-body';

    const typeRow = document.createElement('div');
    typeRow.className = 'card-type-row';
    typeRow.innerHTML = `
      <span class="card-type-chip">${item.type}</span>
      <span class="card-category">${item.category}</span>
    `;
    body.appendChild(typeRow);

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = item.name;
    body.appendChild(title);

    const author = document.createElement('span');
    author.className = 'card-author';
    author.textContent = `${I18N[state.activeLang].byAuthor} ${item.author}`;
    body.appendChild(author);

    // Pricing
    const pricingRow = document.createElement('div');
    pricingRow.className = 'card-pricing-row';

    const priceSpan = document.createElement('span');
    priceSpan.className = `price-main ${item.isFree ? 'is-free' : 'is-paid'}`;
    priceSpan.textContent = getItemField(item, 'price');
    pricingRow.appendChild(priceSpan);

    const oriPrice = getItemField(item, 'originalPrice');
    if (oriPrice && !item.isFree) {
      const oriSpan = document.createElement('span');
      oriSpan.className = 'price-original';
      oriSpan.textContent = oriPrice;
      pricingRow.appendChild(oriSpan);
    }

    body.appendChild(pricingRow);
    card.appendChild(body);

    // Open detail
    card.onclick = () => openDetail(item.id);
    card.onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDetail(item.id);
      }
    };

    return card;
  }

  function updateCreatorMetrics() {
    const totalEl = document.getElementById('metric-total-themes');
    const exclusiveEl = document.getElementById('metric-exclusive-themes');
    if (totalEl) totalEl.textContent = state.items.length;
    if (exclusiveEl) {
      const exclusiveCount = state.items.filter(i => i.tab === 'katalog' || !i.isFree).length;
      exclusiveEl.textContent = exclusiveCount;
    }
  }

  // =========================================================================
  // 5. DETAIL STACK & PRE-RENDERED NAVIGATION (MAX DEPTH 2)
  // =========================================================================

  function openDetail(itemId) {
    const item = state.items.find(i => i.id === itemId);
    if (!item) return;

    const currentDepth = state.detailStack.length;

    if (currentDepth === 0) {
      // Save scroll position of main window
      state.savedScrollY = window.scrollY || window.pageYOffset || 0;
      state.detailStack.push(itemId);
      populateDetailLayer(1, item);
      showDetailLayer(1);
      history.pushState({ lvl: 1, id: itemId }, '', `#theme/${itemId}`);
    } else if (currentDepth === 1) {
      state.detailStack.push(itemId);
      populateDetailLayer(2, item);
      showDetailLayer(2);
      history.pushState({ lvl: 2, id: itemId }, '', `#theme/${itemId}`);
    } else if (currentDepth === 2) {
      // Rule: Stack limit is 2. Clicking related theme at Level 2 REPLACES Level 2!
      state.detailStack[1] = itemId;
      // Animate replacement: quick slide out then in (150ms linear)
      const layer2 = document.getElementById('detail-2');
      layer2.style.transition = 'opacity 75ms linear';
      layer2.style.opacity = '0.3';
      setTimeout(() => {
        populateDetailLayer(2, item);
        layer2.style.opacity = '1';
        layer2.style.transition = '';
      }, 75);
      history.replaceState({ lvl: 2, id: itemId }, '', `#theme/${itemId}`);
    }
  }

  function showDetailLayer(layerNum) {
    const layer = document.getElementById(`detail-${layerNum}`);
    if (!layer) return;

    layer.hidden = false;
    layer.setAttribute('aria-hidden', 'false');
    // Force reflow for CSS transition
    void layer.offsetHeight;
    layer.classList.add('is-active');

    // Scroll to top
    const scrollBody = document.getElementById(`d${layerNum}-scroll-body`);
    if (scrollBody) scrollBody.scrollTop = 0;
  }

  function hideDetailLayer(layerNum) {
    const layer = document.getElementById(`detail-${layerNum}`);
    if (!layer) return;

    layer.classList.remove('is-active');
    layer.setAttribute('aria-hidden', 'true');

    // Hide from DOM after 150ms transition
    setTimeout(() => {
      if (!layer.classList.contains('is-active')) {
        layer.hidden = true;
      }
    }, 160);
  }

  function closeTopDetailLayer() {
    const currentDepth = state.detailStack.length;
    if (currentDepth === 2) {
      hideDetailLayer(2);
      state.detailStack.pop();
    } else if (currentDepth === 1) {
      hideDetailLayer(1);
      state.detailStack.pop();
      // Restore main scroll position
      window.scrollTo(0, state.savedScrollY);
    }
  }

  // Reliable Detail Back Navigation (supports iframe, direct links, and gestures)
  function handleDetailBack(layerNum) {
    if (state.viewer.isOpen) {
      closeFullscreenViewer();
      return;
    }

    const currentDepth = state.detailStack.length;
    const targetLayer = Number(layerNum) || (currentDepth === 2 ? 2 : 1);

    if (targetLayer === 2 && currentDepth === 2) {
      hideDetailLayer(2);
      state.detailStack.pop();
      const prevId = state.detailStack[0];
      if (prevId) {
        history.replaceState({ lvl: 1, id: prevId }, '', `#theme/${prevId}`);
      } else {
        history.replaceState(null, '', window.location.pathname);
      }
      return;
    }

    // Closing Layer 1 (or resetting entire detail stack)
    hideDetailLayer(1);
    hideDetailLayer(2);
    state.detailStack = [];
    window.scrollTo(0, state.savedScrollY);
    if (window.location.hash.startsWith('#theme/')) {
      history.replaceState(null, '', window.location.pathname);
    }
  }

  // Handle browser Back, Forward, and popstate
  window.addEventListener('popstate', (e) => {
    // If fullscreen viewer is open, close viewer first
    if (state.viewer.isOpen) {
      closeFullscreenViewer();
      return;
    }

    const targetLvl = e.state && typeof e.state.lvl === 'number' ? e.state.lvl : 0;
    const currentDepth = state.detailStack.length;

    if (currentDepth === 2 && targetLvl < 2) {
      hideDetailLayer(2);
      state.detailStack.pop();
    }
    if (currentDepth >= 1 && targetLvl === 0) {
      hideDetailLayer(1);
      hideDetailLayer(2);
      state.detailStack = [];
      window.scrollTo(0, state.savedScrollY);
    }
  });

  // Smart Related Themes Algorithm (Discerning similarity matching)
  function getRelatedThemes(item, allItems) {
    if (!item || !Array.isArray(allItems)) return [];

    const cleanTokens = (str) => {
      if (!str) return [];
      return str.toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 2 && !['theme', 'tema', 'preset', 'klwp', 'kwgt', 'klck', 'pro', 'asino', 'free', 'untuk', 'yang', 'dengan', 'dan', 'dari'].includes(w));
    };

    const itemTitleTokens = cleanTokens(item.name);
    const itemCategory = (item.category || '').toLowerCase().trim();
    const itemType = (item.type || '').toUpperCase();
    const itemHighlightsTokens = cleanTokens((item.highlights || []).join(' '));
    const itemDescTokens = cleanTokens(item.description || item.descid || '');

    const scored = allItems
      .filter(other => other.id !== item.id)
      .map(other => {
        let score = 0;
        const otherCategory = (other.category || '').toLowerCase().trim();
        const otherType = (other.type || '').toUpperCase();
        const otherTitleTokens = cleanTokens(other.name);
        const otherHighlightsTokens = cleanTokens((other.highlights || []).join(' '));

        // 1. Direct Series / Title Stems Overlap (e.g. Momotalk & Momotalk Pro, Future Theme & Future Theme Pro)
        const matchingTitleTokens = itemTitleTokens.filter(t => otherTitleTokens.includes(t));
        score += matchingTitleTokens.length * 10;

        const baseA = item.name.toLowerCase().replace(/\s+pro\b|\s+lite\b|\s+v\d+/g, '').trim();
        const baseB = other.name.toLowerCase().replace(/\s+pro\b|\s+lite\b|\s+v\d+/g, '').trim();
        if (baseA && baseB && (baseA.includes(baseB) || baseB.includes(baseA))) {
          score += 12;
        }

        // 2. Matching Category (e.g. Anime with Anime, Dashboard with Dashboard, Minimal with Minimal)
        if (itemCategory && otherCategory && itemCategory === otherCategory) {
          score += 8;
        }

        // 3. Same Application Type (KLWP vs KLWP, KWGT vs KWGT)
        if (itemType === otherType) {
          score += 3;
        } else {
          score -= 2;
        }

        // 4. Overlapping features & highlights
        const matchingHighlights = itemHighlightsTokens.filter(t => otherHighlightsTokens.includes(t));
        score += Math.min(matchingHighlights.length, 4) * 2;

        // 5. Description content similarity
        const otherDescTokens = cleanTokens(other.description || other.descid || '');
        const matchingDesc = itemDescTokens.filter(t => otherDescTokens.includes(t));
        score += Math.min(matchingDesc.length, 3) * 1;

        return { item: other, score };
      });

    // Sort descending by highest similarity score
    scored.sort((a, b) => b.score - a.score);

    // Return the top items that have a strong similarity score (score >= 6)
    const strongMatches = scored.filter(s => s.score >= 6).map(s => s.item);
    if (strongMatches.length >= 2) {
      return strongMatches.slice(0, 6);
    }
    // Fall back to top scored items (minimum score > 0)
    return scored.filter(s => s.score > 0).slice(0, 4).map(s => s.item);
  }

  // Populate pre-rendered detail markup with item content
  function populateDetailLayer(layerNum, item) {
    const prefix = `d${layerNum}`;

    // Header title
    const headerTitle = document.getElementById(`${prefix}-header-title`);
    if (headerTitle) {
      headerTitle.textContent = item.name;
      headerTitle.classList.remove('visible');
    }

    // Scroll reveal title on header
    const scrollBody = document.getElementById(`${prefix}-scroll-body`);
    if (scrollBody) {
      scrollBody.onscroll = () => {
        if (headerTitle) {
          headerTitle.classList.toggle('visible', scrollBody.scrollTop > 180);
        }
      };
    }

    // Favorite Toggle
    const favToggle = document.getElementById(`${prefix}-fav-toggle`);
    if (favToggle) {
      favToggle.classList.toggle('is-fav', state.favorites.has(item.id));
      favToggle.onclick = () => {
        toggleFavorite(item.id);
        favToggle.classList.toggle('is-fav', state.favorites.has(item.id));
      };
    }

    // Carousel Setup
    state.carouselIndex[layerNum] = 0;
    const track = document.getElementById(`${prefix}-carousel-track`);
    const dotsRow = document.getElementById(`${prefix}-carousel-dots`);
    const prevArrow = document.getElementById(`${prefix}-carousel-prev`);
    const nextArrow = document.getElementById(`${prefix}-carousel-next`);

    if (track && dotsRow) {
      track.innerHTML = '';
      dotsRow.innerHTML = '';

      item.images.forEach((imgUrl, idx) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.setAttribute('role', 'button');
        slide.setAttribute('aria-label', `Buka gambar ${idx + 1} dalam penampil layar penuh`);
        slide.innerHTML = `<img src="${imgUrl}" alt="${item.name} slide ${idx + 1}" loading="lazy" />`;
        slide.onclick = () => openFullscreenViewer(item.images, idx);
        track.appendChild(slide);

        const dot = document.createElement('span');
        dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
        dot.onclick = () => setCarouselIndex(layerNum, idx);
        dotsRow.appendChild(dot);
      });

      // Swipe gestures on track
      setupCarouselGestures(track, layerNum, item.images.length);

      // Prev / Next arrows
      if (prevArrow) {
        prevArrow.onclick = () => setCarouselIndex(layerNum, state.carouselIndex[layerNum] - 1);
        prevArrow.style.display = item.images.length > 1 ? 'flex' : 'none';
      }
      if (nextArrow) {
        nextArrow.onclick = () => setCarouselIndex(layerNum, state.carouselIndex[layerNum] + 1);
        nextArrow.style.display = item.images.length > 1 ? 'flex' : 'none';
      }
    }

    // Name & Author & Badge
    const nameEl = document.getElementById(`${prefix}-name`);
    const authorEl = document.getElementById(`${prefix}-author`);
    const updatedEl = document.getElementById(`${prefix}-updated`);
    const badgeContainer = document.getElementById(`${prefix}-badge-container`);

    if (nameEl) nameEl.textContent = item.name;
    if (authorEl) authorEl.textContent = item.author;
    if (updatedEl) {
      const cleanDate = formatCleanDate(item.updated, state.activeLang);
      updatedEl.textContent = `${I18N[state.activeLang].lastUpdated}: ${cleanDate}`;
    }

    if (badgeContainer) {
      badgeContainer.innerHTML = '';
      if (item.badge) {
        const b = document.createElement('span');
        b.className = `badge-pill badge-${item.badge.toLowerCase()}`;
        b.textContent = item.badge;
        badgeContainer.appendChild(b);
      }
      const typeBadge = document.createElement('span');
      typeBadge.className = 'badge-pill';
      typeBadge.textContent = item.type;
      badgeContainer.appendChild(typeBadge);
    }

    // Pricing
    const priceBox = document.getElementById(`${prefix}-price-box`);
    if (priceBox) {
      priceBox.innerHTML = '';
      const mainPrice = document.createElement('div');
      mainPrice.className = `detail-price-large ${item.isFree ? 'is-free' : 'is-paid'}`;
      mainPrice.textContent = getItemField(item, 'price');
      priceBox.appendChild(mainPrice);

      const oriPrice = getItemField(item, 'originalPrice');
      if (oriPrice && !item.isFree) {
        const strike = document.createElement('div');
        strike.className = 'detail-price-strike';
        strike.textContent = oriPrice;
        priceBox.appendChild(strike);
      }
    }

    // Specs Grid
    const specsGrid = document.getElementById(`${prefix}-specs-grid`);
    if (specsGrid) {
      specsGrid.innerHTML = `
        <div class="spec-item">
          <span class="spec-label">Format Preset</span>
          <span class="spec-val">${item.type}</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">${I18N[state.activeLang].screenRatio}</span>
          <span class="spec-val">19.5:9 / 20:9</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">${I18N[state.activeLang].novaPages}</span>
          <span class="spec-val">${item.type === 'KLWP' ? '2 - 3 Halaman' : '1 Halaman'}</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">${I18N[state.activeLang].fileSize}</span>
          <span class="spec-val">${item.size || '10 MB'}</span>
        </div>
      `;
    }

    // Description with formatted paragraphs and newlines
    const descEl = document.getElementById(`${prefix}-description`);
    const descTitleEl = document.getElementById(`${prefix}-desc-title`);
    if (descTitleEl && I18N[state.activeLang] && I18N[state.activeLang].descriptionHeader) {
      descTitleEl.textContent = I18N[state.activeLang].descriptionHeader;
    }
    if (descEl) {
      const emptyDescFallback = state.activeLang === 'en'
        ? 'No additional description provided.'
        : (state.activeLang === 'jp' || state.activeLang === 'ja')
          ? '詳細な説明はありません。'
          : 'Tidak ada deskripsi tambahan.';
      const descText = getItemField(item, 'description') || emptyDescFallback;
      descEl.textContent = descText;
    }

    // Highlights
    const highlightsBlock = document.getElementById(`${prefix}-highlights-block`);
    const highlightsList = document.getElementById(`${prefix}-highlights-list`);
    if (highlightsBlock && highlightsList) {
      if (item.highlights && item.highlights.length > 0) {
        highlightsBlock.hidden = false;
        highlightsList.innerHTML = '';
        item.highlights.forEach(h => {
          const li = document.createElement('li');
          li.textContent = h;
          highlightsList.appendChild(li);
        });
      } else {
        highlightsBlock.hidden = true;
      }
    }

    // Required Apps
    const appsList = document.getElementById(`${prefix}-apps-list`);
    if (appsList) {
      const isKlwp = item.type === 'KLWP';
      appsList.innerHTML = `
        <a href="https://play.google.com/store/apps/details?id=org.kustom.${isKlwp ? 'wallpaper' : 'widget'}" target="_blank" rel="noopener noreferrer" class="app-req-card">
          <svg class="svg-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
          <span>${isKlwp ? 'KLWP Pro' : 'KWGT Pro'}</span>
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.teslacoilsw.launcher" target="_blank" rel="noopener noreferrer" class="app-req-card">
          <svg class="svg-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
          <span>Nova Launcher (atau launcher kustom)</span>
        </a>
      `;
    }

    // Video button if exists
    const videoBlock = document.getElementById(`${prefix}-video-button-block`);
    const videoBtn = document.getElementById(`${prefix}-watch-video-btn`);
    if (videoBlock && videoBtn) {
      if (item.video) {
        videoBlock.hidden = false;
        videoBtn.onclick = () => openVideoModal(item.video, item.name);
      } else {
        videoBlock.hidden = true;
      }
    }

    // Related Themes Carousel (Accurate similarity scoring)
    const relatedScroller = document.getElementById(`${prefix}-related-scroller`);
    if (relatedScroller) {
      relatedScroller.innerHTML = '';
      const related = getRelatedThemes(item, state.items);

      if (related.length === 0) {
        document.getElementById(`${prefix}-related-block`).hidden = true;
      } else {
        document.getElementById(`${prefix}-related-block`).hidden = false;
        related.forEach(relItem => {
          const card = document.createElement('div');
          card.className = 'related-theme-card';
          card.setAttribute('role', 'button');
          card.setAttribute('tabindex', '0');
          card.setAttribute('aria-label', `Lihat tema terkait ${relItem.name}`);
          card.innerHTML = `
            <div class="related-thumb-holder">
              <img src="${relItem.images[0]}" alt="${relItem.name}" loading="lazy" />
            </div>
            <span class="related-title">${relItem.name}</span>
            <span class="related-price">${getItemField(relItem, 'price')}</span>
          `;
          card.onclick = () => {
            if (relatedScroller._ignoreClickUntil && Date.now() < relatedScroller._ignoreClickUntil) {
              return;
            }
            openDetail(relItem.id);
          };
          card.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openDetail(relItem.id);
            }
          };
          relatedScroller.appendChild(card);
        });

        // Initialize drag, wheel, navigation buttons, and scroll indicator
        setupRelatedScroller(layerNum);
      }
    }

    // Bottom Action Bar (Liquid Glass)
    const bottomBar = document.getElementById(`${prefix}-bottom-actions`);
    if (bottomBar) {
      bottomBar.innerHTML = '';

      if (item.isFree) {
        const downloadTarget = item.downloadUrl || item.buyUrl || 'https://lynk.id/asino';
        const downloadBtn = document.createElement('a');
        downloadBtn.href = downloadTarget;
        downloadBtn.target = '_blank';
        downloadBtn.rel = 'noopener noreferrer';
        downloadBtn.className = 'btn-primary';
        downloadBtn.innerHTML = `
          <svg class="svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          <span>${I18N[state.activeLang].installTheme}</span>
        `;
        bottomBar.appendChild(downloadBtn);
        // Note: For free themes, WhatsApp order button is omitted as requested
      } else {
        const buyTarget = item.buyUrl || 'https://lynk.id/asino';
        const buyBtn = document.createElement('a');
        buyBtn.href = buyTarget;
        buyBtn.target = '_blank';
        buyBtn.rel = 'noopener noreferrer';
        buyBtn.className = 'btn-primary';
        buyBtn.innerHTML = `
          <svg class="svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <span>${I18N[state.activeLang].buyTheme}</span>
        `;
        bottomBar.appendChild(buyBtn);

        // WhatsApp Order Button (Exclusively for paid themes)
        const waUrlBase = item.whatsappUrl || DEFAULT_WA_URL;
        const cleanPrice = getItemField(item, 'price');
        let waMessage = '';
        if (state.activeLang === 'id') {
          waMessage = `Halo Asino, saya tertarik membeli tema *${item.name}* (${item.type}). Harga: ${cleanPrice}. Bagaimana rincian pembayarannya? Terima kasih!`;
        } else if (state.activeLang === 'en') {
          waMessage = `Hello Asino, I would like to order the *${item.name}* (${item.type}) theme. Price: ${cleanPrice}. Could you please provide payment details? Thanks!`;
        } else {
          waMessage = `Asino様、*${item.name}*（${item.type}）のテーマを購入したいです。価格：${cleanPrice}。支払い詳細を教えていただけますでしょうか？よろしくお願いいたします。`;
        }

        const waBtn = document.createElement('a');
        waBtn.href = `${waUrlBase}?text=${encodeURIComponent(waMessage)}`;
        waBtn.target = '_blank';
        waBtn.rel = 'noopener noreferrer';
        waBtn.className = 'btn-whatsapp';
        waBtn.innerHTML = `
          <svg class="svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          <span>${I18N[state.activeLang].orderWhatsApp}</span>
        `;
        bottomBar.appendChild(waBtn);
      }
    }
  }

  function setCarouselIndex(layerNum, index) {
    const track = document.getElementById(`d${layerNum}-carousel-track`);
    const dotsRow = document.getElementById(`d${layerNum}-carousel-dots`);
    if (!track) return;

    const count = track.children.length;
    if (count <= 1) return;

    const newIndex = Math.max(0, Math.min(index, count - 1));
    state.carouselIndex[layerNum] = newIndex;

    track.style.transform = `translateX(-${newIndex * 100}%)`;

    if (dotsRow) {
      Array.from(dotsRow.children).forEach((dot, idx) => {
        dot.classList.toggle('active', idx === newIndex);
      });
    }
  }

  function setupCarouselGestures(track, layerNum, count) {
    if (count <= 1) return;

    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          // Swiped left -> next
          setCarouselIndex(layerNum, state.carouselIndex[layerNum] + 1);
        } else {
          // Swiped right -> prev
          setCarouselIndex(layerNum, state.carouselIndex[layerNum] - 1);
        }
      }
    }
  }

  // Related Themes PC drag, wheel horizontal scroll, navigation buttons & progress indicator
  function setupRelatedScroller(layerNum) {
    const prefix = `d${layerNum}`;
    const scroller = document.getElementById(`${prefix}-related-scroller`);
    const prevBtn = document.getElementById(`${prefix}-related-prev`);
    const nextBtn = document.getElementById(`${prefix}-related-next`);
    const thumb = document.getElementById(`${prefix}-related-thumb`);
    const track = document.getElementById(`${prefix}-related-track`);

    if (!scroller) return;

    function updateIndicator() {
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      if (maxScroll <= 0) {
        if (track) track.style.display = 'none';
        if (prevBtn) prevBtn.disabled = true;
        if (nextBtn) nextBtn.disabled = true;
        return;
      }

      if (track) track.style.display = 'block';

      const visibleRatio = Math.min(1, scroller.clientWidth / scroller.scrollWidth);
      const thumbWidthPercent = Math.max(18, Math.min(65, visibleRatio * 100));
      if (thumb) thumb.style.width = `${thumbWidthPercent}%`;

      const currentScrollRatio = Math.max(0, Math.min(1, scroller.scrollLeft / maxScroll));
      const trackWidth = track ? track.clientWidth : 0;
      const thumbWidthPx = (thumbWidthPercent / 100) * trackWidth;
      const maxTranslateX = trackWidth - thumbWidthPx;
      const translatePx = currentScrollRatio * maxTranslateX;

      if (thumb) {
        thumb.style.transform = `translateX(${translatePx}px)`;
      }

      if (prevBtn) prevBtn.disabled = scroller.scrollLeft <= 4;
      if (nextBtn) nextBtn.disabled = scroller.scrollLeft >= maxScroll - 4;
    }

    if (prevBtn) {
      prevBtn.onclick = (e) => {
        e.stopPropagation();
        scroller.scrollBy({ left: -260, behavior: 'smooth' });
      };
    }

    if (nextBtn) {
      nextBtn.onclick = (e) => {
        e.stopPropagation();
        scroller.scrollBy({ left: 260, behavior: 'smooth' });
      };
    }

    scroller.onscroll = updateIndicator;

    // Wheel scrolling on desktop
    scroller.onwheel = (e) => {
      if (e.deltaY !== 0 && scroller.scrollWidth > scroller.clientWidth) {
        e.preventDefault();
        scroller.scrollLeft += e.deltaY;
        updateIndicator();
      }
    };

    // Mouse drag scrolling on PC
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let draggedDistance = 0;

    scroller.onmousedown = (e) => {
      if (e.button !== 0) return;
      isDown = true;
      draggedDistance = 0;
      scroller.classList.add('is-dragging');
      startX = e.pageX - scroller.offsetLeft;
      scrollStart = scroller.scrollLeft;
    };

    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scroller.offsetLeft;
      const walk = x - startX;
      draggedDistance = Math.abs(walk);
      scroller.scrollLeft = scrollStart - walk;
      updateIndicator();
    };

    const onMouseUp = () => {
      if (isDown) {
        isDown = false;
        scroller.classList.remove('is-dragging');
        if (draggedDistance > 5) {
          scroller._ignoreClickUntil = Date.now() + 150;
        }
      }
    };

    if (scroller._onMouseMove) window.removeEventListener('mousemove', scroller._onMouseMove);
    if (scroller._onMouseUp) window.removeEventListener('mouseup', scroller._onMouseUp);

    scroller._onMouseMove = onMouseMove;
    scroller._onMouseUp = onMouseUp;

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Initial update after DOM settles
    requestAnimationFrame(() => {
      setTimeout(updateIndicator, 60);
    });
  }

  function updateDetailIfOpen() {
    if (state.detailStack.length >= 1) {
      const item1 = state.items.find(i => i.id === state.detailStack[0]);
      if (item1) populateDetailLayer(1, item1);
    }
    if (state.detailStack.length >= 2) {
      const item2 = state.items.find(i => i.id === state.detailStack[1]);
      if (item2) populateDetailLayer(2, item2);
    }
  }

  // =========================================================================
  // 6. FULLSCREEN ZOOM IMAGE VIEWER (Pinch, Double-Tap, Pan, Esc)
  // =========================================================================

  function openFullscreenViewer(images, initialIndex = 0) {
    state.viewer.isOpen = true;
    state.viewer.images = images;
    state.viewer.currentIndex = initialIndex;
    state.viewer.scale = 1;
    state.viewer.posX = 0;
    state.viewer.posY = 0;

    const modal = document.getElementById('fullscreen-viewer');
    const img = document.getElementById('viewer-image');
    const counter = document.getElementById('viewer-counter');

    if (!modal || !img) return;

    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    updateViewerImage();
  }

  function closeFullscreenViewer() {
    state.viewer.isOpen = false;
    const modal = document.getElementById('fullscreen-viewer');
    if (modal) {
      modal.hidden = true;
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  function updateViewerImage() {
    const img = document.getElementById('viewer-image');
    const counter = document.getElementById('viewer-counter');
    if (!img) return;

    img.src = state.viewer.images[state.viewer.currentIndex];
    state.viewer.scale = 1;
    state.viewer.posX = 0;
    state.viewer.posY = 0;
    applyViewerTransform();

    if (counter) {
      counter.textContent = `${state.viewer.currentIndex + 1} / ${state.viewer.images.length}`;
    }
  }

  function applyViewerTransform() {
    const img = document.getElementById('viewer-image');
    if (img) {
      img.style.transform = `translate3d(${state.viewer.posX}px, ${state.viewer.posY}px, 0) scale(${state.viewer.scale})`;
    }
  }

  function initViewerEvents() {
    const modal = document.getElementById('fullscreen-viewer');
    const img = document.getElementById('viewer-image');
    const viewport = document.getElementById('viewer-viewport');
    const closeBtn = document.getElementById('viewer-close-btn');
    const prevBtn = document.getElementById('viewer-prev-btn');
    const nextBtn = document.getElementById('viewer-next-btn');

    if (!modal || !viewport || !img) return;

    if (closeBtn) closeBtn.onclick = closeFullscreenViewer;

    if (prevBtn) {
      prevBtn.onclick = () => {
        if (state.viewer.currentIndex > 0) {
          state.viewer.currentIndex--;
          updateViewerImage();
        }
      };
    }

    if (nextBtn) {
      nextBtn.onclick = () => {
        if (state.viewer.currentIndex < state.viewer.images.length - 1) {
          state.viewer.currentIndex++;
          updateViewerImage();
        }
      };
    }

    // Double tap to toggle 2x zoom
    viewport.addEventListener('click', (e) => {
      const now = Date.now();
      if (now - state.viewer.lastTapTime < 300) {
        if (state.viewer.scale > 1) {
          state.viewer.scale = 1;
          state.viewer.posX = 0;
          state.viewer.posY = 0;
        } else {
          state.viewer.scale = 2.2;
        }
        applyViewerTransform();
      }
      state.viewer.lastTapTime = now;
    });

    // Mouse wheel zoom
    viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY * -0.002;
      state.viewer.scale = Math.min(Math.max(1, state.viewer.scale + delta), 4);
      if (state.viewer.scale === 1) {
        state.viewer.posX = 0;
        state.viewer.posY = 0;
      }
      applyViewerTransform();
    }, { passive: false });

    // Touch pinch & pan
    viewport.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        state.viewer.initialDistance = Math.hypot(dx, dy);
      } else if (e.touches.length === 1) {
        state.viewer.isDragging = true;
        state.viewer.startX = e.touches[0].clientX - state.viewer.posX;
        state.viewer.startY = e.touches[0].clientY - state.viewer.posY;
      }
    }, { passive: true });

    viewport.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2 && state.viewer.initialDistance > 0) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const ratio = dist / state.viewer.initialDistance;
        state.viewer.scale = Math.min(Math.max(1, state.viewer.scale * ratio), 4);
        state.viewer.initialDistance = dist;
        applyViewerTransform();
      } else if (e.touches.length === 1 && state.viewer.isDragging && state.viewer.scale > 1) {
        state.viewer.posX = e.touches[0].clientX - state.viewer.startX;
        state.viewer.posY = e.touches[0].clientY - state.viewer.startY;
        applyViewerTransform();
      }
    }, { passive: true });

    viewport.addEventListener('touchend', () => {
      state.viewer.isDragging = false;
      state.viewer.initialDistance = 0;
    }, { passive: true });
  }

  // =========================================================================
  // 7. FAVORITES & NOTIFICATIONS
  // =========================================================================

  function toggleFavorite(id) {
    if (state.favorites.has(id)) {
      state.favorites.delete(id);
      showToast(I18N[state.activeLang].favRemoved);
    } else {
      state.favorites.add(id);
      showToast(I18N[state.activeLang].favSaved);
    }
    storageSet(STORAGE_KEY_FAVS, Array.from(state.favorites));
  }

  function showToast(msg) {
    const toast = document.getElementById('toast-bubble');
    if (!toast) return;

    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.hidden = true;
    }, 2400);
  }

  // =========================================================================
  // 8. MODALS: YOUTUBE PLAYER & ABOUT
  // =========================================================================

  function openVideoModal(videoId, title) {
    const modal = document.getElementById('video-modal');
    const container = document.getElementById('video-frame-container');
    const titleEl = document.getElementById('video-modal-title');
    if (!modal || !container) return;

    if (titleEl) titleEl.textContent = title ? `Panduan: ${title}` : 'Panduan Video';

    // Strict rule: Embed with youtube-nocookie.com
    container.innerHTML = `
      <iframe src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1" title="${title || 'Video'}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;

    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const container = document.getElementById('video-frame-container');
    if (!modal) return;

    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    // Strict rule: Remove iframe completely from DOM on close so audio/video stops
    if (container) container.innerHTML = '';
  }

  function triggerApkDownload() {
    showToast(I18N[state.activeLang]?.downloadApkToast || 'Memulai unduhan Asino Official APK...');
    const a = document.createElement('a');
    a.href = APK_DOWNLOAD_URL;
    a.download = 'Asino_Official.apk';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (document.body.contains(a)) document.body.removeChild(a);
    }, 100);
  }

  function updateApkModalTranslations(langCode) {
    const t = I18N[langCode] || I18N.id;
    const setText = (id, text) => {
      const el = document.getElementById(id);
      if (el && text) el.textContent = text;
    };
    const setHtml = (id, html) => {
      const el = document.getElementById(id);
      if (el && html) el.innerHTML = html;
    };

    setText('apk-modal-title', t.apkModalTitle);
    setText('apk-modal-badge-text', t.apkModalBadge);
    setHtml('apk-modal-desc', t.apkModalDesc);
    setHtml('apk-step-1', t.apkStep1);
    setHtml('apk-step-2', t.apkStep2);
    setHtml('apk-step-3', t.apkStep3);
    setHtml('apk-step-4', t.apkStep4);
    setText('apk-modal-download-btn-text', t.apkDownloadBtn);
    setText('modal-cancel-btn', t.modalClose);

    const headerDownloadText = document.querySelector('#download-apk-btn .btn-download-text');
    if (headerDownloadText && t.downloadApk) headerDownloadText.textContent = t.downloadApk;
  }

  function openApkModal() {
    updateApkModalTranslations(state.activeLang);
    const modal = document.getElementById('apk-modal');
    if (modal) {
      modal.hidden = false;
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeApkModal() {
    const modal = document.getElementById('apk-modal');
    if (modal) {
      modal.hidden = true;
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  function openAboutModal() {
    const modal = document.getElementById('about-modal');
    if (modal) {
      modal.hidden = false;
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeAboutModal() {
    const modal = document.getElementById('about-modal');
    if (modal) {
      modal.hidden = true;
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  // =========================================================================
  // 9. EVENT LISTENERS & ROUTING
  // =========================================================================

  function switchTab(tabId) {
    state.activeTab = tabId;

    // Update Panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
      const isTarget = pane.id === `pane-${tabId}`;
      pane.classList.toggle('active', isTarget);
      pane.hidden = !isTarget;
    });

    // Update Desktop Nav
    document.querySelectorAll('.desktop-nav .nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.tab === tabId);
    });

    // Update Mobile Bottom Nav
    document.querySelectorAll('.bottom-tab-btn').forEach(btn => {
      const isTarget = btn.dataset.tab === tabId;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function updatePanduanTranslations(langCode) {
    const t = I18N[langCode] || I18N.id;
    const setHtml = (id, html) => {
      const el = document.getElementById(id);
      if (el && html) el.innerHTML = html;
    };
    const setText = (id, text) => {
      const el = document.getElementById(id);
      if (el && text) el.textContent = text;
    };

    setText('guide-title', t.guideTitle);
    setText('guide-subtitle', t.guideSubtitle);
    setText('step-1-title', t.step1Title);
    setHtml('step-1-text', t.step1Text);
    setText('step-2-title', t.step2Title);
    setHtml('step-2-text', t.step2Text);
    setText('step-3-title', t.step3Title);
    setHtml('step-3-text', t.step3Text);
    setText('step-4-title', t.step4Title);
    setHtml('step-4-text', t.step4Text);

    setText('guide-video-heading', t.guideVideoHeading);
    setText('guide-video-subheading', t.guideVideoSubheading);
    setText('guide-video-card-title', t.guideVideoCardTitle);
    setText('guide-video-card-desc', t.guideVideoCardDesc);
    setText('guide-video-watch-btn', t.guideVideoWatchBtn);

    setText('faq-heading', t.faqHeading);
    setText('faq-q-1', t.faqQ1);
    setHtml('faq-ans-1-text', t.faqAns1);
    setText('faq-q-2', t.faqQ2);
    setHtml('faq-ans-2-text', t.faqAns2);
    setText('faq-q-3', t.faqQ3);
    setHtml('faq-ans-3-text', t.faqAns3);
    setText('faq-q-4', t.faqQ4);
    setHtml('faq-ans-4-text', t.faqAns4);

    setText('creator-bio', t.creatorBio);
    const storeLinkSpan = document.querySelector('#creator-store-link span');
    if (storeLinkSpan) storeLinkSpan.textContent = t.creatorStoreBtn;
    const waLinkSpan = document.querySelector('#creator-wa-link span');
    if (waLinkSpan) waLinkSpan.textContent = t.creatorWaBtn;
    const channelLinkSpan = document.querySelector('#creator-channel-link span');
    if (channelLinkSpan && t.creatorChannelBtn) channelLinkSpan.textContent = t.creatorChannelBtn;

    // Render guide video if valid, or hide the section if empty/invalid
    renderGuideVideo();
  }

  function renderGuideVideo() {
    const videoSection = document.getElementById('guide-video-section');
    const quickGuideBtn = document.getElementById('open-quick-guide-btn');
    const videoId = extractYouTubeId(GUIDE_VIDEO_SOURCE);

    if (!videoId) {
      if (videoSection) videoSection.hidden = true;
      if (quickGuideBtn) quickGuideBtn.hidden = true;
      return;
    }

    if (quickGuideBtn) {
      quickGuideBtn.hidden = false;
      quickGuideBtn.onclick = () => {
        const morePopup = document.getElementById('more-popup');
        if (morePopup) morePopup.hidden = true;
        openVideoModal(videoId, 'Panduan Video');
      };
    }

    if (videoSection) {
      videoSection.hidden = false;
      const grid = document.getElementById('guide-video-grid');
      if (grid) {
        const t = I18N[state.activeLang] || I18N.id;
        grid.innerHTML = `
          <div class="video-card" data-video-id="${videoId}" role="button" tabindex="0">
            <div class="video-thumb-wrap">
              <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="Thumbnail video panduan" class="video-thumb-img" onerror="this.parentElement.classList.add('no-thumb')" />
              <div class="video-play-overlay">
                <div class="play-circle">
                  <svg class="svg-icon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </div>
            </div>
            <div class="video-card-body">
              <h3 class="video-card-title" id="guide-video-card-title">${t.guideVideoCardTitle}</h3>
              <p class="video-card-desc" id="guide-video-card-desc">${t.guideVideoCardDesc}</p>
              <button type="button" class="btn-text-action open-video-trigger" id="guide-video-watch-btn" data-video-id="${videoId}">${t.guideVideoWatchBtn}</button>
            </div>
          </div>
        `;
        const card = grid.querySelector('.video-card');
        if (card) {
          card.onclick = () => openVideoModal(videoId, t.guideVideoCardTitle);
          card.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openVideoModal(videoId, t.guideVideoCardTitle);
            }
          };
        }
      }
    }
  }

  function setLanguage(langCode) {
    if (!I18N[langCode]) return;
    state.activeLang = langCode;
    storageSet(STORAGE_KEY_LANG, langCode);

    // Update Popup chips
    document.querySelectorAll('[data-set-lang]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.setLang === langCode);
    });

    // Update static labels
    const deskHome = document.getElementById('desk-nav-home');
    const deskKatalog = document.getElementById('desk-nav-katalog');
    const deskPanduan = document.getElementById('desk-nav-panduan');
    if (deskHome) deskHome.textContent = I18N[langCode].navHome;
    if (deskKatalog) deskKatalog.textContent = I18N[langCode].navKatalog;
    if (deskPanduan) deskPanduan.textContent = I18N[langCode].navPanduan;

    const navHome = document.querySelector('#nav-tab-home .tab-label');
    const navKatalog = document.querySelector('#nav-tab-katalog .tab-label');
    const navPanduan = document.querySelector('#nav-tab-panduan .tab-label');
    if (navHome) navHome.textContent = I18N[langCode].navHome;
    if (navKatalog) navKatalog.textContent = I18N[langCode].navKatalog;
    if (navPanduan) navPanduan.textContent = I18N[langCode].navPanduan;

    const searchInput = document.getElementById('home-search-input');
    if (searchInput) searchInput.placeholder = I18N[langCode].searchPlaceholder;

    const katalogSearchInput = document.getElementById('katalog-search-input');
    if (katalogSearchInput && I18N[langCode].katalogSearchPlaceholder) {
      katalogSearchInput.placeholder = I18N[langCode].katalogSearchPlaceholder;
    }

    // Update Panduan, Creator Profile & APK Modal text
    updatePanduanTranslations(langCode);
    updateApkModalTranslations(langCode);

    // Re-render
    renderApp();
  }

  function initEventListeners() {
    // Tab switching (Desktop + Mobile)
    document.querySelectorAll('[data-tab]').forEach(el => {
      el.addEventListener('click', () => switchTab(el.dataset.tab));
    });

    // Brand wordmark click -> go home
    const brandLink = document.getElementById('brand-link');
    if (brandLink) {
      brandLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab('home');
      });
    }

    // 3-Dots Popup
    const moreBtn = document.getElementById('more-menu-btn');
    const morePopup = document.getElementById('more-popup');
    if (moreBtn && morePopup) {
      moreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = morePopup.hidden;
        morePopup.hidden = !isHidden;
        moreBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
      });

      document.addEventListener('click', (e) => {
        if (!morePopup.contains(e.target) && e.target !== moreBtn) {
          morePopup.hidden = true;
          moreBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Language options inside popup
    document.querySelectorAll('[data-set-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        setLanguage(btn.dataset.setLang);
        if (morePopup) morePopup.hidden = true;
      });
    });

    // Android APK Download Button (Header & Popup)
    const downloadApkBtn = document.getElementById('download-apk-btn');
    if (downloadApkBtn) {
      const hasApkUrl = Boolean(APK_DOWNLOAD_URL && APK_DOWNLOAD_URL.trim());
      downloadApkBtn.style.display = hasApkUrl ? 'inline-flex' : 'none';

      downloadApkBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const isAndroid = /Android/i.test(navigator.userAgent);
        if (isAndroid) {
          triggerApkDownload();
        }
        openApkModal();
      });
    }

    const modalCancelBtn = document.getElementById('modal-cancel-btn');
    if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeApkModal);

    const modalStartDownloadBtn = document.getElementById('modal-start-download-btn');
    if (modalStartDownloadBtn) {
      modalStartDownloadBtn.href = APK_DOWNLOAD_URL;
      modalStartDownloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        triggerApkDownload();
      });
    }

    // About modal trigger
    const openAboutBtn = document.getElementById('open-about-btn');
    if (openAboutBtn) {
      openAboutBtn.addEventListener('click', () => {
        if (morePopup) morePopup.hidden = true;
        openAboutModal();
      });
    }
    const aboutCloseBtn = document.getElementById('about-close-btn');
    if (aboutCloseBtn) aboutCloseBtn.addEventListener('click', closeAboutModal);

    // Video modal close
    const videoCloseBtn = document.getElementById('video-close-btn');
    if (videoCloseBtn) videoCloseBtn.addEventListener('click', closeVideoModal);

    // Initial check and setup for Guide Video
    renderGuideVideo();

    // FAQ Accordion
    document.querySelectorAll('.faq-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        const targetId = btn.getAttribute('aria-controls');
        const content = document.getElementById(targetId);

        btn.setAttribute('aria-expanded', !isExpanded);
        if (content) content.hidden = isExpanded;
      });
    });

    // Home Search Input & Clear
    const searchInput = document.getElementById('home-search-input');
    const searchClear = document.getElementById('home-search-clear');
    if (searchInput && searchClear) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        searchClear.hidden = !e.target.value;
        renderThemesGrid();
      });

      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        state.searchQuery = '';
        searchClear.hidden = true;
        renderThemesGrid();
        searchInput.focus();
      });
    }

    // Katalog Store Search Input & Clear
    const katalogSearchInput = document.getElementById('katalog-search-input');
    const katalogSearchClear = document.getElementById('katalog-search-clear');
    if (katalogSearchInput && katalogSearchClear) {
      katalogSearchInput.addEventListener('input', (e) => {
        state.katalogSearchQuery = e.target.value;
        katalogSearchClear.hidden = !e.target.value;
        renderKatalogStoreGrid();
      });

      katalogSearchClear.addEventListener('click', () => {
        katalogSearchInput.value = '';
        state.katalogSearchQuery = '';
        katalogSearchClear.hidden = true;
        renderKatalogStoreGrid();
        katalogSearchInput.focus();
      });
    }

    // Segmented Type Filter
    document.querySelectorAll('[data-type]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-type]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.selectedType = btn.dataset.type;
        renderThemesGrid();
      });
    });

    // Segmented Price Filter
    document.querySelectorAll('[data-price-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-price-filter]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.selectedPriceFilter = btn.dataset.priceFilter;
        renderThemesGrid();
      });
    });

    // Empty state reset button
    const emptyResetBtn = document.getElementById('empty-reset-btn');
    if (emptyResetBtn) {
      emptyResetBtn.addEventListener('click', () => {
        state.searchQuery = '';
        state.selectedCategory = 'all';
        state.selectedType = 'all';
        state.selectedPriceFilter = 'all';
        if (searchInput) searchInput.value = '';
        if (searchClear) searchClear.hidden = true;
        document.querySelectorAll('[data-type]').forEach(b => b.classList.toggle('active', b.dataset.type === 'all'));
        document.querySelectorAll('[data-price-filter]').forEach(b => b.classList.toggle('active', b.dataset.priceFilter === 'all'));
        renderCategoryChips();
        renderThemesGrid();
      });
    }

    // Status Banner Retry
    const retryBtn = document.getElementById('status-retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => loadCatalogData());
    }

    // Detail Back Buttons (Fully reliable navigation)
    document.querySelectorAll('[data-back-trigger]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const layerNum = parseInt(btn.dataset.backTrigger, 10) || 1;
        handleDetailBack(layerNum);
      });
    });

    // Global Keydown: Esc to close viewer, modal, or detail screen
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (state.viewer.isOpen) {
          closeFullscreenViewer();
        } else if (!document.getElementById('video-modal').hidden) {
          closeVideoModal();
        } else if (!document.getElementById('apk-modal')?.hidden) {
          closeApkModal();
        } else if (!document.getElementById('about-modal').hidden) {
          closeAboutModal();
        } else if (morePopup && !morePopup.hidden) {
          morePopup.hidden = true;
        } else if (state.detailStack.length > 0) {
          handleDetailBack(state.detailStack.length);
        }
      }
    });

    // Init Viewer gestures
    initViewerEvents();
  }

  // =========================================================================
  // 10. INITIALIZATION
  // =========================================================================

  function init() {
    // Restore Saved Favorites
    const savedFavs = storageGet(STORAGE_KEY_FAVS, []);
    state.favorites = new Set(savedFavs);

    // Restore Saved Language
    const savedLang = storageGet(STORAGE_KEY_LANG, 'id');
    state.activeLang = I18N[savedLang] ? savedLang : 'id';

    initEventListeners();
    setLanguage(state.activeLang);

    // Start data pipeline
    loadCatalogData();
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
