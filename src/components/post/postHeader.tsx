import { formatDate } from "#/lib/date-format";
import { Avatar, AvatarFallback } from "../ui/avatar";

type HeaderProps = {
  username: string;
  dateString: string;
};

export default function PostHeader({ username, dateString }: HeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-10 cursor-pointer">
        <AvatarFallback>
          {username.slice(0, 2).toUpperCase() || "CA"}
        </AvatarFallback>
      </Avatar>
      <div className="space-y-0">
        <p className="font-medium text-base">{username}</p>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <p>{formatDate(dateString)}</p>
          <p className="font-bold">General discussion</p>
        </div>
      </div>
    </div>
  );
}
