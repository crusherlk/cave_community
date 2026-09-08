import { useForm, useSelector } from "@tanstack/react-form-start";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import z from "zod";
import { createClubFn } from "#/actions/club.actions";
import {
  useCreateClubActions,
  useCreateClubState,
} from "#/stores/createClubStore";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Field, FieldError } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const createClubSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "club name is required!")
    .max(50, "what are you doing.."),
  shortDescription: z
    .string()
    .trim()
    .min(1, "short description is required!")
    .max(200, "shouldn't be under 200 characters"),
  longDescription: z
    .string()
    .trim()
    .min(1, "long description is required!")
    .max(500, "shouldn't be under 500 characters"),
});

function CreateClubDialog() {
  const navigate = useNavigate();

  const isCreateClub = useCreateClubState();
  const setIsCreateClub = useCreateClubActions();

  const [error, setError] = useState("");

  const form = useForm({
    defaultValues: {
      name: "",
      shortDescription: "",
      longDescription: "",
    },
    validators: {
      onSubmit: createClubSchema,
    },
    onSubmit: async ({ value }) => {
      setError("");
      const res = await createClubFn({ data: value });

      if (res.status === "success") {
        setIsCreateClub(false);
        form.reset();

        navigate({
          to: "/$clubId",
          params: { clubId: res.data.id.toString() },
        });
      } else {
        setError(res.message);
      }
    },
  });

  const isCreateClubFormDirty = useSelector(
    form.store,
    (state) => state.isDirty,
  );

  return (
    <Dialog
      open={isCreateClub}
      // onOpenChange={(open) => {
      //   setIsCreateClub(open);
      // }}
    >
      <DialogContent
        className="max-h-[90dvh] overflow-y-auto"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>Create Club</DialogTitle>
          <DialogDescription>
            Provide the minimum information needed to start your own club. Click
            create when you are done.
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
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
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Club Name"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="shortDescription"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <Textarea
                    className="field-sizing-fixed min-h-0 resize-none overflow-y-auto"
                    rows={2}
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Short Description"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="longDescription"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <Textarea
                    className="field-sizing-fixed min-h-0 resize-none overflow-y-auto"
                    rows={4}
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Long Description"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          {error && <FieldError>{error}</FieldError>}
          <div className="flex gap-2">
            <Button variant="default" type="submit">
              Create
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                if (isCreateClubFormDirty) {
                  const isConfirmLeave = confirm("Are you sure?");

                  if (!isConfirmLeave) return;
                }
                setIsCreateClub(false);
                form.reset();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateClubDialog;
