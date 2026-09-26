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
    const [post, comments] = await Promise.all([
      findPostByPostIdClubId({
        data: {
          postId: parseInt(params.id),
          clubId: parseInt(params.clubId),
        },
      }),
      findCommentsByPostIdFn({
        data: { postId: parseInt(params.id) },
      }),
    ]);

    if (!post) throw notFound();

    return { post, comments };
  },
  pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
  const { existingMember } = Route.useRouteContext();
  const { post, comments } = Route.useLoaderData();

  const user = existingMember.user;

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
