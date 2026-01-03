import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { ChevronRight, Star, Info, Package, Truck, Plus, Minus } from 'lucide-react';
import { FiguraSize, PhotoSize, WallDecorType, WallDecorSize } from '../types';

const photoSizes: PhotoSize[] = [
  {
    id: '2r',
    name: '2R',
    dimensions: '6 x 9 cm',
    price: 3000,
    notes: '1 sheet bisa isi 2 foto'
  },
  {
    id: '3r',
    name: '3R',
    dimensions: '8.9 x 12.7 cm',
    price: 1500
  },
  {
    id: '4r',
    name: '4R',
    dimensions: '10.2 x 15.2 cm',
    price: 1800
  },
  {
    id: '5r',
    name: '5R',
    dimensions: '12.7 x 17.8 cm',
    price: 3500
  },
  {
    id: '6r',
    name: '6R',
    dimensions: '15.2 x 20.3 cm',
    price: 4000
  },
  {
    id: '8r',
    name: '8R',
    dimensions: '20.3 x 25.4 cm',
    price: 8000
  },
  {
    id: '8rw',
    name: '8RW',
    dimensions: '20.3 x 30.5 cm',
    price: 10000
  },
  {
    id: '12r',
    name: '12R',
    dimensions: '30.5 x 40.5 cm',
    price: 22000
  },
  {
    id: '12rw',
    name: '12RW',
    dimensions: '30.5 x 45 cm',
    price: 24000
  },
  {
    id: '16r',
    name: '16R',
    dimensions: '40 x 50 cm',
    price: 60000
  },
  {
    id: '16rw',
    name: '16RW',
    dimensions: '40 x 60 cm',
    price: 68000
  },
  {
    id: '20r',
    name: '20R',
    dimensions: '50 x 60 cm',
    price: 84000
  },
  {
    id: '20rw',
    name: '20RW',
    dimensions: '50 x 75 cm',
    price: 105000
  },
  {
    id: '24r',
    name: '24R',
    dimensions: '60 x 90 cm',
    price: 151000
  }
];

const figuraSizes: FiguraSize[] = [
  {
    id: '4r',
    name: '4R',
    dimensions: '10.2 x 15.2 cm',
    priceRange: 'Rp 11.000 - Rp 32.500',
    minPrice: 11000,
    maxPrice: 32500,
    images: [
        'https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg',
        'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg'
      ]
  },
  {
    id: '5r',
    name: '5R',
    dimensions: '12.7 x 17.8 cm',
    priceRange: 'Rp 14.000 - Rp 25.000',
    minPrice: 14000,
    maxPrice: 25000,
    images: [
        'https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg',
        'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg'
      ]
  },
  {
    id: '6r',
    name: '6R',
    dimensions: '15.2 x 20.3 cm',
    priceRange: 'Rp 20.000',
    minPrice: 20000,
    images: [
        'https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg',
        'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg'
      ]
  },
  {
    id: '8r',
    name: '8R',
    dimensions: '20.3 x 25.4 cm',
    priceRange: 'Rp 20.000 - Rp 30.000',
    minPrice: 20000,
    maxPrice: 30000,
    withFrame: true,
    images: [
        'https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg',
        'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg'
      ]
  },
  {
    id: '8rw',
    name: '8RW',
    dimensions: '20.3 x 30.5 cm',
    priceRange: 'Rp 23.000 - Rp 70.000',
    minPrice: 23000,
    maxPrice: 70000,
    withFrame: true,
    images: [
        'https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg',
        'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg'
      ]
  },
  {
    id: '12r',
    name: '12R',
    dimensions: '30.5 x 40.5 cm',
    priceRange: 'Rp 47.500 - Rp 140.000',
    minPrice: 47500,
    maxPrice: 140000,
    withFrame: true,
    images: [
        'https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg',
        'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg'
      ]
  },
  {
    id: '12rw',
    name: '12RW',
    dimensions: '30.5 x 45 cm',
    priceRange: 'Rp 53.000 - Rp 155.000',
    minPrice: 53000,
    maxPrice: 155000,
    withFrame: true,
    images: [
        'https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg',
        'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg'
      ]
  },
  {
    id: '16r',
    name: '16R',
    dimensions: '40 x 50 cm',
    priceRange: 'Rp 130.000 - Rp 185.000',
    minPrice: 130000,
    maxPrice: 185000,
    withFrame: true,
    images: [
        'https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg',
        'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg'
      ]
  },
  {
    id: '16rw',
    name: '16RW',
    dimensions: '40 x 60 cm',
    priceRange: 'Rp 125.000 - Rp 215.000',
    minPrice: 125000,
    maxPrice: 215000,
    withFrame: true,
    images: [
        'https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg',
        'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg'
      ]
  },
  {
    id: '20r',
    name: '20R',
    dimensions: '50 x 60 cm',
    priceRange: 'Rp 175.000 - Rp 220.000',
    minPrice: 175000,
    maxPrice: 220000,
    withFrame: true,
    images: [
        'https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg',
        'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg'
      ]
  },
  {
    id: '20rw',
    name: '20RW',
    dimensions: '50 x 75 cm',
    priceRange: 'Rp 205.000 - Rp 255.000',
    minPrice: 205000,
    maxPrice: 255000,
    withFrame: true,
    images: [
        'https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg',
        'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg'
      ]
  },
  {
    id: '24r',
    name: '24R',
    dimensions: '60 x 90 cm',
    priceRange: 'Rp 270.000 - Rp 355.000',
    minPrice: 270000,
    maxPrice: 355000,
    withFrame: true
  }
];

