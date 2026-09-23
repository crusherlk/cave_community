import { useForm, useSelector } from "@tanstack/react-form-start";
import { useRouter } from "@tanstack/react-router";
import z from "zod";
import { createCommentFn } from "#/actions/comment.action";
import EmojiButton from "../EmojiButton";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Field, FieldError } from "../ui/field";
import { Textarea } from "../ui/textarea";

const createCommentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "content is required!")
    .max(250, "max content length is 250"),
});

type CreateCommentProps = {
  user: {
    id: number;
    name: string;
  } | null;
  postId: number;
};

function CreateComment({ postId, user }: CreateCommentProps) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      content: "",
    },
    validators: {
      onSubmit: createCommentSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await createCommentFn({
        data: {
          ...value,
          postId,
        },
      });

      if (res.status === "success") {
        closeForm();
        router.invalidate();
        return;
      } else {
        alert(res.message);
      }
    },
  });

  const isCreateCommentFormEmpty = useSelector(
    form.store,
    (state) => !state.isDefaultValue,
  );

  const closeForm = () => {
    form.reset();
  };

  const handleEmojiOnClick = (emoji: string) => {
    const content = form.getFieldValue("content").trimEnd();
    form.setFieldValue("content", content.concat(emoji));
  };

  return (
    <div className="flex gap-2">
      <Avatar className="size-10">
        <AvatarFallback>
          {user?.name.slice(0, 2).toUpperCase() || "CA"}
        </AvatarFallback>
      </Avatar>
      <form
        className="flex-1 space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="flex items-end gap-2">
          <form.Field
            name="content"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field>
                  <Textarea
                    className="field-sizing-fixed min-h-0 resize-none overflow-y-auto bg-muted/50 text-base"
                    rows={2}
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Your comment.."
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <EmojiButton handleEmojiOnClick={handleEmojiOnClick} />
        </div>
        {isCreateCommentFormEmpty && (
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const isConfirmLeave = confirm("Are you sure?");
                if (!isConfirmLeave) return;

                closeForm();
              }}
            >
              Cancel
            </Button>
            <Button>Comment</Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default CreateComment;
