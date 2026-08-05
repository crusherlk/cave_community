import { createFileRoute } from "@tanstack/react-router";
import { Settings2Icon } from "lucide-react";
import ClubCard from "#/components/club/clubCard";
import SearchForm from "#/components/SearchForm.tsx";
import { Button } from "#/components/ui/button";

export const Route = createFileRoute("/_authenticated/")({
  component: App,
});

function App() {
  return (
    <main className="cc_container space-y-14 py-10">
      <section className="mx-auto w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Discover Communities
        </h1>
        <p className="text-xl font-medium">
          or{" "}
          <span className="text-primary cursor-pointer underline underline-offset-2">
            create your own
          </span>
        </p>
        <div className="mt-8">
          <SearchForm />
        </div>
      </section>
      <section className="space-y-6">
        <div className="flex gap-2">
          <div className="flex flex-1 gap-2">
            <Button variant="outline" className="rounded-full">
              Trending 🔥
            </Button>
            <Button variant="outline" className="rounded-full">
              Hobbies 🎨
            </Button>
            <Button variant="outline" className="rounded-full">
              Technology 💻
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full">
              More..
            </Button>
            <Button variant="outline" className="rounded-full">
              Filter <Settings2Icon data-icon="inline-end" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <ClubCard />
        </div>
      </section>
    </main>
  );
}
