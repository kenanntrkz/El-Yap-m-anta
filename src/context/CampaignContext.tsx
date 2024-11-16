import React, { createContext, useContext, useState } from 'react';
import { Campaign, Coupon } from '../types/campaign';

interface CampaignContextType {
  campaigns: Campaign[];
  coupons: Coupon[];
  addCampaign: (campaign: Omit<Campaign, 'id'>) => void;
  updateCampaign: (id: string, campaign: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  updateCoupon: (id: string, coupon: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;
  validateCoupon: (code: string, total: number) => { valid: boolean; discount: number } | null;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Bahar İndirimi',
      description: 'Tüm çantalarda %20 indirim',
      discountType: 'percentage',
      discountValue: 20,
      startDate: '2024-03-01T00:00:00Z',
      endDate: '2024-03-31T23:59:59Z',
      active: true
    }
  ]);

  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: '1',
      code: 'HOSGELDIN',
      discountType: 'percentage',
      discountValue: 10,
      minimumPurchase: 500,
      usageLimit: 100,
      usedCount: 0,
      startDate: '2024-01-01T00:00:00Z',
      endDate: '2024-12-31T23:59:59Z',
      active: true
    }
  ]);

  const addCampaign = (campaign: Omit<Campaign, 'id'>) => {
    const newCampaign = {
      ...campaign,
      id: Math.random().toString(36).substr(2, 9)
    };
    setCampaigns(prev => [...prev, newCampaign]);
  };

  const updateCampaign = (id: string, campaign: Partial<Campaign>) => {
    setCampaigns(prev =>
      prev.map(c => (c.id === id ? { ...c, ...campaign } : c))
    );
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
  };

  const addCoupon = (coupon: Omit<Coupon, 'id'>) => {
    const newCoupon = {
      ...coupon,
      id: Math.random().toString(36).substr(2, 9)
    };
    setCoupons(prev => [...prev, newCoupon]);
  };

  const updateCoupon = (id: string, coupon: Partial<Coupon>) => {
    setCoupons(prev =>
      prev.map(c => (c.id === id ? { ...c, ...coupon } : c))
    );
  };

  const deleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
  };

  const validateCoupon = (code: string, total: number) => {
    const coupon = coupons.find(
      c => 
        c.code === code && 
        c.active && 
        c.usedCount < c.usageLimit &&
        new Date(c.startDate) <= new Date() &&
        new Date(c.endDate) >= new Date() &&
        (!c.minimumPurchase || total >= c.minimumPurchase)
    );

    if (!coupon) return null;

    const discount = coupon.discountType === 'percentage'
      ? (total * coupon.discountValue) / 100
      : coupon.discountValue;

    return { valid: true, discount };
  };

  return (
    <CampaignContext.Provider 
      value={{ 
        campaigns, 
        coupons, 
        addCampaign, 
        updateCampaign, 
        deleteCampaign,
        addCoupon,
        updateCoupon,
        deleteCoupon,
        validateCoupon
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaigns = () => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaigns must be used within a CampaignProvider');
  }
  return context;
};