import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import z from "zod";
import { findClubs } from "#/actions/club.actions";
import ClubCard from "#/components/club/clubCard";
import SearchForm from "#/components/SearchForm.tsx";

const clubSearchParamSchema = z.object({
  q: z.string().catch("").optional(),
});

export const Route = createFileRoute("/_appLayout/")({
  component: App,
  validateSearch: clubSearchParamSchema,
  search: {
    middlewares: [stripSearchParams({ q: "" })],
  },
  loaderDeps: ({ search: { q } }) => ({ query: q ?? "" }),
  loader: async ({ deps }) => {
    const { query } = deps;

    const clubs = await findClubs({
      data: {
        query: query.toLowerCase(),
      },
    });

    return { clubs };
  },
});

function App() {
  const { clubs } = Route.useLoaderData();
  const { q: query } = Route.useSearch();

  return (
    <main className="cc_container space-y-14 py-10">
      <section className="mx-auto w-2xl text-center">
        <h1 className="font-bold text-4xl tracking-tight">
          Discover Communities
        </h1>
        <p className="font-medium text-xl">
          or{" "}
          <span className="cursor-pointer text-primary underline underline-offset-2">
            create your own
          </span>
        </p>
        <div className="mt-8">
          <SearchForm query={query ?? ""} />
        </div>
      </section>
      <section className="space-y-6">
        {/* <div className="flex gap-2">
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
        </div> */}
        <div className="grid grid-cols-3 gap-8">
          {clubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
        {clubs.length === 0 && (
          <p className="text-center">Couldn't find any clubs for you.</p>
        )}
      </section>
    </main>
  );
}
