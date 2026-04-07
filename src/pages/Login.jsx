import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { LogIn, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      toast.success(`Welcome back, ${user.name}!`);
      const redirect = searchParams.get('redirect') || (user.role === 'admin' ? '/admin' : '/');
      navigate(redirect);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '88vh', display: 'flex', background: 'var(--cream)' }}>
      {/* Left panel */}
      <div style={{ flex: 1, background: 'linear-gradient(150deg, var(--forest) 0%, var(--forest-mid) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px', color: 'white', position: 'relative', overflow: 'hidden' }}
        className="hide-mobile">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 40%, rgba(201,151,58,0.2) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 340 }}>
          <div style={{ fontSize: '4rem', marginBottom: '24px' }}>🌿</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, marginBottom: '16px', lineHeight: 1.2 }}>Welcome back to Prem Parth</h2>
          <p style={{ opacity: 0.75, lineHeight: 1.75, fontSize: '0.95rem' }}>Sign in to access your orders, manage your profile, and enjoy exclusive member benefits.</p>
          <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {['10,000+ happy customers', 'Free pan-India delivery', 'FSSAI certified products'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.8, fontSize: '0.88rem' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', flexShrink: 0 }}>✓</div>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <div style={{ marginBottom: '36px' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, marginBottom: '8px' }}>Sign In</h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>Don't have an account? <Link to="/register" style={{ color: 'var(--gold)', fontWeight: 700 }}>Create one free</Link></p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required placeholder="you@example.com" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required placeholder="Your password" style={{ paddingRight: 44 }} />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: 2 }}>
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%', marginTop: '6px' }}>
              {loading ? <><span className="spinner" /> Signing in...</> : <><LogIn size={18} /> Sign In</>}
            </button>
          </form>

          <div style={{ background: 'var(--gold-pale)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '14px 18px', marginTop: '24px', fontSize: '0.82rem', color: 'var(--gold-dark)' }}>
            <strong>Demo Accounts:</strong><br />
            Admin: admin@premparth.com / admin123<br />
            User: user@test.com / user123
          </div>
        </div>
      </div>
      <style>{`@media(max-width:700px){.hide-mobile{display:none!important}}`}</style>
    </div>
  );
}
