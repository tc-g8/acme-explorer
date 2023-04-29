export function isPastDate(date: any) {
  const timeDifference = new Date(date).getTime() - new Date().getTime();
  console.log(timeDifference);
  return timeDifference <= 0;
}
