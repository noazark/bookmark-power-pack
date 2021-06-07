import { Tab } from "@/browser/tabs";
import { computed, onMounted, onUnmounted, ref } from "vue";

function handleRemove(
  tabId: number,
  removeInfo: {
    windowId: number;
    isWindowClosing: boolean;
  }
) {
  // FIXME: some events are triggered across all windows. Filter those out.
  //
  // The problem is that tab indexes are unique per window and performing a
  // mutation based on index alone will cause the wrong tab to be changed.
  if (removeInfo.windowId !== currentWindowId.value) {
    return;
  }

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

function handleUpdate(
  tabId: number,
  changeInfo: Record<string, unknown>,
  tab: Tab
) {
  // FIXME: some events are triggered across all windows. Filter those out.
  //
  // The problem is that tab indexes are unique per window and performing a
  // mutation based on index alone will cause the wrong tab to be changed.
  if (tab.windowId !== currentWindowId.value) {
    return;
  }

  // hack to prevent tabs from switching groups prematurely
  if (
    Object.prototype.hasOwnProperty.call(changeInfo, "url") &&
    changeInfo["url"] == "about:blank"
  ) {
    delete changeInfo["url"];
  }

  const idx = tabs.value.findIndex((tab) => tab.id === tabId);
  Object.assign(tabs.value[idx], changeInfo);
}

function handleCreate(tab: Tab) {
  // FIXME: some events are triggered across all windows. Filter those out.
  //
  // The problem is that tab indexes are unique per window and performing a
  // mutation based on index alone will cause the wrong tab to be changed.
  if (tab.windowId !== currentWindowId.value) {
    return;
  }

  tabs.value.push(tab);
}

export function useTabs(): void {
  onMounted(async () => {
    const { id } = await browser.windows.getCurrent();
    currentWindowId.value = id;

    loadTabs();

    // Each event has it's on special handling needs :/
    browser.tabs.onActivated.addListener(handleActivated);
    browser.tabs.onCreated.addListener(handleCreate);
    browser.tabs.onRemoved.addListener(handleRemove);
    browser.tabs.onUpdated.addListener(handleUpdate);
  });

  onUnmounted(() => {
    browser.tabs.onActivated.removeListener(handleActivated);
    browser.tabs.onCreated.removeListener(handleCreate);
    browser.tabs.onRemoved.removeListener(handleRemove);
    browser.tabs.onUpdated.removeListener(handleUpdate);
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
export const currentWindowId = ref();
const groupedDomains = ["docs.google.com", "www.google.com"];

/**
 * GETTERS
 */

// FIXME: groupedTabs are not properly sorted.
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
