import { createFileRoute } from "@tanstack/react-router";
import PostCard from "#/components/post/postCard";

export const Route = createFileRoute("/_authenticated/_club/$clubId/")({
  component: ClubIndex,
});

function ClubIndex() {
  return (
    <main className="space-y-6">
      <div>filters / add post</div>
      <section className="space-y-4">
        <PostCard />
      </section>
    </main>
  );
}
