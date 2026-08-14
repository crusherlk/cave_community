import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { signoutFn } from "#/auth/actions";
import { cn } from "#/lib/utils";
import ClubNavigator from "./clubNavigator";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type HeaderProps = {
  session: {
    token: string;
    expiresAt: number;
    user: {
      id: number;
      name: string;
    } | null;
  } | null;
};

const clubNavExcludes = ["/"];

export default function Header({ session }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isClubNavShow = !clubNavExcludes.includes(location.pathname);

  return (
    <header className={cn("bg-white", !isClubNavShow && "border-b")}>
      <div className="cc_container space-y-8">
        <div
          className={cn(
            "flex flex-wrap items-center justify-between gap-4 py-4",
          )}
        >
          <div className="flex items-center gap-2">
            <Link to="/" className="shrink-0">
              <img className="w-20" src="/cave-logo.png" alt="cave-logo" />
            </Link>
            <ClubNavigator />
          </div>
          {session == null ? (
            <Button variant="outline" asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarFallback>
                    {session.user?.name.slice(0, 2).toUpperCase() || "CA"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={async () => {
                    await signoutFn();
                    navigate({ to: "/signin", replace: true });
                  }}
                >
                  Signout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
