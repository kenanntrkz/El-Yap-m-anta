import React from 'react';
import { ProductCard } from './ProductCard';
import { useProducts } from '../context/ProductContext';

export const FeaturedProducts: React.FC = () => {
  const { products } = useProducts();
  const featuredProducts = products.filter(product => product.featured);

  return (
    <section id="products" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
        Öne Çıkan Ürünler
      </h2>
      {featuredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">Henüz öne çıkan ürün bulunmuyor.</p>
      )}
    </section>
  );
};