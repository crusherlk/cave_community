import { createFileRoute, notFound } from "@tanstack/react-router";
import { LockIcon, TagIcon, UsersIcon } from "lucide-react";
import { findClubById } from "#/actions/club.actions";
import { Avatar, AvatarFallback } from "#/components/ui/avatar";

export const Route = createFileRoute("/_appLayout/_club/$clubId/about")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const club = await findClubById({
      data: {
        clubId: parseInt(params.clubId),
      },
    });

    if (!club) throw notFound();

    return { club };
  },
});

function RouteComponent() {
  const { club } = Route.useLoaderData();
  return (
    <main className="space-y-8 rounded-lg border-border bg-white p-6">
      <div className="space-y-6">
        <h2 className="font-bold text-2xl">{club.name}</h2>
        <div className="h-100 w-full rounded-lg bg-gray-500"></div>
        <div className="mt-10 flex flex-wrap items-center gap-10">
          <div className="flex gap-2">
            <LockIcon />
            <span className="font-medium">Private</span>
          </div>
          <div className="flex gap-2">
            <UsersIcon />
            <span className="font-medium">{club.memberCount} Members</span>
          </div>
          <div className="flex gap-2">
            <TagIcon />
            <span className="font-medium">Free</span>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="cursor-pointer">
              <AvatarFallback>
                {club.owner?.name.slice(0, 2).toUpperCase() || "CA"}
              </AvatarFallback>
            </Avatar>
            <p className="font-medium">
              By <span className="capitalize">{club.owner?.name}</span>
            </p>
          </div>
        </div>
      </div>
      <div>{club.longDescription}</div>
    </main>
  );
}
