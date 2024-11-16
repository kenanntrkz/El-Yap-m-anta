import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo className="text-white [&_*]:text-white [&_span]:text-gray-300" />
            <p className="mt-4 text-base text-gray-300">
              El yapımı çantalarımızla kalite ve estetiği bir araya getiriyoruz. 
              Her ürünümüz özenle tasarlanıp üretilmektedir.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Müşteri Hizmetleri
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/legal/shipping" className="text-base text-gray-300 hover:text-white">
                  Kargo ve Teslimat
                </Link>
              </li>
              <li>
                <Link to="/legal/returns" className="text-base text-gray-300 hover:text-white">
                  İade ve Değişim
                </Link>
              </li>
              <li>
                <Link to="/legal/faq" className="text-base text-gray-300 hover:text-white">
                  Sıkça Sorulan Sorular
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Yasal
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/legal/privacy" className="text-base text-gray-300 hover:text-white">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link to="/legal/terms" className="text-base text-gray-300 hover:text-white">
                  Kullanım Koşulları
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Bizi Takip Edin
            </h3>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                İletişim
              </h3>
              <p className="mt-4 text-base text-gray-300">
                Tel: +90 (555) 123 45 67<br />
                E-posta: info@elyapimicanta.com
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} El Yapımı Çanta. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};