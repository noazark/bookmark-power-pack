<template>
  <power-pack :padTop="false">
    <div v-for="(tabs, host) in groupedTabs" :key="host">
      <span class="group-title">{{ host }}</span>

      <ul>
        <li v-for="tab in tabs" :key="tab.index">
          <tab-link :tab="tab" @select="selectTab" @close="closeTab"></tab-link>
        </li>
      </ul>
    </div>
  </power-pack>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TabLink from "@/components/TabLink.vue";
import PowerPack from "@/components/PowerPack.vue";
import { useTabs, groupedTabs, selectTab, closeTab } from "./state";

export default defineComponent({
  name: "App",

  components: {
    PowerPack,
    TabLink,
  },

  setup() {
    useTabs();

    return {
      groupedTabs,
      selectTab,
      closeTab,
    };
  },
});
</script>

<style lang="scss" scoped>
ul {
  padding: 0;
  list-style: none;

  > li {
    margin: 8px 0;
  }
}

.group-title {
  opacity: 0.5;
  font-weight: 200;
}
</style>
