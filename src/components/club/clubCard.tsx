import { Link } from "@tanstack/react-router";

function ClubCard() {
  return (
    <Link
      to="/$clubId"
      params={{ clubId: "ai-camp" }}
      className="overflow-hidden rounded-lg border border-border bg-white transition-shadow duration-500 hover:shadow"
    >
      <div className="h-44 w-full bg-stone-500"></div>
      <div className="space-y-4 p-4">
        <div className="flex items-center gap-2">
          <div className="size-10 shrink-0 rounded-lg bg-stone-500"></div>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap font-medium text-lg">
            AI Video Bootcamp
          </span>
        </div>
        <div className="line-clamp-3 overflow-hidden text-ellipsis">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa nostrum
          nesciunt, facere, excepturi blanditiis nulla aperiam architecto harum
          fugit facilis iusto laboriosam accusamus aut itaque rerum illo eveniet
          iste. Sit sint dolorum, ipsum dolore omnis aut similique
          necessitatibus officia aliquid!
        </div>
        <div className="flex items-center gap-2">
          <span>25.7k Members</span>
          <span>•</span>
          <span className="font-medium">Free</span>
        </div>
      </div>
    </Link>
  );
}

export default ClubCard;
