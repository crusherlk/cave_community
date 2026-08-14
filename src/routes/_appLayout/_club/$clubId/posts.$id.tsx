import { createFileRoute } from "@tanstack/react-router";
import { MessageCircleIcon, ThumbsUpIcon } from "lucide-react";
import CommentCard from "#/components/comment/commentCard";
import CreateComment from "#/components/comment/createComment";
import PostHeader from "#/components/post/postHeader";
import { Button } from "#/components/ui/button";

export const Route = createFileRoute("/_appLayout/_club/$clubId/posts/$id")(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  return (
    <div className="space-y-4 rounded-lg bg-white p-6">
      <PostHeader />
      {/* content */}
      <div className="space-y-2 pr-4">
        <p className="font-bold text-xl">
          Massive opportunity for trch bloggers !!!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
          adipisci nemo voluptatem autem consequatur similique at libero
          cupiditate! Dolorem sit quos odio reiciendis aliquid repellendus sint?
          Corrupti, dolores culpa? Eligendi nam vero culpa aut sapiente, nihil
          molestiae commodi cupiditate quidem doloremque et velit laudantium,
          corrupti ipsum, tempore dolorum soluta. Ad.
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          <ThumbsUpIcon data-icon="inline-start" />
          100
        </Button>
        <Button variant="outline">
          <MessageCircleIcon data-icon="inline-start" />
          100
        </Button>
      </div>
      <div className="space-y-8 border-t py-4">
        <div className="space-y-4">
          <CommentCard />
          <CommentCard />
          <CommentCard />
        </div>
        <CreateComment />
      </div>
    </div>
  );
}
