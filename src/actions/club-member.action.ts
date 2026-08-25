import { createServerFn } from "@tanstack/react-start";
import { cache } from "react";
import { getUserSessionFn } from "#/auth/actions";
import { db } from "#/drizzle/db";
import { ClubMemberTable } from "#/drizzle/schema";

export const joinNewClubFn = createServerFn({ method: "POST" })
  .validator((data: { clubId: number; userId: number }) => data)
  .handler(async ({ data }) => {
    try {
      await db.insert(ClubMemberTable).values({
        clubId: data.clubId,
        memberId: data.userId,
      });
    } catch (error) {
      console.log(error);
    }
  });

export const findClubMemberFn = createServerFn({ method: "GET" })
  .validator((data: { clubId: number; userId: number }) => data)
  .handler(async ({ data }) => {
    try {
      const existingMember = await db.query.ClubMemberTable.findFirst({
        where: {
          clubId: data.clubId,
          memberId: data.userId,
        },
      });

      if (existingMember == null) return undefined;

      return existingMember;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  });

const getClubMemberRole = cache(async (clubId: number) => {
  const session = await getUserSessionFn();

  const response = {
    isMember: false,
    user: session?.user || null,
  };

  if (session == null) return response;

  const existingMember = await findClubMemberFn({
    data: {
      userId: session.userId,
      clubId,
    },
  });

  if (existingMember == null) {
    return response;
  }

  return {
    ...response,
    isMember: true,
    role: existingMember.role,
  };
});

export const getClubMemberRoleFn = createServerFn({ method: "GET" })
  .validator((data: { clubId: number }) => data)
  .handler(async ({ data }) => {
    return await getClubMemberRole(data.clubId);
  });
