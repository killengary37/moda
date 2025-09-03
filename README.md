# Moda - Nike Store

A modern e-commerce application built with Next.js, TypeScript, and a comprehensive tech stack.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: Better Auth
- **State Management**: Zustand
- **Linting**: ESLint

## Features

- 🛍️ Product catalog with Nike items
- 🎨 Modern, responsive UI with Tailwind CSS
- 🔐 Authentication system with Better Auth
- 📊 PostgreSQL database with Drizzle ORM
- 🚀 State management with Zustand
- 📱 Mobile-first responsive design

## Getting Started

### Prerequisites

- Node.js 18+ 
- A Neon PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your database URL and other required variables.

4. Generate and push database schema:
   ```bash
   npm run db:push
   ```

5. Seed the database with sample Nike products:
   ```bash
   npm run db:seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Database Scripts

- `npm run db:generate` - Generate migration files
- `npm run db:migrate` - Run migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with sample data

## Project Structure

```
src/
├── app/                 # Next.js app router
├── components/          # React components
├── lib/
│   ├── db/             # Database configuration and schema
│   └── auth.ts         # Better Auth configuration
└── store/              # Zustand stores
```

## Environment Variables

Required environment variables (see `.env.example`):

- `DATABASE_URL` - Neon PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Secret key for Better Auth
- `BETTER_AUTH_URL` - Base URL for authentication
- `GITHUB_CLIENT_ID` - GitHub OAuth client ID (optional)
- `GITHUB_CLIENT_SECRET` - GitHub OAuth client secret (optional)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Submit a pull request