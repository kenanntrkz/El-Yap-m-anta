import React, { useState } from 'react';
import { Edit, Plus, Trash } from 'lucide-react';
import { useCampaigns } from '../context/CampaignContext';
import { Campaign, Coupon, DiscountType } from '../types/campaign';
import toast from 'react-hot-toast';

export const CampaignManagement: React.FC = () => {
  const { campaigns, coupons, addCampaign, updateCampaign, deleteCampaign, addCoupon, updateCoupon, deleteCoupon } = useCampaigns();
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [showCouponForm, setShowCouponForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  const [campaignForm, setCampaignForm] = useState<Omit<Campaign, 'id'>>({
    name: '',
    description: '',
    discountType: 'percentage',
    discountValue: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    active: true
  });

  const [couponForm, setCouponForm] = useState<Omit<Coupon, 'id'>>({
    code: '',
    discountType: 'percentage',
    discountValue: 0,
    minimumPurchase: 0,
    usageLimit: 100,
    usedCount: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    active: true
  });

  const handleCampaignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCampaign) {
      updateCampaign(editingCampaign.id, campaignForm);
      toast.success('Kampanya güncellendi');
    } else {
      addCampaign(campaignForm);
      toast.success('Kampanya oluşturuldu');
    }
    setShowCampaignForm(false);
    setEditingCampaign(null);
    setCampaignForm({
      name: '',
      description: '',
      discountType: 'percentage',
      discountValue: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      active: true
    });
  };

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCoupon) {
      updateCoupon(editingCoupon.id, couponForm);
      toast.success('Kupon güncellendi');
    } else {
      addCoupon(couponForm);
      toast.success('Kupon oluşturuldu');
    }
    setShowCouponForm(false);
    setEditingCoupon(null);
    setCouponForm({
      code: '',
      discountType: 'percentage',
      discountValue: 0,
      minimumPurchase: 0,
      usageLimit: 100,
      usedCount: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      active: true
    });
  };

  return (
    <div className="space-y-8">
      {/* Campaigns Section */}
      <div>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h2 className="text-xl font-semibold text-gray-900">Kampanyalar</h2>
            <p className="mt-2 text-sm text-gray-700">
              Tüm aktif ve pasif kampanyaları buradan yönetebilirsiniz.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={() => {
                setEditingCampaign(null);
                setCampaignForm({
                  name: '',
                  description: '',
                  discountType: 'percentage',
                  discountValue: 0,
                  startDate: new Date().toISOString().split('T')[0],
                  endDate: new Date().toISOString().split('T')[0],
                  active: true
                });
                setShowCampaignForm(true);
              }}
              className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              <Plus className="w-4 h-4 mr-2" />
              Yeni Kampanya
            </button>
          </div>
        </div>

        {showCampaignForm && (
          <form onSubmit={handleCampaignSubmit} className="mt-6 space-y-4 bg-white p-6 rounded-lg shadow">
            <div>
              <label className="block text-sm font-medium text-gray-700">Kampanya Adı</label>
              <input
                type="text"
                value={campaignForm.name}
                onChange={(e) => setCampaignForm(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Açıklama</label>
              <textarea
                value={campaignForm.description}
                onChange={(e) => setCampaignForm(prev => ({ ...prev, description: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">İndirim Tipi</label>
                <select
                  value={campaignForm.discountType}
                  onChange={(e) => setCampaignForm(prev => ({ ...prev, discountType: e.target.value as DiscountType }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                >
                  <option value="percentage">Yüzde</option>
                  <option value="fixed">Sabit Tutar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">İndirim Değeri</label>
                <input
                  type="number"
                  value={campaignForm.discountValue}
                  onChange={(e) => setCampaignForm(prev => ({ ...prev, discountValue: Number(e.target.value) }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                  required
                  min="0"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Başlangıç Tarihi</label>
                <input
                  type="date"
                  value={campaignForm.startDate}
                  onChange={(e) => setCampaignForm(prev => ({ ...prev, startDate: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bitiş Tarihi</label>
                <input
                  type="date"
                  value={campaignForm.endDate}
                  onChange={(e) => setCampaignForm(prev => ({ ...prev, endDate: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                  required
                />
              </div>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={campaignForm.active}
                  onChange={(e) => setCampaignForm(prev => ({ ...prev, active: e.target.checked }))}
                  className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                />
                <span className="ml-2 text-sm text-gray-700">Aktif</span>
              </label>
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowCampaignForm(false);
                  setEditingCampaign(null);
                }}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                type="submit"
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                {editingCampaign ? 'Güncelle' : 'Oluştur'}
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                  Kampanya
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  İndirim
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Tarih Aralığı
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
              {campaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="py-4 pl-4 pr-3">
                    <div className="font-medium text-gray-900">{campaign.name}</div>
                    <div className="text-sm text-gray-500">{campaign.description}</div>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {campaign.discountType === 'percentage'
                      ? `%${campaign.discountValue}`
                      : `${campaign.discountValue} ₺`}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {new Date(campaign.startDate).toLocaleDateString('tr-TR')} -
                    {new Date(campaign.endDate).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-3 py-4 text-sm">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      campaign.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {campaign.active ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingCampaign(campaign);
                          setCampaignForm(campaign);
                          setShowCampaignForm(true);
                        }}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Bu kampanyayı silmek istediğinize emin misiniz?')) {
                            deleteCampaign(campaign.id);
                            toast.success('Kampanya silindi');
                          }
                        }}
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

      {/* Coupons Section */}
      <div>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h2 className="text-xl font-semibold text-gray-900">Kuponlar</h2>
            <p className="mt-2 text-sm text-gray-700">
              İndirim kuponlarını buradan yönetebilirsiniz.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={() => {
                setEditingCoupon(null);
                setCouponForm({
                  code: '',
                  discountType: 'percentage',
                  discountValue: 0,
                  minimumPurchase: 0,
                  usageLimit: 100,
                  usedCount: 0,
                  startDate: new Date().toISOString().split('T')[0],
                  endDate: new Date().toISOString().split('T')[0],
                  active: true
                });
                setShowCouponForm(true);
              }}
              className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              <Plus className="w-4 h-4 mr-2" />
              Yeni Kupon
            </button>
          </div>
        </div>

        {showCouponForm && (
          <form onSubmit={handleCouponSubmit} className="mt-6 space-y-4 bg-white p-6 rounded-lg shadow">
            <div>
              <label className="block text-sm font-medium text-gray-700">Kupon Kodu</label>
              <input
                type="text"
                value={couponForm.code}
                onChange={(e) => setCouponForm(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">İndirim Tipi</label>
                <select
                  value={couponForm.discountType}
                  onChange={(e) => setCouponForm(prev => ({ ...prev, discountType: e.target.value as DiscountType }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                >
                  <option value="percentage">Yüzde</option>
                  <option value="fixed">Sabit Tutar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">İndirim Değeri</label>
                <input
                  type="number"
                  value={couponForm.discountValue}
                  onChange={(e) => setCouponForm(prev => ({ ...prev, discountValue: Number(e.target.value) }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                  required
                  min="0"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Minimum Sepet Tutarı</label>
                <input
                  type="number"
                  value={couponForm.minimumPurchase}
                  onChange={(e) => setCouponForm(prev => ({ ...prev, minimumPurchase: Number(e.target.value) }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Kullanım Limiti</label>
                <input
                  type="number"
                  value={couponForm.usageLimit}
                  onChange={(e) => setCouponForm(prev => ({ ...prev, usageLimit: Number(e.target.value) }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                  required
                  min="1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Başlangıç Tarihi</label>
                <input
                  type="date"
                  value={couponForm.startDate}
                  onChange={(e) => setCouponForm(prev => ({ ...prev, startDate: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bitiş Tarihi</label>
                <input
                  type="date"
                  value={couponForm.endDate}
                  onChange={(e) => setCouponForm(prev => ({ ...prev, endDate: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                  required
                />
              </div>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={couponForm.active}
                  onChange={(e) => setCouponForm(prev => ({ ...prev, active: e.target.checked }))}
                  className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                />
                <span className="ml-2 text-sm text-gray-700">Aktif</span>
              </label>
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowCouponForm(false);
                  setEditingCoupon(null);
                }}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                type="submit"
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                {editingCoupon ? 'Güncelle' : 'Oluştur'}
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                  Kupon Kodu
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  İndirim
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Kullanım
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
              {coupons.map((coupon) => (
                <tr key={coupon.id}>
                  <td className="py-4 pl-4 pr-3">
                    <div className="font-mono font-medium text-gray-900">{coupon.code}</div>
                    {coupon.minimumPurchase && (
                      <div className="text-sm text-gray-500">
                        Min. {coupon.minimumPurchase} ₺
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {coupon.discountType === 'percentage'
                      ? `%${coupon.discountValue}`
                      : `${coupon.discountValue} ₺`}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {coupon.usedCount} / {coupon.usageLimit}
                  </td>
                  <td className="px-3 py-4 text-sm">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      coupon.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {coupon.active ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingCoupon(coupon);
                          setCouponForm(coupon);
                          setShowCouponForm(true);
                        }}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Bu kuponu silmek istediğinize emin misiniz?')) {
                            deleteCoupon(coupon.id);
                            toast.success('Kupon silindi');
                          }
                        }}
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
    </div>
  );
};