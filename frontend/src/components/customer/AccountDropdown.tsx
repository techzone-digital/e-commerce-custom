import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserRound, LogIn, UserPlus, LogOut, Package, User } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/features/auth/slices/authSlice';

interface AccountDropdownProps {
  onItemClick?: () => void;
  className?: string;
}

export const AccountDropdown: React.FC<AccountDropdownProps> = ({
  onItemClick,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Read authenticated user directly from Redux store
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
    onItemClick?.();
    navigate('/');
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    onItemClick?.();
  };


  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Account Icon Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Account menu"
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`p-2.5 rounded-full text-text-secondary hover:text-primary hover:bg-primary/8 transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary ${isOpen ? 'text-primary bg-primary/10' : ''
          }`}
      >
        <UserRound className="w-4.5 h-4.5" strokeWidth={1.75} />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-2 w-56 rounded-xl border border-[#E8DFD2] bg-[#FFFCF7] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] py-2 z-50 transition-all duration-200 origin-top-right ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto translate-y-0'
            : 'opacity-0 scale-95 pointer-events-none -translate-y-1'
        }`}
        role="menu"
        aria-orientation="vertical"
      >
        {isAuthenticated ? (
          <>
            {/* Authenticated user header */}
            <div className="px-4 py-3 border-b border-[#E8DFD2]">
              <p className="text-[10px] uppercase tracking-widest text-primary font-mono font-medium">
                Signed in as
              </p>
              <p className="font-serif text-sm font-normal text-[#28251F] truncate mt-0.5">
                {user?.name || user?.email || 'Valued Customer'}
              </p>
              {user?.email && user?.name && (
                <p className="text-[11px] text-[#777166] truncate mt-0.5">
                  {user.email}
                </p>
              )}
            </div>

            {/* Menu Links */}
            <div className="py-1.5">
              <Link
                to="/orders"
                onClick={handleLinkClick}
                className="flex items-center gap-3 px-4 py-2 text-xs uppercase tracking-wider text-[#777166] hover:text-[#28251F] hover:bg-[#F5EFE6] transition-colors"
                role="menuitem"
              >
                <Package className="w-3.5 h-3.5 text-primary" strokeWidth={1.75} />
                <span>My Orders</span>
              </Link>
              <Link
                to="/account"
                onClick={handleLinkClick}
                className="flex items-center gap-3 px-4 py-2 text-xs uppercase tracking-wider text-[#777166] hover:text-[#28251F] hover:bg-[#F5EFE6] transition-colors"
                role="menuitem"
              >
                <User className="w-3.5 h-3.5 text-primary" strokeWidth={1.75} />
                <span>My Account</span>
              </Link>
            </div>

            {/* Logout */}
            <div className="pt-1.5 border-t border-[#E8DFD2]">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-xs uppercase tracking-wider text-red-600 hover:bg-red-500/10 transition-colors text-left"
                role="menuitem"
              >
                <LogOut className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>Logout</span>
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Guest Welcome Header */}
            <div className="px-4 py-2.5 border-b border-[#E8DFD2]">
              <p className="text-[10px] uppercase tracking-widest text-primary font-sans font-medium">
                Welcome
              </p>
              <p className="text-xs text-[#777166] mt-0.5 font-light">
                Login to manage your orders &amp; wishlist.
              </p>
            </div>

            {/* Guest Action Links */}
            <div className="py-1.5">
              <Link
                to="/login"
                onClick={handleLinkClick}
                className="flex items-center gap-3 px-4 py-2.5 text-xs uppercase tracking-wider font-medium text-[#28251F] hover:text-primary hover:bg-[#F5EFE6] transition-colors"
                role="menuitem"
              >
                <LogIn className="w-3.5 h-3.5 text-primary" strokeWidth={1.75} />
                <span>Login</span>
              </Link>
              <Link
                to="/signup"
                onClick={handleLinkClick}
                className="flex items-center gap-3 px-4 py-2.5 text-xs uppercase tracking-wider font-medium text-[#28251F] hover:text-primary hover:bg-[#F5EFE6] transition-colors"
                role="menuitem"
              >
                <UserPlus className="w-3.5 h-3.5 text-primary" strokeWidth={1.75} />
                <span>Sign Up</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountDropdown;

