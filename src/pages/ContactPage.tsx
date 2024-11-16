import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada form gönderme işlemi yapılacak
    toast.success('Mesajınız başarıyla gönderildi');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">İletişim</h2>
            <p className="mt-4 text-lg text-gray-500">
              Sorularınız veya özel sipariş talepleriniz için bize ulaşın.
            </p>

            <dl className="mt-8 space-y-6">
              <div className="flex gap-4">
                <dt>
                  <Phone className="h-6 w-6 text-gray-400" />
                </dt>
                <dd>
                  <p className="text-sm font-medium text-gray-900">Telefon</p>
                  <p className="mt-1 text-gray-500">+90 (555) 123 45 67</p>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt>
                  <Mail className="h-6 w-6 text-gray-400" />
                </dt>
                <dd>
                  <p className="text-sm font-medium text-gray-900">E-posta</p>
                  <p className="mt-1 text-gray-500">info@elyapimicanta.com</p>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt>
                  <MapPin className="h-6 w-6 text-gray-400" />
                </dt>
                <dd>
                  <p className="text-sm font-medium text-gray-900">Adres</p>
                  <p className="mt-1 text-gray-500">
                    Örnek Mahallesi, Tasarım Sokak No:1<br />
                    Kadıköy, İstanbul
                  </p>
                </dd>
              </div>
            </dl>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Ad Soyad
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-posta
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Konu
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Mesaj
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                required
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-gray-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
            >
              Gönder
              <Send className="ml-2 h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};