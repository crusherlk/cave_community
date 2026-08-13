import { defineRelations } from "drizzle-orm";

import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  UserTable: {
    sessions: r.many.SessionTable({
      from: r.UserTable.id,
      to: r.SessionTable.userId,
    }),
  },
  SessionTable: {
    user: r.one.UserTable({
      from: r.SessionTable.userId,
      to: r.UserTable.id,
    }),
  },
}));
