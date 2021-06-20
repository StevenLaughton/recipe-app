export class StringHelper {
  static splitWithTail(str: string, delimiter: string): string[] {
    const parts = str.split(delimiter);
    const tail = parts.slice(2).join(delimiter);
    const result = parts.slice(0, 2);
    result.push(tail);
    return result;
  }
}
