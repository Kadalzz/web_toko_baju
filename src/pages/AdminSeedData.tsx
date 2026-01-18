import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface Product {
  name: string;
  slug: string;
  description: string;
  price: number;
  discount_price: number | null;
  stock: number;
  images: string[];
  variants: any[];
  is_featured: boolean;
  is_active: boolean;
  category_name: string;
}

const AdminSeedData = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const productsData: Product[] = [
    // KEMEJA PRODUCTS
    {
      name: 'Kemeja Flanel Kotak Premium',
      slug: 'kemeja-flanel-kotak-premium',
      description: 'Kemeja flanel dengan motif kotak-kotak yang stylish dan nyaman untuk berbagai acara kasual',
      price: 189000,
      discount_price: 169000,
      stock: 35,
      images: [
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800',
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800'
      ],
      variants: [],
      is_featured: true,
      is_active: true,
      category_name: 'Kemeja'
    },
    {
      name: 'Kemeja Oxford Putih Formal',
      slug: 'kemeja-oxford-putih-formal',
      description: 'Kemeja oxford putih klasik dengan bahan premium, cocok untuk acara formal dan kantor',
      price: 225000,
      discount_price: null,
      stock: 40,
      images: [
        'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800',
        'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800'
      ],
      variants: [],
      is_featured: true,
      is_active: true,
      category_name: 'Kemeja'
    },
    {
      name: 'Kemeja Denim Wash Casual',
      slug: 'kemeja-denim-wash-casual',
      description: 'Kemeja denim dengan efek wash yang trendy, perfect untuk gaya kasual sehari-hari',
      price: 195000,
      discount_price: 175000,
      stock: 30,
      images: [
        'https://images.unsplash.com/photo-1598032895397-b9fcf37fe2b0?w=800',
        'https://images.unsplash.com/photo-1598032895397-b9fcf37fe2b0?w=800'
      ],
      variants: [],
      is_featured: false,
      is_active: true,
      category_name: 'Kemeja'
    },
    {
      name: 'Kemeja Linen Cream Breathable',
      slug: 'kemeja-linen-cream-breathable',
      description: 'Kemeja linen dengan warna cream yang adem dan breathable, cocok untuk cuaca panas',
      price: 215000,
      discount_price: null,
      stock: 25,
      images: [
        'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=800',
        'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=800'
      ],
      variants: [],
      is_featured: false,
      is_active: true,
      category_name: 'Kemeja'
    },
    {
      name: 'Kemeja Hitam Slim Fit',
      slug: 'kemeja-hitam-slim-fit',
      description: 'Kemeja hitam dengan potongan slim fit yang modern dan elegan untuk berbagai acara',
      price: 199000,
      discount_price: 179000,
      stock: 45,
      images: [
        'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800',
        'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800'
      ],
      variants: [],
      is_featured: true,
      is_active: true,
      category_name: 'Kemeja'
    },
    {
      name: 'Kemeja Batik Modern Kombinasi',
      slug: 'kemeja-batik-modern-kombinasi',
      description: 'Kemeja batik dengan desain modern yang memadukan tradisi dan gaya kontemporer',
      price: 245000,
      discount_price: null,
      stock: 20,
      images: [
        'https://images.unsplash.com/photo-1622519407650-3df9883f76e5?w=800',
        'https://images.unsplash.com/photo-1622519407650-3df9883f76e5?w=800'
      ],
      variants: [],
      is_featured: false,
      is_active: true,
      category_name: 'Kemeja'
    },

    // AKSESORIS PRODUCTS
    {
      name: 'Topi Baseball Cap Premium',
      slug: 'topi-baseball-cap-premium',
      description: 'Baseball cap dengan bahan premium dan desain minimalis yang cocok untuk berbagai outfit',
      price: 89000,
      discount_price: 79000,
      stock: 50,
      images: [
        'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800',
        'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800'
      ],
      variants: [],
      is_featured: true,
      is_active: true,
      category_name: 'Aksesoris'
    },
    {
      name: 'Tas Ransel Canvas Vintage',
      slug: 'tas-ransel-canvas-vintage',
      description: 'Tas ransel berbahan canvas dengan tampilan vintage yang stylish dan praktis',
      price: 275000,
      discount_price: 249000,
      stock: 30,
      images: [
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'
      ],
      variants: [],
      is_featured: true,
      is_active: true,
      category_name: 'Aksesoris'
    },
    {
      name: 'Ikat Pinggang Kulit Asli',
      slug: 'ikat-pinggang-kulit-asli',
      description: 'Ikat pinggang kulit asli dengan buckle stainless yang elegant dan tahan lama',
      price: 159000,
      discount_price: null,
      stock: 40,
      images: [
        'https://images.unsplash.com/photo-1624222247344-550fb60583aa?w=800',
        'https://images.unsplash.com/photo-1624222247344-550fb60583aa?w=800'
      ],
      variants: [],
      is_featured: false,
      is_active: true,
      category_name: 'Aksesoris'
    },
    {
      name: 'Kacamata Sunglasses UV Protection',
      slug: 'kacamata-sunglasses-uv-protection',
      description: 'Kacamata sunglasses dengan proteksi UV dan desain modern yang trendy',
      price: 195000,
      discount_price: 175000,
      stock: 35,
      images: [
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800'
      ],
      variants: [],
      is_featured: true,
      is_active: true,
      category_name: 'Aksesoris'
    },
    {
      name: 'Dompet Pria Leather Bifold',
      slug: 'dompet-pria-leather-bifold',
      description: 'Dompet kulit bifold dengan banyak slot kartu dan desain slim yang praktis',
      price: 145000,
      discount_price: 129000,
      stock: 45,
      images: [
        'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
        'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800'
      ],
      variants: [],
      is_featured: false,
      is_active: true,
      category_name: 'Aksesoris'
    },
    {
      name: 'Jam Tangan Minimalis Analog',
      slug: 'jam-tangan-minimalis-analog',
      description: 'Jam tangan dengan desain minimalis yang elegan, cocok untuk gaya formal maupun casual',
      price: 325000,
      discount_price: null,
      stock: 25,
      images: [
        'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800',
        'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800'
      ],
      variants: [],
      is_featured: true,
      is_active: true,
      category_name: 'Aksesoris'
    },
    {
      name: 'Syal Rajut Winter Collection',
      slug: 'syal-rajut-winter-collection',
      description: 'Syal rajut lembut dan hangat dengan desain modern untuk musim dingin',
      price: 95000,
      discount_price: 85000,
      stock: 30,
      images: [
        'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800',
        'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800'
      ],
      variants: [],
      is_featured: false,
      is_active: true,
      category_name: 'Aksesoris'
    },
    {
      name: 'Kaos Kaki Premium Cotton 3 Pasang',
      slug: 'kaos-kaki-premium-cotton-3-pasang',
      description: 'Set 3 pasang kaos kaki premium dari cotton combed yang nyaman dan breathable',
      price: 65000,
      discount_price: 55000,
      stock: 60,
      images: [
        'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800',
        'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800'
      ],
      variants: [],
      is_featured: false,
      is_active: true,
      category_name: 'Aksesoris'
    }
  ];

  const handleSeedProducts = async () => {
    setLoading(true);
    setMessage('');
    setError('');

    try {
      // Get all categories
      const { data: categories, error: catError } = await supabase
        .from('categories')
        .select('id, name, slug');

      if (catError) {
        throw catError;
      }

      console.log('📦 Categories found:', categories);
      setMessage('Mengecek kategori...');

      // Map category names to IDs
      const categoryMap = new Map(categories?.map(cat => [cat.name, cat.id]) || []);

      // Prepare products with category_id
      const productsToInsert = productsData.map(product => {
        const categoryId = categoryMap.get(product.category_name);
        
        if (!categoryId) {
          console.warn(`⚠️  Category "${product.category_name}" not found for product "${product.name}"`);
          return null;
        }

        const { category_name, ...productData } = product;
        
        return {
          ...productData,
          category_id: categoryId
        };
      }).filter(Boolean);

      console.log(`📝 Inserting ${productsToInsert.length} products...`);
      setMessage(`Menambahkan ${productsToInsert.length} produk...`);

      // Insert products
      const { data, error } = await supabase
        .from('products')
        .insert(productsToInsert)
        .select();

      if (error) {
        throw error;
      }

      console.log('✅ Successfully inserted products:', data?.length);
      setMessage(`✅ Berhasil menambahkan ${data?.length} produk!`);
      setError('');
    } catch (err: any) {
      console.error('❌ Error seeding products:', err);
      setError(`Error: ${err.message}`);
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">Seed Data Products</h1>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Data yang akan ditambahkan:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Kategori Kemeja:</strong> 6 produk (Flanel, Oxford, Denim, Linen, Hitam Slim Fit, Batik)</li>
              <li><strong>Kategori Aksesoris:</strong> 8 produk (Topi, Tas Ransel, Ikat Pinggang, Kacamata, Dompet, Jam Tangan, Syal, Kaos Kaki)</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Total: <strong>14 produk</strong> dengan gambar dari Unsplash
            </p>
          </div>

          <button
            onClick={handleSeedProducts}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors"
          >
            {loading ? 'Memproses...' : 'Tambahkan Produk Sekarang'}
          </button>

          {message && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">{message}</p>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Catatan:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Pastikan kategori "Kemeja" dan "Aksesoris" sudah dibuat di admin</li>
              <li>• Gambar menggunakan Unsplash dengan auto-optimization</li>
              <li>• Setiap produk sudah memiliki slug, deskripsi, dan harga</li>
              <li>• Beberapa produk ditandai sebagai featured dan discount</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSeedData;
