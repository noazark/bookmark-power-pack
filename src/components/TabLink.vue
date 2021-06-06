<template>
  <a
    :class="['tab-link', styleAttrs]"
    @click.stop.prevent="handleSelect"
    :title="preview"
  >
    <div class="tab-action">
      <div class="close" @click.stop.prevent="handleClose">
        <icon-x></icon-x>
      </div>
      <img class="favicon" :src="favIconUrl" v-if="favIconUrl" />
    </div>
    <div class="title">
      {{ title }}
    </div>
  </a>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import IconX from "@/components/IconX.vue";

export default defineComponent({
  props: {
    title: {
      type: String,
    },
    url: {
      type: String,
    },
    favIconUrl: {
      type: String,
    },
    id: {
      type: Number,
    },
    attention: {
      type: Boolean,
    },
    active: {
      type: Boolean,
    },
    pinned: {
      type: Boolean,
    },
    discarded: {
      type: Boolean,
    },
  },

  components: {
    IconX,
  },

  emits: ["select", "close"],

  setup(props, { emit }) {
    const handleSelect = () => emit("select", props.id);
    const handleClose = () => emit("close", props.id);

    const preview = computed(() => {
      return `${props.title} - ${props.url}`;
    });

    const styleAttrs = computed(() => {
      const { attention, active, pinned, discarded } = props;
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

<style scoped>
.tab-link {
  padding: 0 8px;
  margin-left: -6px;

  box-sizing: border-box;
  position: relative;
}

.tab-link::before {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  content: "";

  border-left: 2px solid transparent;
}

.tab-link.pinned::before {
  border-left: 2px solid rgba(var(--font-color-rgb), 0.2);
}

.tab-link.discarded {
  filter: grayscale(100%) opacity(30%);
}

.tab-link.active::before {
  border-left: 2px solid rgb(255, 187, 0);
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
}

.tab-action,
.tab-action .favicon {
  width: 16px;
  height: 16px;
}

.tab-action {
  margin-right: 12px;
}

.tab-link .close {
  display: none;
}
.tab-link:hover .close {
  display: block;
}

.tab-link:hover .favicon {
  display: none;
}
</style>
