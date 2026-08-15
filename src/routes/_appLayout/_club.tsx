import { createFileRoute, Outlet } from "@tanstack/react-router";
import ClubNav from "#/components/club/clubNav";
import { Button } from "#/components/ui/button";

export const Route = createFileRoute("/_appLayout/_club")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <ClubNav />
      <div className="cc_container flex gap-8 py-8">
        <div className="flex-1">
          <Outlet />
        </div>
        <aside className="w-72 shrink-0">
          <div className="overflow-hidden rounded-t-lg bg-white">
            <div className="h-36 w-full bg-gray-500"></div>
            <div className="space-y-4 p-4">
              <div className="">
                <p className="font-medium text-lg">Editors Club</p>
                <p className="font-bold text-muted-foreground text-xs">
                  club.com/editorsclub
                </p>
              </div>
              <div className="text-wrap">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Nostrum repellendus sit perferendis, laboriosam beatae
                  distinctio sint ab omnis aliquam quas?
                </p>
              </div>
              <div className="flex justify-around border-border border-y py-2">
                <div className="text-center">
                  <p className="font-medium text-lg">3.8K</p>
                  <p className="text-muted-foreground text-xs">Members</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-lg">5</p>
                  <p className="text-muted-foreground text-xs">Online</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-lg">3</p>
                  <p className="text-muted-foreground text-xs">Admins</p>
                </div>
              </div>
              <Button size="lg" className="w-full cursor-pointer">
                Join Group
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
