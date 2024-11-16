import React from 'react';
import { Product } from '../types/product';
import { ProductCard } from './ProductCard';

interface SimilarProductsProps {
  currentProduct: Product;
  products: Product[];
}

export const SimilarProducts: React.FC<SimilarProductsProps> = ({ currentProduct, products }) => {
  const similarProducts = products
    .filter(
      (product) =>
        product.id !== currentProduct.id &&
        product.materials.some((material) => currentProduct.materials.includes(material))
    )
    .slice(0, 3);

  if (similarProducts.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Benzer Ürünler</h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {similarProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};