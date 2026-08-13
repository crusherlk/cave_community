/** biome-ignore-all lint/style/noNonNullAssertion: <explanation> */
import { createClient } from "@libsql/client";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";

config({ path: ".env.local" });

import { relations } from "./relations";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});
export const db = drizzle({ client, relations });
