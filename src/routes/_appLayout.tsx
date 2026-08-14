import { createFileRoute, Outlet } from "@tanstack/react-router";
import { getUserSessionFn } from "#/auth/actions";
import Footer from "#/components/Footer";
import Header from "#/components/Header";

export const Route = createFileRoute("/_appLayout")({
  component: RouteComponent,
  loader: async () => {
    const session = await getUserSessionFn();
    return { session };
  },
});

function RouteComponent() {
  const { session } = Route.useLoaderData();

  return (
    <div className="flex min-h-dvh flex-col">
      <Header session={session} />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
