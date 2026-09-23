import { useForm, useSelector } from "@tanstack/react-form-start";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import z from "zod";
import { createPostFn } from "#/actions/post.actions";
import EmojiButton from "../EmojiButton";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Field, FieldError } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const createPostSchema = z.object({
  title: z.string().trim().min(1, "title is required!").max(50, "too long"),
  content: z
    .string()
    .trim()
    .min(1, "content is required!")
    .max(500, "max content length is 500"),
});

type CreatePostProps = {
  username: string;
  club: {
    id: number;
    name: string;
  };
};

function CreatePost({ username, club }: CreatePostProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const [error, setError] = useState("");

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
    validators: {
      onSubmit: createPostSchema,
    },
    onSubmit: async ({ value }) => {
      setError("");
      const res = await createPostFn({
        data: {
          ...value,
          clubId: club.id,
        },
      });

      if (res.status === "success") {
        closeForm();
        router.invalidate();
      } else {
        setError(res.message);
      }
    },
  });

  const isCreatePostFormDirty = useSelector(
    form.store,
    (state) => state.isDirty,
  );

  const closeForm = () => {
    setIsOpen(false);
    setError("");
    form.reset();
  };

  const handleEmojiOnClick = (emoji: string) => {
    const content = form.getFieldValue("content").trimEnd();
    form.setFieldValue("content", content.concat(emoji));
  };

  return (
    <div className="rounded-lg bg-white p-4">
      {!isOpen ? (
        <button
          type="button"
          className="flex w-full cursor-pointer select-none items-center gap-4"
          onClick={() => setIsOpen(true)}
        >
          <Avatar className="size-10">
            <AvatarFallback>
              {username.slice(0, 2).toUpperCase() || "CA"}
            </AvatarFallback>
          </Avatar>
          <p className="font-medium text-muted-foreground text-xl">
            Write something..
          </p>
        </button>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarFallback>
                {username.slice(0, 2).toUpperCase() || "CA"}
              </AvatarFallback>
            </Avatar>
            <p className="text-muted-foreground">
              <span className="font-semibold text-black">{username}</span>{" "}
              posting in{" "}
              <span className="font-semibold text-black">{club.name}</span>
            </p>
          </div>
          <form.Field
            name="title"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field>
                  <Input
                    className="border-none p-0 shadow-none placeholder:font-bold placeholder:text-2xl focus-visible:ring-0 md:font-bold md:text-2xl"
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Title"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="content"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field>
                  <Textarea
                    className="field-sizing-fixed min-h-0 resize-none overflow-y-auto border-none p-0 shadow-none focus-visible:ring-0 md:text-base"
                    rows={4}
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Write something.."
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          {error && <FieldError>{error}</FieldError>}

          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-2">
              <EmojiButton handleEmojiOnClick={handleEmojiOnClick} />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  if (isCreatePostFormDirty) {
                    const isConfirmLeave = confirm("Are you sure?");
                    if (!isConfirmLeave) return;
                  }

                  closeForm();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Post</Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default CreatePost;
