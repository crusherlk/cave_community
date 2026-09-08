import { createMiddleware } from "@tanstack/react-start";
import { getUserSessionFn } from "#/auth/actions";

export const authMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const session = await getUserSessionFn();

    return next({ context: { session } });
  },
);
