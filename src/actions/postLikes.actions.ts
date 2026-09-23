import { types } from "node:util";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { db } from "#/drizzle/db";
import { PostLikeTable } from "#/drizzle/schema";
import { authMiddleware } from "#/middleware/auth-middleware";

const changePostLikeStatus = async ({
  newStatus,
  userId,
  postId,
}: {
  postId: number;
  userId: number;
  newStatus: boolean;
}): Promise<{
  postId: number;
  updatedStatus: boolean;
}> => {
  if (newStatus) {
    await db
      .insert(PostLikeTable)
      .values({
        userId,
        postId,
      })
      .onConflictDoNothing();

    return {
      postId,
      updatedStatus: true,
    };
  }
  await db
    .delete(PostLikeTable)
    .where(
      and(eq(PostLikeTable.postId, postId), eq(PostLikeTable.userId, userId)),
    );

  return {
    postId,
    updatedStatus: false,
  };
};

export const togglePostLikeFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { postId: number; newStatus: boolean }) => data)
  .handler(
    async ({
      data,
      context,
    }): Promise<
      | {
          status: "success";
          data: {
            postId: number;
            isLiked: boolean;
          };
        }
      | { status: "error"; message: string }
    > => {
      if (!context.session) {
        throw redirect({ to: "/signin" });
      }

      try {
        const res = await changePostLikeStatus({
          postId: data.postId,
          userId: context.session.userId,
          newStatus: data.newStatus,
        });

        return {
          status: "success",
          data: {
            postId: res.postId,
            isLiked: res.updatedStatus,
          },
        };
      } catch (error) {
        const message = types.isNativeError(error)
          ? error.message
          : "something went wrong";
        console.log(error);

        return {
          status: "error",
          message,
        };
      }
    },
  );
