<script setup lang="ts">
defineProps<{
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}>();

defineEmits<{
  click: [];
}>();
</script>

<template>
<button
:class="[
    'kiosk-button',
    `kiosk-button--${variant}`,
    { 'kiosk-button--disabled': disabled },
]"
:disabled="disabled"
@click="$emit('click')"
>
<slot></slot>
</button>
</template>

<style scoped>
.kiosk-button {
  padding: 20px 40px;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 140px;
  min-height: 56px;
}

.kiosk-button--primary {
  background-color: #4caf50;
  color: white;
}

.kiosk-button--primary:hover:not(.kiosk-button--disabled) {
  background-color: #45a049;
}

.kiosk-button--secondary {
  background-color: #2196f3;
  color: white;
}

.kiosk-button--secondary:hover:not(.kiosk-button--disabled) {
  background-color: #0b7dda;
}

.kiosk-button--danger {
  background-color: #f44336;
  color: white;
}

.kiosk-button--danger:hover:not(.kiosk-button--disabled) {
  background-color: #da190b;
}

.kiosk-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
