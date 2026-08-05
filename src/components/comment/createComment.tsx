import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

function CreateComment() {
  return (
    <div className="flex gap-2">
      <div className="size-10 shrink-0 rounded-full bg-gray-500" />
      <div className="flex-1 space-y-2">
        <Textarea
          className="resize-none rounded-lg bg-muted/50 text-base"
          placeholder="Your comment.."
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Comment</Button>
        </div>
      </div>
    </div>
  );
}

export default CreateComment;
