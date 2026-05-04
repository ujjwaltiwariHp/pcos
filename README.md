# PCOS Detector Monorepo

A health screening web app to assess PCOS risk using AI.

## Structure

- `apps/web`: Next.js 14 frontend
- `apps/api`: Express backend
- `packages/db`: Drizzle ORM schema and client

## Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS, shadcn/ui, Zustand
- **Backend:** Node.js, Express, Zod, JWT
- **Database:** PostgreSQL (Neon), Drizzle ORM
- **AI:** Anthropic Claude 3.5 Sonnet

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables:
   - Copy `apps/api/.env.example` to `apps/api/.env` and fill in the values.
   - Copy `apps/web/.env.example` to `apps/web/.env` and fill in the values.

3. Run migrations (once DATABASE_URL is set):
   ```bash
   cd packages/db
   pnpm drizzle-kit push
   ```

4. Start development:
   ```bash
   pnpm dev
   ```

## Admin Access

To create an admin user, you can manually update the `role` column in the `users` table to `admin` for your account.
