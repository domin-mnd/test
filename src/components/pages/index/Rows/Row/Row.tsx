import { EditModeContext } from '@/context/editModeContext';
import { TreeRowContext } from '@/context/treeRowContext';
import { useTree } from '@/hooks/useTree';
import { updateTreeElement } from '@/utils/tree';
import type { ApiRow, PostTreeRowResponse } from '@/utils/types';
import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Cell, type CellRef } from '../Cell';
import type { RowProps } from './Row.types';

/**
 * Interactive table row (excludes the tree).
 * @param props Row information along with the edit callback
 * @returns Table row element with registered call event
 */
export const Row = memo<RowProps>(function Row({ row }) {
  const [isEditable, setIsEditable] = useState<boolean>();
  const { toggle } = useContext(EditModeContext);
  const { updateElement, tree, setTree } = useContext(TreeRowContext);
  const {
    updateRow,
    response: { data },
  } = useTree<PostTreeRowResponse>();

  /**
   * useRef pollution.
   * @todo Refactor
   */
  const rowNameRef = useRef<CellRef<string>>(null);
  const salaryRef = useRef<CellRef<number>>(null);
  const equipmentCostsRef = useRef<CellRef<number>>(null);
  const overheadsRef = useRef<CellRef<number>>(null);
  const estimatedProfitRef = useRef<CellRef<number>>(null);

  const resetRefValues = useCallback(() => {
    rowNameRef.current?.clearPayload();
    salaryRef.current?.clearPayload();
    equipmentCostsRef.current?.clearPayload();
    overheadsRef.current?.clearPayload();
    estimatedProfitRef.current?.clearPayload();
  }, []);

  const handleEdit = useCallback(() => {
    toggle(row.id);
    setIsEditable((prev) => !prev);
  }, [row.id, toggle]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Run only on editable change
  useEffect(() => {
    if (isEditable !== false) return;
    if (
      [
        rowNameRef,
        salaryRef,
        equipmentCostsRef,
        overheadsRef,
        estimatedProfitRef,
      ].every((ref) => !ref.current?.hasValue)
    ) {
      resetRefValues();
      return;
    }

    const payload: Omit<ApiRow, 'child'> = {
      id: row.id,
      total: 0,
      mimExploitation: 0,
      machineOperatorSalary: 0,
      materials: 0,
      mainCosts: 0,
      supportCosts: 0,
      rowName: rowNameRef.current?.payloadValue ?? '',
      salary: salaryRef.current?.payloadValue ?? 0,
      equipmentCosts: equipmentCostsRef.current?.payloadValue ?? 0,
      overheads: overheadsRef.current?.payloadValue ?? 0,
      estimatedProfit: estimatedProfitRef.current?.payloadValue ?? 0,
    };

    resetRefValues();
    updateElement(payload);
    updateRow(row.id, payload);
  }, [isEditable]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Do not get into the infinite call loop
  useEffect(() => {
    if (!data) return;
    let newTree = tree;
    data.changed?.forEach((element) => {
      newTree = updateTreeElement(newTree, element);
    });
    setTree(() => newTree);
  }, [data]);

  return (
    <tr onDoubleClick={() => handleEdit()}>
      {/* Empty <td /> stays for tree level */}
      <td />
      <Cell
        item={row.rowName}
        type='string'
        editable={isEditable ?? false}
        ref={rowNameRef}
      />
      <Cell
        item={row.salary}
        type='number'
        editable={isEditable ?? false}
        ref={salaryRef}
      />
      <Cell
        item={row.equipmentCosts}
        type='number'
        editable={isEditable ?? false}
        ref={equipmentCostsRef}
      />
      <Cell
        item={row.overheads}
        type='number'
        editable={isEditable ?? false}
        ref={overheadsRef}
      />
      <Cell
        item={row.estimatedProfit}
        type='number'
        editable={isEditable ?? false}
        ref={estimatedProfitRef}
      />
    </tr>
  );
});
