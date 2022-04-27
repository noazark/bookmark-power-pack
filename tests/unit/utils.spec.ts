import {
  BookmarkTreeNode,
  filterChildren,
  hasLinks,
  inferType,
} from "@/browser/bookmarks";

const defaultBookmark: BookmarkTreeNode = {
  id: "foo",
  title: "",
};

const folder: BookmarkTreeNode = { ...defaultBookmark, type: "folder" };
const bookmark: BookmarkTreeNode = { ...defaultBookmark, type: "bookmark" };
const separator: BookmarkTreeNode = { ...defaultBookmark, type: "separator" };

describe("inferType", () => {
  it.each([
    {
      ...defaultBookmark,
      url: "https://www.example.com",
    },
    {
      ...defaultBookmark,
      type: "bookmark",
    },
  ])("example #%# returns 'bookmark'", (exp) => {
    expect(inferType(exp as BookmarkTreeNode)).toEqual("bookmark");
  });

  it.each([
    {
      ...defaultBookmark,
      type: "folder",
      url: "https://www.example.com",
    },
    {
      ...defaultBookmark,
    },
  ])("example #%# returns 'folder'", (exp) => {
    expect(inferType(exp as BookmarkTreeNode)).toEqual("folder");
  });

  it.each([
    {
      ...defaultBookmark,
      type: "separator",
    },
  ])("example #%# returns 'separator'", (exp) => {
    expect(inferType(exp as BookmarkTreeNode)).toEqual("separator");
  });
});

describe("hasLinks", () => {
  it("returns true if any of the children are bookmarks", () => {
    const tree = { ...defaultBookmark, children: [folder, bookmark] };
    expect(hasLinks(tree)).toBeTruthy();
  });

  it("returns false if none of the children are bookmarks", () => {
    const tree = { ...defaultBookmark, children: [folder, separator] };
    expect(hasLinks(tree)).toBeFalsy();
  });
});

describe("filterChildren", () => {
  it("returns only a single type", () => {
    const tree = { ...defaultBookmark, children: [folder, bookmark] };
    expect(filterChildren(tree, ["folder"])).toEqual([folder]);
  });

  it("returns only a multiple type", () => {
    const tree = { ...defaultBookmark, children: [folder, bookmark] };
    expect(filterChildren(tree, ["folder", "bookmark"])).toEqual([
      folder,
      bookmark,
    ]);
  });

  it("returns nothing if you tell it to", () => {
    const tree = { ...defaultBookmark, children: [folder, bookmark] };
    expect(filterChildren(tree, [])).toEqual([]);
  });

  it("returns nothing if there are no children", () => {
    const tree = { ...defaultBookmark };
    expect(filterChildren(tree, [])).toEqual([]);
  });
});
