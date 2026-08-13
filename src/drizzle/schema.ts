import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const UserTable = sqliteTable("users", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  createdAt: text().notNull().default(sql`(current_timestamp)`),
  updatedAt: text()
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

export const SessionTable = sqliteTable(
  "sessions",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    token: text().notNull().unique(),
    expiresAt: integer().notNull(),
    createdAt: text().notNull().default(sql`(current_timestamp)`),
    updatedAt: text()
      .notNull()
      .default(sql`(current_timestamp)`)
      .$onUpdate(() => sql`(current_timestamp)`),
    userId: integer()
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);
