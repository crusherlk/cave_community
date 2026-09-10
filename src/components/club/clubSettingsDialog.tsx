import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { deleteClubFn } from "#/actions/club.actions";
import {
  deleteClubMemberFn,
  findSessionClubMemberFn,
} from "#/actions/club-member.action";
import { formatDate } from "#/lib/date-format";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Spinner } from "../ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

type SettingsDialogProps = {
  club: {
    id: number;
    name: string;
  };
};

function ClubSettingsDialog({ club }: SettingsDialogProps) {
  const navigate = useNavigate();

  const findSessionClubMemberSfn = useServerFn(findSessionClubMemberFn);

  const {
    isLoading,
    data: clubMember,
    refetch: fetchSessionClubMember,
  } = useQuery({
    queryKey: ["session-club-member"],
    queryFn: () => findSessionClubMemberSfn({ data: { clubId: club.id } }),
    enabled: false,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="w-full cursor-pointer disabled:cursor-not-allowed"
          onClick={() => fetchSessionClubMember()}
        >
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent
        className="min-h-[60dvh] content-start sm:max-w-2xl"
        // showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>{club.name}</DialogTitle>
        </DialogHeader>
        {isLoading && (
          <div className="grid h-40 flex-1 place-items-center">
            <Spinner />
          </div>
        )}
        {clubMember && (
          <Tabs
            className="flex items-start"
            orientation="vertical"
            defaultValue="invite"
          >
            <TabsList>
              <TabsTrigger value="invite">Invite</TabsTrigger>
              <TabsTrigger value="membership">Membership</TabsTrigger>
            </TabsList>
            <div className="flex-1">
              <TabsContent value="invite">
                <div>
                  <h1 className="font-bold text-lg">Invite people</h1>
                  <p className="text-muted-foreground text-sm">
                    Invite whoever you want with the link below.
                  </p>
                </div>
              </TabsContent>
              <TabsContent className="space-y-4" value="membership">
                <div>
                  <h1 className="font-bold text-lg">Membership</h1>
                  <p className="text-muted-foreground text-sm">
                    You've been a group member of {club.name} since{" "}
                    <span className="font-bold">
                      {formatDate(clubMember.createdAt)}
                    </span>
                    .
                  </p>
                </div>
                <Button
                  variant="destructive"
                  className="cursor-pointer transition-none"
                  onClick={async () => {
                    const isConfirmed = confirm(
                      `Are you sure ${clubMember.role === "owner" ? "delete this club?" : "you want to leave this club?"}`,
                    );

                    if (!isConfirmed) return;

                    let res: any;

                    if (clubMember.role === "owner") {
                      res = await deleteClubFn({ data: { clubId: club.id } });
                    } else {
                      res = await deleteClubMemberFn({
                        data: { clubId: club.id },
                      });
                    }

                    if (res.status === "success") {
                      navigate({ to: "/" });
                    }
                  }}
                >
                  {clubMember.role === "owner" ? "Delete Club" : "Leave Club"}
                </Button>
              </TabsContent>
            </div>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ClubSettingsDialog;
