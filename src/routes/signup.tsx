import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "#/components/ui/card";
import { Field } from "#/components/ui/field";
import { Input } from "#/components/ui/input";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex min-h-dvh items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="grid-rows-1 justify-items-center">
          <img className="w-40" src="./cave-logo.png" alt="cave-logo" />
        </CardHeader>
        <CardContent>
          <form className="space-y-3">
            <Field>
              <Input type="text" name="name" placeholder="john doe" />
            </Field>
            <Field>
              <Input type="text" name="email" placeholder="john@example.com" />
            </Field>
            <Field>
              <Input type="password" name="password" placeholder="password" />
            </Field>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm font-medium">
            Already have an account?{" "}
            <Link className="underline" to="/signin">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
