# Invoice & Billing Manager

A production-ready full-stack SaaS application built to manage customer relationships, automated invoice generation, payment tracking, PDF rendering, email notifications, and subscription billing from a unified dashboard.

---

## Overview

**Invoice & Billing Manager** is a multi-tenant SaaS application designed for small business owners, freelancers, and service providers. It simplifies administrative operations by providing a centralized platform to manage billing lifecycles, accept payments, track revenue analytics, and manage subscription tiers.

### Key Capabilities
- **Customer Relationship Management**: Maintain customer profiles, GST/Tax identification numbers, billing addresses, and contact records.
- **Invoice Creation & Calculation**: Build invoices with multiple line items, automated tax rate calculations, sequence number generation (`INV-XXXX`), and customized issue/due dates.
- **PDF Generation & Email Dispatch**: Render formatted invoice PDFs using headless browser templates and dispatch them directly to customers as email attachments.
- **Flexible Payment Processing**: Record manual offline payments (Cash, UPI, Bank Transfer) or send Stripe payment links with custom expiration windows.
- **SaaS Subscription Engine**: Plan enforcement with tiered subscriptions (Free, Starter, Professional), invoice creation limits, and Stripe Webhook synchronization.
- **Multi-Tenant Data Security**: Strict user-level data isolation enforced across database schemas, service logic, and middleware checks.
- **Business Intelligence Dashboard**: High-level KPI metrics (Total Revenue, Outstanding Balance, Invoice Status Breakdown) accompanied by annual monthly revenue trends.

---

## Architecture & System Design

The project uses a clean **layered architecture** on the backend and a modular **component-driven architecture** on the frontend, enforcing strict separation of concerns across the stack.

```mermaid
flowchart TD
    subgraph Client ["Frontend (React 19 + Vite + MUI)"]
        UI[React Router & Pages]
        State[Auth Context & React Hook Form]
        AxiosClient[Axios Interceptors]
    end

    subgraph Server ["Backend (Node.js + Express 5)"]
        Routes[API Routes /api/v1]
        Middleware[Auth & Zod Middleware]
        Controllers[Controllers Layer]
        Services[Business Logic Services]
        PrismaORM[Prisma ORM Client]
    end

    subgraph Database ["Database Layer"]
        Postgres[(PostgreSQL DB)]
    end

    subgraph External ["External Third-Party Services"]
        Stripe[Stripe Checkout & Webhooks]
        Cloudinary[Cloudinary Image Storage]
        SMTP[Nodemailer / SMTP Server]
        Puppeteer[Puppeteer PDF Generator]
    end

    UI --> State
    State --> AxiosClient
    AxiosClient -->|HTTP / REST| Routes
    Routes --> Middleware
    Middleware --> Controllers
    Controllers --> Services
    Services --> PrismaORM
    PrismaORM --> Postgres
    Services --> Stripe
    Services --> Cloudinary
    Services --> SMTP
    Services --> Puppeteer
```

### Architectural Separation
* **Routes (`/routes/v1`)**: Route endpoints and attach schema validation and authentication middleware.
* **Controllers (`/controllers`)**: Parse incoming request payloads, invoke service methods, and return formatted standard JSON HTTP responses.
* **Services (`/services`)**: Encapsulate all core business logic, database transactions, calculation logic, and external integration calls.
* **Middleware (`/middleware`)**: Handle JWT token verification, schema validation with Zod, file uploads via Multer, and global error handling.
* **Database Layer (`/prisma`)**: Prisma schema definitions, migrations, relational mapping, and index constraints.
* **Frontend Service Layer (`/client/src/services` & `/api`)**: Encapsulate HTTP requests, handle Axios request/response interceptors, and manage automatic JWT token refreshes.

---

## Tech Stack

