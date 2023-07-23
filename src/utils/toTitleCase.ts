// Utility function to convert a string to title case
export const toTitleCase = (str: string): string => {
  const result = str.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}
