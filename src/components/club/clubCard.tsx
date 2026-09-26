import { Link } from "@tanstack/react-router";

type CardProps = {
  id: number;
  name: string;
  shortDescription: string;
  memberCount: number;
};

function ClubCard({ club }: { club: CardProps }) {
  return (
    <Link
      to="/$clubId"
      params={{ clubId: club.id.toString() }}
      className="overflow-hidden rounded-lg border border-border bg-white transition-shadow duration-500 hover:shadow"
    >
      <div className="h-44 w-full bg-stone-500"></div>
      <div className="space-y-4 p-4">
        <div className="flex items-center gap-2">
          <div className="size-10 shrink-0 rounded-lg bg-stone-500"></div>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap font-medium text-lg">
            {club.name}
          </span>
        </div>
        <div className="line-clamp-3 min-h-18 overflow-hidden text-ellipsis">
          {club.shortDescription}
        </div>
        <div className="flex items-center gap-2">
          <span>{club.memberCount} Members</span>
          <span>•</span>
          <span className="font-medium">Free</span>
        </div>
      </div>
    </Link>
  );
}

export default ClubCard;
