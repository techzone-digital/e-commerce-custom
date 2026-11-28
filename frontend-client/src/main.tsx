import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from './store';
import { router } from './routes';
import { ThemeProvider } from './hooks/useTheme';
import { env } from './config/env';
import './index.css';

const appTree = (
  <Provider store={store}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {env.googleClientId ? (
      <GoogleOAuthProvider clientId={env.googleClientId}>
        {appTree}
      </GoogleOAuthProvider>
    ) : (
      appTree
    )}
  </React.StrictMode>
);
