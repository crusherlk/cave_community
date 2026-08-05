import { Link } from "@tanstack/react-router";
import { MessageCircleIcon, ThumbsUpIcon } from "lucide-react";
import { Button } from "../ui/button";

function PostCard() {
  return (
    <Link
      className="block space-y-2 rounded-lg border border-border bg-white p-4"
      to="/$clubId/posts/$id"
      params={{ clubId: "test", id: "dssad" }}
    >
      <div className="flex items-center gap-2">
        <div className="size-10 shrink-0 rounded-full bg-gray-500" />
        <div className="space-y-0">
          <p className="font-medium text-base">Anze Kos</p>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <p>Feb 24</p>
            <p className="font-bold">General discussion</p>
          </div>
        </div>
      </div>
      <p className="line-clamp-1 font-bold text-xl">
        Massive opportunity for trch bloggers !!!
      </p>
      <p className="line-clamp-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus adipisci
        nemo voluptatem autem consequatur similique at libero cupiditate!
        Dolorem sit quos odio reiciendis aliquid repellendus sint? Corrupti,
        dolores culpa? Eligendi nam vero culpa aut sapiente, nihil molestiae
        commodi cupiditate quidem doloremque et velit laudantium, corrupti
        ipsum, tempore dolorum soluta. Ad.
      </p>
      <div className="mt-4 flex gap-2">
        <Button variant="outline">
          <ThumbsUpIcon data-icon="inline-start" />
          100
        </Button>
        <Button variant="outline">
          <MessageCircleIcon data-icon="inline-start" />
          100
        </Button>
      </div>
    </Link>
  );
}

export default PostCard;
