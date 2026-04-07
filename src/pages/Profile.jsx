import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { User, Mail, Phone, MapPin, Lock, Save } from 'lucide-react';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', address: user?.address || '' });
  const [pw, setPw] = useState({ current: '', newPw: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);

  const handleProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAPI.updateProfile(form);
      updateUser(res.data.user);
      toast.success('Profile updated!');
    } catch (err) { toast.error(err.response?.data?.message || 'Update failed'); }
    finally { setLoading(false); }
  };

  const handlePw = async (e) => {
    e.preventDefault();
    if (pw.newPw !== pw.confirm) return toast.error('Passwords do not match');
    setPwLoading(true);
    try {
      await authAPI.changePassword({ currentPassword: pw.current, newPassword: pw.newPw });
      toast.success('Password changed!');
      setPw({ current: '', newPw: '', confirm: '' });
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to change password'); }
    finally { setPwLoading(false); }
  };

  return (
    <div style={{ background: 'var(--cream)', minHeight: '80vh' }}>
      <div className="page-hero">
        <div className="page-hero-inner">
          <h1>My Profile</h1>
          <p>Manage your account details and preferences</p>
        </div>
      </div>
      <div className="container" style={{ padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '28px', alignItems: 'start' }}>
          {/* Sidebar */}
          <div className="card" style={{ padding: '28px', textAlign: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '2rem', color: 'white', fontWeight: 700 }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>{user?.name}</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{user?.email}</p>
            <div style={{ marginTop: '16px', padding: '8px 16px', background: 'var(--gold-pale)', borderRadius: 20, display: 'inline-block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--gold-dark)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {user?.role || 'Customer'}
            </div>
          </div>

          {/* Main */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Profile form */}
            <div className="card" style={{ padding: '28px' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '22px', display: 'flex', alignItems: 'center', gap: '9px', color: 'var(--forest)' }}>
                <User size={17} /> Personal Information
              </h3>
              <form onSubmit={handleProfile}>
                <div className="form-row">
                  <div className="form-group"><label><User size={13} style={{ marginRight: 5 }} />Full Name</label><input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required /></div>
                  <div className="form-group"><label><Mail size={13} style={{ marginRight: 5 }} />Email Address</label><input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label><Phone size={13} style={{ marginRight: 5 }} />Phone Number</label><input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} /></div>
                  <div className="form-group"><label><MapPin size={13} style={{ marginRight: 5 }} />Address</label><input value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} /></div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? <><span className="spinner" /> Saving...</> : <><Save size={16} /> Save Changes</>}
                </button>
              </form>
            </div>

            {/* Password form */}
            <div className="card" style={{ padding: '28px' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '22px', display: 'flex', alignItems: 'center', gap: '9px', color: 'var(--forest)' }}>
                <Lock size={17} /> Change Password
              </h3>
              <form onSubmit={handlePw}>
                <div className="form-group"><label>Current Password</label><input type="password" value={pw.current} onChange={e => setPw(p => ({ ...p, current: e.target.value }))} required placeholder="Current password" /></div>
                <div className="form-row">
                  <div className="form-group"><label>New Password</label><input type="password" value={pw.newPw} onChange={e => setPw(p => ({ ...p, newPw: e.target.value }))} required placeholder="Min 6 characters" /></div>
                  <div className="form-group"><label>Confirm New Password</label><input type="password" value={pw.confirm} onChange={e => setPw(p => ({ ...p, confirm: e.target.value }))} required placeholder="Repeat new password" /></div>
                </div>
                <button type="submit" className="btn btn-secondary" disabled={pwLoading}>
                  {pwLoading ? <><span className="spinner" /> Updating...</> : <><Lock size={16} /> Update Password</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.container > div > div{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
