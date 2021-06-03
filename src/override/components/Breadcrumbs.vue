<template>
  <header>
    <ul class="breadcrumb">
      <li class="breadcrumb-item" v-for="(el, idx) in breadcrumbs" :key="idx">
        <slot name="first" :el="el" v-if="idx === 0"></slot>

        <slot
          name="last"
          :el="el"
          v-else-if="idx === breadcrumbs.length - 1"
        ></slot>

        <slot :el="el" v-else></slot>
      </li>
    </ul>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array,
    },
  },
});
</script>

<style lang="scss" scoped>
header {
  overflow: hidden;
}

.breadcrumb {
  display: flex;
  padding: 0px;
  text-transform: uppercase;
  list-style: none;
  margin: 0;
}

.breadcrumb-item {
  font-size: larger;
  cursor: pointer;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: "/";
  padding: 0 1em 0 1em;
  margin: 0;
}

li {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    overflow: visible;
  }
}
</style>
