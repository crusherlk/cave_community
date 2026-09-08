import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ChevronsUpDownIcon, GlobeIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { findClubsByUserIdFn } from "#/actions/club-member.action";
import { useCreateClubActions } from "#/stores/createClubStore";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Spinner } from "./ui/spinner";

function MemberClubsPopOver() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const findClubsByUserId = useServerFn(findClubsByUserIdFn);

  const setIsCreateClub = useCreateClubActions();

  const {
    isLoading,
    data: memberClubs,
    refetch: fetchMemberClubs,
  } = useQuery({
    queryKey: ["member-clubs"],
    queryFn: () => findClubsByUserId(),
    enabled: false,
  });

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => fetchMemberClubs()}
        >
          <ChevronsUpDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-2 p-2">
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded p-2 transition-colors duration-300 hover:bg-muted"
          onClick={() => {
            setIsPopoverOpen(false);
            setIsCreateClub(true);
          }}
        >
          <div className="grid size-8 place-items-center rounded-md bg-muted">
            <PlusIcon />
          </div>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap font-medium text-sm">
            Create a club
          </p>
        </button>
        <Link
          className="flex items-center gap-2 rounded p-2 transition-colors duration-300 hover:bg-muted"
          onClick={() => setIsPopoverOpen(false)}
          to="/"
        >
          <div className="grid size-8 place-items-center rounded-md bg-muted">
            <GlobeIcon />
          </div>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap font-medium text-sm">
            Discover
          </p>
        </Link>

        {isLoading && (
          <div className="flex items-center gap-2">
            <Spinner />
            <p className="font-medium text-sm leading-snug">Fetching clubs..</p>
          </div>
        )}
        {memberClubs && (
          <div className="space-y-2">
            {memberClubs.map((club) => (
              <Link
                key={club.id}
                className="flex items-center gap-2 rounded p-2 transition-colors duration-300 hover:bg-neutral-50"
                onClick={() => setIsPopoverOpen(false)}
                to="/$clubId"
                params={{
                  clubId: club.id.toString(),
                }}
              >
                <div className="size-8 rounded-md bg-stone-500" />
                <p className="overflow-hidden text-ellipsis whitespace-nowrap font-medium text-sm">
                  {club.name}
                </p>
              </Link>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default MemberClubsPopOver;
