export function isPastDate(date: any) {
  const timeDifference = new Date(date).getTime() - new Date().getTime();
  return timeDifference <= 0;
}
