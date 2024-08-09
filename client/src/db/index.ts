import * as dbSchema from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const client = new pg.Client({
  connectionString: "postgresql://luffy:onepieceisreal@localhost:5432/onepiece",
});

// Connect to the database (use this to resolve the top-level await)
(async () => await client.connect())();

const db = drizzle(client, { schema: dbSchema, logger: true });

export default db;
