import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Upload, X } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import type { Product } from '../types/product';

export const AdminProductEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct } = useProducts();
  
  const isEditing = !!id;
  const existingProduct = products.find(p => p.id === id);

  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: existingProduct?.name || '',
    description: existingProduct?.description || '',
    price: existingProduct?.price || 0,
    images: existingProduct?.images || [],
    materials: existingProduct?.materials || [],
    dimensions: existingProduct?.dimensions || { width: 0, height: 0, depth: 0 },
    inStock: existingProduct?.inStock ?? true,
    stockQuantity: existingProduct?.stockQuantity || 0,
    featured: existingProduct?.featured ?? false
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, reader.result as string]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Stok miktarı 0'dan büyükse inStock true, değilse false olarak ayarla
    const updatedFormData = {
      ...formData,
      inStock: formData.stockQuantity > 0
    };
    
    if (isEditing && id) {
      updateProduct(id, updatedFormData);
    } else {
      addProduct(updatedFormData);
    }
    
    navigate('/admin');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">
        {isEditing ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ürün Fotoğrafları
            </label>
            <div className="mt-2 grid grid-cols-3 gap-4">
              {formData.images?.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index)
                      }));
                    }}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <label className="relative aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 cursor-pointer">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto w-8 h-8 text-gray-400" />
                  <div className="text-sm text-gray-500">Fotoğraf Ekle</div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ürün Adı
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Açıklama
            </label>
            <textarea
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fiyat (₺)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={e => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stok Adedi
              </label>
              <input
                type="number"
                value={formData.stockQuantity}
                onChange={e => setFormData(prev => ({ ...prev, stockQuantity: Number(e.target.value) }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                required
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Malzemeler (virgülle ayırın)
            </label>
            <input
              type="text"
              value={formData.materials.join(', ')}
              onChange={e => setFormData(prev => ({ 
                ...prev, 
                materials: e.target.value.split(',').map(m => m.trim()).filter(Boolean)
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
              placeholder="Örn: Deri, Metal aksesuar"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Genişlik (cm)
              </label>
              <input
                type="number"
                value={formData.dimensions.width}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  dimensions: { ...prev.dimensions, width: Number(e.target.value) }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                required
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Yükseklik (cm)
              </label>
              <input
                type="number"
                value={formData.dimensions.height}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  dimensions: { ...prev.dimensions, height: Number(e.target.value) }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                required
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Derinlik (cm)
              </label>
              <input
                type="number"
                value={formData.dimensions.depth}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  dimensions: { ...prev.dimensions, depth: Number(e.target.value) }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                required
                min="0"
                step="0.1"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={e => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              <span className="ml-2 text-sm text-gray-700">Öne Çıkan Ürün</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            İptal
          </button>
          <button
            type="submit"
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            {isEditing ? 'Güncelle' : 'Oluştur'}
          </button>
        </div>
      </form>
    </div>
  );
};