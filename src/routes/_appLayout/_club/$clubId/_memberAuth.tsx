import { createFileRoute, redirect } from "@tanstack/react-router";
import { getClubMemberRoleFn } from "#/actions/club-member.action";

export const Route = createFileRoute("/_appLayout/_club/$clubId/_memberAuth")({
  beforeLoad: async ({ params }) => {
    const existingMember = await getClubMemberRoleFn({
      data: { clubId: parseInt(params.clubId) },
    });

    if (existingMember.isMember === false) {
      throw redirect({
        to: "/$clubId/about",
        params: { clubId: params.clubId },
      });
    }
  },
});
