import { formatDate } from "#/lib/date-format";
import { Avatar, AvatarFallback } from "../ui/avatar";

type CommentCardProps = {
  comment: {
    id: number;
    createdAt: string;
    content: string;
    user: {
      name: string;
    };
  };
};

function CommentCard({ comment }: CommentCardProps) {
  return (
    <div className="flex gap-2">
      <Avatar className="size-10">
        <AvatarFallback>
          {comment.user.name.slice(0, 2).toUpperCase() || "CA"}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 rounded-lg border bg-muted p-3">
        <div className="flex items-center gap-1">
          <p className="font-medium capitalize">{comment.user.name}</p>
          <p className="text-muted-foreground text-xs leading-none">
            • {formatDate(comment.createdAt)}
          </p>
        </div>
        <p>{comment.content}</p>
      </div>
    </div>
  );
}

export default CommentCard;
