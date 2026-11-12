# Jewellery E-Commerce Monorepo

Clean, scalable, maintainable, and modular MERN stack project architecture for a Jewellery E-commerce platform.

---

## 📁 Repository Overview

```
e-commerce-custom/
├── frontend/             # Client-side single page application (React + Vite + TS)
├── backend/              # RESTful API backend (Node.js + Express + TS + Mongoose)
├── .gitignore            # Root gitignore for build artifacts, env, and node_modules
└── README.md             # Project documentation and architectural guide
```

---

## 🎨 Frontend Architecture (`/frontend`)

The frontend follows a **feature-driven modular structure** using React, TypeScript, Vite, Tailwind CSS, React Router, and Redux Toolkit.

```
frontend/
├── src/
│   ├── assets/            # Static media assets (images, icons, fonts)
│   ├── components/        # Reusable, domain-agnostic UI components
│   │   ├── common/        # Buttons, cards, modals, badges, loaders
│   │   ├── feedback/      # Alerts, toasts, skeletons
│   │   ├── forms/         # Inputs, selects, checkboxes, validation wrappers
│   │   └── navigation/    # Navbar, footer, breadcrumbs, sidebar
│   ├── config/            # Environment and runtime configurations
│   ├── constants/         # App-wide constants (route paths, API endpoints)
│   ├── features/          # Self-contained business domains
│   │   ├── auth/          # Authentication slices, services, hooks & components
│   │   ├── products/      # Product list, filters, sorting, cards
│   │   ├── categories/    # Category navigation and hierarchies
│   │   ├── cart/          # Cart management and drawer/table components
│   │   ├── wishlist/      # Wishlist actions and persistence
│   │   ├── checkout/      # Step-by-step checkout forms and logic
│   │   ├── orders/        # Order tracking, history, and receipts
│   │   ├── custom-jewellery/ # Customisation workflows and inquiries
│   │   └── admin/         # Admin management UI and state
│   ├── hooks/             # Global utility hooks (useDebounce, useMediaQuery, etc.)
│   ├── layouts/           # Page wrapper layouts (MainLayout, AuthLayout, AdminLayout)
│   ├── pages/             # Route-level views consuming features & layouts
│   ├── routes/            # React Router route registry and guard definitions
│   ├── services/          # HTTP clients (Axios instance, interceptors)
│   ├── store/             # Global Redux Toolkit store and typed hooks
│   ├── types/             # Global and generic TypeScript interfaces
│   ├── utils/             # Helper functions (currency formatting, date helpers)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css          # Tailwind CSS directives
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## ⚙️ Backend Architecture (`/backend`)

The backend follows a **modular, layered architecture** where every business domain is encapsulated in its own module directory with strict separation of concerns.

```
backend/
├── src/
│   ├── config/            # DB connection, env variables validation & config
│   ├── constants/         # Roles, order statuses, error codes
│   ├── middleware/        # Global middlewares (auth, errorHandler, notFound, validate)
│   ├── modules/           # Self-contained business domains
│   │   ├── auth/          # Login, registration, token refresh, passwords
│   │   ├── users/         # User profiles, customer accounts
│   │   ├── products/      # Catalogue, jewellery specifications (metals, gemstones)
│   │   ├── categories/    # Rings, Necklaces, Bracelets, Collections
│   │   ├── cart/          # Shopping basket management
│   │   ├── wishlist/      # Saved jewellery items
│   │   ├── orders/        # Order lifecycle and tracking
│   │   ├── payments/      # Payment gateway abstraction (Razorpay/Stripe)
│   │   ├── addresses/     # Customer shipping/billing address book
│   │   ├── custom-jewellery/ # Bespoke jewellery orders and inquiries
│   │   ├── inventory/     # Stock management and alerts
│   │   └── notifications/ # Transactional emails, WhatsApp/SMS hooks
│   ├── routes/            # Centralized API version router (e.g. /api/v1)
│   ├── types/             # Shared TypeScript types & express declarations
│   ├── utils/             # Global utilities (AppError, asyncHandler, logger)
│   ├── app.ts             # Express application initialization & middleware stack
│   └── server.ts          # Server entrypoint & DB bootstrap
├── .env.example
├── package.json
└── tsconfig.json
```

### Module File Responsibilities
Every domain under `src/modules/<module-name>/` follows standard layering:
- `*.model.ts`: Mongoose schema and document type definition.
- `*.controller.ts`: Handles HTTP request/response parsing and status codes.
- `*.service.ts`: Core business logic, queries, and integrations.
- `*.routes.ts`: Express routes bound to controllers and middlewares.
- `*.validation.ts`: Request validation schemas (e.g., Zod).
- `*.types.ts`: Module-specific data contracts and DTOs.

---

## 🚀 Scalability & Future Extension

The structure is prepared for:
1. **Admin & Seller Panels**: Supported out-of-the-box via role definitions (`customer`, `admin`, `seller`), `layouts/AdminLayout`, `features/admin`, and dedicated API routes.
2. **Custom Jewellery Orders**: Isolated in `features/custom-jewellery` (frontend) and `modules/custom-jewellery` (backend).
3. **Third-party Integrations**: Prepared modules for payment gateways (`modules/payments`), inventory management (`modules/inventory`), and notifications/WhatsApp integration (`modules/notifications`).

