import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Package, ShoppingCart, Users, MessageSquare, LogOut, Menu, X, ChevronRight, Bell } from 'lucide-react';

const navItems = [
  { to: '/admin',          icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/products', icon: Package,         label: 'Products' },
  { to: '/admin/orders',   icon: ShoppingCart,    label: 'Orders' },
  { to: '/admin/users',    icon: Users,           label: 'Users' },
  { to: '/admin/messages', icon: MessageSquare,   label: 'Messages' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => { logout(); navigate('/'); };
  const isActive = (to) => to === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(to);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F7F4', fontFamily: 'var(--font-body)' }}>
      {/* Sidebar */}
      <aside style={{ width: sidebarOpen ? 240 : 72, background: 'var(--forest)', color: 'white', display: 'flex', flexDirection: 'column', transition: 'width 0.25s ease', flexShrink: 0, position: 'sticky', top: 0, height: '100vh' }}>
        {/* Logo */}
        <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '12px', minHeight: 70 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.2rem' }}>🌿</div>
          {sidebarOpen && <div style={{ overflow: 'hidden' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--gold-light)', whiteSpace: 'nowrap' }}>Prem Parth</div>
            <div style={{ fontSize: '0.65rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Admin Panel</div>
          </div>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: 4, flexShrink: 0 }}>
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Nav */}
        <nav style={{ padding: '16px 10px', flex: 1 }}>
          {navItems.map(item => (
            <Link key={item.to} to={item.to}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 12px', borderRadius: 10, marginBottom: '4px', color: isActive(item.to) ? 'white' : 'rgba(255,255,255,0.6)', background: isActive(item.to) ? 'rgba(255,255,255,0.15)' : 'transparent', fontWeight: isActive(item.to) ? 700 : 400, transition: 'all 0.18s', fontSize: '0.9rem', textDecoration: 'none', overflow: 'hidden', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { if (!isActive(item.to)) e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { if (!isActive(item.to)) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; } }}>
              <item.icon size={18} style={{ flexShrink: 0 }} />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User + Logout */}
        <div style={{ padding: '14px 10px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {sidebarOpen && <div style={{ padding: '10px 12px', marginBottom: '8px', overflow: 'hidden' }}>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
            <div style={{ fontSize: '0.72rem', opacity: 0.5, marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</div>
          </div>}
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: 10, width: '100%', background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.15s', overflow: 'hidden' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; e.currentTarget.style.color = '#FCA5A5'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}>
            <LogOut size={17} style={{ flexShrink: 0 }} />
            {sidebarOpen && 'Sign Out'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* Top bar */}
        <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '0 28px', height: 65, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', fontSize: '0.85rem' }}>
            <span>Admin</span>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{navItems.find(n => isActive(n.to))?.label || 'Dashboard'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button style={{ width: 38, height: 38, borderRadius: 8, background: 'var(--cream)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Bell size={16} color="var(--muted)" />
            </button>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
        <div style={{ padding: '28px' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
