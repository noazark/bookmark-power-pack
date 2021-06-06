<template>
  <div class="the-bookmark-page">
    <template v-if="selectedPage">
      <section class="links">
        <Folder
          :bookmark="selectedPage"
          :filter="['bookmark']"
          :openAllEnabled="hasLinks(selectedPage)"
          :showEmpty="false"
          :showTitle="false"
          @openAll="handleOpenAll(selectedPage)"
          @select="selectPage"
        />
      </section>
    </template>

    <template v-if="folders?.length > 0">
      <section class="folders">
        <Folder
          v-for="bookmark in folders"
          :key="bookmark.id"
          :bookmark="bookmark"
          :limit="5"
          :openAllEnabled="hasLinks(bookmark)"
          @openAll="handleOpenAll(bookmark)"
          @select="selectPage"
        />
      </section>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { hasLinks, filterChildren } from "@/browser/bookmarks";
import {
  selectedPage,
  openWindow as handleOpenAll,
  selectPage,
} from "@/override/state";
import Folder from "@/components/Folder.vue";

export default defineComponent({
  components: {
    Folder,
  },

  setup() {
    const folders = computed(() =>
      selectedPage.value ? filterChildren(selectedPage.value, ["folder"]) : []
    );

    return {
      selectPage,
      selectedPage,
      folders,
      handleOpenAll,
      hasLinks,
    };
  },
});
</script>

<style lang="scss" scoped>
.folders {
  --columns: 3;
  --column-gap: 60px;
  --column-min-width: 200px;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--column-min-width), 1fr));
  column-gap: var(--column-gap);
}

.links > *,
.folders > * {
  margin-top: 24px;
}
</style>
