export function getProgressColor(pct) {
  if (pct >= 100) return "bg-red-500";
  if (pct >= 80) return "bg-yellow-500";
  return "bg-[#33B570]";
}

export function formatEventDate(dateISO) {
  return new Date(dateISO).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
