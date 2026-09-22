export const formatDate = (
  date: string,
  style: "date" | "datetime" = "date",
) => {
  const dObj = new Date(`${date.replace(" ", "T")}Z`);

  if (style === "date") {
    return Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
    }).format(dObj);
  }

  return Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(dObj);
};
