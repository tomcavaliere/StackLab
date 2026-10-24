/** Une source de plus de 3 ans est signalée (fiches de parti et de personnalité). */
export function isOld(date: Date | string, now = new Date()) {
  const limit = new Date(now);
  limit.setFullYear(limit.getFullYear() - 3);
  return new Date(date) < limit;
}
