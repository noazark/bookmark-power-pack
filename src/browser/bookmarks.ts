export type BookmarkTreeNodeType = browser.bookmarks.BookmarkTreeNodeType;
export type BookmarkTreeNode = browser.bookmarks.BookmarkTreeNode;

export const getTree = (): Promise<BookmarkTreeNode[]> =>
  browser.bookmarks.getTree();

export function is(
  bookmark: BookmarkTreeNode,
  type: BookmarkTreeNodeType
): boolean {
  return inferType(bookmark) === type;
}

export function inferType(bookmark: BookmarkTreeNode): BookmarkTreeNodeType {
  return bookmark.type || (bookmark.url != null ? "bookmark" : "folder");
}

export function hasLinks(bookmark: BookmarkTreeNode): boolean {
  return bookmark.children?.some((b) => is(b, "bookmark")) || false;
}

export function filterChildren(
  bookmark: BookmarkTreeNode,
  filter: BookmarkTreeNodeType[]
): BookmarkTreeNode[] {
  return bookmark.children?.filter((c) => filter.some((t) => is(c, t))) || [];
}
