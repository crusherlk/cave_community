import { createServerFn } from "@tanstack/react-start";
import { db } from "#/drizzle/db";

export const findPostsByClubId = createServerFn({ method: "GET" })
  .validator((data: { clubId: number }) => data)
  .handler(async ({ data }) => {
    try {
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
  .validator((data: { postId: number; clubId: number }) => data)
  .handler(async ({ data }) => {
    try {
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
      });
      return post;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  });
