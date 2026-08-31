import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import { findClubsByUserIdFn } from "#/actions/club-member.action";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Spinner } from "./ui/spinner";

function ClubsPopOver() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const findClubsByUserId = useServerFn(findClubsByUserIdFn);

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
      <PopoverContent className="p-2">
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

export default ClubsPopOver;
