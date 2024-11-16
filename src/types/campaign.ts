export type DiscountType = 'percentage' | 'fixed';

export interface Campaign {
  id: string;
  name: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  startDate: string;
  endDate: string;
  minimumPurchase?: number;
  productIds?: string[]; // Belirli ürünlere özel kampanya
  active: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  minimumPurchase?: number;
  usageLimit: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  active: boolean;
}