const albumSizes = [
  {
    id: 'magnetic-10',
    name: 'Album Magnetik Jumbo 10 Sheet',
    dimensions: '35x35 cm',
    priceRange: 'Rp 76.000 - Rp 110.000',
    minPrice: 76000,
    maxPrice: 110000,
    features: ['Free Box Kardus', 'Free Tas Hitam']
  },
  {
    id: 'magnetic-15',
    name: 'Album Magnetik Jumbo 15 Sheet',
    dimensions: '35x35 cm',
    priceRange: 'Rp 93.000 - Rp 128.000',
    minPrice: 93000,
    maxPrice: 128000,
    features: ['Free Box Kardus', 'Free Tas Hitam']
  },
  {
    id: 'magnetic-20',
    name: 'Album Magnetik Jumbo 20 Sheet',
    dimensions: '35x35 cm',
    priceRange: 'Rp 130.000 - Rp 150.000',
    minPrice: 130000,
    maxPrice: 150000,
    features: ['Free Box Kardus', 'Free Tas Hitam']
  },
  {
    id: 'custom-10',
    name: 'Album Custom Magnetik 10 Sheet',
    dimensions: '35x35 cm',
    price: 'Rp 240.000',
    minPrice: 240000,
    features: ['Cover Custom Foto/Tulisan', 'Free Design', 'Free Tas Vinyl', 'Free Tas Hitam']
  },
  {
    id: 'custom-15',
    name: 'Album Custom Magnetik 15 Sheet',
    dimensions: '35x35 cm',
    price: 'Rp 250.000',
    minPrice: 250000,
    features: ['Cover Custom Foto/Tulisan', 'Free Design', 'Free Tas Vinyl', 'Free Tas Hitam']
  },
  {
    id: 'custom-20',
    name: 'Album Custom Magnetik 20 Sheet',
    dimensions: '35x35 cm',
    price: 'Rp 260.000',
    minPrice: 260000,
    features: ['Cover Custom Foto/Tulisan', 'Free Design', 'Free Tas Vinyl', 'Free Tas Hitam']
  }
];

const weddingBookSizes = [
  {
    id: '6r',
    name: '6R',
    dimensions: '15.2 x 20.3 cm',
    price: 90000,
    type: 'sambung'
  },
  {
    id: '10r-vertical',
    name: '10R Vertical',
    dimensions: '25.4 x 30.5 cm',
    price: 120000,
    type: 'sambung'
  },
  {
    id: '10r-horizontal',
    name: '10R Horizontal',
    dimensions: '30.5 x 25.4 cm',
    price: 170000,
    type: 'sambung'
  },
  {
    id: '20x30-custom-sambung',
    name: '20x30 Cover Custom',
    dimensions: '20 x 30 cm',
    price: 320000,
    type: 'sambung'
  },
  {
    id: '20x30-vinyl-sambung',
    name: '20x30 Cover Vinyl/Bludru',
    dimensions: '20 x 30 cm',
    price: 330000,
    type: 'sambung'
  },
  {
    id: '30x30-custom-sambung',
    name: '30x30 Cover Custom',
    dimensions: '30 x 30 cm',
    price: 350000,
    type: 'sambung'
  },
  {
    id: '30x30-vinyl-sambung',
    name: '30x30 Cover Vinyl/Bludru',
    dimensions: '30 x 30 cm',
    price: 360000,
    type: 'sambung'
  },
  {
    id: '20x30-custom-pisah',
    name: '20x30 Cover Custom',
    dimensions: '20 x 30 cm',
    price: 270000,
    type: 'pisah'
  },
  {
    id: '20x30-vinyl-pisah',
    name: '20x30 Cover Vinyl/Bludru',
    dimensions: '20 x 30 cm',
    price: 280000,
    type: 'pisah'
  }
];

