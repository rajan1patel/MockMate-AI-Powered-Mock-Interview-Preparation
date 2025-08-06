import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js'; // Adjust the import path as necesary
const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL );
export const db = drizzle(sql,{schema} );