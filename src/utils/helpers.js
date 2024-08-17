// Formats a number as currency in Euros
export function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

// Formats a date string into a human-readable format
export function formatDate(dateStr) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

// Calculates the number of minutes left between the current time and a future date
export function calcMinutesLeft(dateStr) {
  const now = new Date().getTime(); // Current time in milliseconds
  const futureDate = new Date(dateStr).getTime(); // Future date in milliseconds
  return Math.round((futureDate - now) / 60000); // Convert milliseconds to minutes
}
