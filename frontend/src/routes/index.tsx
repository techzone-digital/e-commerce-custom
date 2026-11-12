import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

// Application route definitions placeholder
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-800">
            <h1 className="text-2xl font-semibold">Jewellery E-Commerce Storefront</h1>
          </div>
        ),
      },
    ],
  },
]);
