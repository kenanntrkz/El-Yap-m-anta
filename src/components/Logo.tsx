import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <ShoppingBag className="w-8 h-8 text-primary-800" strokeWidth={1.5} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[8px] font-semibold text-primary-800 mt-1">BK</span>
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-lg font-display text-primary-900">El Yapımı Çanta</span>
        <span className="text-sm font-serif italic text-primary-700">by Beyhan Kılıçarslan</span>
      </div>
    </Link>
  );
};