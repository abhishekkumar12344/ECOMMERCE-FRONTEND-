import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Menu, X, User, Package, LogOut, Settings, ChevronDown } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); setDropdownOpen(false); };
  const isActive = (path) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <div className="logo-icon-wrap">🌿</div>
          <div className="logo-text">
            <span className="logo-main">Prem Parth</span>
            <span className="logo-sub">Enterprises</span>
          </div>
        </Link>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {[['/', 'Home'], ['/products', 'Products'], ['/services', 'Services'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, label]) => (
            <Link key={to} to={to} className={isActive(to) ? 'active' : ''} onClick={() => setMenuOpen(false)}>{label}</Link>
          ))}
        </div>

        <div className="nav-actions">
          <Link to="/cart" className="cart-btn">
            <ShoppingCart size={20} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          {user ? (
            <div className="user-menu">
              <button className="user-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <div className="user-avatar">{user.name?.charAt(0).toUpperCase()}</div>
                <span className="user-name">{user.name.split(' ')[0]}</span>
                <ChevronDown size={13} />
              </button>
              {dropdownOpen && (
                <div className="dropdown">
                  <div className="dropdown-header">
                    <strong>{user.name}</strong>
                    <small>{user.email}</small>
                  </div>
                  <Link to="/profile" onClick={() => setDropdownOpen(false)}><User size={15} /> My Profile</Link>
                  <Link to="/my-orders" onClick={() => setDropdownOpen(false)}><Package size={15} /> My Orders</Link>
                  {isAdmin && <Link to="/admin" onClick={() => setDropdownOpen(false)}><Settings size={15} /> Admin Panel</Link>}
                  <button onClick={handleLogout} className="logout-btn"><LogOut size={15} /> Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-btns">
              <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
            </div>
          )}

          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {dropdownOpen && <div className="overlay" onClick={() => setDropdownOpen(false)} />}
    </nav>
  );
}
