import type {
  ApiRow,
  GetTreeRowsResponse,
  ParsedApiRow,
} from './types';

/**
 * Parse the tree data from the API to a more usable format
 * @param data Data from the API
 * @returns Parsed tree
 */
export function parseTree(data: GetTreeRowsResponse): ParsedApiRow[] {
  return data.map((row) => ({
    ...row,
    createMode: undefined,
    child: parseTree(row.child),
  }));
}

/**
 * Flatten the tree structure to a single array
 * @param tree Tree structure
 * @returns Flattened tree
 */
export function flattenTree(tree: ParsedApiRow[] | undefined) {
  if (!tree) return [];
  const result: ParsedApiRow[] = [];

  function traverse(node: ParsedApiRow) {
    result.push(node);
    node.child.forEach(traverse);
  }

  tree.forEach(traverse);
  return result;
}

/**
 * Get the depth of the tree
 * @param tree Tree structure
 * @returns {number} Depth of the tree
 */
export function getDepth(tree: ParsedApiRow[] | undefined): number {
  if (!tree) return 0;
  return (
    1 + Math.max(0, ...tree.map(({ child = [] }) => getDepth(child)))
  );
}

/**
 * Add a new element to the tree in create mode
 * @param tree Tree structure
 * @param originRowId Origin row id to add the new element to
 * @returns Updated tree
 */
export function addTreeElement(
  tree: ParsedApiRow[],
  // use originRowId and push new element to the child array
  originRowId: number | null,
) {
  if (originRowId === null) {
    return [
      ...tree,
      {
        id: -1,
        rowName: '',
        total: 0,
        salary: 0,
        equipmentCosts: 0,
        overheads: 0,
        estimatedProfit: 0,
        mimExploitation: 0,
        machineOperatorSalary: 0,
        materials: 0,
        mainCosts: 0,
        supportCosts: 0,
        createMode: {
          originRowId: -1,
        },
        child: [],
      },
    ];
  }

  function traverse(nodes: ParsedApiRow[]) {
    return nodes.reduce<ParsedApiRow[]>((acc, node) => {
      if (node.id !== originRowId) {
        if (node.child && node.child.length > 0)
          node.child = traverse(node.child);

        acc.push(node);
        return acc;
      }

      const element = {
        id: -1,
        rowName: '',
        total: 0,
        salary: 0,
        equipmentCosts: 0,
        overheads: 0,
        estimatedProfit: 0,
        mimExploitation: 0,
        machineOperatorSalary: 0,
        materials: 0,
        mainCosts: 0,
        supportCosts: 0,
        createMode: {
          originRowId,
        },
        child: [],
      };

      const child = [...(node.child ?? []), element];
      acc.push({
        ...node,
        child,
      });

      return acc;
    }, []);
  }

  return traverse(deleteTreeElement(tree, -1));
}

/**
 * Create a new tree element with given payload.
 * @param tree Tree structure
 * @param originRowId Origin row id to add the new element to
 * @param payload New element payload
 * @returns Updated tree
 */
export function createTreeElement(
  tree: ParsedApiRow[],
  originRowId: number | null,
  payload: ParsedApiRow,
) {
  if (originRowId === null) {
    return [
      ...tree,
      {
        ...payload,
        child: [],
      },
    ];
  }

  function traverse(nodes: ParsedApiRow[]) {
    return nodes.reduce<ParsedApiRow[]>((acc, node) => {
      if (node.id === originRowId) {
        acc.push({
          ...node,
          child: [
            ...(node.child ?? []),
            {
              ...payload,
              child: [],
            },
          ],
        });
      } else {
        if (node.child && node.child.length > 0)
          node.child = traverse(node.child);

        acc.push(node);
      }

      return acc;
    }, []);
  }

  return traverse(tree);
}

/**
 * Delete a tree element by its id
 * @param tree Tree structure
 * @param id Id of the element to delete
 * @returns Updated tree
 */
export function deleteTreeElement(tree: ParsedApiRow[], id: number) {
  function traverse(nodes: ParsedApiRow[]) {
    return nodes.reduce<ParsedApiRow[]>((acc, node) => {
      if (node.id !== id) {
        if (node.child && node.child.length > 0)
          node.child = traverse(node.child);

        acc.push(node);
      }

      return acc;
    }, []);
  }

  return traverse(tree);
}

/**
 * Update a tree element by its id
 * @param tree Tree structure
 * @param newNode New element data
 * @returns Updated tree
 */
export function updateTreeElement(
  tree: ParsedApiRow[],
  newNode: Omit<ApiRow, 'child'>,
) {
  // Update node by its id without reduce
  function traverse(nodes: ParsedApiRow[]) {
    const foundNode = nodes.find((node) => node.id === newNode.id);
    const filtered = nodes.filter((node) => node.id !== newNode.id);

    if (foundNode) {
      return [
        ...filtered,
        {
          ...foundNode,
          ...newNode,
        },
      ];
    }

    return filtered.map(
      (node): ParsedApiRow => ({
        ...node,
        child: traverse(node.child),
      }),
    );
  }

  return traverse(tree);
}
