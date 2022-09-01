export function shortenString(
  value: string,
  maxLength: number,
  followings?: string,
): string {
  const exceeded = value.length > maxLength;
  return exceeded
    ? `${value.substring(0, maxLength)}${followings ?? '...'}`
    : value;
}
