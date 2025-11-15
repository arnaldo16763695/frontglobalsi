export function formatDateTime(isoString: string): string {
  const dateChile = new Date(
    new Date(isoString).toLocaleString("en-US", {
      timeZone: "America/Santiago",
    })
  );

  const day = String(dateChile.getDate()).padStart(2, '0');
  const month = String(dateChile.getMonth() + 1).padStart(2, '0');
  const year = dateChile.getFullYear();

  let hours = dateChile.getHours();
  const minutes = String(dateChile.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedHour = String(hours).padStart(2, '0');

  return `${day}-${month}-${year} ${formattedHour}:${minutes} ${ampm}`;
}
