<template>
  <Textarea
    :value="form.textarea"
    :checkValidation="validateTextarea"
    :placeholder="TEXTAREA_PLACEHOLDER"
    @input="handleInput($event.target.value)"
    allowAutoResize
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Textarea from '../../ui/Textarea/Textarea.vue';
import { useInteractWithForm } from './lib/useInteractWIthForm';

export default defineComponent({
  name: 'Home',
  components: {
    Textarea,
  },
  setup() {
    const { form, TEXTAREA_PLACEHOLDER, handleInput, validateTextarea } =
      useInteractWithForm();

    return {
      form,
      TEXTAREA_PLACEHOLDER,
      handleInput,
      validateTextarea,
    };
  },
});
</script>
