import { Tab } from "@/browser/tabs";
import { computed, onMounted, onUnmounted, ref } from "vue";

export function useTabs(): void {
  const events = [
    browser.tabs.onRemoved,
    browser.tabs.onUpdated,
    browser.tabs.onDetached,
  ];

  function handleReload() {
    loadTabs();
  }

  onMounted(() => {
    loadTabs();

    events.map((evt) => evt.addListener(handleReload));
  });

  onUnmounted(() => {
    events.map((evt) => evt.removeListener(handleReload));
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
const groupedDomains = ["docs.google.com"];

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
