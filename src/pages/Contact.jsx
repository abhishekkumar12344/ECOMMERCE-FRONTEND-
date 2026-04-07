import React, { useState } from 'react';
import { contactAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { MapPin, Phone, Mail, MessageCircle, Send, Clock } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactAPI.submit(form);
      toast.success('Message sent! We will get back to you soon.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to send message'); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(201,151,58,0.2)', border: '1px solid rgba(201,151,58,0.3)', padding: '5px 16px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
            📬 Get In Touch
          </div>
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Send us a message!</p>
        </div>
      </div>

      <div className="container" style={{ padding: '64px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '40px', alignItems: 'start' }}>
          {/* Info */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, marginBottom: '14px' }}>Get in Touch</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '36px', fontSize: '0.95rem' }}>
              Have questions about our products, orders, or anything else? Our team is here to help you every step of the way.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
              {[
                [MapPin, 'Our Address', '123 Industrial Area, Patna, Bihar 800001'],
                [Phone, 'Call Us', '+91 98765 43210'],
                [Mail, 'Email Us', 'info@premparth.com'],
                [Clock, 'Business Hours', 'Mon–Sat: 9 AM – 6 PM'],
              ].map(([Icon, label, value], i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={18} color="var(--gold-light)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--ink)', marginBottom: '3px' }}>{label}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="btn btn-lg" style={{ background: '#25D366', color: 'white', width: '100%', justifyContent: 'center' }}>
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="card" style={{ padding: '36px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '24px' }}>Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group"><label>Your Name</label><input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required placeholder="Full name" /></div>
                <div className="form-group"><label>Email Address</label><input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required placeholder="you@example.com" /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label>Phone (Optional)</label><input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="Mobile number" /></div>
                <div className="form-group"><label>Subject</label><input value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} required placeholder="What is this about?" /></div>
              </div>
              <div className="form-group"><label>Your Message</label><textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} rows={5} required placeholder="Tell us more..." style={{ resize: 'vertical' }} /></div>
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%' }}>
                {loading ? <><span className="spinner" /> Sending...</> : <><Send size={17} /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
