import {
  getRequestHeader,
  setResponseHeader,
} from "@tanstack/react-start/server";
import { SESSION_COOKIE, SESSION_EXPIRE_SECONDS } from "./session";

export function setSessionCookie(token: string) {
  setResponseHeader(
    "Set-Cookie",
    [
      `${SESSION_COOKIE}=${token}`,
      "HttpOnly",
      "Secure",
      "SameSite=Lax",
      "Path=/",
      `Max-Age=${SESSION_EXPIRE_SECONDS}`,
    ].join("; "),
  );
}

export function clearSessionCookie() {
  setResponseHeader(
    "Set-Cookie",
    [
      `${SESSION_COOKIE}=`,
      "HttpOnly",
      "Secure",
      "SameSite=Lax",
      "Path=/",
      `Max-Age=0`,
    ].join("; "),
  );
}

export function getSessionCookie() {
  const header = getRequestHeader("Cookie");

  if (!header) return null;

  for (const part of header.split(/;\s*/)) {
    const eq = part.indexOf("=");

    if (eq === -1) continue;
    if (part.slice(0, eq) === SESSION_COOKIE) return part.slice(eq + 1);
  }

  return null;
}
