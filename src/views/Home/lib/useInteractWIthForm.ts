import { reactive } from 'vue';
import { REGEX_PATTERNS } from '../../../ui/Textarea/const';
import { HOME_FORM_INITIAL_VALUE } from '../const';
import { THomeForm } from '../types';

export const useInteractWithForm = () => {
  const form = reactive<THomeForm>(HOME_FORM_INITIAL_VALUE);

  const TEXTAREA_PLACEHOLDER = 'Текст';

  const specialCharsRegex = new RegExp(
    REGEX_PATTERNS.containsSpecialChars
  );

  const handleInput = (value: string) => {
    form.textarea = value;
  };

  const validateTextarea = (value: string | null) => {
    if (!value) return true;

    return !specialCharsRegex.test(value);
  };

  return {
    form,
    TEXTAREA_PLACEHOLDER,
    handleInput,
    validateTextarea,
  };
};
