import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import PromoBanner from '../components/home/PromoBanner';
import TestimonialSection from '../components/home/TestimonialSection';

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <PromoBanner />
      <TestimonialSection />
    </div>
  );
};

export default Home;
