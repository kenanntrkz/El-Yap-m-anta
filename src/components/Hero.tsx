import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=2000"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="relative">
        <div className="max-w-7xl mx-auto py-32 px-4 sm:py-40 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-display tracking-tight text-white sm:text-5xl lg:text-6xl">
            El Yapımı Çantalar
          </h1>
          <p className="mt-6 max-w-xl text-xl font-body text-gray-100">
            Her biri özenle tasarlanan ve el işçiliğiyle üretilen benzersiz çantalar. 
            Kalite ve estetiği bir arada sunan koleksiyonumuzu keşfedin.
          </p>
          <div className="mt-10 flex gap-4">
            <Link
              to="/urunler"
              className="inline-flex items-center rounded-md bg-primary-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-800 transition-colors"
            >
              Koleksiyonu Keşfet
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/iletisim"
              className="inline-flex items-center rounded-md border border-white px-6 py-3 text-base font-medium text-white hover:bg-white/10 transition-colors"
            >
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};