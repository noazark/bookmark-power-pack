import { Tab } from "@/browser/tabs";
import { computed, onMounted, onUnmounted, ref } from "vue";

export function useTabs(): void {
  // all this event handling is funky. Each event has it's own handler with a certain mutation.
  const events = [
    { evt: browser.tabs.onActivated, handler: handleActivated },
    { evt: browser.tabs.onCreated, handler: handleCreate },
    { evt: browser.tabs.onRemoved, handler: handleRemove },
    { evt: browser.tabs.onUpdated, handler: handleUpdate },
  ];

  async function handleRemove(tabId: number) {
    const idx = tabs.value.findIndex((tab) =>
      tab == null ? true : tab.id === tabId
    );
    tabs.value.splice(idx, 1);
  }

  function handleActivated(activeInfo: Record<string, unknown>) {
    const idx = tabs.value.findIndex((tab) => tab.id === activeInfo.tabId);
    const prevIdx = tabs.value.findIndex(
      (tab) => tab.id === activeInfo.previousTabId
    );
    tabs.value[idx].active = true;
    tabs.value[prevIdx].active = false;
  }

  async function handleUpdate(
    tabId: number,
    changeInfo: Record<string, unknown>
  ) {
    // hack to prevent tabs from switching groups prematurely
    if (
      changeInfo.hasOwnProperty("url") &&
      changeInfo["url"] == "about:blank"
    ) {
      delete changeInfo["url"];
    }

    const idx = tabs.value.findIndex((tab) => tab.id === tabId);
    Object.assign(tabs.value[idx], changeInfo);
  }

  async function handleCreate(tab: Tab) {
    tabs.value.push(tab);
  }

  onMounted(() => {
    loadTabs();

    events.map(({ evt, handler }) => evt.addListener(handler));
  });

  onUnmounted(() => {
    events.map(({ evt, handler }) => evt.removeListener(handler));
  });

  onMounted(async () => {
    await loadTabs();
  });
}

function getGroup(tab: Tab) {
  if (tab.pinned) {
    return "pinned";
  }

  if (tab.url) {
    const u = new URL(tab.url);

    if (groupedDomains.includes(u.host)) {
      return u.host;
    }
  }

  return "Other";
}

/**
 * STATE
 */
export const tabs = ref<Tab[]>([]);
export const removed = ref(0);
const groupedDomains = ["docs.google.com", "www.google.com"];

/**
 * GETTERS
 */
export const groupedTabs = computed(() => {
  const groups: Record<string, Tab[]> = {};

  tabs.value.reduce((groups, tab) => {
    const group = getGroup(tab);

    if (groups[group] == null) {
      groups[group] = [];
    }

    groups[group].push(tab);

    return groups;
  }, groups);

  return groups;
});

/**
 * Methods
 */
export async function loadTabs(): Promise<void> {
  tabs.value = await browser.tabs.query({ currentWindow: true });
}

export function selectTab(tabId: number): Promise<Tab | undefined> {
  return browser.tabs.update(tabId, { active: true });
}

export function closeTab(tabId: number): Promise<void> {
  console.log("close", tabId);

  return browser.tabs.remove(tabId);
}
