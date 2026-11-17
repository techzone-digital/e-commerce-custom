import React from 'react';
import { Outlet } from 'react-router-dom';
import { CustomerHeader } from '../../components/customer/CustomerHeader';
import { CustomerFooter } from '../../components/customer/CustomerFooter';

export const CustomerLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg text-text-main flex flex-col transition-colors duration-200">
      <CustomerHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <CustomerFooter />
    </div>
  );
};

export default CustomerLayout;

