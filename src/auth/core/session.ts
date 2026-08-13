import crypto from "node:crypto";
import { eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "#/drizzle/db";
import { SessionTable } from "#/drizzle/schema";
import {
  clearSessionCookie,
  getSessionCookie,
  setSessionCookie,
} from "./cookies";

export const SESSION_COOKIE = "__Host-session";
export const SESSION_EXPIRE_SECONDS = 60 * 60 * 24 * 14; //14days

export async function createUserSession(userId: number) {
  const sessionId = crypto.randomBytes(512).toString("hex").normalize();

  await db.insert(SessionTable).values({
    token: sessionId,
    expiresAt: Date.now() + SESSION_EXPIRE_SECONDS,
    userId,
  });

  setSessionCookie(sessionId);
}

async function _getUserSession() {
  const sessionId = getSessionCookie();
  if (sessionId == null) return null;

  const session = await findSessionByToken(sessionId);
  if (session == null) return null;

  return session;
}

async function findSessionByToken(sessionId: string) {
  return await db.query.SessionTable.findFirst({
    where: {
      token: sessionId,
    },
    with: {
      user: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
  });
}

export const getUserSession = cache(_getUserSession);

export async function removeAllUserSessionsById(userId: number) {
  await db.delete(SessionTable).where(eq(SessionTable.userId, userId));

  clearSessionCookie();
}
