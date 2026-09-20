# BookWise Portal

**Tagline:** Discover. Read. Listen. Order.

Production-ready full-stack bookstore foundation built for both BCA final-year submission and commercial growth.

## 1) Final Technology Stack

### Frontend + Backend
- **Next.js 16 (App Router)**
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Server-first architecture** (Route Handlers + Server Actions in upcoming phases)

### Data Layer
- **PostgreSQL**
- **Prisma ORM**

### Planned Integrations (phase-wise)
- Auth.js (Google + email/password architecture)
- Razorpay (UPI/cards/net banking/wallet via gateway)
- Resend/SendGrid/SES for transactional email
- S3/R2/Supabase Storage for media assets

## 2) Complete Architecture

```text
User (Web/Mobile Browser)
  ↓
Next.js Frontend (UI, SSR, SEO)
  ↓
Auth Layer (Auth.js, sessions, role checks) [Phase 2+]
  ↓
Application Services (catalog/cart/checkout/orders/audiobooks)
  ↓
Prisma ORM
  ↓
PostgreSQL
  ↘
   Razorpay (payments + webhook verification)
   Email Provider (transactional events)
   Object Storage (covers/previews/protected audio)
```

## 3) Database ER Design (Core)

- **User** 1—N **Address, Order, Review, Wishlist, ListeningProgress**
- **Category** 1—N **Book**
- **Cart** 1—N **CartItem**
- **Order** 1—N **OrderItem**, 1—1 **Payment**
- **Audiobook** 1—N **AudiobookChapter**
- **User** N—N **Audiobook** through **AudiobookPurchase**
- **Book** 1—N **Review**, N—N with **User** via **Wishlist**

## 4) Database Schema

Implemented in `/home/runner/work/BookWise-Portal/BookWise-Portal/prisma/schema.prisma` with:
- Enums for role, order status, payment status, payment method, coupon type, book format
- Fully related entities from requirement baseline
- Unique constraints and indexing on search and relational fields
- Decimal support for all financial values

## 5) Folder Structure

```text
app/
  page.tsx
  books/
  audiobooks/
  cart/
  checkout/
  account/
  orders/
  admin/
  api/
components/
  home/
lib/
prisma/
  schema.prisma
  seed.ts
services/
types/
utils/
public/
.env.example
```

## 6) Development Roadmap

1. **Phase 1**: setup + UI foundation + Prisma schema ✅
2. **Phase 2**: authentication and user model integration
3. **Phase 3**: catalog, categories, search, filters
4. **Phase 4**: book details + controlled preview
5. **Phase 5**: cart + multi-step checkout
6. **Phase 6**: Razorpay + COD + verification logic
7. **Phase 7**: order pipeline + transactional emails
8. **Phase 8**: audiobook purchase + protected streaming + progress
9. **Phase 9**: user dashboard (orders, audiobooks, wishlist, addresses)
10. **Phase 10**: admin dashboard and management modules
11. **Phase 11**: reviews, wishlist, coupons completion
12. **Phase 12**: security hardening + tests
13. **Phase 13**: SEO/performance
14. **Phase 14**: production deployment

## 7) Required External Services

- PostgreSQL provider (Supabase/Neon/Railway)
- Google OAuth credentials
- Razorpay merchant account
- Transactional email provider (Resend/SendGrid/SES)
- Object storage (S3/R2/Supabase Storage)

## 8) Environment Variables

See `/home/runner/work/BookWise-Portal/BookWise-Portal/.env.example`.

Core groups:
- Database: `DATABASE_URL`
- Auth: `AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- Payment: `RAZORPAY_*`
- Email: `EMAIL_API_KEY`, `EMAIL_FROM`
- Storage: `STORAGE_*`
- Seed bootstrap: `SEED_ADMIN_*`

## 9) Security Architecture

- Password hashing with secure algorithm (Phase 2+)
- Role-based route protection for admin (Phase 2+)
- Server-side validation on all writes (Phase 2+)
- Transaction-safe order/inventory operations (Phase 5+)
- Payment signature and webhook verification (Phase 6)
- Protected audiobook access (signed/authorized streaming, Phase 8)
- Secrets in env vars only
- ORM-protected SQL access via Prisma

## Phase 1 Delivered

- Next.js + TypeScript + Tailwind production starter
- Premium responsive homepage foundation
- Core routing placeholders for major modules
- Prisma schema with all key business entities
- Seed scaffold with secure admin bootstrap approach
- SEO baseline (`sitemap.ts`, `robots.ts`)
- `.env.example` for deployment-ready configuration

## How to Run

```bash
npm install
npm run prisma:generate
npm run dev
```

### Database (local/dev)

```bash
# after setting DATABASE_URL
npm run prisma:migrate
npm run prisma:seed
```

## Testing Phase 1

```bash
npm run lint
npm run build
```

## Copyright + Content Compliance

Use only public-domain, licensed, or self-owned content for covers, previews, descriptions, and audiobooks before production deployment.
