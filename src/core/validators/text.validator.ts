export interface ValidationResult {
  valid: boolean;

  message?: string;
}

export function validateName(
  value: string,
  minLength = 3,
  maxLength = 50,
): ValidationResult {
  const text = value.trim();

  if (!text) {
    return {
      valid: false,

      message: "El campo es obligatorio.",
    };
  }

  if (text.length < minLength) {
    return {
      valid: false,

      message: `Debe tener al menos ${minLength} caracteres.`,
    };
  }

  if (text.length > maxLength) {
    return {
      valid: false,

      message: `No puede superar ${maxLength} caracteres.`,
    };
  }

  // Debe contener al menos una letra
  const hasLetter = /[A-Za-zÁÉÍÓÚáéíóúÑñ]/.test(text);

  if (!hasLetter) {
    return {
      valid: false,

      message: "Debe contener al menos una letra.",
    };
  }

  return {
    valid: true,
  };
}
