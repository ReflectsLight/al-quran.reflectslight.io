const getNavigationEntries = (): PerformanceNavigationTiming[] =>  {
  return performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
};

export function fetchOptions(): RequestInit {
  const pageHasRefreshed = getNavigationEntries().some((e) => e.type === 'reload');
  return pageHasRefreshed ? {cache: 'reload'} : {};
}
