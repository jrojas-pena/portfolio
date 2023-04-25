export function betterUpdateQuery<Result, Query>(
  cache: any,
  queryInput: any,
  result: any,
  fn: any,
) {
  return cache.updateQuery(
    queryInput,
    (data: any) => fn(result, data as any) as any,
  );
}
