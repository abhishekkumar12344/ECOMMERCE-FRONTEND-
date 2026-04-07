import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle, Globe, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--forest)', color: 'white' }}>
      
      {/* CTA */}
      <div style={{ background: 'var(--gold)', padding: '28px 24px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ fontWeight: '700' }}>Ready to taste the difference?</h3>
            <p>Shop premium oils & food products</p>
          </div>
          <Link to="/products" className="btn" style={{ background: 'white', color: 'black' }}>
            Shop Now →
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container" style={{ padding: '50px 20px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px' }}>
          
          {/* Brand */}
          <div>
            <h2 style={{ color: 'var(--gold-light)' }}>Prem Parth</h2>
            <p style={{ opacity: 0.7 }}>
              Premium oils, ghee & food products across India.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              {[Globe, Share2].map((Icon, i) => (
                <div key={i} style={{ background: '#ffffff20', padding: '8px', borderRadius: '6px' }}>
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4>Quick Links</h4>
            <Link to="/">Home</Link><br />
            <Link to="/products">Products</Link><br />
            <Link to="/about">About</Link><br />
            <Link to="/contact">Contact</Link>
          </div>

          {/* Products */}
          <div>
            <h4>Products</h4>
            <p>Mustard Oil</p>
            <p>Desi Ghee</p>
            <p>Sattu</p>
            <p>Fuel</p>
          </div>

          {/* Contact */}
          <div>
            <h4>Contact</h4>

            <p><MapPin size={14}/> Patna, Bihar</p>
            <p><Phone size={14}/> +91 98765 43210</p>
            <p><Mail size={14}/> info@premparth.com</p>

            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
              <MessageCircle size={14}/> WhatsApp
            </a>
          </div>

        </div>

        {/* Bottom */}
        <div style={{ marginTop: '30px', borderTop: '1px solid #ffffff20', paddingTop: '15px', fontSize: '0.85rem', opacity: 0.6 }}>
          © {new Date().getFullYear()} Prem Parth Enterprises
        </div>

      </div>
    </footer>
  );
}