const suitcaseOptions = [
  {
    id: 'wooden-box',
    name: 'Kotak Kayu',
    dimensions: '20 x 30 cm',
    price: 150000
  },
  {
    id: 'wooden-box-acrylic',
    name: 'Kotak Kayu Tutup Acrylic',
    dimensions: '20 x 30 cm',
    price: 180000
  },
  {
    id: 'vinyl-suitcase',
    name: 'Koper Jahit Coklat Tua',
    material: 'Vinyl',
    price: 100000
  },
  {
    id: 'wallpaper-suitcase',
    name: 'Koper Bunga',
    material: 'Wallpaper',
    price: 140000
  }
];

const wallDecorSizes: Record<WallDecorType, WallDecorSize[]> = {
  canvas: [
    {
      id: '16r',
      name: '16R',
      dimensions: '40 x 50 cm',
      price: 130000
    },
    {
      id: '16rw',
      name: '16RW',
      dimensions: '40 x 60 cm',
      price: 130000
    },
    {
      id: '20r',
      name: '20R',
      dimensions: '50 x 60 cm',
      price: 150000
    },
    {
      id: '20rw',
      name: '20RW',
      dimensions: '50 x 75 cm',
      price: 190000
    },
    {
      id: '24r',
      name: '24R',
      dimensions: '60 x 90 cm',
      price: 250000
    }
  ],
  photoblock: [
    {
      id: '10r',
      name: '10R',
      dimensions: '25.4 x 30.5 cm',
      price: 28000
    },
    {
      id: '10rw',
      name: '10RW',
      dimensions: '25.4 x 35.6 cm',
      price: 30000
    },
    {
      id: '12r',
      name: '12R',
      dimensions: '30.5 x 40.5 cm',
      price: 50000
    },
    {
      id: '12rw',
      name: '12RW',
      dimensions: '30.5 x 45 cm',
      price: 55500
    },
    {
      id: '16rw',
      name: '16RW',
      dimensions: '40 x 60 cm',
      price: 100000
    }
  ]
};

