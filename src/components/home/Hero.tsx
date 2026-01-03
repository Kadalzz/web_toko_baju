import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { HeroSlide } from '../../types';

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: 'Koleksi Terbaru 2025',
    subtitle: 'Tampil Stylish dengan Fashion Terkini. Diskon hingga 50% untuk member baru!',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&h=800&fit=crop',
    cta_text: 'Belanja Sekarang',
    cta_link: '/products'
  },
  {
    id: 2,
    title: 'Exclusive Collection',
    subtitle: 'Premium quality dengan harga terjangkau. Gratis ongkir seluruh Indonesia!',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&h=800&fit=crop',
    cta_text: 'Lihat Koleksi',
    cta_link: '/products?category=exclusive'
  },
  {
    id: 3,
    title: 'Promo Akhir Tahun',
    subtitle: 'Flash Sale! Diskon besar-besaran untuk semua kategori. Jangan sampai kehabisan!',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&h=800&fit=crop',
    cta_text: 'Promo Sekarang',
    cta_link: '/products?sale=true'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="relative h-full container mx-auto px-4 md:px-6 flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-200">
                {slide.subtitle}
              </p>
              <Link
                to={slide.cta_link}
                className="inline-block px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
              >
                {slide.cta_text}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
