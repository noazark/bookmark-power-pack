export interface TreeNode {
  id: string;
  parentId?: string;
  children?: TreeNode[];
}

function _flatten<T extends TreeNode>(root: T): T[] {
  const { children = [] } = root;
  const result = [root];

  if (children.length > 0) {
    return [
      ...children
        .map((child) => _flatten(child))
        .reduce((a, b) => a.concat(b), result),
    ] as T[];
  }

  return result;
}

export function flatten<T extends TreeNode>(root: T): T[] {
  return _flatten(root);
}

function _getAncestors<T extends TreeNode>(tree: T[], id: string): T[] {
  const parent = findNode(tree, id);

  if (parent == null) return [];

  if (parent.parentId) {
    const ancestry = _getAncestors(tree, parent.parentId);
    return [...ancestry, parent];
  } else {
    return [parent];
  }
}

export function getAncestors<T extends TreeNode>(
  tree: T | T[],
  id: string
): T[] {
  const flatTree = Array.isArray(tree) ? tree : flatten(tree);

  return _getAncestors(flatTree, id);
}

export function findNode<T extends TreeNode>(
  tree: T | T[],
  id: string
): T | undefined {
  const flatTree = Array.isArray(tree) ? tree : flatten(tree);

  return flatTree.find((el) => el.id === id);
}
