import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Gem,
} from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Categories', to: '/categories' },
  { label: 'Contact', to: '/contact' },
];

export const CustomerHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-xs uppercase tracking-widest font-medium transition-colors duration-200 py-1 relative after:absolute after:bottom-0 after:left-0 after:h-px after:bg-primary after:transition-all after:duration-300 ${
      isActive
        ? 'text-primary after:w-full'
        : 'text-text-secondary hover:text-text-main after:w-0 hover:after:w-full'
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-surface/95 backdrop-blur-sm border-b border-border shadow-sm'
            : 'bg-surface/90 backdrop-blur-sm border-b border-border'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* ── Logo / Brand ─────────────────────────────────────── */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group flex-shrink-0"
              aria-label="Shivam Crafts — Home"
              onClick={closeMobileMenu}
            >
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Gem className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="font-serif text-lg md:text-xl tracking-wider text-text-main leading-none">
                Shivam Crafts
              </span>
            </Link>

            {/* ── Desktop Navigation ───────────────────────────────── */}
            <nav
              className="hidden md:flex items-center gap-7 lg:gap-9"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navLinkClass}>
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* ── Desktop Action Icons ──────────────────────────────── */}
            <div className="hidden md:flex items-center gap-1.5">
              {/* Search */}
              <button
                type="button"
                aria-label="Search"
                className="p-2.5 rounded-full text-text-secondary hover:text-primary hover:bg-primary/8 transition-colors duration-200"
              >
                <Search className="w-4.5 h-4.5" strokeWidth={1.75} />
              </button>

              {/* Wishlist */}
              <button
                type="button"
                aria-label="Wishlist"
                className="p-2.5 rounded-full text-text-secondary hover:text-primary hover:bg-primary/8 transition-colors duration-200"
              >
                <Heart className="w-4.5 h-4.5" strokeWidth={1.75} />
              </button>

              {/* Cart */}
              <button
                type="button"
                aria-label="Shopping bag"
                className="p-2.5 rounded-full text-text-secondary hover:text-primary hover:bg-primary/8 transition-colors duration-200 relative"
              >
                <ShoppingBag className="w-4.5 h-4.5" strokeWidth={1.75} />
              </button>

              {/* Divider */}
              <div className="w-px h-5 bg-border mx-1" aria-hidden="true" />

              {/* Auth Links */}
              <Link
                to="/login"
                className="text-xs uppercase tracking-wider font-medium text-text-secondary hover:text-primary transition-colors duration-200 px-2 py-1"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-xs uppercase tracking-wider font-medium bg-primary hover:bg-primary-hover text-surface px-4 py-2 rounded-full transition-colors duration-200 shadow-sm"
              >
                Sign Up
              </Link>

              {/* Divider */}
              <div className="w-px h-5 bg-border mx-1" aria-hidden="true" />

              <ThemeToggle />
            </div>

            {/* ── Mobile Right Icons ───────────────────────────────── */}
            <div className="flex md:hidden items-center gap-1">
              <button
                type="button"
                aria-label="Search"
                className="p-2 rounded-full text-text-secondary hover:text-primary transition-colors"
              >
                <Search className="w-4 h-4" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                aria-label="Wishlist"
                className="p-2 rounded-full text-text-secondary hover:text-primary transition-colors"
              >
                <Heart className="w-4 h-4" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                aria-label="Shopping bag"
                className="p-2 rounded-full text-text-secondary hover:text-primary transition-colors"
              >
                <ShoppingBag className="w-4 h-4" strokeWidth={1.75} />
              </button>
              <ThemeToggle />
              {/* Hamburger */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                className="p-2 rounded-full text-text-secondary hover:text-primary transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" strokeWidth={1.75} />
                ) : (
                  <Menu className="w-5 h-5" strokeWidth={1.75} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Navigation Drawer ──────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />

        {/* Drawer panel */}
        <nav
          className={`absolute top-0 right-0 h-full w-72 max-w-[85vw] bg-surface flex flex-col shadow-2xl transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          aria-label="Mobile navigation"
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">
            <span className="font-serif text-lg tracking-wider text-text-main">Menu</span>
            <button
              type="button"
              onClick={closeMobileMenu}
              aria-label="Close menu"
              className="p-2 rounded-full text-text-secondary hover:text-primary transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={1.75} />
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block py-3 px-2 text-sm uppercase tracking-widest font-medium border-b border-border/50 transition-colors duration-200 ${
                    isActive ? 'text-primary' : 'text-text-secondary hover:text-text-main'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="px-6 pb-8 space-y-3 border-t border-border pt-6">
            <Link
              to="/login"
              onClick={closeMobileMenu}
              className="block w-full text-center py-3 px-4 border border-border rounded-full text-sm uppercase tracking-wider font-medium text-text-secondary hover:text-primary hover:border-primary transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={closeMobileMenu}
              className="block w-full text-center py-3 px-4 bg-primary hover:bg-primary-hover text-surface rounded-full text-sm uppercase tracking-wider font-medium transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </div>

      {/* Spacer to prevent content from going behind fixed header */}
      <div className="h-16 md:h-20" aria-hidden="true" />
    </>
  );
};

export default CustomerHeader;

