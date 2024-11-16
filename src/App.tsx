import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetail } from './pages/ProductDetail';
import { AdminPanel } from './pages/AdminPanel';
import { AdminProductEdit } from './pages/AdminProductEdit';
import { LoginPage } from './pages/LoginPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LegalPage } from './pages/LegalPages';
import { SplashScreen } from './components/SplashScreen';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import { CampaignProvider } from './context/CampaignContext';

const AdminAccessCheck: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && e.key === 'A') {
        navigate('/login');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  useEffect(() => {
    if (location.pathname.startsWith('/admin') && !isAdmin) {
      navigate('/');
    }
  }, [location, isAdmin, navigate]);

  return null;
};

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <OrderProvider>
            <CampaignProvider>
              <BrowserRouter>
                {showSplash ? (
                  <SplashScreen onComplete={() => setShowSplash(false)} />
                ) : (
                  <div className="min-h-screen bg-white flex flex-col">
                    <AdminAccessCheck />
                    <Navbar />
                    <main className="flex-1">
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/urunler" element={<ProductsPage />} />
                        <Route path="/urun/:id" element={<ProductDetail />} />
                        <Route path="/iletisim" element={<ContactPage />} />
                        <Route path="/odeme" element={<CheckoutPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/legal/:page" element={<LegalPage />} />
                        <Route
                          path="/admin"
                          element={
                            <ProtectedRoute>
                              <AdminPanel />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/admin/urun/ekle"
                          element={
                            <ProtectedRoute>
                              <AdminProductEdit />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/admin/urun/:id"
                          element={
                            <ProtectedRoute>
                              <AdminProductEdit />
                            </ProtectedRoute>
                          }
                        />
                      </Routes>
                    </main>
                    <Footer />
                    <Toaster position="top-right" />
                  </div>
                )}
              </BrowserRouter>
            </CampaignProvider>
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;