import React from 'react';
import { Link } from 'react-router-dom';
import { Gem, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  shop: [
    { label: 'All Jewellery', to: '/shop' },
    { label: 'Spadika Malai', to: '/categories' },
    { label: 'Silver Jewellery', to: '/categories' },
    { label: 'Gold Rings', to: '/categories' },
    { label: 'Gold Chains', to: '/categories' },
    { label: 'Bangles', to: '/categories' },
  ],
  support: [
    { label: 'Contact Us', to: '/contact' },
    { label: 'FAQs', to: '/contact' },
    { label: 'Sizing Guide', to: '/contact' },
    { label: 'Care Instructions', to: '/contact' },
    { label: 'Custom Orders', to: '/contact' },
  ],
  account: [
    { label: 'Login', to: '/login' },
    { label: 'Create Account', to: '/signup' },
    { label: 'My Orders', to: '/orders' },
    { label: 'Wishlist', to: '/wishlist' },
  ],
};

export const CustomerFooter: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border transition-colors duration-200">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand Column */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                <Gem className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="font-serif text-lg tracking-wider text-text-main">Shivam Crafts</span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed mb-6 max-w-xs">
              Timeless jewellery crafted with devotion. Explore our curated collections of handcrafted gold, silver, and traditional pieces.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'Twitter' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-semibold text-text-main mb-4">
              Shop
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-semibold text-text-main mb-4">
              Customer Support
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account + Contact */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-semibold text-text-main mb-3.5">
              Contact
            </h3>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={1.75} />
                <span className="text-sm text-text-secondary">contact@shivamcrafts.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={1.75} />
                <span className="text-sm text-text-secondary">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={1.75} />
                <span className="text-sm text-text-secondary">Chennai, Tamil Nadu, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <p className="text-xs text-text-secondary/70">
            &copy; {year} Shivam Crafts. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link to="/" className="text-xs text-text-secondary/70 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="text-xs text-text-secondary/70 hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CustomerFooter;