const products = {
  'figura': {
    name: 'Figura',
    description: 'Bingkai foto premium dengan berbagai pilihan desain dan ukuran yang elegan. Terbuat dari bahan berkualitas tinggi untuk memastikan foto Anda terlindungi dan terlihat memukau.',
    price: 'Mulai Rp 11.000',
    image: 'https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    gallery: [
      'https://images.pexels.com/photos/1099816/pexels-photo-1099816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/139764/pexels-photo-139764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2647714/pexels-photo-2647714.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    specs: [
      { name: 'Material', value: 'Kayu Solid, Kaca Anti Gores' },
      { name: 'Ukuran', value: 'Berbagai ukuran dari 4R hingga 24R' },
      { name: 'Warna Frame', value: 'Hitam, Putih, Coklat, Gold' },
      { name: 'Proteksi', value: 'UV Protection, Anti Debu' }
    ]
  },
  'album': {
    name: 'Album Foto',
    description: 'Album foto premium dengan kualitas terbaik untuk menyimpan kenangan berharga. Tersedia dalam berbagai ukuran dan jumlah halaman dengan pilihan custom cover.',
    price: 'Mulai Rp 76.000',
    image: 'https://raw.githubusercontent.com/anjengk/photo/main/album/DSC00871.webp?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    gallery: [
      'https://raw.githubusercontent.com/anjengk/photo/main/album/DSC00871.webp?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://raw.githubusercontent.com/anjengk/photo/main/album/DSC00867.webp?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://raw.githubusercontent.com/anjengk/photo/main/album/DSC00857.webp?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    specs: [
      { name: 'Material', value: 'Hard Cover Premium, Magnetic Sheet' },
      { name: 'Ukuran', value: '35x35 cm' },
      { name: 'Jumlah Halaman', value: '10, 15, 20 sheet' },
      { name: 'Custom Cover', value: 'Tersedia dengan biaya tambahan' }
    ]
  },
  'album-bag': {
    name: 'Tas Album',
    description: 'Tas khusus untuk melindungi dan membawa album foto Anda. Tersedia dalam berbagai bahan dan ukuran dengan opsi kustomisasi nama.',
    price: 'Mulai Rp 40.000',
    image: 'https://raw.githubusercontent.com/anjengk/photo/main/tas album/Untitled-2_0007_e.JPG.webp?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    gallery: [
      'https://raw.githubusercontent.com/anjengk/photo/main/tas album/Untitled-2_0000_f.JPG.webp?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://raw.githubusercontent.com/anjengk/photo/main/tas album/Untitled-2_0004_g.JPG.webp?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://raw.githubusercontent.com/anjengk/photo/main/tas album/Untitled-2_0006_i.JPG.webp?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://raw.githubusercontent.com/anjengk/photo/main/tas album/Untitled-2_0008_d.JPG.webp?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://raw.githubusercontent.com/anjengk/photo/main/tas album/Untitled-2_0009_c.JPG.webp?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://raw.githubusercontent.com/anjengk/photo/main/tas album/Untitled-2_0005_h.JPG.webp?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    specs: [
      { name: 'Material', value: 'Vinyl, Vinyl Kayu' },
      { name: 'Ukuran', value: '20x30 cm, 30x30 cm' },
      { name: 'Warna', value: 'Coklat' },
      { name: 'Kustomisasi', value: 'Opsi print nama (+Rp 10.000)' }
    ],
    variants: {
      'vinyl': {
        name: 'Vinyl',
        prices: {
          '20x30': 40000,
          '30x30': 50000
        }
      },
      'vinyl-wood': {
        name: 'Vinyl Kayu',
        prices: {
          '20x30': 70000,
          '30x30': 100000
        }
      }
    }
  },
  'wedding-book': {
    name: 'Wedding Book',
    description: 'Album pernikahan eksklusif dengan desain elegan dan kualitas premium. Sempurna untuk mengabadikan momen spesial pernikahan Anda.',
    price: 'Rp 500.000 - Rp 2.000.000',
    image: 'https://raw.githubusercontent.com/anjengk/photo/main/wedding book/DSC00689.webp',
    gallery: [
      'https://raw.githubusercontent.com/anjengk/photo/main/wedding book/DSC00689.webp',
      'https://raw.githubusercontent.com/anjengk/photo/main/wedding book/DSC00709.webp',
      'https://raw.githubusercontent.com/anjengk/photo/main/wedding book/DSC00857.webp',
      'https://raw.githubusercontent.com/anjengk/photo/main/wedding book/DSC00898 (1).webp',
      'https://raw.githubusercontent.com/anjengk/photo/main/wedding book/DSC00901 (1).webp',
      'https://raw.githubusercontent.com/anjengk/photo/main/wedding book/Untitled-2_0001_k.JPG.webp',
      'https://raw.githubusercontent.com/anjengk/photo/main/wedding book/Untitled-2_0002_l.JPG.webp',
      'https://raw.githubusercontent.com/anjengk/photo/main/wedding book/Untitled-2_0003_m.JPG.webp'
    ],
    specs: [
      { name: 'Material', value: 'Premium Leather, Silk' },
      { name: 'Ukuran', value: '30x30 cm, 35x35 cm' },
      { name: 'Jumlah Halaman', value: '50, 80, 100 halaman' },
      { name: 'Finishing', value: 'Gold Foil, Emboss' }
    ]
  },
  'wall-decor': {
    name: 'Wall Decor',
    description: 'Hiasan dinding dari foto dengan berbagai pilihan material dan ukuran. Sempurna untuk menghiasi ruangan Anda dengan kenangan indah.',
    price: 'Rp 200.000 - Rp 1.000.000',
    image: 'https://raw.githubusercontent.com/anjengk/photo/main/wall decor/DSC08279.webp',
    gallery: [
      'https://raw.githubusercontent.com/anjengk/photo/main/wall decor/DSC08279.webp',
      'https://raw.githubusercontent.com/anjengk/photo/main/wall decor/DSC08281.webp',
      'https://raw.githubusercontent.com/anjengk/photo/main/wall decor/DSC08282.webp',
      'https://raw.githubusercontent.com/anjengk/photo/main/wall decor/Untitled-2_0007_10.JPG.webp',
      'https://raw.githubusercontent.com/anjengk/photo/main/wall decor/Untitled-2_0008_11.JPG.webp',
      'https://raw.githubusercontent.com/anjengk/photo/main/wall decor/Untitled-2_0009_12.JPG.webp',
      'https://raw.githubusercontent.com/anjengk/photo/main/wall decor/Untitled-2_0010_13.JPG.webp',
      'https://raw.githubusercontent.com/anjengk/photo/main/wall decor/Untitled-2_0011_14.JPG.webp'
    ],
    specs: [
      { name: 'Material', value: 'Canvas, Acrylic, Metal' },
      { name: 'Ukuran', value: '40x60 cm, 60x90 cm, 90x120 cm' },
      { name: 'Finishing', value: 'Matte, Glossy' },
      { name: 'Pemasangan', value: 'Hook System, Easy Install' }
    ]
  },
  'print': {
    name: 'Cetak Foto',
    description: 'Cetak foto berkualitas tinggi dengan berbagai ukuran dan jenis kertas. Hasil cetakan tajam dengan warna yang akurat.',
    price: 'Mulai Rp 1.500',
    image: 'https://raw.githubusercontent.com/anjengk/photo/main/cetak foto/DSC08021.webp',
    gallery: [
      'https://raw.githubusercontent.com/anjengk/photo/main/cetak foto/DSC08021.webp',
      'https://raw.githubusercontent.com/anjengk/photo/main/cetak foto/DSC08314.webp',
      'https://raw.githubusercontent.com/anjengk/photo/main/cetak foto/DSC08315.webp',
      'https://raw.githubusercontent.com/anjengk/photo/main/cetak foto/Edit 19.webp',
      'https://raw.githubusercontent.com/anjengk/photo/main/cetak foto/Untitled-2_0012_15.JPG.webp',
      'https://raw.githubusercontent.com/anjengk/photo/main/cetak foto/DSC08022.webp'
    ],
    specs: [
      { name: 'Ukuran', value: '2R hingga 24R' },
      { name: 'Jenis Kertas', value: 'Glossy, Doff, Pearl' },
      { name: 'Kualitas', value: 'HD Premium' },
      { name: 'Waktu Proses', value: '1-2 hari kerja' }
    ]
  },
  'flashdisk': {
    name: 'Flashdisk',
    description: 'Simpan foto digital Anda dalam flashdisk eksklusif dengan desain unik. Tersedia dalam bentuk kartu atau kayu dengan pilihan kapasitas yang beragam.',
    price: 'Mulai Rp 50.000',
    image: 'https://raw.githubusercontent.com/anjengk/photo/main/flashdisk/DSC00890 (1).webp',
    gallery: [
      'https://raw.githubusercontent.com/anjengk/photo/main/flashdisk/DSC00890 (1).webp',
      'https://raw.githubusercontent.com/anjengk/photo/main/flashdisk/DSC00894 (1).webp',
      'https://raw.githubusercontent.com/anjengk/photo/main/flashdisk/DSC00895 (1).webp'
    ],
    specs: [
      { name: 'Jenis', value: 'Flashdisk Kartu, Flashdisk Kayu' },
      { name: 'Kapasitas', value: '8GB, 16GB, 32GB' },
      { name: 'Kecepatan', value: 'USB 3.0' },
      { name: 'Bonus', value: 'Box Premium' }
    ],
    variants: {
      'card': {
        name: 'Flashdisk Kartu',
        prices: {
          '8gb': 50000,
          '16gb': 57000,
          '32gb': 64000
        },
        features: ['Dapat dicetak tulisan atau foto', 'Harga sudah termasuk print']
      },
      'wood': {
        name: 'Flashdisk Kayu',
        prices: {
          '8gb': 52000,
          '16gb': 59000,
          '32gb': 66000
        },
        features: ['Dapat dicetak tulisan atau logo', 'Biaya print +Rp 5.000/sisi']
      }
    }
  }
};

