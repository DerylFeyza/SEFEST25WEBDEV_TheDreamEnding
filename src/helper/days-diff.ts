export const getDaysDifference = (start: Date, end: Date) => {
  const diffInMs = end.getTime() - start.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  return diffInDays;
};
