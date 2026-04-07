import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { UserPlus } from 'lucide-react';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return toast.error('Passwords do not match');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password, phone: form.phone, address: form.address });
      toast.success('Account created! Welcome to Prem Parth!');
      navigate('/');
    } catch (err) { toast.error(err.response?.data?.message || 'Registration failed'); }
    finally { setLoading(false); }
  };

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div style={{ minHeight: '88vh', display: 'flex', background: 'var(--cream)' }}>
      {/* Left brand panel */}
      <div style={{ flex: 1, background: 'linear-gradient(150deg, var(--forest) 0%, var(--forest-mid) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px', color: 'white', position: 'relative', overflow: 'hidden' }}
        className="hide-mobile">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 40%, rgba(201,151,58,0.2) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 340 }}>
          <div style={{ fontSize: '4rem', marginBottom: '24px' }}>🌿</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, marginBottom: '16px', lineHeight: 1.2 }}>Join the Prem Parth Family</h2>
          <p style={{ opacity: 0.75, lineHeight: 1.75, fontSize: '0.95rem' }}>Create your free account and enjoy premium natural products delivered to your doorstep.</p>
        </div>
      </div>

      {/* Right: form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: 460 }}>
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, marginBottom: '8px' }}>Create Account</h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>Already have an account? <Link to="/login" style={{ color: 'var(--gold)', fontWeight: 700 }}>Sign in</Link></p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group"><label>Full Name</label><input value={form.name} onChange={set('name')} required placeholder="Your full name" /></div>
              <div className="form-group"><label>Phone Number</label><input value={form.phone} onChange={set('phone')} placeholder="Mobile number" /></div>
            </div>
            <div className="form-group"><label>Email Address</label><input type="email" value={form.email} onChange={set('email')} required placeholder="you@example.com" /></div>
            <div className="form-group"><label>Delivery Address</label><input value={form.address} onChange={set('address')} placeholder="Your default delivery address" /></div>
            <div className="form-row">
              <div className="form-group"><label>Password</label><input type="password" value={form.password} onChange={set('password')} required placeholder="Min 6 characters" /></div>
              <div className="form-group"><label>Confirm Password</label><input type="password" value={form.confirm} onChange={set('confirm')} required placeholder="Repeat password" /></div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%', marginTop: '6px' }}>
              {loading ? <><span className="spinner" /> Creating account...</> : <><UserPlus size={18} /> Create Account</>}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '16px', color: 'var(--muted)', fontSize: '0.8rem' }}>
            By signing up you agree to our <a href="#" style={{ color: 'var(--gold)' }}>Terms & Privacy Policy</a>
          </p>
        </div>
      </div>
      <style>{`@media(max-width:700px){.hide-mobile{display:none!important}}`}</style>
    </div>
  );
}
