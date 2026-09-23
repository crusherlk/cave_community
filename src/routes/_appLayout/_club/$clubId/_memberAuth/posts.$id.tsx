import { createFileRoute, notFound } from "@tanstack/react-router";
import { findCommentsByPostIdFn } from "#/actions/comment.action";
import { findPostByPostIdClubId } from "#/actions/post.actions";
import CommentCard from "#/components/comment/commentCard";
import CreateComment from "#/components/comment/createComment";
import PostCard from "#/components/post/postCard";

export const Route = createFileRoute(
  "/_appLayout/_club/$clubId/_memberAuth/posts/$id",
)({
  component: RouteComponent,
  loader: async ({ params }) => {
    const post = await findPostByPostIdClubId({
      data: {
        postId: parseInt(params.id),
        clubId: parseInt(params.clubId),
      },
    });

    if (!post) throw notFound();

    const comments = await findCommentsByPostIdFn({
      data: { postId: parseInt(params.id) },
    });

    return { post, comments };
  },
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  const { post, comments } = Route.useLoaderData();
  return (
    <div className="space-y-4 rounded-lg bg-white p-6">
      <PostCard post={post} />
      <div className="space-y-8 border-t py-4">
        <div className="space-y-4">
          {comments.map((c) => (
            <CommentCard key={c.id} comment={c} />
          ))}
        </div>
        <CreateComment postId={post.id} user={user} />
      </div>
    </div>
  );
}
