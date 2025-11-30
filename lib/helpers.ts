export function capitalAndPoint(text: string) {
  if (!text) return;
  let description =
    text.charAt(0).toUpperCase() +
    text.slice(1, text.length + 1);
  return (description =
    description + (description.charAt(text.length - 1) !== "." ? "." : ""));
}
