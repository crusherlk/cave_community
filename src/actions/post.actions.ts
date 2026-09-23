import { types } from "node:util";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";
import { db } from "#/drizzle/db";
import { PostCommentTable, PostLikeTable, PostTable } from "#/drizzle/schema";
import { authMiddleware } from "#/middleware/auth-middleware";

export const findPostsByClubId = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((data: { clubId: number }) => data)
  .handler(async ({ data, context }) => {
    if (!context.session) {
      throw redirect({ to: "/signin" });
    }
    try {
      const userId = context.session.userId;
      const posts = await db.query.PostTable.findMany({
        limit: 10,
        where: {
          clubId: data.clubId,
        },
        with: {
          author: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
        extras: {
          likeCount: (table) =>
            db.$count(PostLikeTable, eq(PostLikeTable.postId, table.id)),
          commentCount: (table) =>
            db.$count(PostCommentTable, eq(PostCommentTable.postId, table.id)),
          isLiked: (table) =>
            sql<boolean>`(
            select exists (
              select 1 from ${PostLikeTable} 
              where ${PostLikeTable.postId} = ${table.id} 
              and ${PostLikeTable.userId} = ${userId}
            )
          )`.mapWith(Boolean),
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return posts;
    } catch (error) {
      console.log(error);
      return [];
    }
  });

export const findPostByPostIdClubId = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((data: { postId: number; clubId: number }) => data)
  .handler(async ({ data, context }) => {
    if (!context.session) {
      throw redirect({ to: "/signin" });
    }
    try {
      const userId = context.session.userId;

      const post = await db.query.PostTable.findFirst({
        where: {
          id: data.postId,
          clubId: data.clubId,
        },
        with: {
          author: {
            columns: {
              name: true,
            },
          },
        },
        extras: {
          likeCount: (table) =>
            db.$count(PostLikeTable, eq(PostLikeTable.postId, table.id)),
          commentCount: (table) =>
            db.$count(PostCommentTable, eq(PostCommentTable.postId, table.id)),
          isLiked: (table) =>
            sql<boolean>`(
            select exists (
              select 1 from ${PostLikeTable} 
              where ${PostLikeTable.postId} = ${table.id} 
              and ${PostLikeTable.userId} = ${userId}
            )
          )`.mapWith(Boolean),
        },
      });
      return post;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  });

export const createPostFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { title: string; content: string; clubId: number }) => data)
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
          authorId: context.session.userId,
        };

        await db.insert(PostTable).values(payload).returning();

        return {
          status: "success",
          message: "post created successfully",
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
