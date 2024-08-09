// Function to join an array of strings with a separator
export function joinIfArray(
  arr: string[] | string | undefined,
  separator: string = ","
): string | undefined {
  if (Array.isArray(arr)) {
    return arr.join(separator);
  }
  return arr;
}
