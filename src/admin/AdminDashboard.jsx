import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI, userAPI } from '../utils/api';
import { TrendingUp, Package, Users, ShoppingCart, ArrowRight, Clock } from 'lucide-react';

const statCard = (icon, label, value, sub, color) => (
  <div style={{ background: 'white', borderRadius: 'var(--radius)', padding: '24px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <div style={{ color: 'var(--muted)', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>{label}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>{value}</div>
        {sub && <div style={{ color: 'var(--muted)', fontSize: '0.8rem', marginTop: '8px' }}>{sub}</div>}
      </div>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {React.createElement(icon, { size: 22, color })}
      </div>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([orderAPI.getStats().catch(() => null), userAPI.getDashboardStats().catch(() => null)])
      .then(([orderStats, userStats]) => {
        setStats({ orders: orderStats?.data, users: userStats?.data });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-page"><div className="spinner spinner-dark" style={{ width: 36, height: 36 }} /></div>;

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700 }}>Dashboard</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '4px' }}>Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px', marginBottom: '28px' }}>
        {statCard(ShoppingCart, 'Total Orders', stats?.orders?.totalOrders ?? '—', 'All time', 'var(--gold)')}
        {statCard(TrendingUp, 'Total Revenue', stats?.orders?.totalRevenue ? `₹${Math.round(stats.orders.totalRevenue).toLocaleString()}` : '—', 'All time', 'var(--forest)')}
        {statCard(Package, 'Pending Orders', stats?.orders?.pendingOrders ?? '—', 'Need attention', '#F59E0B')}
        {statCard(Users, 'Total Users', stats?.users?.totalUsers ?? '—', 'Registered', '#3B82F6')}
      </div>

      {/* Quick links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {[
          { to: '/admin/orders', icon: ShoppingCart, label: 'Manage Orders', desc: 'View and update order statuses', color: 'var(--gold)' },
          { to: '/admin/products', icon: Package, label: 'Manage Products', desc: 'Add, edit or remove products', color: 'var(--forest)' },
          { to: '/admin/users', icon: Users, label: 'Manage Users', desc: 'View customer accounts', color: '#3B82F6' },
          { to: '/admin/messages', icon: Clock, label: 'Messages', desc: 'View customer inquiries', color: '#8B5CF6' },
        ].map((item, i) => (
          <Link key={i} to={item.to} style={{ background: 'white', borderRadius: 'var(--radius)', padding: '22px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '16px', transition: 'all 0.2s', boxShadow: 'var(--shadow-sm)', textDecoration: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = item.color + '80'; e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: item.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <item.icon size={22} color={item.color} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)' }}>{item.label}</div>
              <div style={{ color: 'var(--muted)', fontSize: '0.8rem', marginTop: '3px' }}>{item.desc}</div>
            </div>
            <ArrowRight size={16} color="var(--muted-light)" />
          </Link>
        ))}
      </div>
    </div>
  );
}
