export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: OrderStatus;
  paymentConfirmed: boolean;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
}