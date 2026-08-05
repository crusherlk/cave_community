import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "#/lib/utils";
import ClubNavigator from "./clubNavigator";
import { Button } from "./ui/button";

const clubNavExcludes = ["/"];

export default function Header() {
  const location = useLocation();

  const isClubNavShow = !clubNavExcludes.includes(location.pathname);

  return (
    <header className={cn("bg-white", !isClubNavShow && "border-b")}>
      <div className="cc_container space-y-8">
        <div
          className={cn(
            "flex flex-wrap items-center justify-between gap-4 py-4",
            // isClubNavShow ? "" : "py-4",
          )}
        >
          <div className="flex items-center gap-2">
            <Link to="/" className="shrink-0">
              <img className="w-20" src="/cave-logo.png" alt="cave-logo" />
            </Link>
            <ClubNavigator />
          </div>
          <Button variant="outline" asChild>
            <Link to="/signin">Sign In</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
