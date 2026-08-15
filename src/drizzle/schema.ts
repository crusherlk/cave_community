import { sql } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

// auth tables
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
    expiresAt: integer({ mode: "timestamp" }).notNull(),
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
//

// club related
export const ClubTable = sqliteTable(
  "clubs",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    description: text().notNull(),
    ownerId: integer()
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),
    createdAt: text().notNull().default(sql`(current_timestamp)`),
    updatedAt: text()
      .notNull()
      .default(sql`(current_timestamp)`)
      .$onUpdate(() => sql`(current_timestamp)`),
  },
  (table) => [index("club_ownerId_idx").on(table.ownerId)],
);
export const ClubMemberTable = sqliteTable(
  "club_members",
  {
    memberId: integer()
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),
    clubId: integer()
      .notNull()
      .references(() => ClubTable.id, { onDelete: "cascade" }),
    role: text({ enum: ["member", "moderator", "owner"] })
      .notNull()
      .default("member"),
    createdAt: text().notNull().default(sql`(current_timestamp)`),
    updatedAt: text()
      .notNull()
      .default(sql`(current_timestamp)`)
      .$onUpdate(() => sql`(current_timestamp)`),
  },
  (table) => [
    primaryKey({ columns: [table.clubId, table.memberId] }),
    index("club_member_memberId_idx").on(table.memberId),
  ],
);
//

// post related
export const PostTable = sqliteTable(
  "posts",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    title: text().notNull(),
    description: text().notNull(),
    clubId: integer()
      .notNull()
      .references(() => ClubTable.id, { onDelete: "cascade" }),
    authorId: integer()
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),
    createdAt: text().notNull().default(sql`(current_timestamp)`),
    updatedAt: text()
      .notNull()
      .default(sql`(current_timestamp)`)
      .$onUpdate(() => sql`(current_timestamp)`),
  },
  (table) => [
    index("post_clubId_idx").on(table.clubId),
    index("post_authorId_idx").on(table.authorId),
  ],
);
export const PostLikeTable = sqliteTable(
  "post_likes",
  {
    postId: integer()
      .notNull()
      .references(() => PostTable.id, { onDelete: "cascade" }),
    userId: integer()
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),
    createdAt: text().notNull().default(sql`(current_timestamp)`),
  },
  (table) => [
    primaryKey({ columns: [table.postId, table.userId] }),
    index("postLike_userId_idx").on(table.userId),
  ],
);
export const PostCommentTable = sqliteTable(
  "post_comments",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    content: text().notNull(),
    postId: integer()
      .notNull()
      .references(() => PostTable.id, { onDelete: "cascade" }),
    userId: integer()
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),
    createdAt: text().notNull().default(sql`(current_timestamp)`),
    updatedAt: text()
      .notNull()
      .default(sql`(current_timestamp)`)
      .$onUpdate(() => sql`(current_timestamp)`),
  },
  (table) => [
    index("postComment_postId_idx").on(table.postId),
    index("postComment_userId_idx").on(table.userId),
  ],
);
