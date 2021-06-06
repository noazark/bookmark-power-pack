<template>
  <PowerPack>
    <TheBookmarkMenu />
    <TheBookmarkPage />
  </PowerPack>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useBookmarks } from "./state";
import PowerPack from "@/components/PowerPack.vue";
import TheBookmarkMenu from "@/components/TheBookmarkMenu.vue";
import TheBookmarkPage from "@/components/TheBookmarkPage.vue";

export default defineComponent({
  name: "App",

  components: {
    PowerPack,
    TheBookmarkMenu,
    TheBookmarkPage,
  },

  setup() {
    useBookmarks();
  },
});
</script>
