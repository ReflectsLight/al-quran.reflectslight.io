const getReloadEntry = () => PerformanceNavigationTiming | undefined {
  return performance
         .getEntriesByType("navigation")
         .filter((e) => e.entryType === "navigation")
         .find((e) e.type === "reload") as PerformanceNavigationTiming | undefined;
}

export function fetchOptions(): RequestInit {
  const reloadEntry = getReloadEntry();
  return reloadEntry ? {cache: "reload"} : {};
}
