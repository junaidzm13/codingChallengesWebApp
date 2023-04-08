export function objectKeys<T extends string>(obj: Record<T, any>): Array<T> {
  return Object.keys(obj) as Array<T>;
}
