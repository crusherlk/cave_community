import { createServerFn } from "@tanstack/react-start";
import { db } from "#/drizzle/db";

export const findClubs = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const clubs = await db.query.ClubTable.findMany({ limit: 10 });

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
      const club = db.query.ClubTable.findFirst({
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
      });

      return club;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  });
