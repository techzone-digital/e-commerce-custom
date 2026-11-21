import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { restoreAuth } from './features/auth/slices/authSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isInitialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(restoreAuth());
    } else if (!isInitialized) {
      // Mark as initialized if no token in storage
      dispatch(restoreAuth());
    }
  }, [dispatch, isInitialized]);

  return <Outlet />;
};

export default App;


