import { useForm } from "@tanstack/react-form-start";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { signupFn } from "#/auth/actions";
import { signupSchema } from "#/auth/schema";
import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "#/components/ui/card";
import { Field, FieldError } from "#/components/ui/field";
import { Input } from "#/components/ui/input";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: signupSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await signupFn({ data: value });

      if (res.status !== "success") {
        alert(res.message);

        return;
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
              name="name"
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
                      placeholder="john doe"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
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
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="font-medium text-sm">
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
