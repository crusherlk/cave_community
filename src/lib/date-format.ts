export const formatDate = (date: string) => {
  return Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(`${date.replace(" ", "T")}Z`));
};
