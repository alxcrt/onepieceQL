import * as dbSchema from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

// Open connections lazily on actual requests, never while compiling the image.
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 5 });
const db = drizzle(pool, { schema: dbSchema });
export default db;
