import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import toast from 'react-hot-toast';
import { Copy } from 'lucide-react';

const BANK_ACCOUNTS = [
  {
    bank: 'Ziraat Bankası',
    branch: 'Kadıköy Şubesi',
    accountHolder: 'El Yapımı Çanta Ltd. Şti.',
    iban: 'TR33 0006 1005 1978 6457 8413 26',
  },
  {
    bank: 'İş Bankası',
    branch: 'Moda Şubesi',
    accountHolder: 'El Yapımı Çanta Ltd. Şti.',
    iban: 'TR66 0006 4000 0011 2345 6789 00',
  }
];

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { products } = useProducts();

  // Sipariş numarası oluştur: Tarih + Random sayı
  const orderNumber = `BK${new Date().getTime().toString().slice(-6)}${Math.floor(Math.random() * 1000)}`;

  const cartItems = cart.items.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId)!,
  }));

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 30;
  const total = subtotal + shipping;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('IBAN kopyalandı');
  };

  const handleOrderComplete = () => {
    clearCart();
    toast.success('Siparişiniz alındı! Ödemenizi aldıktan sonra kargoya vereceğiz.');
    navigate('/');
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <p className="text-xl text-gray-600 mb-4">Sepetiniz boş</p>
        <button
          onClick={() => navigate('/')}
          className="text-gray-900 hover:text-gray-700 font-medium"
        >
          Alışverişe Devam Et
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sipariş Numaranız</h3>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <span className="font-mono text-lg font-medium text-gray-900">{orderNumber}</span>
                <button
                  onClick={() => copyToClipboard(orderNumber)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Lütfen ödeme yaparken açıklama kısmına bu sipariş numarasını yazmayı unutmayın.
              </p>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Havale/EFT Bilgileri
            </h2>
            <p className="mt-2 text-gray-600">
              Siparişinizi tamamlamak için aşağıdaki banka hesaplarından birine ödeme yapabilirsiniz.
            </p>

            <div className="mt-6 space-y-6">
              {BANK_ACCOUNTS.map((account, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                >
                  <h3 className="font-semibold text-gray-900">{account.bank}</h3>
                  <dl className="mt-3 space-y-1">
                    <div className="text-sm text-gray-600">
                      <dt className="inline">Şube: </dt>
                      <dd className="inline">{account.branch}</dd>
                    </div>
                    <div className="text-sm text-gray-600">
                      <dt className="inline">Hesap Sahibi: </dt>
                      <dd className="inline">{account.accountHolder}</dd>
                    </div>
                    <div className="text-sm text-gray-900 mt-2 flex items-center justify-between">
                      <span className="font-mono">{account.iban}</span>
                      <button
                        onClick={() => copyToClipboard(account.iban)}
                        className="p-2 text-gray-500 hover:text-gray-700"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </dl>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button
                onClick={handleOrderComplete}
                className="w-full rounded-md bg-gray-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
              >
                Siparişi Tamamla
              </button>
              <p className="mt-2 text-sm text-gray-500 text-center">
                Ödemenizi aldıktan sonra siparişiniz hazırlanacaktır.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Sipariş Özeti</h3>

            <div className="mt-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex items-center gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {item.product.name}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.quantity} adet
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {(item.product.price * item.quantity).toLocaleString('tr-TR')} ₺
                  </p>
                </div>
              ))}
            </div>

            <dl className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Ara Toplam</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {subtotal.toLocaleString('tr-TR')} ₺
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Kargo</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {shipping === 0 ? 'Ücretsiz' : `${shipping.toLocaleString('tr-TR')} ₺`}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Toplam</dt>
                <dd className="text-base font-medium text-gray-900">
                  {total.toLocaleString('tr-TR')} ₺
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};