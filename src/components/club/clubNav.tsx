import { Link, type LinkOptions, useMatchRoute } from "@tanstack/react-router";
import { cn } from "#/lib/utils";

function ClubNav() {
  const matchRoute = useMatchRoute();

  const navItems: (LinkOptions & { label: string })[] = [
    {
      label: "Community",
      to: "/$clubId",
      params: { clubId: "test" },
    },
    // {
    //   label: "Classroom",
    //   to: "/$clubId/classroom",
    //   params: { clubId: "test" },
    // },
    // {
    //   label: "Calendar",
    //   to: "/$clubId/calendar",
    //   params: { clubId: "test" },
    // },
    // {
    //   label: "Members",
    //   to: "/$clubId/members",
    // },
    {
      label: "About",
      to: "/$clubId/about",
      params: { clubId: "test" },
    },
  ];

  return (
    <div className="border-b bg-white">
      <nav className="cc_container flex gap-8">
        {navItems.map((item) => (
          <Link
            key={item.label}
            className={cn(
              "h-8 min-w-16 border-transparent border-b-4 text-center font-semibold text-muted-foreground",
              "data-[status=active]:border-black data-[status=active]:text-black",
            )}
            to={item.to}
            activeOptions={{ exact: true }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default ClubNav;
