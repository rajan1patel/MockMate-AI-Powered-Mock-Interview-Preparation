import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
require('dotenv/config');

export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL,
  },
});
