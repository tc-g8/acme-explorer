export function isPastDate(date: any) {
  const timeDifference = new Date(date).getTime() - new Date().getTime();
  return timeDifference <= 0;
}

export function isAWeekBeforeDate(date: any) {
  const timeDifference = new Date(date).getTime() - new Date().getTime();
  return timeDifference <= 604800000;
}
