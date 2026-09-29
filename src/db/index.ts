import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

const globalForDb = globalThis as typeof globalThis & {
  __marvelsPostgresqlPool?: Pool | null;
};

const resolvedPool = databaseUrl
  ? (globalForDb.__marvelsPostgresqlPool ??
      new Pool({
        connectionString: databaseUrl,
      }))
  : null;

if (databaseUrl && process.env.NODE_ENV !== "production") {
  globalForDb.__marvelsPostgresqlPool = resolvedPool;
}

export const pool = resolvedPool;
export const db = databaseUrl && resolvedPool ? drizzle(resolvedPool) : null;
