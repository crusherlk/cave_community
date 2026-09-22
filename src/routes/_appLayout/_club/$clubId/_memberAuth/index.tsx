import { createFileRoute } from "@tanstack/react-router";
import { RefreshCcwIcon, StickyNoteIcon } from "lucide-react";
import { findPostsByClubId } from "#/actions/post.actions";
import CreatePost from "#/components/post/createPost";
import PostCard from "#/components/post/postCard";
import { Button } from "#/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "#/components/ui/empty";

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
  const { user: currentUser, club: currentClub } = Route.useRouteContext();
  const { posts } = Route.useLoaderData();

  return (
    <main className="space-y-6">
      <CreatePost
        username={currentUser?.name || ""}
        club={{
          id: currentClub.id,
          name: currentClub.name,
        }}
      />
      <section className="space-y-4">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}

        {(!posts || !posts.length) && (
          <div className="rounded-lg bg-white p-6">
            <Empty className="border border-dashed">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <StickyNoteIcon />
                </EmptyMedia>
                <EmptyTitle>No posts</EmptyTitle>
                <EmptyDescription>
                  You're all caught up. New posts will appear here.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="outline">
                  <RefreshCcwIcon />
                  Refresh
                </Button>
              </EmptyContent>
            </Empty>
          </div>
        )}
      </section>
    </main>
  );
}
