import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_appLayout/_club/$clubId/_memberAuth")({
  beforeLoad: ({ params, context }) => {
    if (context.existingMember.isMember === false) {
      throw redirect({
        to: "/$clubId/about",
        params: { clubId: params.clubId },
      });
    }
  },
});
