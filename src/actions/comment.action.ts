import { types } from "node:util";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { db } from "#/drizzle/db";
import { PostCommentTable } from "#/drizzle/schema";
import { authMiddleware } from "#/middleware/auth-middleware";

export const createCommentFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { content: string; postId: number }) => data)
  .handler(
    async ({
      data,
      context,
    }): Promise<
      | {
          status: "success";
          message: string;
        }
      | { status: "error"; message: string }
    > => {
      if (!context.session) {
        throw redirect({ to: "/signin" });
      }

      try {
        const payload = {
          ...data,
          userId: context.session.userId,
        };

        await db.insert(PostCommentTable).values(payload).returning();

        return {
          status: "success",
          message: "comment created successfully",
        };
      } catch (error) {
        const message = types.isNativeError(error)
          ? error.message
          : "something went wrong";
        console.log(error);

        return {
          status: "error",
          message: message,
        };
      }
    },
  );

export const findCommentsByPostIdFn = createServerFn({ method: "GET" })
  .validator((data: { postId: number }) => data)
  .handler(async ({ data }) => {
    try {
      const comments = await db.query.PostCommentTable.findMany({
        limit: 10,
        where: {
          postId: data.postId,
        },
        with: {
          user: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return comments;
    } catch {
      return [];
    }
  });
