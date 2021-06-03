<template>
  <div class="top-pad"></div>
  <div class="container">
    <TheBookmarkMenu class="menu" />
    <TheBookmarkPage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useBookmarks } from "./state";
import TheBookmarkMenu from "./components/TheBookmarkMenu.vue";
import TheBookmarkPage from "./components/TheBookmarkPage.vue";

export default defineComponent({
  name: "App",

  components: {
    TheBookmarkMenu,
    TheBookmarkPage,
  },

  setup() {
    useBookmarks();
  },
});
</script>

<style lang="scss">
:root {
  --background-color: #e8e4e1;
  --font-color: #2a2a2e;
  --container-width: 940px;
  --container-margin: 16px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #2a2a2e;
    --font-color: #e8e4e1;
  }
}

body {
  margin: 0;
  padding: 0;

  font-size: 14px;
  color: var(--font-color);
  background-color: var(--background-color);
  fill: var(--font-color);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

h1,
h2,
h3 {
  margin: 0;
}

h1 {
  font-weight: 900;
  font-size: 48px;
  text-transform: uppercase;
  display: inline-block;
  margin-bottom: 14px;
}

h2 {
  font-weight: 400;
  font-size: 36px;
  box-sizing: border-box;
  margin-bottom: 10px 0;
}

h3 {
  font-weight: 400;
  font-style: italic;
  font-size: 24px;
  box-sizing: border-box;
  margin-bottom: 10px 0;
}

h3 > a {
  color: var(--font-color);
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--font-color);
  padding: 0;
}

#app {
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

#app > * {
  flex-grow: 1;
  box-sizing: border-box;
  width: 100%;
  max-width: calc(var(--container-width) + var(--container-margin) * 2);
}

.container {
  padding: var(--container-margin);
}

.top-pad {
  max-height: 100px;
}

.icon {
  display: inline-block;
  vertical-align: text-top;
  fill: currentColor;
}
</style>
