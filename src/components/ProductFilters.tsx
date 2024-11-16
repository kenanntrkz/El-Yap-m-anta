import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

interface ProductFiltersProps {
  onFilterChange: (filters: {
    search: string;
    priceRange: [number, number];
    materials: string[];
  }) => void;
  materials: string[];
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({ onFilterChange, materials }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const handleFilterChange = () => {
    onFilterChange({
      search,
      priceRange: [Number(minPrice) || 0, Number(maxPrice) || Infinity],
      materials: selectedMaterials,
    });
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Ürün ara..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleFilterChange();
            }}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-gray-900 focus:border-gray-900"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filtrele
        </button>
      </div>

      {isOpen && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Fiyat Aralığı</h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => {
                    setMinPrice(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full rounded-md border-gray-300 focus:ring-gray-900 focus:border-gray-900"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full rounded-md border-gray-300 focus:ring-gray-900 focus:border-gray-900"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Malzeme</h3>
              <div className="space-y-2">
                {materials.map((material) => (
                  <label key={material} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(material)}
                      onChange={(e) => {
                        const newMaterials = e.target.checked
                          ? [...selectedMaterials, material]
                          : selectedMaterials.filter((m) => m !== material);
                        setSelectedMaterials(newMaterials);
                        handleFilterChange();
                      }}
                      className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                    />
                    <span className="ml-2 text-sm text-gray-700">{material}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};