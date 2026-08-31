import { createServerFn } from "@tanstack/react-start";
import { and, eq, or } from "drizzle-orm";
import { db } from "#/drizzle/db";
import { ClubMemberTable } from "#/drizzle/schema";

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
