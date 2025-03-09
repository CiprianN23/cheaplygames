<script setup lang="ts">
import { type TextFieldProps, useTextField } from '@formwerk/core';

const props = defineProps<TextFieldProps>();

const {
  inputProps,
  labelProps,
  errorMessage,
  errorMessageProps,
  descriptionProps,
} = useTextField(props);
</script>

<template>
  <div class="field">
    <label v-bind="labelProps">{{ label }}</label>
    <input v-bind="inputProps" >

    <div v-if="errorMessage" v-bind="errorMessageProps" class="error">
      {{ errorMessage }}
    </div>

    <div v-if="description" v-bind="descriptionProps" class="hint">
      {{ description }}
    </div>
  </div>
</template>

<style scoped>
.field {
  --color-primary: #10b981;
  --color-text-primary: #333;
  --color-text-secondary: #666;
  --color-border: #d4d4d8;
  --color-focus: var(--color-primary);
  --color-error: #f00;

  label {
    display: block;
    font-size: var(--fontSize300);
    letter-spacing: 0.2em;
    margin-bottom: 16px;
    color: var(--text);
  }

  .hint {
    font-size: 13px;
    color: var(--color-text-secondary);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .hint,
  .error {
    margin-top: 0.25rem;
  }

  input {
    border-radius: 4px;
    border: 1px solid var(--text);
    outline: 0;
    padding: 16px;
    width: 100%;
    height: 44px;
    background: var(--background);

    &:focus {
      outline: none;
      border-color: var(--color-focus);
      box-shadow: 0 0 0 1px var(--color-focus);
    }
  }

  .error {
    display: none;
    font-size: 13px;
    color: var(--color-error);
  }

  &:has(:focus) {
    .hint {
      opacity: 1;
    }
  }

  &:has(:user-invalid) {
    --color-border: var(--color-error);
    --color-focus: var(--color-error);

    .error {
      display: block;
    }

    .hint {
      display: none;
    }
  }
}
</style>