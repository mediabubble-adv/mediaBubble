import { defineConfig } from 'prisma/config';

// Prisma schema requires DIRECT_URL; Vercel/Prisma Compute often inject DATABASE_URL only.
if (!process.env.DIRECT_URL?.trim() && process.env.DATABASE_URL?.trim()) {
  process.env.DIRECT_URL = process.env.DATABASE_URL;
}

export default defineConfig({
  schema: 'apps/launcher/prisma/schema.prisma',
  migrations: {
    path: 'apps/launcher/prisma/migrations',
  },
  seed: 'tsx apps/launcher/prisma/seed.ts',
});
