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
export const SESSION_REFRESH_SECONDS = 60 * 60 * 24 * 7; //7days

export async function createUserSession(userId: number) {
  const sessionId = crypto.randomBytes(512).toString("hex").normalize();

  await db.insert(SessionTable).values({
    token: sessionId,
    expiresAt: new Date(Date.now() + SESSION_EXPIRE_SECONDS * 1000),
    userId,
  });

  setSessionCookie(sessionId);
}

async function _getUserSession() {
  const sessionId = getSessionCookie();
  if (sessionId == null) return null;

  const session = await findSessionByToken(sessionId);
  if (session == null) return null;

  // check expiration & update
  const now_ms = Date.now();
  const remaining_ms = session.expiresAt.getTime() - now_ms;

  // logic to not refresh
  if (remaining_ms / 1000 > SESSION_REFRESH_SECONDS) {
    return session;
  }

  // refresh session
  const updatedSession = await updateSessionByToken(sessionId);
  return updatedSession;
}

async function findSessionByToken(sessionId: string) {
  return await db.query.SessionTable.findFirst({
    where: {
      token: sessionId,
      expiresAt: {
        gt: new Date(),
      },
    },
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

async function updateSessionByToken(sessionId: string) {
  const updatedSession = await db.transaction(async (tx) => {
    await tx
      .update(SessionTable)
      .set({ expiresAt: new Date(Date.now() + SESSION_EXPIRE_SECONDS * 1000) })
      .where(eq(SessionTable.token, sessionId));

    return await tx.query.SessionTable.findFirst({
      where: {
        token: sessionId,
      },
      with: {
        user: {
          columns: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  });
  if (updatedSession == null) return null;

  setSessionCookie(updatedSession.token);
  return updatedSession;
}

export const getUserSession = cache(_getUserSession);

export async function removeAllUserSessionsById(userId: number) {
  await db.delete(SessionTable).where(eq(SessionTable.userId, userId));

  clearSessionCookie();
}