| Layer | Technology | Usage in Repository |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19 + Vite 8 | Single-page application build tooling and rendering |
| **Routing** | React Router v7 | Protected routing, layout routing, and navigation |
| **UI Components & Icons** | Material UI (MUI v9) + Emotion | Dashboard UI, Data Grid tables, Dialogs, and Drawers |
| **Form Handling & Validation** | React Hook Form + Zod | Dynamic invoice line items and profile forms |
| **Data Visualization** | Recharts v3 | Monthly revenue trend line/bar charts |
| **Backend Framework** | Node.js + Express.js v5 | Modular REST API server architecture |
| **Database & ORM** | PostgreSQL + Prisma ORM v7 | Relational persistence, transactions, and migrations |
| **Authentication** | JWT (jsonwebtoken) + bcryptjs | Short-lived Access Tokens & HTTP-Only Refresh Cookies |
| **Payment Gateway** | Stripe API v22 | Stripe Checkout Sessions & Webhook Event Listeners |
| **Media Storage** | Cloudinary + Streamifier | In-memory buffer stream upload for company branding logos |
| **PDF Generation** | Puppeteer v25 | Headless Chrome HTML-to-PDF invoice rendering |
| **Email Delivery** | Nodemailer v9 | SMTP integration for invoice emailing with attachments |

---

## Features Breakdown

### 1. Authentication & User Profile Management
* **Dual-Token System**: Issues short-lived JWT Access Tokens (5h) in response body and long-lived Refresh Tokens (5d) stored in `httpOnly`, `sameSite: lax` cookies.
* **Silent Token Refresh**: Frontend Axios response interceptor catches `401 Unauthorized` errors, automatically hits `/auth/refresh`, updates tokens, and retries original requests seamlessly.
* **Business Branding**: Complete company profile setup including Address, Phone, GST Registration status, GSTIN, PAN Number, and Cloudinary-hosted Logo.
* **Bank & UPI Configuration**: Configure Bank Account Holder Name, Account Number, IFSC Code, and UPI ID required for payment link generation.

### 2. Customer Management
* **Full CRUD Operations**: Create, read, update, list, and soft/hard delete customer records.
* **Duplicate Protection**: Backend checks for duplicate customer email or phone numbers per user before record creation.
* **Search & Pagination**: Server-side pagination with text search across customer name, company name, email, and phone.
* **Tax & Billing Details**: Store billing/shipping addresses, Tax IDs, GST numbers, and internal customer notes.

### 3. Invoice Management
* **Automated Sequential Numbering**: Generates sequential `INV-0001`, `INV-0002` numbering unique per user.
* **Dynamic Calculations**: Subtotal, line-item tax rates, item totals, and grand total calculated programmatically on the backend.
* **Status Lifecycle**: Manage invoice state transitions (`DRAFT`, `SENT`, `PAID`, `PARTIALLY_PAID`, `OVERDUE`, `CANCELLED`).
* **PDF Rendering**: On-demand HTML template rendering converted to print-quality A4 PDF documents via Puppeteer.
* **Direct Email Dispatch**: Send formatted invoices with attached PDF directly to customer email addresses using Nodemailer SMTP.

### 4. Payment Management
* **Manual Payment Recording**: Record offline payments via Cash, UPI, Bank Transfer, or Card.
* **Partial Payments**: Automatically updates invoice status to `PARTIALLY_PAID` or `PAID` based on cumulative recorded amounts against total outstanding balance.
* **Stripe Payment Links**: Generate custom Stripe Checkout links with configurable expiry (default 30 mins) for direct credit/debit card payments.
* **Webhook Processing**: Stripe `checkout.session.completed` events are verified and idempotently update payment records and mark invoices as `PAID`.

### 5. Subscription & SaaS Tier Management
* **Tiered Subscription Plans**:
  * **Free Plan**: 15 invoice creation limit.
  * **Starter Plan (₹299/mo)**: Unlimited invoices.
  * **Professional Plan (₹599/mo)**: Unlimited invoices + premium capabilities.
