import { BinIcon, DocumentIcon } from '@/components/ui/Icon';
import { EditModeContext } from '@/context/editModeContext';
import { TreeRowContext } from '@/context/treeRowContext';
import { useTree } from '@/hooks/useTree';
import { COLORS } from '@/utils/constants';
import { useCallback, useContext, useEffect, useState } from 'react';
import styles from './Pill.module.sass';
import type { PillProps } from './Pill.types';

/**
 * Row managing pill component with create and delete icons.
 * @param props Id for pill managing
 * @returns Division with create and delete icons
 */
export function Pill({ id: rawId }: PillProps) {
  const [id, setId] = useState<number | undefined>(undefined);
  const { has } = useContext(EditModeContext);
  const { deleteElement, addElement } = useContext(TreeRowContext);
  const {
    response: { isMutating, data },
    deleteRow,
  } = useTree();

  const handleCreate = useCallback(() => {
    if (rawId) addElement(rawId);
  }, [rawId, addElement]);

  const handleDelete = useCallback(() => {
    setId(rawId);
    if (rawId) deleteRow(rawId);
  }, [rawId, deleteRow]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Run only on id change
  useEffect(() => {
    if (!id || (!isMutating && data)) return;
    deleteElement(id);
  }, [id, isMutating]);

  return (
    <div
      className={styles.pill}
      // -1 means it's a new row
      data-editable={(rawId && has(rawId)) || rawId === -1}
    >
      <DocumentIcon
        size={24}
        fill={COLORS.primary}
        onClick={handleCreate}
      />
      <BinIcon
        size={24}
        fill={COLORS.secondary}
        onClick={handleDelete}
      />
    </div>
  );
}
