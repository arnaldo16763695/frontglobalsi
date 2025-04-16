export function formatDateTime(isoString: string): string {
    const date = new Date(isoString);
  
    // Ajuste de zona horaria si es necesario (por ejemplo: -4 horas para Venezuela)
    // const localDate = new Date(date.getTime() - 4 * 60 * 60 * 1000); // Si lo deseas manual
    const localDate = new Date(date); // Usa la hora local del navegador/servidor
  
    const day = String(localDate.getDate()).padStart(2, '0');
    const month = String(localDate.getMonth() + 1).padStart(2, '0'); // Mes comienza en 0
    const year = localDate.getFullYear();
  
    let hours = localDate.getHours();
    const minutes = String(localDate.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 => 12
    const formattedHour = String(hours).padStart(2, '0');
  
    return `${day}-${month}-${year} ${formattedHour}:${minutes} ${ampm}`;
  }
  