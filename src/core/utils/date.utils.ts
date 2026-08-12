export function getCurrentDate(): Date {
  return new Date();
}

export function formatCurrentDate(): string {
  return new Intl.DateTimeFormat("es-PE", {
    timeZone: "America/Lima",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}