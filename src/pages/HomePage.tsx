import React from 'react';
import { Hero } from '../components/Hero';
import { FeaturedProducts } from '../components/FeaturedProducts';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};