<template>
  <svg
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    v-if="size === 16"
  >
    <path
      fill-rule="evenodd"
      d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
    ></path>
  </svg>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    v-if="size === 24"
  >
    <path
      fill-rule="evenodd"
      d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"
    ></path>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

enum sizes {
  MEDIUM = 24,
  SMALL = 16,
}
export default defineComponent({
  props: {
    size: {
      type: Number,
      default: sizes.SMALL,
    },
  },
});
</script>
