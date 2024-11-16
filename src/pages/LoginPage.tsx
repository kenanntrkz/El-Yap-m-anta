import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertTriangle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin');
    } else {
      setError('Şifre yanlış');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <AlertTriangle className="h-12 w-12 text-gray-900" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Yetkili Erişimi
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Bu sayfa sadece yetkili personel içindir.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Güvenlik Şifresi
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Giriş Yap
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-500 text-center">
          Yetkisiz erişim girişimleri kaydedilmektedir.
        </p>
      </div>
    </div>
  );
};