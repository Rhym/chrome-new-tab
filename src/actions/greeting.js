export function greeting(string) {
  return {
    type: 'GREETING_SET',
    greeting: string
  };
}