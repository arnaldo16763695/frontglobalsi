export function normalize(text: string) {
  return text
    ?.toString()
    .normalize("NFD")                 // separa tildes
    .replace(/[\u0300-\u036f]/g, "")  // quita tildes
    .replace(/\s+/g, " ")             // colapsa espacios múltiples
    .trim()                           // quita espacios al inicio/fin
    .toLowerCase();                   // 👈 convierte TODO a minúsculas
}
