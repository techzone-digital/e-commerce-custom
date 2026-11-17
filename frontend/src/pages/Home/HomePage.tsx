import React from 'react';
import { HeroSection } from './sections/HeroSection';
import { CategorySection } from './sections/CategorySection';
import { FeaturedCollections } from './sections/FeaturedCollections';
import { FeaturedProducts } from './sections/FeaturedProducts';
import { CustomJewellerySection } from './sections/CustomJewellerySection';
import { WhyChooseUs } from './sections/WhyChooseUs';

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedCollections />
      <FeaturedProducts />
      <CustomJewellerySection />
      <WhyChooseUs />
    </>
  );
};

export default HomePage;

