<template>
  <header class="the-bookmark-menu">
    <button @click="selectPage()">
      <h1>Bookmarks</h1>
    </button>

    <Breadcrumbs class="breadcrumbs" :breadcrumbs="breadcrumbs">
      <template v-slot="{ el: bookmark }">
        <BookmarkLink :bookmark="bookmark" @select="selectPage">
          {{ bookmark.title }}
        </BookmarkLink>
      </template>

      <template v-slot:last="{ el: bookmark }">
        <span>
          {{ bookmark.title }}
        </span>
      </template>
    </Breadcrumbs>

    <div class="pin">
      <button @click="pin">
        <component :is="pinIcon" :size="16" />
      </button>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import {
  breadcrumbs,
  selectPage,
  pinBookmark,
  isPinned,
} from "@/override/state";
import BookmarkLink from "@/components/BookmarkLink.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import IconPin from "@/components/IconPin.vue";
import IconX from "@/components/IconX.vue";

export default defineComponent({
  components: {
    Breadcrumbs,
    BookmarkLink,
  },

  setup() {
    const pinIcon = computed(() => (!isPinned.value ? IconPin : IconX));

    function pin() {
      pinBookmark();
    }

    return {
      pinIcon,
      breadcrumbs,
      selectPage,
      pin,
    };
  },
});
</script>

<style lang="postcss" scoped>
.the-bookmark-menu {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid var(--font-color);
}

h1 {
  margin-top: 0;
  line-height: 40px;
}

.breadcrumbs {
  flex-grow: 1;
}

.pin {
  margin-left: 8px;
}
</style>