* **Plan Enforcement**: Service layer checks (`canCreateInvoice`) block invoice creation once the free tier quota is reached.
* **Stripe Subscription Checkout**: Redirection to hosted Stripe Checkout for plan upgrades and renewals.
* **Subscription Webhooks**: Listens to `customer.subscription.created`, `updated`, `deleted`, and `invoice.payment_failed` to keep database subscription states in sync (`ACTIVE`, `CANCELED`, `PAST_DUE`).

### 6. Data Isolation & Security
* **Multi-Tenant Scope**: All core entities (`Customer`, `Invoice`, `Payment`, `Subscription`) are foreign-keyed to `userId`.
* **Service-Level Filtering**: Queries enforce explicit `userId` filtering to prevent cross-tenant data leakage.
* **Validation**: Request bodies are validated using Zod schemas on both frontend forms and backend middleware.

---

## Core Application Flows

### Invoice & Payment Flow

```mermaid
sequenceDiagram
    autonumber
    actor User as Business Owner
    participant Client as React App
    participant Server as Express API
    participant DB as Postgres DB
    participant Stripe as Stripe API
    participant Customer as Customer Email

    User->>Client: Create New Invoice (Items, Tax Rates)
    Client->>Server: POST /api/v1/invoices
    Server->>DB: Check Subscription Invoice Quota
    Server->>DB: Create Invoice & Line Items (INV-XXXX)
    DB-->>Server: Invoice Saved
    Server-->>Client: Return Created Invoice

    alt Send Email to Customer
        User->>Client: Click "Send Email"
        Client->>Server: POST /api/v1/invoices/:id/send
        Server->>Server: Generate PDF via Puppeteer
        Server->>Customer: Dispatch Email with PDF Attachment
    else Generate Stripe Payment Link
        User->>Client: Click "Generate Payment Link"
        Client->>Server: POST /api/v1/stripe-payment/:invoiceId
        Server->>Stripe: Create Checkout Session (INR)
        Stripe-->>Server: Return Checkout URL
        Server-->>Client: Return Payment Link
        User->>Customer: Share Payment Link
        Customer->>Stripe: Pay Invoice via Credit/Debit Card
        Stripe->>Server: POST /api/v1/stripe-payment/webhook
        Server->>DB: Record Payment & Set Invoice Status to PAID
    end
```

---

## Database Schema & Data Models

The application uses PostgreSQL managed via Prisma ORM.

### Entity Relationship Overview

```mermaid
erDiagram
    USER ||--o{ CUSTOMER : "manages"
    USER ||--o{ INVOICE : "owns"
    USER ||--o{ PAYMENT : "receives"
    USER ||--o| SUBSCRIPTION : "subscribes to"
    CUSTOMER ||--o{ INVOICE : "billed for"
    CUSTOMER ||--o{ PAYMENT : "makes"
    INVOICE ||--o{ INVOICE_ITEM : "contains"
    INVOICE ||--o{ PAYMENT : "has"

    USER {
        string id PK
        string email UK
        string password
        string companyName
        string logo
        boolean isGstRegistered
        string gstNumber
        string bankName
        string accountNumber
        string ifscCode
    }

    CUSTOMER {
        string id PK
        string userId FK
        string name
        string email
        string phone
        string gstNumber
        string billingAddress
    }

    INVOICE {
        string id PK
        string userId FK
        string customerId FK
        string invoiceNumber
        enum status
        decimal subtotal
        decimal taxAmount
        decimal totalAmount
    }

    INVOICE_ITEM {
        string id PK
        string invoiceId FK
        string description
        int quantity
        decimal unitPrice
        decimal taxRate
        decimal amount
    }

    PAYMENT {
        string id PK
        string invoiceId FK
        string customerId FK
        string userId FK
        decimal amount
        enum method
        enum status
        string stripeCheckoutSessionId UK
    }

    SUBSCRIPTION {
        string id PK
        string userId FK, UK
        enum plan
        enum status
        string stripeCustomerId
        string stripeSubscriptionId UK
        datetime currentPeriodEnd
    }
```

