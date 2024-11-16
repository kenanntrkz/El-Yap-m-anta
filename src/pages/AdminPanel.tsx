import React from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useOrders } from '../context/OrderContext';
import { CampaignManagement } from '../components/CampaignManagement';
import toast from 'react-hot-toast';

export const AdminPanel: React.FC = () => {
  const { products, deleteProduct } = useProducts();
  const { orders, updateOrderStatus, confirmPayment, updateTrackingNumber } = useOrders();

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
      deleteProduct(id);
      toast.success('Ürün başarıyla silindi');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-12">
        {/* Products Section */}
        <div>
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-xl font-semibold text-gray-900">Ürünler</h2>
              <p className="mt-2 text-sm text-gray-700">
                Tüm ürünleri buradan yönetebilirsiniz.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <Link
                to="/admin/urun/ekle"
                className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                <Plus className="w-4 h-4 mr-2" />
                Yeni Ürün
              </Link>
            </div>
          </div>

          <div className="mt-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                    Ürün
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Fiyat
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Stok
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Durum
                  </th>
                  <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">İşlemler</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="py-4 pl-4 pr-3">
                      <div className="flex items-center">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">
                            {product.materials.join(', ')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {product.price.toLocaleString('tr-TR')} ₺
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        product.stockQuantity > 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stockQuantity > 0 ? `${product.stockQuantity} adet` : 'Tükendi'}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        product.featured
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {product.featured ? 'Öne Çıkan' : 'Normal'}
                      </span>
                    </td>
                    <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/urun/${product.id}`}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Orders Section */}
        <div>
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-xl font-semibold text-gray-900">Siparişler</h2>
              <p className="mt-2 text-sm text-gray-700">
                Tüm siparişleri buradan yönetebilirsiniz.
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                    Sipariş No
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Müşteri
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Tutar
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Durum
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Tarih
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-4 pl-4 pr-3">
                      <div className="font-mono text-sm text-gray-900">{order.id}</div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="text-sm text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {order.total.toLocaleString('tr-TR')} ₺
                    </td>
                    <td className="px-3 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className="rounded-md border-gray-300 text-sm focus:border-gray-900 focus:ring-gray-900"
                      >
                        <option value="pending">Beklemede</option>
                        <option value="confirmed">Onaylandı</option>
                        <option value="shipped">Kargoya Verildi</option>
                        <option value="delivered">Teslim Edildi</option>
                        <option value="cancelled">İptal Edildi</option>
                      </select>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Campaign Management */}
        <CampaignManagement />
      </div>
    </div>
  );
};