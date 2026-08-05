import { createFileRoute, Outlet } from "@tanstack/react-router";
import Footer from "#/components/Footer";
import Header from "#/components/Header";

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
