# Panduan Kontribusi

Terima kasih telah tertarik untuk berkontribusi pada proyek Fashion Store! 🎉

## 📋 Daftar Isi

- [Code of Conduct](#code-of-conduct)
- [Cara Berkontribusi](#cara-berkontribusi)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

Dengan berpartisipasi dalam proyek ini, Anda setuju untuk menjaga lingkungan yang ramah, inklusif, dan bebas pelecehan untuk semua orang.

## Cara Berkontribusi

### 🐛 Melaporkan Bug

1. Pastikan bug belum dilaporkan dengan mencari di [Issues](https://github.com/username/fashion-store/issues)
2. Buat issue baru dengan template bug report
3. Sertakan:
   - Deskripsi bug yang jelas
   - Langkah untuk mereproduksi
   - Expected behavior vs actual behavior
   - Screenshots (jika relevan)
   - Environment (browser, OS, dll)

### 💡 Mengusulkan Fitur

1. Cek apakah fitur sudah diusulkan di Issues
2. Buat issue baru dengan template feature request
3. Jelaskan:
   - Masalah yang ingin diselesaikan
   - Solusi yang diusulkan
   - Alternatif yang sudah dipertimbangkan

### 🔧 Mengerjakan Code

1. Fork repository
2. Buat branch baru: `git checkout -b feature/nama-fitur`
3. Lakukan perubahan
4. Test perubahan Anda
5. Commit dengan pesan yang jelas
6. Push ke fork: `git push origin feature/nama-fitur`
7. Buat Pull Request

## Development Setup

### Prerequisites

- Node.js 18+
- npm atau yarn
- Git

### Langkah Setup

```bash
# Clone fork Anda
git clone https://github.com/YOUR_USERNAME/fashion-store.git
cd fashion-store

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Jalankan development server
npm run dev
```

## Coding Standards

### TypeScript

- Gunakan TypeScript strict mode
- Definisikan types untuk semua props dan state
- Hindari penggunaan `any`
- Gunakan interface untuk object shapes

```typescript
// ✅ Good
interface ProductProps {
  id: string;
  name: string;
  price: number;
}

// ❌ Bad
const product: any = { ... };
```

### React Components

- Gunakan functional components dengan hooks
- Satu komponen per file
- Nama komponen menggunakan PascalCase
- Nama file sama dengan nama komponen

```typescript
// ✅ Good - ProductCard.tsx
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return <div>...</div>;
};

export default ProductCard;
```

### Styling (Tailwind CSS)

- Gunakan Tailwind utility classes
- Untuk komponen kompleks, gunakan `@apply` di CSS
- Ikuti design system yang sudah ada

```tsx
// ✅ Good
<button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg">
  Add to Cart
</button>
```

### File Structure

```
components/
├── ProductCard/
│   ├── ProductCard.tsx      # Main component
│   ├── ProductCard.test.tsx # Tests
│   └── index.ts             # Export
```

## Commit Guidelines

Kami menggunakan [Conventional Commits](https://www.conventionalcommits.org/).

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | Deskripsi |
|------|-----------|
| `feat` | Fitur baru |
| `fix` | Bug fix |
| `docs` | Perubahan dokumentasi |
| `style` | Formatting, tidak ada perubahan kode |
| `refactor` | Refactoring kode |
| `test` | Menambah atau memperbaiki tests |
| `chore` | Perubahan build, tools, dll |

### Contoh

```bash
feat(cart): add remove item functionality

- Add removeItem action to cartStore
- Update CartItem component with delete button
- Add confirmation modal before removing

Closes #123
```

## Pull Request Process

### Sebelum Submit

- [ ] Code sudah di-lint: `npm run lint`
- [ ] Semua tests pass: `npm run test`
- [ ] Build berhasil: `npm run build`
- [ ] Dokumentasi sudah diupdate (jika perlu)

### Checklist PR

1. **Title** - Gunakan format: `[Type] Brief description`
   - Contoh: `[Feature] Add product filtering`

2. **Description** - Jelaskan:
   - Apa yang berubah
   - Mengapa perubahan ini diperlukan
   - Screenshots (untuk UI changes)
   - Related issues

3. **Labels** - Tambahkan label yang sesuai

### Review Process

1. Minimal 1 approval dari maintainer
2. Semua CI checks harus pass
3. Tidak ada merge conflicts
4. Code review comments sudah di-address

## 📞 Butuh Bantuan?

- Buat issue dengan label `question`
- Hubungi maintainer via email

---

Sekali lagi, terima kasih atas kontribusi Anda! 🙏