### Key Models Description
* **`User`**: Stores authentication credentials, business profile, branding logos, tax info, bank details, and profile completion status.
* **`Customer`**: Multi-tenant customer directory associated with a user, storing billing/shipping metadata and tax IDs. Indexed on `[userId]` and `[userId, name]`.
* **`Invoice`**: Stores header billing information, sequential invoice number (unique per user), calculated financial figures, and status.
* **`InvoiceItem`**: Individual items attached to an invoice with quantity, unit price, tax rate, and net calculated amount. Cascades on invoice deletion.
* **`Payment`**: Records payment events (manual or via Stripe), tracking amounts, transaction references, methods (`CASH`, `UPI`, `BANK_TRANSFER`, `CARD`, `STRIPE_CARD`), and Stripe session IDs.
* **`Subscription`**: Stores SaaS subscription states (`FREE`, `STARTER`, `PROFESSIONAL`), Stripe subscription identifiers, and current period start/end timestamps.

---

## API Documentation

All API endpoints are prefixed with `/api/v1`. Protected routes require a valid JWT Access Token passed in the `Authorization: Bearer <token>` header.

### Authentication Module (`/auth`)

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Public | Register a new user (`name`, `email`, `password`, `companyName`) |
| `POST` | `/api/v1/auth/login` | Public | Authenticate user, return access token & set refresh cookie |
| `POST` | `/api/v1/auth/logout` | Bearer | Revoke session and clear HTTP-only refresh token cookie |
| `POST` | `/api/v1/auth/refresh` | Cookie | Generate a new access token using valid refresh token cookie |

### User Profile Module (`/users`)

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/users/profile` | Bearer | Fetch complete user profile, business, tax, and bank details |
| `PUT` | `/api/v1/users/profile` | Bearer | Complete initial user profile setup with optional logo upload |
| `PUT` | `/api/v1/users/user-profile` | Bearer | Update user profile information, tax details, and bank account |
| `PUT` | `/api/v1/users/user-logo` | Bearer | Upload or update company logo image (stored via Cloudinary) |

### Customer Management (`/customers`)

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/customers` | Bearer | Create a new customer record |
| `GET` | `/api/v1/customers` | Bearer | List customers with pagination (`page`, `limit`) & text search |
| `GET` | `/api/v1/customers/:id` | Bearer | Retrieve customer details by ID |
| `PUT` | `/api/v1/customers/:id` | Bearer | Update customer information by ID |
| `DELETE` | `/api/v1/customers/:id` | Bearer | Delete customer record |

### Invoice Management (`/invoices`)

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/invoices` | Bearer | Create a new invoice with line items (enforces quota) |
| `GET` | `/api/v1/invoices` | Bearer | List invoices with pagination, status filters, and search |
| `GET` | `/api/v1/invoices/:id` | Bearer | Fetch single invoice details with customer & items |
| `PUT` | `/api/v1/invoices/:id` | Bearer | Update invoice details and recalculate line items |
| `DELETE` | `/api/v1/invoices/:id` | Bearer | Remove an invoice record |
| `GET` | `/api/v1/invoices/:id/pdf` | Bearer | Render and download invoice PDF document |
| `POST` | `/api/v1/invoices/:id/send` | Bearer | Send invoice PDF attachment to customer via email |
| `GET` | `/api/v1/invoices/:id/payments` | Bearer | Fetch invoice payment history and outstanding balance |

### Payment Management (`/payments` & `/stripe-payment`)

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/payments` | Bearer | Record a manual payment (Cash, UPI, Bank Transfer) |
| `GET` | `/api/v1/payments` | Bearer | List recorded payments with filters & search |
| `GET` | `/api/v1/payments/:id` | Bearer | Retrieve payment record by ID |
| `POST` | `/api/v1/stripe-payment/:invoiceId` | Bearer | Generate a Stripe Checkout payment link for an invoice |
| `POST` | `/api/v1/stripe-payment/webhook` | Webhook | Handle Stripe invoice payment webhook events |

