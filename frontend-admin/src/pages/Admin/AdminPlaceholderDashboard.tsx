import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { adminLogout } from '@/features/admin/slices/adminAuthSlice';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  LogOut,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Layers,
  TrendingUp,
  Search,
  Bell,
  Sparkles,
} from 'lucide-react';
import { ThemeToggle } from '@/components/common';

export const AdminPlaceholderDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { admin } = useAppSelector((state) => state.adminAuth);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'customers' | 'settings'>('overview');

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate('/login', { replace: true });
  };

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products & Inventory', icon: Package },
    { id: 'orders', label: 'Orders & Shipments', icon: ShoppingBag },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-bg text-text-main flex transition-colors duration-200">
      {/* ── Left Sidebar ────────────────────────────────────────── */}
      <aside className="w-64 bg-surface border-r border-border hidden md:flex md:flex-col justify-between flex-shrink-0">
        <div>
          {/* Logo / Brand */}
          <div className="h-16 border-b border-border px-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-lg tracking-wider text-text-main block leading-tight">
                Shivam Crafts
              </span>
              <span className="text-[10px] uppercase tracking-widest text-primary font-sans">
                Admin Console
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5" aria-label="Admin Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-text-secondary hover:text-text-main hover:bg-surface/80'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Info */}
        <div className="p-4 border-t border-border bg-surface/50">
          <div className="flex items-center justify-between mb-3">
            <div className="min-w-0 pr-2">
              <p className="text-xs font-medium text-text-main truncate">{admin?.name || 'Administrator'}</p>
              <p className="text-[10px] text-text-secondary truncate">{admin?.email}</p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium uppercase bg-primary/15 text-primary">
              {admin?.role || 'Admin'}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-border rounded text-xs text-text-secondary hover:text-red-500 hover:border-red-500/50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-surface/80 backdrop-blur-sm border-b border-border px-6 flex items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                placeholder="Search orders, jewellery items, customers..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-bg border border-border rounded-md text-text-main placeholder:text-text-secondary/60 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Notifications"
              className="p-2 rounded-md border border-border text-text-secondary hover:text-text-main hover:bg-surface transition-colors"
            >
              <Bell className="w-4 h-4" />
            </button>
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="md:hidden p-2 rounded-md border border-border text-text-secondary hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Dashboard Main View */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {/* Welcome Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
            <div>
              <h1 className="font-serif text-2xl md:text-3xl text-text-main font-normal">
                Admin Overview
              </h1>
              <p className="text-xs text-text-secondary mt-1">
                Manage your handcrafted jewellery catalog, custom orders, and client requests.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20 text-xs text-primary font-medium self-start sm:self-auto">
              <Sparkles className="w-3.5 h-3.5" />
              Store Status: Active & Synced
            </div>
          </div>

          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-surface border border-border rounded-lg p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-text-secondary mb-3">
                <span className="text-xs font-medium uppercase tracking-wider">Total Products</span>
                <Package className="w-4 h-4 text-primary" />
              </div>
              <div className="font-serif text-2xl text-text-main font-semibold">128</div>
              <p className="text-[11px] text-text-secondary mt-2">12 collections live</p>
            </div>

            <div className="bg-surface border border-border rounded-lg p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-text-secondary mb-3">
                <span className="text-xs font-medium uppercase tracking-wider">Active Orders</span>
                <ShoppingBag className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="font-serif text-2xl text-text-main font-semibold">24</div>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-2">6 in craft preparation</p>
            </div>

            <div className="bg-surface border border-border rounded-lg p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-text-secondary mb-3">
                <span className="text-xs font-medium uppercase tracking-wider">Custom Requests</span>
                <Layers className="w-4 h-4 text-amber-500" />
              </div>
              <div className="font-serif text-2xl text-text-main font-semibold">9</div>
              <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-2">3 pending review</p>
            </div>

            <div className="bg-surface border border-border rounded-lg p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-text-secondary mb-3">
                <span className="text-xs font-medium uppercase tracking-wider">Customers</span>
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <div className="font-serif text-2xl text-text-main font-semibold">342</div>
              <p className="text-[11px] text-text-secondary mt-2">+14 registered this week</p>
            </div>
          </div>

          {/* Account & Details Box */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-4">
              Administrator Profile & Session Info
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
              <div className="p-3.5 bg-bg/60 border border-border rounded">
                <span className="text-text-secondary block mb-1">Signed in as</span>
                <span className="font-medium text-text-main">{admin?.name || 'Administrator'}</span>
                <span className="text-[11px] text-text-secondary block mt-0.5">{admin?.email}</span>
              </div>
              <div className="p-3.5 bg-bg/60 border border-border rounded">
                <span className="text-text-secondary block mb-1">Access Role</span>
                <span className="font-medium text-primary capitalize">{admin?.role || 'Admin'}</span>
                <span className="text-[11px] text-text-secondary block mt-0.5">Status: {admin?.status || 'Active'}</span>
              </div>
              <div className="p-3.5 bg-bg/60 border border-border rounded">
                <span className="text-text-secondary block mb-1">Admin Session ID</span>
                <span className="font-mono text-text-secondary truncate block">{admin?.id || 'LOCAL-SESSION'}</span>
                <span className="text-[11px] text-emerald-500 block mt-0.5">● Connected</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPlaceholderDashboard;
