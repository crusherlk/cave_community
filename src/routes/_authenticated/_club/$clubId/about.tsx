import { createFileRoute } from "@tanstack/react-router";
import { LockIcon, TagIcon, UsersIcon } from "lucide-react";

export const Route = createFileRoute("/_authenticated/_club/$clubId/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="border-border space-y-8 rounded-lg bg-white p-6">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Editors club</h2>
        <div className="space-y-2">
          <div className="h-100 w-full rounded-lg bg-gray-500"></div>
          <div className="flex gap-2">
            <div className="size-20 rounded-lg bg-gray-500"></div>
            <div className="size-20 rounded-lg bg-gray-500"></div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-10">
          <div className="flex gap-2">
            <LockIcon />
            <span className="font-medium">Private</span>
          </div>
          <div className="flex gap-2">
            <UsersIcon />
            <span className="font-medium">3.5k Members</span>
          </div>
          <div className="flex gap-2">
            <TagIcon />
            <span className="font-medium">Free</span>
          </div>
          <div className="flex gap-2">
            <div className="size-6 rounded-full bg-gray-500"></div>
            <span className="font-medium">By John Doe</span>
          </div>
        </div>
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
        reprehenderit, voluptates, possimus rem dignissimos, iure dolores
        impedit eum sapiente consequatur molestias aut dolor provident deserunt
        aliquam nulla aperiam quas non id. Illum expedita adipisci, et voluptas
        suscipit eos dolor minima autem exercitationem natus illo temporibus
        nobis quisquam nihil, alias consequuntur?
      </div>
    </main>
  );
}
