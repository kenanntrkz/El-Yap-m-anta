import React, { createContext, useContext, useState } from 'react';
import { Order, OrderStatus } from '../types/order';

interface OrderContextType {
  orders: Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  confirmPayment: (orderId: string) => void;
  updateTrackingNumber: (orderId: string, trackingNumber: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      customerName: 'Ayşe Yılmaz',
      email: 'ayse@example.com',
      phone: '5551234567',
      address: 'Örnek Mah. Test Sok. No:1 Kadıköy/İstanbul',
      items: [
        { productId: '1', quantity: 1, price: 1250 }
      ],
      total: 1250,
      status: 'pending',
      paymentConfirmed: false,
      createdAt: '2024-03-20T10:00:00Z',
      updatedAt: '2024-03-20T10:00:00Z'
    }
  ]);

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status, updatedAt: new Date().toISOString() }
        : order
    ));
  };

  const confirmPayment = (orderId: string) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId
        ? { ...order, paymentConfirmed: true, updatedAt: new Date().toISOString() }
        : order
    ));
  };

  const updateTrackingNumber = (orderId: string, trackingNumber: string) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId
        ? { ...order, trackingNumber, updatedAt: new Date().toISOString() }
        : order
    ));
  };

  return (
    <OrderContext.Provider value={{ orders, updateOrderStatus, confirmPayment, updateTrackingNumber }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};