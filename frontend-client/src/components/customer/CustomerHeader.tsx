import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Gem,
  User,
  Package,
  LogOut,
} from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { AnnouncementBar } from './AnnouncementBar';
import { AccountDropdown } from './AccountDropdown';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/features/auth/slices/authSlice';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'The Collections', to: '/shop' },
  { label: 'Explore', to: '/categories' },
  { label: 'Get in Touch', to: '/contact' },
];

export const CustomerHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

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

  const handleMobileLogout = () => {
    dispatch(logout());
    closeMobileMenu();
    navigate('/');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-xs uppercase tracking-widest font-medium transition-colors duration-200 py-1 relative after:absolute after:bottom-0 after:left-0 after:h-px after:bg-primary after:transition-all after:duration-300 ${
      isActive
        ? 'text-primary after:w-full'
        : 'text-text-secondary hover:text-text-main after:w-0 hover:after:w-full'
    }`;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar />
        <header
          className={`transition-all duration-300 ${
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
              className="flex items-center gap-2 group flex-shrink min-w-0"
              aria-label="Shivam Crafts — Home"
              onClick={closeMobileMenu}
            >
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                <Gem className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="font-serif text-base sm:text-lg md:text-xl tracking-wider text-text-main leading-none truncate">
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
            <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
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

              {/* Account Dropdown */}
              <AccountDropdown />

              {/* Divider */}
              <div className="w-px h-5 bg-border mx-1" aria-hidden="true" />

              <ThemeToggle />
            </div>

            {/* ── Mobile Right Icons & Hamburger Trigger ───────────── */}
            <div className="flex md:hidden items-center gap-0.5 sm:gap-1 flex-shrink-0 ml-2">
              <AccountDropdown />
              <ThemeToggle className="p-1.5" />
              {/* Hamburger Button: Guaranteed visible, never shrunk */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                className="p-2 rounded-full text-text-main hover:text-primary hover:bg-primary/10 transition-colors flex-shrink-0"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" strokeWidth={2} />
                ) : (
                  <Menu className="w-5 h-5" strokeWidth={2} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>

      {/* ── Mobile Navigation Drawer ──────────────────────────────── */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Subtle blur backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />

        {/* Drawer panel: max 80vw - 85vw, capped at 320px, fully integrated */}
        <nav
          className={`absolute top-0 right-0 h-full w-[82vw] max-w-xs bg-surface border-l border-border flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          aria-label="Mobile navigation"
        >
          {/* Drawer Header with Brand & Close Button */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-surface/50">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Gem className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="font-serif text-base tracking-wider text-text-main">Menu</span>
            </div>
            <button
              type="button"
              onClick={closeMobileMenu}
              aria-label="Close menu"
              className="p-1.5 rounded-full text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>

          {/* Quick Action Icons within Drawer */}
          <div className="flex items-center justify-around py-3 px-4 border-b border-border/60 bg-bg/40">
            <button
              type="button"
              aria-label="Search"
              onClick={closeMobileMenu}
              className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-primary transition-colors py-1 px-2"
            >
              <Search className="w-4 h-4" strokeWidth={1.75} />
              <span>Search</span>
            </button>
            <div className="w-px h-3.5 bg-border" aria-hidden="true" />
            <button
              type="button"
              aria-label="Wishlist"
              onClick={closeMobileMenu}
              className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-primary transition-colors py-1 px-2"
            >
              <Heart className="w-4 h-4" strokeWidth={1.75} />
              <span>Wishlist</span>
            </button>
            <div className="w-px h-3.5 bg-border" aria-hidden="true" />
            <button
              type="button"
              aria-label="Shopping bag"
              onClick={closeMobileMenu}
              className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-primary transition-colors py-1 px-2"
            >
              <ShoppingBag className="w-4 h-4" strokeWidth={1.75} />
              <span>Cart</span>
            </button>
          </div>

          {/* Main Navigation Links */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block py-3 px-3 rounded-lg text-xs uppercase tracking-widest font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-text-secondary hover:text-text-main hover:bg-bg/60'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Auth Actions in Drawer Footer */}
          <div className="p-5 border-t border-border bg-surface/50">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="px-1 pb-1 border-b border-border/60">
                  <p className="text-[10px] uppercase tracking-widest text-primary font-mono font-medium">
                    Signed in as
                  </p>
                  <p className="font-serif text-sm font-normal text-text-main truncate mt-0.5">
                    {user?.name || user?.email || 'Valued Customer'}
                  </p>
                  {user?.email && user?.name && (
                    <p className="text-[11px] text-text-secondary truncate mt-0.5">
                      {user.email}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Link
                    to="/account"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs uppercase tracking-wider font-medium text-text-secondary hover:text-text-main hover:bg-bg/60 transition-colors"
                  >
                    <User className="w-4 h-4 text-primary" strokeWidth={1.75} />
                    <span>My Account</span>
                  </Link>

                  <Link
                    to="/orders"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs uppercase tracking-wider font-medium text-text-secondary hover:text-text-main hover:bg-bg/60 transition-colors"
                  >
                    <Package className="w-4 h-4 text-primary" strokeWidth={1.75} />
                    <span>My Orders</span>
                  </Link>
                </div>

                <div className="pt-2 border-t border-border/60">
                  <button
                    type="button"
                    onClick={handleMobileLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs uppercase tracking-wider font-medium text-red-600 hover:bg-red-500/10 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" strokeWidth={1.75} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="block w-full text-center py-2.5 px-4 border border-border rounded-full text-xs uppercase tracking-wider font-medium text-text-secondary hover:text-primary hover:border-primary transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMobileMenu}
                  className="block w-full text-center py-2.5 px-4 bg-primary hover:bg-primary-hover text-surface rounded-full text-xs uppercase tracking-wider font-medium transition-colors duration-200 shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Spacer to prevent content from going behind fixed header + announcement bar */}
      <div className="h-[5.5rem] md:h-[6.75rem]" aria-hidden="true" />
    </>
  );
};

export default CustomerHeader;

