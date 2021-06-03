import localRef from "@/localstorage";
import { getTree } from "@/browser/bookmarks";
import { getAncestors, findNode, flatten } from "@/fn-utils";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { Window, get as getWindow } from "@/browser/windows";
import { filterChildren } from "@/utils";

type BookmarkTreeNode = browser.bookmarks.BookmarkTreeNode;

export function useBookmarks(): void {
  const events = [
    browser.bookmarks.onChanged,
    browser.bookmarks.onCreated,
    browser.bookmarks.onMoved,
    browser.bookmarks.onRemoved,
  ];

  function handleReload() {
    loadBookmarks();
  }

  onMounted(() => {
    loadBookmarks();

    events.map((evt) => evt.addListener(handleReload));
  });

  onUnmounted(() => {
    events.map((evt) => evt.removeListener(handleReload));
  });
}

/**
 * STATE
 */
export const pinnedBookmark = localRef<string | undefined>("pinnedBookmark");
const bookmarks = localRef<BookmarkTreeNode[]>("bookmarks");
export const selectedPageId = ref<string>();
const windowManager = localRef<Record<string, number>>("windowManager", {});

/**
 * GETTERS
 */
export const breadcrumbs = computed(() => {
  if (bookmarks.value == null || selectedPageId.value == null) return;

  let ancestors = getAncestors(bookmarks.value, selectedPageId.value);

  // start the list at the point of the pin
  if (pinnedBookmark.value) {
    ancestors = ancestors.slice(
      ancestors.findIndex((el) => el.id === pinnedBookmark.value)
    );
  }

  return ancestors;
});

export const selectedPage = computed(() => {
  const id =
    selectedPageId.value ||
    pinnedBookmark.value ||
    (bookmarks.value && bookmarks.value[0].id);

  if (id == null) return;

  return findNode(bookmarks.value, id);
});

export const isPinned = computed(() => {
  return !!pinnedBookmark.value;
});

async function _getTree() {
  const tree = (await getTree())[0];

  return flatten(tree);
}

/**
 * METHODS
 */
async function loadBookmarks(): Promise<void> {
  bookmarks.value = await _getTree();
}

export async function pinBookmark(): Promise<void> {
  const id =
    pinnedBookmark.value == null &&
    selectedPageId.value !== pinnedBookmark.value
      ? selectedPageId.value
      : undefined;

  // when unpinning, be sure to set the selected page to the prev pin to
  // prevent page thrash.
  if (id == null)
    await selectPage(selectedPageId.value || pinnedBookmark.value);

  pinnedBookmark.value = id;

  return await loadBookmarks();
}

export async function selectPage(id: string | undefined): Promise<void> {
  selectedPageId.value = id;
}

export async function openWindow(bookmark: BookmarkTreeNode): Promise<void> {
  const target = windowManager.value[bookmark.id];
  let window: Window | undefined;

  // TODO: "merge" missing tabs back into window
  if (target) {
    try {
      window = await getWindow(target);

      if (window?.id) {
        browser.windows.update(window.id, { focused: true });
      }
    } catch {
      // noop - window doesn't exist, we're fine, continue on
    }
  }

  const url = filterChildren(bookmark, ["bookmark"]).map((b) => b.url || "");

  // TODO: maybe raise some exception here to be handled upstream?
  if (url.length > 0) {
    window = await browser.windows.create({
      url,
    });
  }

  if (window?.id) {
    windowManager.value[bookmark.id] = window.id;
  }
}
