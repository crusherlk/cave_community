import { MessageCircleIcon, ThumbsUpIcon } from "lucide-react";
import { useReducer, useState } from "react";
import { togglePostLikeFn } from "#/actions/postLikes.actions";
import { cn } from "#/lib/utils";
import { Button } from "../ui/button";
import PostHeader from "./postHeader";

function likeCountReducer(state: number, action: "inc" | "dec") {
  switch (action) {
    case "inc":
      return state + 1;
    case "dec":
      return state > 0 ? state - 1 : 0;
    default:
      return 0;
  }
}

type CardProps = {
  post: {
    id: number;
    title: string;
    content: string;
    clubId: number;
    author: {
      name: string;
    } | null;
    createdAt: string;
    likeCount: number;
    commentCount: number;
    isLiked: boolean;
  };
};

function PostCard({ post }: CardProps) {
  const [isUserLiked, setUserLiked] = useState<boolean>(post.isLiked);
  const [totalLikes, likeDispatch] = useReducer(
    likeCountReducer,
    post.likeCount,
  );

  return (
    <>
      <PostHeader
        username={post.author?.name || post.id.toString()}
        dateString={post.createdAt}
      />
      <p className="line-clamp-1 font-bold text-xl">{post.title}</p>
      <p className="line-clamp-2">{post.content}</p>
      <div className="mt-4 flex gap-2">
        <Button
          variant="outline"
          className={cn(isUserLiked && "bg-primary/10")}
          onClick={async (e) => {
            e.preventDefault();
            const res = await togglePostLikeFn({
              data: { postId: post.id, newStatus: !isUserLiked },
            });

            if (res.status === "success") {
              if (res.data.isLiked) {
                likeDispatch("inc");
                setUserLiked(true);
              } else {
                likeDispatch("dec");
                setUserLiked(false);
              }
            }
          }}
        >
          <ThumbsUpIcon data-icon="inline-start" />
          {totalLikes}
        </Button>
        <Button variant="outline">
          <MessageCircleIcon data-icon="inline-start" />
          {post.commentCount}
        </Button>
      </div>
    </>
  );
}

export default PostCard;