### Subscription Engine (`/subscriptions`)

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/subscriptions/plans` | Bearer | Retrieve available subscription pricing plans |
| `GET` | `/api/v1/subscriptions/me` | Bearer | Fetch active subscription status & invoice usage stats |
| `POST` | `/api/v1/subscriptions/checkout` | Bearer | Create Stripe Checkout Session for subscription upgrade |
| `POST` | `/api/v1/subscriptions/webhook` | Webhook | Handle Stripe subscription lifecycle webhook events |

### Analytics & Dashboard (`/dashboardSummary`)

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/dashboardSummary` | Bearer | Fetch dashboard summary metrics & annual monthly revenue trends |

---

## Directory Structure

```text
invoice-billing-manager/
├── client/                      # Frontend React Application
│   ├── public/                  # Public static assets
│   ├── src/
│   │   ├── api/                 # Axios HTTP instances & endpoints
│   │   ├── assets/              # Static branding and icons
│   │   ├── components/          # Reusable UI Components
│   │   │   ├── common/          # Tables, Empty states, Loaders
│   │   │   ├── customers/       # Customer forms, dialogs, drawers
│   │   │   ├── invoices/        # Invoice forms, status chips, drawers
│   │   │   ├── layout/          # Navbar, Sidebar navigation
│   │   │   ├── payments/        # Payment tables, manual payment modals
│   │   │   ├── settings/        # Profile edit forms, logo uploader
│   │   │   └── subscription/    # Subscription cards & plan views
│   │   ├── context/             # AuthContext provider & state
│   │   ├── hooks/               # Custom hooks (e.g. useSubscription)
│   │   ├── layouts/             # Dashboard Layout wrappers
│   │   ├── pages/               # Main application pages
│   │   │   ├── auth/            # Login & Registration pages
│   │   │   ├── customer/        # Customer directory page
│   │   │   ├── dashboard/       # Main dashboard summary page
│   │   │   ├── invoice/         # Invoice management page
│   │   │   ├── payment/         # Payments history page
│   │   │   ├── profile/         # Profile onboarding page
│   │   │   ├── settings/        # Settings & business profile page
│   │   │   └── subscription/    # Subscription management & checkout callbacks
│   │   ├── routes/              # AppRouter & ProtectedRoute wrappers
│   │   ├── services/            # Frontend service layer
│   │   ├── validations/         # Zod schemas for client forms
│   │   ├── App.jsx              # Main App React root
│   │   └── main.jsx             # DOM mounting entrypoint
│   ├── package.json
│   └── vite.config.js
│
└── server/                      # Backend Express Application
    ├── prisma/
    │   ├── schema.prisma        # Prisma database schema definition
    │   └── migrations/          # PostgreSQL SQL migrations history
    ├── src/
    │   ├── config/              # Cloudinary, Stripe, Subscription configs
    │   ├── controllers/         # HTTP Controller handlers
    │   ├── middleware/          # Auth JWT, Zod Validation, Error, Multer
    │   ├── prismaClient/        # Shared Prisma Client instance
    │   ├── routes/              # Express API route modules (v1)
    │   ├── services/            # Core business logic services
    │   ├── utils/               # JWT helper, ApiError, Cloudinary & PDF utils
    │   │   └── pdf/             # Invoice HTML template & Puppeteer renderer
    │   ├── validations/         # Zod API validation schemas
    │   ├── app.js               # Express application initialization
    │   └── server.js            # Node HTTP server startup entrypoint
    ├── package.json
    └── .env.example
```

---

## Environment Variables Configuration

Create a `.env` file in the `server/` directory based on the following template. Never commit sensitive credentials or secret keys to version control.

### Server Environment Template (`server/.env.example`)

