# 🛍️ Alba Ganti Baju - Toko Baju Online

> Website e-commerce modern untuk penjualan baju dengan React, TypeScript, Tailwind CSS, dan Supabase.

[![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38b2ac?logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ecf8e?logo=supabase)](https://supabase.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-646cff?logo=vite)](https://vitejs.dev/)

## 📋 Daftar Isi

- [Fitur](#-fitur)
- [Tech Stack](#-tech-stack)
- [Struktur Proyek](#-struktur-proyek)
- [Instalasi](#-instalasi)
- [Konfigurasi](#-konfigurasi)
- [Penggunaan](#-penggunaan)
- [API Reference](#-api-reference)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

## ✨ Fitur

### Pelanggan
- 🏠 **Homepage** - Tampilan produk unggulan dan kategori
- 👕 **Katalog Produk** - Browse dan filter produk berdasarkan kategori, ukuran, warna
- 🔍 **Pencarian** - Cari produk dengan keyword
- 🛒 **Keranjang Belanja** - Tambah, hapus, update quantity produk
- 💳 **Checkout** - Proses pembayaran dan pengiriman
- 📦 **Tracking Order** - Lacak status pesanan
- 👤 **Akun Pengguna** - Register, login, profile management

### Admin
- 📊 **Dashboard** - Statistik penjualan dan overview
- 📦 **Manajemen Produk** - CRUD produk, kategori, stok
- 📋 **Manajemen Order** - Kelola pesanan pelanggan
- 👥 **Manajemen User** - Kelola data pelanggan

## 🛠️ Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| **Frontend** | React 18, TypeScript, Tailwind CSS |
| **State Management** | Zustand |
| **Routing** | React Router DOM v6 |
| **Backend/Database** | Supabase (PostgreSQL) |
| **Build Tool** | Vite |
| **Icons** | Lucide React |
| **Form/Email** | EmailJS |

## 📁 Struktur Proyek

```
fashion-store/
├── 📄 README.md                 # Dokumentasi proyek
├── 📄 CONTRIBUTING.md           # Panduan kontribusi
├── 📄 LICENSE                   # Lisensi MIT
├── 📁 docs/                     # Dokumentasi tambahan
│   ├── user-guide.md           # Panduan pengguna
│   └── api-reference.md        # Referensi API
├── 📁 public/                   # Asset statis
│   └── _redirects
├── 📁 src/                      # Source code
│   ├── 📁 components/          # Komponen React
│   │   ├── common/             # Komponen reusable
│   │   ├── home/               # Komponen homepage
│   │   ├── layout/             # Header, Footer, Sidebar
│   │   ├── product/            # Komponen produk
│   │   └── cart/               # Komponen keranjang
│   ├── 📁 hooks/               # Custom React hooks
│   ├── 📁 lib/                 # Konfigurasi library
│   │   └── supabase.ts         # Supabase client
│   ├── 📁 pages/               # Halaman/routes
│   ├── 📁 services/            # Data Access Layer (DAL)
│   │   ├── productService.ts   # CRUD produk
│   │   ├── orderService.ts     # CRUD order
│   │   └── userService.ts      # CRUD user
│   ├── 📁 stores/              # State management (Zustand)
│   │   ├── authStore.ts        # Auth state
│   │   └── cartStore.ts        # Cart state
│   ├── 📁 types/               # TypeScript types/interfaces
│   ├── 📁 utils/               # Utility functions
│   ├── App.tsx                 # Root component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── 📁 supabase/                # Supabase migrations
│   └── migrations/
├── 📁 tests/                   # Unit & integration tests
│   ├── components/
│   ├── services/
│   └── utils/
└── 📁 .github/                 # GitHub workflows
    └── workflows/
```

## 🚀 Instalasi

### Prerequisites

- Node.js 18+ 
- npm atau yarn
- Akun Supabase

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/username/fashion-store.git
   cd fashion-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit file `.env`:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Jalankan development server**
   ```bash
   npm run dev
   ```

5. **Buka browser**
   ```
   http://localhost:5173
   ```

## ⚙️ Konfigurasi

### Supabase Setup

1. Buat project baru di [Supabase](https://supabase.com)
2. Jalankan migration SQL di folder `supabase/migrations/`
3. Copy URL dan Anon Key ke file `.env`

### Environment Variables

| Variable | Deskripsi |
|----------|-----------|
| `VITE_SUPABASE_URL` | URL project Supabase |
| `VITE_SUPABASE_ANON_KEY` | Anonymous key Supabase |

## 📖 Penggunaan

### Development
```bash
npm run dev
```

### Build Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 📚 API Reference

Lihat dokumentasi lengkap di [docs/api-reference.md](docs/api-reference.md)

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan baca [CONTRIBUTING.md](CONTRIBUTING.md) untuk panduan lengkap.

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by Fashion Store Team
</p>
