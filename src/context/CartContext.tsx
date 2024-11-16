import React, { createContext, useContext, useState } from 'react';
import { CartItem, Cart } from '../types/cart';

interface CartContextType {
  cart: Cart;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({ items: [] });

  const addToCart = (productId: string) => {
    setCart(prev => {
      const existingItem = prev.items.find(item => item.productId === productId);
      if (existingItem) {
        return {
          items: prev.items.map(item =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { items: [...prev.items, { productId, quantity: 1 }] };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => ({
      items: prev.items.filter(item => item.productId !== productId),
    }));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => ({
      items: prev.items.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    }));
  };

  const clearCart = () => {
    setCart({ items: [] });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};