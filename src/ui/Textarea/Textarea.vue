<template>
  <textarea
    ref="textareaRef"
    :class="className"
    :name="name"
    :autocomplete="preparedAutocomplete"
    :value="value"
    :disabled="disabled"
    :placeholder="placeholder"
    :readonly="readonly"
    :autofocus="autofocus"
    :maxlength="maxlength"
    :minlength="minlength"
    :spellCheck="spellCheck"
    :dirname="dirname"
    :wrap="preparedWrap"
    :form="form"
    :cols="cols"
    :rows="rows"
    @input="onInput"
    @change="onChange"
    @blur="blur"
    @focus="focus"
  />
</template>

<script lang="ts">
import { PropType, computed, defineComponent, ref, toRefs } from 'vue';
import {
  ETextareaAutocompleteAttribute,
  ETextareaWrapAttribute,
  TEXTAREA_PLACEHOLDER,
} from './const';
import { useAutoResize } from './lib/useAutoResize';

export default defineComponent({
  name: 'Textarea',
  props: {
    value: {
      type: [String, null] as PropType<string | null>,
      default: null,
    },
    checkValidation: {
      type: Function as PropType<(_value: string | null) => boolean>,
      default: () => ({}),
    },
    name: {
      type: String,
      default: '',
    },
    form: {
      type: String,
      default: '',
    },
    dirname: {
      type: String,
      default: '',
    },
    cols: {
      type: String,
      default: '',
    },
    rows: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    autocomplete: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: String,
      default: '',
    },
    minlength: {
      type: String,
      default: '',
    },
    spellCheck: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: TEXTAREA_PLACEHOLDER,
    },
    wrap: {
      type: Boolean,
      default: false,
    },
    allowAutoResize: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['input', 'change', 'blur', 'focus', 'update:value'],
  setup(props, { emit, expose }) {
    const textareaRef = ref<HTMLTextAreaElement | null>(null);
    const isFocused = ref<boolean>(false);
    const { allowAutoResize } = toRefs(props);

    const { resize } = useAutoResize(textareaRef, allowAutoResize);

    const preparedAutocomplete = props.autocomplete
      ? ETextareaAutocompleteAttribute.on
      : '';

    const preparedWrap = props.wrap ? ETextareaWrapAttribute.hard : '';

    const className = computed(() => {
      let resultClassName = 'textarea';
      const isValid = props.checkValidation(props.value);

      if (isFocused.value && !isValid) {
        resultClassName += ' invalid';
      }

      if (!isFocused.value && !isValid) {
        resultClassName += ' invalid-inactive';
      }

      return resultClassName;
    });

    const onInput = (event: Event) => {
      const input = event.target as HTMLTextAreaElement;

      resize();
      emit('update:value', input.value);
      emit('input', event);
    };

    const onChange = (event: Event) => {
      const input = event.target as HTMLTextAreaElement;

      emit('update:value', input.value);
      emit('change', event);
    };

    const blur = (event: Event) => {
      const input = event.target as HTMLTextAreaElement;

      emit('update:value', input.value);
      textareaRef.value?.blur();
      isFocused.value = false;
      emit('blur', event);
    };

    const focus = (event: Event) => {
      textareaRef.value?.focus();
      isFocused.value = true;
      emit('focus', event);
    };

    return {
      TEXTAREA_PLACEHOLDER,
      preparedAutocomplete,
      preparedWrap,
      className,
      textareaRef,
      onInput,
      onChange,
      blur,
      focus,
    };
  },
});
</script>

<style scoped lang="scss" src="./style.css" />
