import React from 'react';
import { useParams } from 'react-router-dom';

const legalContent = {
  privacy: {
    title: 'Gizlilik Politikası',
    content: `
      Gizlilik ve Veri Koruma Politikası

      1. Kişisel Verilerin Korunması
      - Müşterilerimizin kişisel verilerinin güvenliği bizim için önceliklidir.
      - Verileriniz 6698 sayılı KVKK kapsamında korunmaktadır.
      - Toplanan veriler: Ad-soyad, e-posta, telefon, adres bilgileri.

      2. Veri Kullanımı
      - Sipariş işlemlerinin gerçekleştirilmesi
      - Ürün ve hizmet bilgilendirmeleri
      - Yasal yükümlülüklerin yerine getirilmesi

      3. Çerez Politikası
      - Sitemizdeki deneyiminizi iyileştirmek için çerezler kullanılmaktadır.
      - Çerezler: Oturum bilgileri, tercihler, analitik veriler.
    `
  },
  terms: {
    title: 'Kullanım Koşulları',
    content: `
      Kullanım Koşulları

      1. Genel Hükümler
      - Site kullanımı Türkiye Cumhuriyeti yasalarına tabidir.
      - 18 yaş altı kullanıcılar veli/vasi izni olmadan alışveriş yapamaz.

      2. Fikri Mülkiyet
      - Sitedeki tüm içerik telif hakkı ile korunmaktadır.
      - İzinsiz kullanım yasal işlem gerektirir.

      3. Sorumluluk Reddi
      - Ürün görselleri temsilidir.
      - Fiyat ve stok bilgilerinde değişiklik hakkı saklıdır.
    `
  },
  returns: {
    title: 'İade ve Değişim',
    content: `
      İade ve Değişim Politikası

      1. İade Koşulları
      - 14 gün içinde iade hakkı
      - Ürün kullanılmamış ve orijinal ambalajında olmalı
      - Fatura ile birlikte iade edilmeli

      2. İade Süreci
      - İade talebini iletişim formundan bildirin
      - Onay sonrası kargo ile gönderim
      - 3 iş günü içinde ücret iadesi

      3. Değişim
      - Beden/renk değişimi için 30 gün süre
      - Stok durumuna göre değişim yapılır
    `
  },
  shipping: {
    title: 'Teslimat Bilgileri',
    content: `
      Kargo ve Teslimat Bilgileri

      1. Teslimat Süreleri
      - Stokta olan ürünler 1-3 iş günü içinde kargoya verilir
      - Teslimat süresi 2-4 iş günüdür
      - Cumartesi teslimat yapılmaktadır

      2. Kargo Ücretleri
      - 500 TL üzeri alışverişlerde kargo ücretsiz
      - Standart kargo ücreti: 30 TL
      - Kapıda ödeme ücreti: +10 TL

      3. Teslimat Alanları
      - Türkiye'nin tüm illerine teslimat yapılmaktadır
      - Bazı kırsal bölgelerde ek süre gerekebilir
    `
  },
  faq: {
    title: 'Sıkça Sorulan Sorular',
    content: `
      Sıkça Sorulan Sorular

      1. Sipariş ve Ödeme
      S: Hangi ödeme yöntemlerini kullanabilirim?
      C: Kredi kartı, havale/EFT ve kapıda ödeme seçenekleri mevcuttur.

      S: Siparişimi nasıl takip edebilirim?
      C: Hesabınızdan veya size gönderilen takip numarası ile kontrol edebilirsiniz.

      2. İade ve Değişim
      S: İade için ne kadar sürem var?
      C: Ürünü teslim aldıktan sonra 14 gün içinde iade edebilirsiniz.

      S: Ürün değişimi nasıl yapılıyor?
      C: İletişim formundan değişim talebinde bulunabilirsiniz.

      3. Teslimat
      S: Kargo ücreti ne kadar?
      C: 500 TL üzeri alışverişlerde ücretsiz, altında 30 TL'dir.

      S: Ne zaman teslim alabilirim?
      C: Siparişiniz 1-3 iş günü içinde kargoya verilir, 2-4 iş günü içinde teslim edilir.
    `
  }
};

export const LegalPage: React.FC = () => {
  const { page } = useParams<{ page: keyof typeof legalContent }>();
  const content = page ? legalContent[page] : null;

  if (!content) {
    return <div>Sayfa bulunamadı</div>;
  }

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{content.title}</h1>
        <div className="prose prose-gray max-w-none">
          {content.content.split('\n').map((line, index) => (
            <p key={index} className="whitespace-pre-wrap">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};