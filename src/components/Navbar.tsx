import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CartDrawer } from './CartDrawer';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();
  const { isAdmin, logout } = useAuth();

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Logo />
            
            <div className="hidden md:flex items-center justify-center space-x-8">
              <Link
                to="/"
                className="text-base font-display text-gray-700 hover:text-primary-800 transition-colors"
              >
                Ana Sayfa
              </Link>
              <Link
                to="/urunler"
                className="text-base font-display text-gray-700 hover:text-primary-800 transition-colors"
              >
                Ürünler
              </Link>
              <Link
                to="/iletisim"
                className="text-base font-display text-gray-700 hover:text-primary-800 transition-colors"
              >
                İletişim
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              {isAdmin && (
                <button
                  onClick={logout}
                  className="text-sm font-medium text-primary-700 hover:text-primary-900"
                >
                  Çıkış Yap
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(true)}
                className="text-primary-600 hover:text-primary-800 relative transition-colors"
              >
                <ShoppingBag className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary-700 text-white text-xs flex items-center justify-center font-body">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};