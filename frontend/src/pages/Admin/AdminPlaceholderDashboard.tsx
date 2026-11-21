import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { adminLogout } from '@/features/admin/slices/adminAuthSlice';
import { useNavigate } from 'react-router-dom';
import { LogOut, ShieldCheck } from 'lucide-react';
import { ThemeToggle } from '@/components/common';

export const AdminPlaceholderDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { admin } = useAppSelector((state) => state.adminAuth);

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-bg text-text-main flex flex-col">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <span className="font-serif text-lg tracking-wide">Shivam Crafts Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-text-secondary hover:text-red-500 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center border border-border p-8 rounded-none">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-light italic mb-2">Admin Dashboard</h1>
          <p className="text-xs text-text-secondary font-sans mb-6">
            Welcome back, <span className="font-medium text-text-main">{admin?.name}</span> ({admin?.email}).
          </p>
          <div className="text-[11px] font-sans text-text-secondary bg-surface/50 border border-border p-3 text-left">
            <div><strong className="text-text-main">Role:</strong> {admin?.role}</div>
            <div><strong className="text-text-main">Status:</strong> {admin?.status}</div>
            <div><strong className="text-text-main">ID:</strong> {admin?.id}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPlaceholderDashboard;

