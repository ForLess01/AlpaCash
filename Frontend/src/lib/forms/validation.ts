export function normalizeSpaces(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function sanitizeLetters(value: string) {
  return value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'.-]/g, "");
}

export function sanitizeAlphanumeric(value: string) {
  return value.replace(/[^A-Za-z0-9ÁÉÍÓÚáéíóúÑñÜü\s#.,'()/-]/g, "");
}

export function sanitizeDigits(value: string, maxLength?: number) {
  const digits = value.replace(/\D/g, "");
  return maxLength ? digits.slice(0, maxLength) : digits;
}

export function sanitizeDecimal(value: string, decimals = 2) {
  const cleaned = value.replace(/[^\d.]/g, "");
  const [integer = "", ...rest] = cleaned.split(".");
  const decimal = rest.join("").slice(0, decimals);
  return decimal.length > 0 ? `${integer}.${decimal}` : integer;
}

export function isLettersOnly(value: string) {
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'.-]+$/.test(normalizeSpaces(value));
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidDni(value: string) {
  return /^\d{8}$/.test(value);
}

export function isValidRuc(value: string) {
  return /^\d{11}$/.test(value);
}
