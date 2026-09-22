import { createFileRoute, notFound } from "@tanstack/react-router";
import { MessageCircleIcon, ThumbsUpIcon } from "lucide-react";
import { findPostByPostIdClubId } from "#/actions/post.actions";
import CommentCard from "#/components/comment/commentCard";
import CreateComment from "#/components/comment/createComment";
import PostHeader from "#/components/post/postHeader";
import { Button } from "#/components/ui/button";

export const Route = createFileRoute("/_appLayout/_club/$clubId/_memberAuth/posts/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const post = await findPostByPostIdClubId({
      data: {
        postId: parseInt(params.id),
        clubId: parseInt(params.clubId),
      },
    });

    if (!post) throw notFound();

    return { post };
  },
});

function RouteComponent() {
  const { post } = Route.useLoaderData();
  return (
    <div className="space-y-4 rounded-lg bg-white p-6">
      <PostHeader
        username={post.author?.name || post.authorId.toString()}
        dateString={post.createdAt}
      />
      {/* content */}
      <div className="space-y-2 pr-4">
        <p className="font-bold text-xl">{post.title}</p>
        <p>{post.content}</p>
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
