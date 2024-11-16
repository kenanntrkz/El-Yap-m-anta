import React, { useState, useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { ProductFilters } from '../components/ProductFilters';

export const ProductsPage: React.FC = () => {
  const { products } = useProducts();
  const [filters, setFilters] = useState({
    search: '',
    priceRange: [0, Infinity] as [number, number],
    materials: [] as string[],
  });

  // Tüm malzemeleri topla
  const allMaterials = useMemo(() => {
    const materialsSet = new Set<string>();
    products.forEach(product => {
      product.materials.forEach(material => materialsSet.add(material));
    });
    return Array.from(materialsSet);
  }, [products]);

  // Filtrelenmiş ürünler
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesPrice = product.price >= filters.priceRange[0] &&
        (filters.priceRange[1] === Infinity || product.price <= filters.priceRange[1]);
      
      const matchesMaterials = filters.materials.length === 0 ||
        product.materials.some(material => filters.materials.includes(material));

      return matchesSearch && matchesPrice && matchesMaterials;
    });
  }, [products, filters]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="border-b border-gray-200 pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Tüm Ürünler</h1>
          <p className="mt-4 text-base text-gray-500">
            El yapımı çantalarımızın tamamını burada bulabilirsiniz.
          </p>
        </div>

        <ProductFilters
          materials={allMaterials}
          onFilterChange={setFilters}
        />

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">
              Aradığınız kriterlere uygun ürün bulunamadı.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};