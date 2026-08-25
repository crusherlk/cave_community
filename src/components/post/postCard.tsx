import { Link } from "@tanstack/react-router";
import { MessageCircleIcon, ThumbsUpIcon } from "lucide-react";
import { formatDate } from "#/lib/date-format";
import { Button } from "../ui/button";
import PostHeader from "./postHeader";

type CardProps = {
  post: {
    id: number;
    title: string;
    description: string;
    clubId: number;
    author: {
      name: string;
    } | null;
    createdAt: string;
  };
};

function PostCard({ post }: CardProps) {
  return (
    <Link
      className="block space-y-2 rounded-lg border border-border bg-white p-4"
      to="/$clubId/posts/$id"
      params={{ clubId: post.clubId.toString(), id: post.id.toString() }}
    >
      <PostHeader
        username={post.author?.name || post.id.toString()}
        dateString={post.createdAt}
      />
      <p className="line-clamp-1 font-bold text-xl">{post.title}</p>
      <p className="line-clamp-2">{post.description}</p>
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
