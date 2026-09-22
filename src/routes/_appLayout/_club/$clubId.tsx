import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { findClubById } from "#/actions/club.actions";
import { getClubMemberRoleFn } from "#/actions/club-member.action";
import ClubNav from "#/components/club/clubNav";
import ClubSidePanel from "#/components/club/clubSidePanel";

export const Route = createFileRoute("/_appLayout/_club/$clubId")({
  component: RouteComponent,
  beforeLoad: async ({ params }) => {
    const club = await findClubById({
      data: {
        clubId: parseInt(params.clubId),
      },
    });

    if (club == null) throw notFound();

    return { club: club };
  },
  loader: async ({ params, context }) => {
    const existingMember = await getClubMemberRoleFn({
      data: { clubId: parseInt(params.clubId) },
    });

    return {
      club: context.club,
      user: existingMember.user,
      isMember: existingMember.isMember,
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
