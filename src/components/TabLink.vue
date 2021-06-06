<template>
  <a
    :class="['tab-link', styleAttrs]"
    @click.stop.prevent="handleSelect"
    :title="preview"
  >
    <slot>
      <div class="close" @click.stop.prevent="handleClose">
        <icon-x></icon-x>
      </div>
      <img
        class="favicon"
        :src="tab.favIconUrl"
        height="16"
        width="16"
        v-if="tab.favIconUrl"
      />
      <div class="title">
        {{ tab.title }}
      </div>
    </slot>
  </a>
</template>

<script lang="ts">
import { Tab } from "@/browser/tabs";
import { computed, defineComponent, PropType } from "vue";
import IconX from "@/components/IconX.vue";

export default defineComponent({
  props: {
    tab: {
      required: true,
      type: Object as PropType<Tab>,
    },
  },

  components: {
    IconX,
  },

  emits: ["select", "close"],

  setup(props, { emit }) {
    const handleSelect = () => emit("select", props.tab.id);
    const handleClose = () => emit("close", props.tab.id);

    const preview = computed(() => {
      return `${props.tab.title} - ${props.tab.url}`;
    });

    const styleAttrs = computed(() => {
      const { attention, active, pinned, discarded } = props.tab;
      return {
        attention,
        active,
        pinned,
        discarded,
      };
    });

    return {
      handleSelect,
      handleClose,
      preview,
      styleAttrs,
    };
  },
});
</script>

<style lang="scss" scoped>
.tab-link {
  padding: 0 6px;
  margin-left: -8px;
  border-left: 2px solid transparent;

  box-sizing: border-box;

  &.pinned {
    border-left: 2px solid rgba(var(--font-color-rgb), 0.2);
  }

  &.discarded {
    border-left: 2px solid rgb(7, 190, 245);
    opacity: 0.2;
  }

  &.active {
    border-left: 2px solid rgb(255, 187, 0);
  }
}

.tab-link .close {
  visibility: hidden;
}

.tab-link .favicon {
  margin-right: 12px;
}

.tab-link .title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tab-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--font-color);
}

.tab-link:hover {
  text-decoration: underline dotted;

  .close {
    visibility: initial;
  }
}
</style>
