import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { ProductDimensions } from '../components/ProductDimensions';
import { ProductReviews } from '../components/ProductReviews';
import { SimilarProducts } from '../components/SimilarProducts';
import { SocialShare } from '../components/SocialShare';

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === id);
  const [currentImage, setCurrentImage] = React.useState(0);

  // Örnek yorumlar - gerçek uygulamada bir API'den gelecek
  const [reviews, setReviews] = React.useState([
    {
      id: '1',
      userName: 'Ayşe Y.',
      rating: 5,
      comment: 'Harika bir çanta! Kalitesi ve işçiliği muhteşem.',
      date: '2024-03-15'
    }
  ]);

  const handleAddReview = (review: any) => {
    const newReview = {
      ...review,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString()
    };
    setReviews(prev => [...prev, newReview]);
  };

  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <p className="text-xl text-gray-600 mb-4">Ürün bulunamadı</p>
        <button
          onClick={() => navigate('/')}
          className="text-gray-900 hover:text-gray-700 font-medium"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={product.images[currentImage]}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            {product.images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <button
                  onClick={() => setCurrentImage(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="rounded-full bg-white/80 p-2 hover:bg-white"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setCurrentImage(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="rounded-full bg-white/80 p-2 hover:bg-white"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`aspect-square rounded-lg overflow-hidden ${
                  currentImage === index ? 'ring-2 ring-black' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} - Görsel ${index + 1}`}
                  className="h-full w-full object-cover object-center"
                />
              </button>
            ))}
          </div>

          <ProductDimensions
            width={product.dimensions.width}
            height={product.dimensions.height}
            depth={product.dimensions.depth}
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-4 text-2xl font-semibold text-gray-900">
            {product.price.toLocaleString('tr-TR')} ₺
          </p>

          <div className="mt-6 space-y-6">
            <p className="text-base text-gray-700">{product.description}</p>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900">Malzemeler</h3>
              <div className="mt-2">
                <ul className="list-disc list-inside text-gray-700">
                  {product.materials.map((material, index) => (
                    <li key={index}>{material}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-2">
              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                product.inStock
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.inStock ? 'Stokta' : 'Tükendi'}
              </span>
            </div>

            <button
              onClick={() => product.inStock && addToCart(product.id)}
              disabled={!product.inStock}
              className={`w-full py-3 px-6 rounded-md ${
                product.inStock
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2`}
            >
              {product.inStock ? 'Sepete Ekle' : 'Ürün Tükendi'}
            </button>

            <SocialShare
              url={window.location.href}
              title={product.name}
            />
          </div>
        </div>
      </div>

      <ProductReviews
        productId={product.id}
        reviews={reviews}
        onAddReview={handleAddReview}
      />

      <SimilarProducts
        currentProduct={product}
        products={products}
      />
    </div>
  );
};