import * as dbSchema from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const client = new pg.Client({
  connectionString: "postgresql://luffy:onepieceisreal@localhost:5432/onepiece",
});

await client.connect();

export const db = drizzle(client, { schema: dbSchema });
