import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.stockQuantity > 0) {
      addToCart(product.id);
      toast.success('Ürün sepete eklendi');
    } else {
      toast.error('Ürün stokta yok');
    }
  };

  return (
    <div className="group relative">
      <Link to={`/urun/${product.id}`}>
        <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
          />
          <div className="absolute top-4 right-4 space-y-2">
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 shadow-md hover:bg-white transition-colors">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 shadow-md hover:bg-white transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
          <div className="mt-1 flex items-center justify-between">
            <p className="text-xl font-semibold text-gray-900">
              {product.price.toLocaleString('tr-TR')} ₺
            </p>
            <div className="flex flex-col items-end">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                product.stockQuantity > 0
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.stockQuantity > 0 ? `${product.stockQuantity} adet` : 'Tükendi'}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};