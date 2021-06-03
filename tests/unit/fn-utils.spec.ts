import { findNode, flatten, getAncestors, TreeNode } from "@/fn-utils";

const a = {
  id: "a",
};
const b = {
  id: "b",
  parentId: "a",
};
const c = {
  id: "c",
  parentId: "a",
};
const d = {
  id: "d",
  parentId: "a",
};
const e = {
  id: "e",
  parentId: "d",
};

const nodes = [a, b, c, d, e];
const tree = {
  ...a,
  children: [b, c, { ...d, children: [e] }],
};

describe("flatten", () => {
  it("returns an array of all nodes in the tree", () => {
    expect(flatten(tree)).toMatchObject(nodes);
  });

  it("a short tree is easy", () => {
    expect(flatten(a)).toMatchObject([a]);
  });
});

describe("getAncestors", () => {
  it("returns an array of nodes between root and the specified id", () => {
    const expected = [a, d, e];

    expect(getAncestors(nodes, "e")).toMatchObject(expected);
    expect(getAncestors(tree, "e")).toMatchObject(expected);
  });

  it("returns an empty tree", () => {
    const expected: TreeNode[] = [];

    expect(getAncestors(nodes, "x")).toMatchObject(expected);
    expect(getAncestors(tree, "x")).toMatchObject(expected);
  });
});

describe("findNode", () => {
  it("returns the node on a tree matching the specified id", () => {
    const expected: TreeNode = d;
    expect(findNode(nodes, "d")).toMatchObject(expected);
    expect(findNode(tree, "d")).toMatchObject(expected);
  });

  it("returns undefined when the specified id does not exist", () => {
    expect(findNode(nodes, "x")).toBeUndefined();
    expect(findNode(tree, "x")).toBeUndefined();
  });
});
