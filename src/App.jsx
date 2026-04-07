import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import MyOrders from './pages/MyOrders';
import OrderDetail from './pages/OrderDetail';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminProducts from './admin/AdminProducts';
import AdminOrders from './admin/AdminOrders';
import AdminUsers from './admin/AdminUsers';
import AdminMessages from './admin/AdminMessages';
import AdminOrderDetail from './admin/AdminOrderDetail';

const Loading = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--cream)' }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🌿</div>
      <div className="spinner spinner-dark" style={{ width: 36, height: 36, margin: '0 auto' }} />
    </div>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  return user ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  return user?.role === 'admin' ? children : <Navigate to="/" replace />;
};

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main style={{ minHeight: '80vh' }}>{children}</main>
    <Footer />
  </>
);

const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '100px 20px', background: 'var(--cream)', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ fontFamily: 'var(--font-display)', fontSize: '8rem', fontWeight: 700, color: 'var(--border-dark)', lineHeight: 1 }}>404</div>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, marginBottom: '12px', marginTop: '16px' }}>Page Not Found</h2>
    <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>The page you're looking for doesn't exist.</p>
    <a href="/" className="btn btn-primary btn-lg">Go Home</a>
  </div>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/products" element={<PublicLayout><Products /></PublicLayout>} />
      <Route path="/products/:id" element={<PublicLayout><ProductDetail /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
      <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
      <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
      <Route path="/cart" element={<PublicLayout><Cart /></PublicLayout>} />
      <Route path="/checkout" element={<ProtectedRoute><PublicLayout><Checkout /></PublicLayout></ProtectedRoute>} />
      <Route path="/order-success/:id" element={<ProtectedRoute><PublicLayout><OrderSuccess /></PublicLayout></ProtectedRoute>} />
      <Route path="/my-orders" element={<ProtectedRoute><PublicLayout><MyOrders /></PublicLayout></ProtectedRoute>} />
      <Route path="/my-orders/:id" element={<ProtectedRoute><PublicLayout><OrderDetail /></PublicLayout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><PublicLayout><Profile /></PublicLayout></ProtectedRoute>} />
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="orders/:id" element={<AdminOrderDetail />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="messages" element={<AdminMessages />} />
      </Route>
      <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
    </Routes>
  );
}
