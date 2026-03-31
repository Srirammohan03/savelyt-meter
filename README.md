# Savely

Premium fintech-style SaaS foundation built with Next.js App Router, TypeScript, TailwindCSS, Framer Motion, Prisma, and PostgreSQL.

## Setup

1. Copy `.env.example` to `.env` and set your PostgreSQL connection.
2. Install dependencies: `npm install`
3. Generate Prisma client: `npm run prisma:generate`
4. Run migrations: `npm run prisma:migrate`
5. Start dev server: `npm run dev`

## Included in this build

- Auth UI (email + Google CTA)
- Responsive dashboard layout (sidebar + mobile bottom nav)
- Design system primitives
- Dynamic income/expense CRUD APIs with Zod validation
- Prisma schema for User/Income/Expense/Category
- Dynamic dashboard cards, chart, activity feed, and animated forms