```env
# Server Port & Environment
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# PostgreSQL Database Connection URL (Local or Neon PostgreSQL)
DATABASE_URL=postgresql://username:password@localhost:5432/invoice_manager?schema=public

# Authentication JWT Secrets
JWT_ACCESS_SECRET=your_jwt_access_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here

# Cloudinary Branding Image Uploads Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# SMTP Email Configuration (Gmail / SendGrid / Mailtrap)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_email_app_password
SMTP_FROM="Invoice Billing Manager <your_email@gmail.com>"

# Stripe Payment Gateway & Webhook Secrets
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret
STRIPE_PAYMENT_LINK_EXPIRY_MINUTES=30
STRIPE_STARTER_PRICE_ID=price_your_starter_plan_id
STRIPE_PROFESSIONAL_PRICE_ID=price_your_professional_plan_id
```

---

## Installation & Local Setup Guide

Follow these step-by-step instructions to get the application up and running locally.

### Prerequisites
* **Node.js** (v18.x or later)
* **PostgreSQL** (v14.x or hosted Neon PostgreSQL instance)
* **npm** or **yarn** package manager
* **Stripe CLI** *(optional, required for local webhook testing)*

### 1. Repository Setup
```bash
git clone https://github.com/Marmkumar2003/invoice-billing-manager.git
cd invoice-billing-manager
```

### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install Node dependencies
npm install

# Copy environment template and configure variables
cp .env.example .env
# Open .env and add your PostgreSQL connection string & secrets

# Run Prisma Database Migrations
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# Start Backend Development Server
npm run dev
```
The server will run on `http://localhost:5000`.

### 3. Frontend Setup
```bash
# Navigate to client directory (from project root)
cd ../client

# Install React dependencies
npm install

# Start Vite Development Server
npm run dev
```
The frontend client will run on `http://localhost:5173`.

---

## Local Webhook Testing with Stripe CLI

To test Stripe Payment Links and Subscription Webhooks locally:

1. Install and authenticate the **Stripe CLI**:
   ```bash
   stripe login
   ```

2. Forward Stripe events to your local Express server endpoint:
   ```bash
   stripe listen --forward-to localhost:5000/api/v1/stripe-payment/webhook
   ```
   *For testing subscriptions webhook specifically:*
   ```bash
   stripe listen --forward-to localhost:5000/api/v1/subscriptions/webhook
   ```

3. Copy the output `whsec_...` signing secret into your `server/.env` as `STRIPE_WEBHOOK_SECRET`.

---

## Key Technical & Architectural Decisions

* **Layered Architecture over Monolithic Handlers**: Separating controllers and services ensures that complex transactional operations (such as calculating payment balances and updating invoice status atomically) are clean, isolated, and easy to unit test.
* **Prisma `$transaction` API**: Financial records must maintain absolute integrity. Atomic transactions prevent partial writes when creating multi-item invoices or applying manual/Stripe payments.
* **Idempotent Webhook Processing**: Stripe webhooks can be delivered multiple times. Unique database constraints on `stripeCheckoutSessionId` and `stripeSubscriptionId` prevent duplicate payment entries or race conditions.
* **Headless Chrome PDF Rendering**: Rather than client-side HTML canvas rendering which suffers from font mismatches and page breaks, Puppeteer renders server-side print-exact A4 PDFs from custom HTML/CSS templates.
* **HTTP-Only Cookie Refresh Strategy**: Storing long-lived refresh tokens in `httpOnly` cookies mitigates XSS risks while maintaining persistent user sessions via Axios interceptors.

---

## Future Enhancements

* [ ] **Automated Recurring Invoices**: Scheduled cron jobs for generating periodic recurring client invoices.
* [ ] **Multi-Currency Support**: Dynamic currency symbol selection and exchange rate conversions.
* [ ] **Automated Test Suite**: Unit and integration test coverage using Jest, Supertest, and React Testing Library.
* [ ] **Role-Based Access Control (RBAC)**: Multi-user organization accounts with Admin, Manager, and Viewer permissions.
* [ ] **Export & Reporting**: CSV/Excel exporting for revenue statements and tax summary reports.

---

## Screenshots

> Add application screenshots here.

---

## Author & License

**Developer**: Marmkumar T. Akhiyaniya  
**License**: [ISC License](file:///d:/Workspaces/invoice-billing-manager/server/package.json)
