<template>
  <div class="folder" v-if="hasChildren || showEmpty">
    <h3 class="title" v-if="showTitle">
      <BookmarkLink :bookmark="bookmark" @select="$emit('select', bookmark.id)">
        {{ bookmark.title }}
      </BookmarkLink>
    </h3>

    <div class="content">
      <ul v-if="hasChildren">
        <li v-for="child in children" :key="child.id">
          <component :is="iconFor(child)" />&nbsp;
          <BookmarkLink :bookmark="child" @select="$emit('select', child.id)">
            {{ child.title }}
          </BookmarkLink>
        </li>
        <li v-if="remaining">+{{ remaining }} more</li>
      </ul>
      <div v-else>empty</div>

      <button v-if="openAllEnabled" class="open-all" @click="$emit('open-all')">
        <IconOpen /> open all bookmarks
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, computed, defineComponent, PropType } from "vue";
import {
  BookmarkTreeNode,
  BookmarkTreeNodeType,
  inferType,
  filterChildren,
} from "@/browser/bookmarks";
import IconOpen from "@/components/IconOpen.vue";
import IconDirectory from "@/components/IconDirectory.vue";
import IconLink from "@/components/IconLink.vue";
import BookmarkLink from "@/components/BookmarkLink.vue";

export default defineComponent({
  props: {
    showTitle: {
      default: true,
    },

    limit: {
      default: 0,
    },

    filter: {
      default: () => ["bookmark", "folder"],
      type: Array as PropType<BookmarkTreeNodeType[]>,
    },

    openAllEnabled: {
      type: Boolean,
      default: false,
    },

    showEmpty: {
      type: Boolean,
      default: true,
    },

    bookmark: {
      type: Object as PropType<BookmarkTreeNode>,
      required: true,
    },
  },

  components: {
    BookmarkLink,
    IconOpen,
  },

  setup(props) {
    const filtered = computed(() =>
      filterChildren(props.bookmark, props.filter)
    );
    const children = computed(() => {
      if (props.limit === 0) return filtered.value;
      return filtered.value.slice(0, props.limit);
    });
    const remaining = computed(() => {
      const limit = props.limit;
      const childrenCount = filtered.value.length;
      return limit > 0 && childrenCount > limit ? childrenCount - limit : 0;
    });
    const hasChildren = computed(() => children.value.length > 0);

    function iconFor(bookmark: BookmarkTreeNode) {
      const map: Record<BookmarkTreeNodeType, Component | undefined> = {
        bookmark: IconLink,
        folder: IconDirectory,
        separator: undefined,
      };

      return map[inferType(bookmark)];
    }

    return {
      children,
      hasChildren,
      remaining,
      iconFor,
    };
  },
});
</script>

<style lang="scss" scoped>
.content {
  > ul {
    padding-left: 0px;
    > li {
      list-style-type: none;
      list-style-position: inside;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.4;
    }
  }
}
</style>
