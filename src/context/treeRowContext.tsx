import { useTree } from '@/hooks/useTree';
import {
  addTreeElement,
  createTreeElement,
  deleteTreeElement,
  parseTree,
  updateTreeElement,
} from '@/utils/tree';
import type {
  ApiRow,
  CreateApiRow,
  GetTreeRowsResponse,
  ParsedApiRow,
} from '@/utils/types';
import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';

export interface ITreeRowContext {
  tree: ParsedApiRow[];
  loaded: boolean;
  setTree: (cb: (prev: ParsedApiRow[]) => ParsedApiRow[]) => void;
  addElement: (originRowId: number | null) => void;
  createElement: (
    originRowId: number | null,
    newElement: CreateApiRow,
    newId: number,
  ) => void;
  deleteElement: (rowId: number) => void;
  updateElement: (newElement: Omit<ApiRow, 'child'>) => void;
}

// Using native context API instead of redux/mobx/zustand/jotai etc. to avoid boilerplate & dependency pollution.
export const TreeRowContext = createContext<ITreeRowContext>({
  tree: [],
  loaded: false,
  setTree: () => {},
  addElement: () => {},
  createElement: () => {},
  deleteElement: () => {},
  updateElement: () => {},
});

export function TreeRowProvider({ children }: PropsWithChildren) {
  const [tree, setTree] = useState<ParsedApiRow[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const {
    response: { data },
    getTree,
  } = useTree<GetTreeRowsResponse>();

  useEffect(() => {
    if (data) {
      setTree(parseTree(data));
      setLoaded(true);
    }
  }, [data]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Run on mount, called twice with hydration
  useEffect(() => {
    getTree();
  }, []);

  const addElement = useCallback(
    (originRowId: number | null) => {
      // Run outside of setTree not to cause side effects
      const newTree = addTreeElement(tree, originRowId);
      setTree(newTree);
    },
    [tree],
  );

  const createElement = useCallback(
    (
      originRowId: number | null,
      newElement: CreateApiRow,
      newId: number,
    ) => {
      const newTree = createTreeElement(tree, originRowId, {
        ...newElement,
        id: newId,
        total: 0,
        child: [],
      });
      setTree(newTree);
    },
    [tree],
  );

  const deleteElement = useCallback(
    (rowId: number) => {
      const newTree = deleteTreeElement(tree, rowId);
      setTree(newTree);
    },
    [tree],
  );

  const updateElement = useCallback(
    (newElement: Omit<ApiRow, 'child'>) => {
      const newTree = updateTreeElement(tree, newElement);
      setTree(newTree);
    },
    [tree],
  );

  return (
    <TreeRowContext.Provider
      value={{
        tree,
        loaded,
        setTree,
        addElement,
        createElement,
        deleteElement,
        updateElement,
      }}
    >
      {children}
    </TreeRowContext.Provider>
  );
}
