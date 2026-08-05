function CommentCard() {
  return (
    <div className="flex gap-2">
      <div className="size-10 shrink-0 rounded-full bg-gray-500"></div>
      <div className="flex-1 rounded-lg border bg-muted p-3">
        <div className="flex items-center gap-1">
          <p className="font-medium">Thomas K. Carlson</p>
          <p className="text-muted-foreground text-xs leading-none">• Sep 25</p>
        </div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui minima
          fugit sed nulla quod delectus exercitationem corporis doloribus iste.
          A.
        </p>
      </div>
    </div>
  );
}

export default CommentCard;
