<template>
  <button
    class="btn"
    :style="{ backgroundColor: background }"
    @click.stop.prevent="$emit('click')"
  >
    <component :is="icon" />
    <div class="btn-name" v-if="name">{{ name }}</div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    icon: {},
    name: {
      type: String,
    },
    background: {
      default: "#00000033",
      type: String,
    },
  },
});
</script>

<style>
.btn {
  display: flex;
  align-items: center;
  padding: 0 8px 0 8px;
  height: 32px;
  min-width: 32px;
  border: none;
  border-radius: 99999px;
}

.btn-name {
  margin-left: 8px;
  margin-right: 8px;
}
</style>
