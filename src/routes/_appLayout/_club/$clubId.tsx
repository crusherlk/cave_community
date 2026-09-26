import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { findClubById } from "#/actions/club.actions";
import { getClubMemberRoleFn } from "#/actions/club-member.action";
import ClubNav from "#/components/club/clubNav";
import ClubSidePanel from "#/components/club/clubSidePanel";

export const Route = createFileRoute("/_appLayout/_club/$clubId")({
  component: RouteComponent,
  beforeLoad: async ({ params }) => {
    const clubId = parseInt(params.clubId);
    const club = await findClubById({
      data: {
        clubId,
      },
    });

    if (club == null) throw notFound();

    const existingMember = await getClubMemberRoleFn({
      data: { clubId },
    });

    return { club: club, existingMember: existingMember };
  },
  loader: async ({ context }) => {
    return {
      club: context.club,
      user: context.existingMember.user,
      isMember: context.existingMember.isMember,
    };
  },
});

function RouteComponent() {
  const { clubId } = Route.useParams();
  const { club, user, isMember } = Route.useLoaderData();
  return (
    <>
      {isMember && <ClubNav clubId={clubId} />}
      <div className="cc_container flex gap-8 py-8">
        <div className="flex-1">
          <Outlet />
        </div>
        <ClubSidePanel
          club={club}
          userId={user ? user.id : null}
          isMember={isMember}
        />
      </div>
    </>
  );
}
