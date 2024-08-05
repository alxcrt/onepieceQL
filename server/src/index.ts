import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger());

app.get("/", (c) => {
  return c.text("k it works HONO 🚀");
});

const port = 4001;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
