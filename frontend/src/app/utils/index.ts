export function unStringfy(str: string) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
}
