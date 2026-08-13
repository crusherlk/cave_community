import { useForm } from "@tanstack/react-form-start";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { signinFn } from "#/auth/actions";
import { signinSchema } from "#/auth/schema";
import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "#/components/ui/card";
import { Field, FieldError } from "#/components/ui/field";
import { Input } from "#/components/ui/input";

export const Route = createFileRoute("/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: signinSchema,
    },
    onSubmit: async ({ value }) => {
      setError("");
      const res = await signinFn({ data: value });

      if (res.status !== "success") {
        setError(res.message);
      }

      navigate({ to: "/" });
    },
  });

  return (
    <main className="flex min-h-dvh items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="grid-rows-1 justify-items-center">
          <img className="w-40" src="./cave-logo.png" alt="cave-logo" />
        </CardHeader>
        <CardContent>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="john@doe.com"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="password"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            {error && <FieldError>{error}</FieldError>}
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="font-medium text-sm">
            Don't have an account?{" "}
            <Link className="underline" to="/signup">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
