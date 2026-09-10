import { types } from "node:util";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { and, eq, or } from "drizzle-orm";
import { db } from "#/drizzle/db";
import { ClubMemberTable, ClubTable } from "#/drizzle/schema";
import { authMiddleware } from "#/middleware/auth-middleware";

export const findClubs = createServerFn({ method: "GET" })
  .validator((data: { query: string }) => data)
  .handler(async ({ data }) => {
    try {
      const searchQuery = data.query.trim();

      const filters: { name?: object } = {};

      if (searchQuery !== "") {
        filters.name = {
          like: `%${searchQuery}%`,
        };
      }

      const clubs = await db.query.ClubTable.findMany({
        where: {
          ...filters,
        },
        extras: {
          memberCount: (club) =>
            db.$count(ClubMemberTable, eq(ClubMemberTable.clubId, club.id)),
        },
        limit: 10,
      });

      return clubs;
    } catch (error) {
      console.log(error);
      return [];
    }
  });

export const findClubById = createServerFn({ method: "GET" })
  .validator((data: { clubId: number }) => data)
  .handler(async ({ data }) => {
    try {
      if (Number.isNaN(data.clubId)) {
        throw new Error("Not valid clubId");
      }

      const club = await db.query.ClubTable.findFirst({
        where: {
          id: data.clubId,
        },
        with: {
          owner: {
            columns: {
              name: true,
            },
          },
        },
        extras: {
          memberCount: (club) =>
            db.$count(ClubMemberTable, eq(ClubMemberTable.clubId, club.id)),
          adminCount: (club) =>
            db.$count(
              ClubMemberTable,
              and(
                eq(ClubMemberTable.clubId, club.id),
                or(
                  eq(ClubMemberTable.role, "moderator"),
                  eq(ClubMemberTable.role, "owner"),
                ),
              ),
            ),
        },
      });

      return club;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  });

export const createClubFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (data: {
      name: string;
      shortDescription: string;
      longDescription: string;
    }) => data,
  )
  .handler(
    async ({
      context,
      data,
    }): Promise<
      | {
          status: "success";
          message: string;
          data: { id: number; name: string };
        }
      | { status: "error"; message: string }
    > => {
      if (!context.session)
        throw redirect({
          to: "/signin",
        });

      try {
        const payload = {
          ...data,
          ownerId: context.session.userId,
        };

        const transaction = await db.transaction(async (tx) => {
          const [club] = await tx.insert(ClubTable).values(payload).returning({
            id: ClubTable.id,
            name: ClubTable.name,
          });

          await tx.insert(ClubMemberTable).values({
            clubId: club.id,
            memberId: payload.ownerId,
            role: "owner",
          });

          return { club };
        });

        // const [club] = await db
        //   .insert(ClubTable)
        //   .values({
        //     name: data.name,
        //     shortDescription: data.shortDescription,
        //     longDescription: data.longDescription,
        //     ownerId: context.session.userId,
        //   })
        //   .returning({
        //     id: ClubTable.id,
        //     name: ClubTable.name,
        //   });

        return {
          status: "success",
          message: "club created successfully",
          data: transaction.club,
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

export const deleteClubFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { clubId: number }) => data)
  .handler(async ({ data, context }) => {
    if (!context.session) throw redirect({ to: "/signin" });

    try {
      await db.delete(ClubTable).where(eq(ClubTable.id, data.clubId));

      return { status: "success" };
    } catch (error) {
      console.log(error);
      return { status: "error" };
    }
  });
