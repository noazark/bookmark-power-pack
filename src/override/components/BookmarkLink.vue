<template>
  <a class="bookmark-link" :href="url" @click="handleClick">
    <slot>
      {{ title }}
    </slot>
  </a>
</template>

<script lang="ts">
import { is } from "@/utils";
import { BookmarkTreeNode } from "@/browser/bookmarks";
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    bookmark: {
      default: () => ({}),
      type: Object as PropType<BookmarkTreeNode>,
    },
  },

  setup(props, { emit }) {
    const url = computed(() => props.bookmark.url);
    const title = computed(() => props.bookmark.title);

    const handleClick = (e: MouseEvent) => {
      if (is(props.bookmark, "folder")) {
        e.preventDefault();
        emit("select", props.bookmark.id);
      }
    };

    return {
      url,
      title,
      handleClick,
    };
  },
});
</script>

<style scoped>
.bookmark-link {
  cursor: pointer;
  text-decoration: underline dotted;
  color: var(--font-color);
}
</style>
