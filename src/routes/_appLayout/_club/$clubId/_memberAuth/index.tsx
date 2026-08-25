import { createFileRoute } from "@tanstack/react-router";
import { findPostsByClubId } from "#/actions/post.actions";
import PostCard from "#/components/post/postCard";

export const Route = createFileRoute("/_appLayout/_club/$clubId/_memberAuth/")({
  component: ClubIndex,
  loader: async ({ params }) => {
    const posts = await findPostsByClubId({
      data: { clubId: parseInt(params.clubId) },
    });
    return { posts };
  },
});

function ClubIndex() {
  const { posts } = Route.useLoaderData();
  return (
    <main className="space-y-6">
      {/* <div>filters / add post</div> */}
      <section className="space-y-4">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </section>
    </main>
  );
}
