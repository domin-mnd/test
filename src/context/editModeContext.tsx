import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react';

export interface IEditModeContext {
  /** List of row ids that are in edit-mode */
  rowsInEditMode: number[];
  toggle: (rowId: number) => void;
  has: (rowId: number) => boolean;
}

// Using native context API instead of redux/mobx/zustand/jotai etc. to avoid boilerplate & dependency pollution.
export const EditModeContext = createContext<IEditModeContext>({
  rowsInEditMode: [],
  toggle: () => {},
  has: () => false,
});

export function EditModeProvider({ children }: PropsWithChildren) {
  const [rowsInEditMode, setRowsInEditMode] = useState<number[]>([]);

  const has = useCallback(
    (rowId: number) => {
      return rowsInEditMode.includes(rowId);
    },
    [rowsInEditMode],
  );

  const toggle = useCallback(
    (rowId: number) => {
      if (has(rowId)) {
        setRowsInEditMode((prev) =>
          prev.filter((value) => value !== rowId),
        );
      } else {
        setRowsInEditMode((prev) => [...prev, rowId]);
      }
    },
    [has],
  );

  return (
    <EditModeContext.Provider
      value={{
        rowsInEditMode,
        has,
        toggle,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
}
