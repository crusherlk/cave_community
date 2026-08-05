import React from "react";

export default function PostHeader() {
  return (
    <div className="flex items-center gap-2">
      <div className="size-10 shrink-0 rounded-full bg-gray-500" />
      <div className="space-y-0">
        <p className="font-medium text-base">Anze Kos</p>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <p>Feb 24</p>
          <p className="font-bold">General discussion</p>
        </div>
      </div>
    </div>
  );
}
