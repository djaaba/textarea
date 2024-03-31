export const TEXTAREA_PLACEHOLDER = 'Введите текст';

export const REGEX_PATTERNS = {
  /** Строка содержит спец символы */
  containsSpecialChars: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,
};

export enum ETextareaAutocompleteAttribute {
  on = 'on',
  off = 'off',
}

export enum ETextareaWrapAttribute {
  hard = 'hard',
  soft = 'soft',
}
