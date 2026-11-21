import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { restoreAuth } from './features/auth/slices/authSlice';
import { restoreAdminAuth } from './features/admin/slices/adminAuthSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isInitialized: isCustomerInitialized } = useAppSelector((state) => state.auth);
  const { isInitialized: isAdminInitialized } = useAppSelector((state) => state.adminAuth);

  useEffect(() => {
    // Restore customer auth if token exists or mark initialized
    const customerToken = localStorage.getItem('token');
    if (customerToken) {
      dispatch(restoreAuth());
    } else if (!isCustomerInitialized) {
      dispatch(restoreAuth());
    }

    // Restore admin auth if adminToken exists or mark initialized
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      dispatch(restoreAdminAuth());
    } else if (!isAdminInitialized) {
      dispatch(restoreAdminAuth());
    }
  }, [dispatch, isCustomerInitialized, isAdminInitialized]);

  return <Outlet />;
};

export default App;


