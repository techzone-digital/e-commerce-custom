import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { ThemeToggle } from '../components/common/ThemeToggle';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <div className="min-h-screen bg-bg text-text-main flex flex-col transition-colors duration-200">
            <header className="border-b border-border bg-surface px-6 py-4 flex items-center justify-between transition-colors duration-200">
              <span className="font-serif text-xl tracking-wider text-text-main">
                SHIVAM CRAFTS
              </span>
              <ThemeToggle showLabel />
            </header>
            <main className="flex-1 flex items-center justify-center p-6">
              <div className="w-full max-w-md p-8 rounded-lg bg-surface border border-border shadow-sm text-center transition-colors duration-200">
                <p className="text-xs uppercase tracking-widest text-primary font-medium mb-2">
                  Haute Joaillerie
                </p>
                <h1 className="text-3xl font-serif text-text-main mb-3">
                  Jewellery E-Commerce Storefront
                </h1>
                <p className="text-sm text-text-secondary mb-6 font-sans">
                  Crafted with warm ivory, deep charcoal, and refined champagne gold accents.
                </p>
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-surface text-sm font-medium tracking-wide transition-colors"
                  >
                    Explore Collection
                  </button>
                </div>
              </div>
            </main>
          </div>
        ),
      },
    ],
  },
]);