const ProductDetail = () => {
  const { productId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('4r');
  const [selectedType, setSelectedType] = useState('sambung');
  const [selectedSuitcase, setSelectedSuitcase] = useState('');
  const [additionalSheets, setAdditionalSheets] = useState(0);
  const [showFramePackages, setShowFramePackages] = useState(false);
  
  const [selectedMaterial, setSelectedMaterial] = useState('vinyl');
  const [selectedBagSize, setSelectedBagSize] = useState('20x30');
  const [customName, setCustomName] = useState('');
  const [includeCustomName, setIncludeCustomName] = useState(false);

  const [selectedFlashType, setSelectedFlashType] = useState('card');
  const [selectedCapacity, setSelectedCapacity] = useState('8gb');
  const [printSides, setPrintSides] = useState(0);
  const [customText, setCustomText] = useState('');
  const [wallDecorType, setWallDecorType] = useState<WallDecorType>('canvas');
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const createWhatsAppLink = () => {
    let productName = product.name;
    let selectedOption = '';
    let totalPrice = 0;
    let basePrice = 0;

    if (isFlashdisk) {
      const variant = product.variants[selectedFlashType];
      selectedOption = `${variant.name} ${selectedCapacity.toUpperCase()}`;
      basePrice = calculateFlashdiskPrice();
      totalPrice = basePrice * quantity;
    } else if (isAlbumBag) {
      selectedOption = `${product.variants[selectedMaterial].name} ${selectedBagSize}`;
      basePrice = calculateAlbumBagPrice();
      totalPrice = basePrice * quantity;
    } else if (productId === 'wedding-book') {
      const size = weddingBookSizes.find(s => s.id === selectedSize);
      selectedOption = `${size?.name || ''} (${selectedType})`;
      basePrice = calculateWeddingBookPrice();
      totalPrice = basePrice * quantity;
    } else if (productId === 'wall-decor') {
      const size = wallDecorSizes[wallDecorType].find(s => s.id === selectedSize);
      selectedOption = `${wallDecorType === 'canvas' ? 'Canvas' : 'Photoblock'} ${size?.name || ''}`;
      basePrice = size?.price || 0;
      totalPrice = basePrice * quantity;
    } else if (isPrint) {
      const size = photoSizes.find(s => s.id === selectedSize);
      selectedOption = size?.name || '';
      basePrice = size?.price || 0;
      totalPrice = basePrice * quantity;
    } else if (isFigura) {
      const size = figuraSizes.find(s => s.id === selectedSize);
      selectedOption = `${size?.name || ''} (${size?.dimensions || ''})`;
      basePrice = size?.minPrice || 0;
      totalPrice = basePrice * quantity;
    } else if (isAlbum) {
      const size = albumSizes.find(s => s.id === selectedSize);
      selectedOption = size?.name || '';
      basePrice = size?.minPrice || 0;
      totalPrice = basePrice * quantity;
    }

    let message = '';
    if (isFlashdisk || isAlbumBag) {
      const customTextValue = isFlashdisk ? customText : customName;
      message = `Hallo Kak, saya ingin memesan produk ${productName} dengan ukuran ${selectedOption}, sejumlah ${quantity} dengan total harga ${formatPrice(totalPrice)} dan tambahan penulisan nama "${customTextValue}".`;
    } else {
      message = `Hallo Kak, saya ingin memesan produk ${productName} dengan ukuran ${selectedOption}, sejumlah ${quantity} dengan total harga ${formatPrice(totalPrice)}.`;
    }

    const encodedMessage = encodeURIComponent(message);
    return `http://wa.me/6281227626780?text=${encodedMessage}`;
  };

  if (!productId || !products[productId as keyof typeof products]) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Produk tidak ditemukan</h1>
      </div>
    );
  }

  const product = products[productId as keyof typeof products];
  const isFigura = productId === 'figura';
  const isAlbum = productId === 'album';
  const isAlbumBag = productId === 'album-bag';
  const isPrint = productId === 'print';
  const isFlashdisk = productId === 'flashdisk';
  const isWeddingBook = productId === 'wedding-book';
  const isWallDecor = productId === 'wall-decor';

  const displaySizes = isFigura 
    ? (showFramePackages ? figuraSizes : figuraSizes.filter(size => !size.withFrame))
    : isAlbum ? albumSizes : [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const calculateAlbumBagPrice = () => {
    if (!isAlbumBag) return 0;
    
    const basePrice = product.variants[selectedMaterial].prices[selectedBagSize];
    const customNamePrice = includeCustomName ? 10000 : 0;
    
    return basePrice + customNamePrice;
  };

  const calculateWeddingBookPrice = () => {
    if (!selectedSize) return 0;
    
    const baseSize = weddingBookSizes.find(size => size.id === selectedSize);
    if (!baseSize) return 0;

    let totalPrice = baseSize.price;

    if (additionalSheets > 0) {
      const sheetPrice = baseSize.dimensions.includes('30x30') ? 35000 : 30000;
      totalPrice += additionalSheets * sheetPrice;
    }

    if (selectedSuitcase) {
      const suitcase = suitcaseOptions.find(option => option.id === selectedSuitcase);
      if (suitcase) {
        totalPrice += suitcase.price;
      }
    }

    return totalPrice;
  };

  const calculateFlashdiskPrice = () => {
    if (!isFlashdisk) return 0;

    const variant = product.variants[selectedFlashType];
    const basePrice = variant.prices[selectedCapacity];
    
    if (selectedFlashType === 'wood') {
      return basePrice + (printSides * 5000);
    }
    
    return basePrice;
  };

  const QuantitySelector = () => (
    <div className="flex items-center space-x-4 mb-4">
      <span className="text-gray-700 font-medium">Jumlah:</span>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(-1)}
          className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={quantity <= 1}
        >
          <Minus size={16} />
        </button>
        <span className="w-12 text-center font-medium">{quantity}</span>
        <button
          onClick={() => handleQuantityChange(1)}
          className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="py-12">
      <div className="container">
        <div className="flex items-center space-x-2 text-sm mb-8">
          <a href="/" className="text-gray-500 hover:text-primary-600">Beranda</a>
          <ChevronRight size={16} className="text-gray-400" />
          <a href="/products" className="text-gray-500 hover:text-primary-600">Produk</a> 
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="aspect-square rounded-lg overflow-hidden mb-4">
              <img
                src={product.gallery[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary-600' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-500">(50 Reviews)</span>
            </div>

            <p className="text-gray-600 mb-8">
              {product.description}
            </p>

            {isFlashdisk && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Pilih Jenis Flashdisk</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(product.variants).map(([key, variant]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedFlashType(key)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          selectedFlashType === key
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-lg">{variant.name}</span>
                        </div>
                        <ul className="space-y-1 mt-2">
                          {variant.features.map((feature, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center">
                              <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">Pilih Kapasitas</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(product.variants[selectedFlashType].prices).map(([capacity, price]) => (
                      <button
                        key={capacity}
                        onClick={() => setSelectedCapacity(capacity)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          selectedCapacity === capacity
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        <span className="font-medium text-lg">{capacity.toUpperCase()}</span>
                        <p className="text-sm text-primary-600">{formatPrice(price)}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedFlashType === 'wood' && (
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Pilih Sisi Print (+Rp 5.000/sisi)</h3>
                    <div className="flex space-x-4">
                      {[0, 1, 2].map((sides) => (
                        <button
                          key={sides}
                          onClick={() => setPrintSides(sides)}
                          className={`px-6 py-3 rounded-lg border-2 text-center transition-all ${
                            printSides === sides
                              ? 'border-primary-600 bg-primary-50'
                              : 'border-gray-200 hover:border-primary-300'
                          }`}
                        >
                          {sides === 0 ? 'Tanpa Print' : `${sides} Sisi`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {((selectedFlashType === 'card') || (selectedFlashType === 'wood' && printSides > 0)) && (
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Teks Custom</h3>
                    <input
                      type="text"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="Masukkan teks yang diinginkan"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                )}

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">Total Harga</h3>
                    <span className="text-2xl font-bold text-primary-600">
                      {formatPrice(calculateFlashdiskPrice() * quantity)}
                    </span>
                  </div>
                  <QuantitySelector />
                  <a
                    href={createWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn btn-primary"
                  >
                    Pesan Sekarang
                  </a>
                </div>
              </div>
            )}

            {isPrint && (
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4">Pilih Ukuran Foto</h3>
                <div className="grid grid-cols-2 gap-4">
                  {photoSizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedSize === size.id
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-lg">{size.name}</span>
                        <span className="text-primary-600 font-medium">
                          {formatPrice(size.price)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{size.dimensions}</p>
                      {size.notes && (
                        <p className="text-xs text-gray-500 mt-1">{size.notes}</p>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  <Info size={16} className="inline-block mr-1" />
                  Cetak 4R pakai album magnetic jumbo/custom dihitung @1.500
                </p>
              </div>
            )}

            {isAlbumBag && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Pilih Material</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(product.variants).map(([key, variant]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedMaterial(key)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          selectedMaterial === key
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        <span className="font-medium text-lg">{variant.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">Pilih Ukuran</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(product.variants[selectedMaterial].prices).map(([size, price]) => (
                      <button
                        key={size}
                        onClick={() => setSelectedBagSize(size)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          selectedBagSize === size
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        <span className="font-medium text-lg">{size} cm</span>
                        <p className="text-sm text-gray-600">{formatPrice(price)}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <input
                      type="checkbox"
                      id="customName"
                      checked={includeCustomName}
                      onChange={(e) => setIncludeCustomName(e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="customName" className="font-medium text-gray-900">
                      Tambah Custom Nama (+Rp 10.000)
                    </label>
                  </div>
                  {includeCustomName && (
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="Masukkan nama yang diinginkan"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  )}
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">Total Harga</h3>
                    <span className="text-2xl font-bold text-primary-600">
                      {formatPrice(calculateAlbumBagPrice() * quantity)}
                    </span>
                  </div>
                  <QuantitySelector />
                  <a
                    href={createWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn btn-primary"
                  >
                    Pesan Sekarang
                  </a>
                </div>
              </div>
            )}

            {isFigura && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Pilih Ukuran</h3>
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={showFramePackages}
                      onChange={(e) => setShowFramePackages(e.target.checked)}
                      className="form-checkbox h-4 w-4 text-primary-600 rounded"
                    />
                    <span>Tampilkan Paket Frame</span>
                  </label>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {displaySizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedSize === size.id
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-lg">{size.name}</span>
                        {size.withFrame && (
                          <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                            Frame
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{size.dimensions}</p>
                      <p className="text-sm font-medium text-primary-600">{size.priceRange}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isAlbum && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Pilih Jenis Album</h3>
                </div>

                <div className="space-y-4">
                  {albumSizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        selectedSize === size.id
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-medium text-lg">{size.name}</span>
                          <p className="text-sm text-gray-600">{size.dimensions}</p>
                        </div>
                        <span className="font-medium text-primary-600">
                          {size.priceRange || size.price}
                        </span>
                      </div>
                      <div className="mt-2">
                        <ul className="space-y-1">
                          {size.features.map((feature, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center">
                              <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isWeddingBook && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Pilih Jenis Album</h3>
                  <div className="flex space-x-4 mb-6">
                    <button
                      onClick={() => setSelectedType('sambung')}
                      className={`px-4 py-2 rounded-lg ${
                        selectedType === 'sambung'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Sambung
                    </button>
                    <button
                      onClick={() => setSelectedType('pisah')}
                      className={`px-4 py-2 rounded-lg ${
                        selectedType === 'pisah'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Pisah
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {weddingBookSizes
                      .filter(size => size.type === selectedType)
                      .map(size => (
                        <button
                          key={size.id}
                          onClick={() => setSelectedSize(size.id)}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${
                            selectedSize === size.id
                              ? 'border-primary-600 bg-primary-50'
                              : 'border-gray-200 hover:border-primary-300'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-medium text-lg">{size.name}</span>
                              <p className="text-sm text-gray-600">{size.dimensions}</p>
                            </div>
                            <span className="font-medium text-primary-600">
                              {formatPrice(size.price)}
                            </span>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">Tambahan Sheet</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Album includes 11 sheets (22 pages). Add up to 5 additional sheets.
                  </p>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setAdditionalSheets(Math.max(0, additionalSheets - 1))}
                      className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="font-medium">{additionalSheets} sheet(s)</span>
                    <button
                      onClick={() => setAdditionalSheets(Math.min(5, additionalSheets + 1))}
                      className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">Pilih Suitcase</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {suitcaseOptions.map(option => (
                      <button
                        key={option.id}
                        onClick={() => setSelectedSuitcase(option.id)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          selectedSuitcase === option.id
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-medium text-lg">{option.name}</span>
                            {option.dimensions && (
                              <p className="text-sm text-gray-600">{option.dimensions}</p>
                            )}
                            {option.material && (
                              <p className="text-sm text-gray-600">Bahan: {option.material}</p>
                            )}
                          </div>
                          <span className="font-medium text-primary-600">
                            {formatPrice(option.price)}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">Total Harga</h3>
                    <span className="text-2xl font-bold text-primary-600">
                      {formatPrice(calculateWeddingBookPrice() * quantity)}
                    </span>
                  </div>
                  <QuantitySelector />
                  <a
                    href={createWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn btn-primary"
                  >
                    Pesan Sekarang
                  </a>
                </div>
              </div>
            )}

            {isWallDecor && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Pilih Jenis Wall Decor</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setWallDecorType('canvas')}
                      className={`p-6 rounded-lg border-2 text-left transition-all ${
                        wallDecorType === 'canvas'
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <h4 className="font-medium text-lg mb-2">Foto Canvas</h4>
                      <p className="text-sm text-gray-600">
                        Dicetak pada canvas premium dengan spanram berkualitas tinggi
                      </p>
                    </button>
                    <button
                      onClick={() => setWallDecorType('photoblock')}
                      className={`p-6 rounded-lg border-2 text-left transition-all ${
                        wallDecorType === 'photoblock'
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <h4 className="font-medium text-lg mb-2">Photoblock</h4>
                      <p className="text-sm text-gray-600">
                        Foto ditempel pada blok kayu solid dengan finishing premium
                      </p>
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">Pilih Ukuran</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {wallDecorSizes[wallDecorType].map((size) => (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSize(size.id)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          selectedSize === size.id
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-lg">{size.name}</span>
                          <span className="text-primary-600 font-medium">
                            {formatPrice(size.price)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{size.dimensions}</p>
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    {wallDecorType === 'canvas' 
                      ? '* Dicetak pada canvas premium dengan spanram berkualitas tinggi'
                      : '* Dicetak pada blok kayu solid dengan finishing premium'}
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">Total Harga</h3>
                    <span className="text-2xl font-bold text-primary-600">
                      {formatPrice(
                        selectedSize
                          ? (wallDecorSizes[wallDecorType].find(s => s.id === selectedSize)?.price || 0) * quantity
                          : 0
                      )}
                    </span>
                  </div>
                  <QuantitySelector />
                  <a
                    href={createWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn btn-primary"
                  
                  >
                    Pesan Sekarang
                  </a>
                </div>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-lg mb-4">Spesifikasi Produk</h3>
              <div className="space-y-4">
                {product.specs.map((spec, index) => (
                  <div key={index} className="flex">
                    <div className="w-1/3 text-gray-500">{spec.name}</div>
                    <div className="w-2/3 text-gray-900">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Package className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Gratis Packaging</h4>
                  <p className="text-sm text-gray-500">Kemasan premium & aman</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Truck className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Pengiriman Cepat</h4>
                  <p className="text-sm text-gray-500">2-3 hari kerja</p>
                </div>
              </div>
            </div>

            {!isAlbumBag && !isFlashdisk && !isWeddingBook && !isWallDecor && (
              <div className="space-y-4">
                <QuantitySelector />
                <a
                  href={createWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn btn-primary"
                >
                  Pesan Sekarang
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;