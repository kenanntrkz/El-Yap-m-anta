import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { Link, useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();

  const cartItems = cart.items.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId)!,
  }));

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    onClose();
    navigate('/odeme');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 flex max-w-full">
        <div className="w-screen max-w-md">
          <div className="flex h-full flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 py-6">
              <h2 className="text-lg font-medium text-gray-900">Sepetim</h2>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                  <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    Sepetiniz boş
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Alışverişe başlamak için ürünleri incelemeye başlayın.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-4">
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.productId} className="flex items-center gap-4">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="h-20 w-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">
                            {item.product.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.product.price.toLocaleString('tr-TR')} ₺
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="rounded-full p-1 text-gray-400 hover:text-gray-500"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-sm text-gray-900">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="rounded-full p-1 text-gray-400 hover:text-gray-500"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Toplam</p>
                    <p>{total.toLocaleString('tr-TR')} ₺</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Kargo ücreti sipariş tamamlanırken eklenecektir.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={handleCheckout}
                      className="w-full rounded-md border border-transparent bg-gray-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
                    >
                      Siparişi Tamamla
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};