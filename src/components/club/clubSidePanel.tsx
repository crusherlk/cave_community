import { useRouter } from "@tanstack/react-router";
import { joinNewClubFn } from "#/actions/club-member.action";
import { Button } from "../ui/button";

type PanelProps = {
  club: {
    id: number;
    name: string;
    description: string;
  };
  userId: number | null;
  isMember: boolean;
};

function ClubSidePanel({ club, userId, isMember }: PanelProps) {
  const router = useRouter();
  return (
    <aside className="w-72 shrink-0">
      <div className="overflow-hidden rounded-t-lg bg-white">
        <div className="h-36 w-full bg-gray-500"></div>
        <div className="space-y-4 p-4">
          <div className="">
            <p className="font-medium text-lg">{club.name}</p>
            <p className="font-bold text-muted-foreground text-xs">
              club.com/[slug]
            </p>
          </div>
          <div className="text-wrap">
            <p>{club.description}</p>
          </div>
          <div className="flex justify-around border-border border-y py-2">
            <div className="text-center">
              <p className="font-medium text-lg">3.8K</p>
              <p className="text-muted-foreground text-xs">Members</p>
            </div>
            <div className="text-center">
              <p className="font-medium text-lg">5</p>
              <p className="text-muted-foreground text-xs">Online</p>
            </div>
            <div className="text-center">
              <p className="font-medium text-lg">3</p>
              <p className="text-muted-foreground text-xs">Admins</p>
            </div>
          </div>
          <Button
            size="lg"
            className="w-full cursor-pointer disabled:cursor-not-allowed"
            disabled={isMember}
            onClick={async () => {
              if (userId == null) {
                alert("login to join!");
                return;
              }

              await joinNewClubFn({
                data: {
                  clubId: club.id,
                  userId,
                },
              });
              router.invalidate();
              router.navigate({
                to: "/$clubId",
                params: { clubId: club.id.toString() },
              });
            }}
          >
            {isMember ? "Joined" : "Join Club"}
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default ClubSidePanel;
