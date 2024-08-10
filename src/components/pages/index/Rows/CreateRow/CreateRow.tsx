import { TreeRowContext } from '@/context/treeRowContext';
import { useTree } from '@/hooks/useTree';
import type {
  CreateApiRow,
  PostTreeRowResponse,
} from '@/utils/types';
import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Cell, type CellRef } from '../Cell';
import styles from './CreateRow.module.sass';
import type { CreateRowProps } from './CreateRow.types';

/**
 * Interactive table row for creation (excludes the tree).
 * @param props Parent row id
 * @returns Table row element with registered call event
 */
export const CreateRow = memo<CreateRowProps>(function CreateRow({
  originRowId,
}) {
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const [payload, setPayload] = useState<CreateApiRow>();
  const { createElement, deleteElement } = useContext(TreeRowContext);
  const {
    response: { data },
    createRow,
  } = useTree<PostTreeRowResponse>();

  // useRef pollution
  const rowNameRef = useRef<CellRef<string>>(null);
  const salaryRef = useRef<CellRef<number>>(null);
  const equipmentCostsRef = useRef<CellRef<number>>(null);
  const overheadsRef = useRef<CellRef<number>>(null);
  const estimatedProfitRef = useRef<CellRef<number>>(null);

  const handleEdit = useCallback(() => {
    setIsEditable(false);
  }, []);

  /**
   * Forcing ref update by component rerender. I hate this solution but it'd take too much time to refactor.
   * @todo Refactor
   */
  // biome-ignore lint/correctness/useExhaustiveDependencies: Force ref update
  useEffect(() => {
    if (isEditable) return;
    setIsEditable(true);
    if (!rowNameRef.current?.payloadValue) return deleteElement(-1);
    const newPayload = {
      mimExploitation: 0,
      machineOperatorSalary: 0,
      materials: 0,
      mainCosts: 0,
      supportCosts: 0,
      parentId: originRowId,
      rowName: rowNameRef.current?.payloadValue ?? '',
      salary: salaryRef.current?.payloadValue ?? 0,
      equipmentCosts: equipmentCostsRef.current?.payloadValue ?? 0,
      overheads: overheadsRef.current?.payloadValue ?? 0,
      estimatedProfit: estimatedProfitRef.current?.payloadValue ?? 0,
    };

    setPayload(newPayload);
    createRow(newPayload);
  }, [isEditable]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Do not get into the infinite call loop
  useEffect(() => {
    if (!data || !payload) return;
    deleteElement(-1);
    createElement(
      originRowId,
      { ...payload, ...data.current },
      data.current.id,
    );
  }, [data, payload]);

  return (
    <tr
      onDoubleClick={() => handleEdit()}
      className={styles['create-row']}
    >
      {/* Empty <td /> stays for tree level */}
      <td />
      <Cell type='string' editable={isEditable} ref={rowNameRef} />
      <Cell type='number' editable={isEditable} ref={salaryRef} />
      <Cell
        type='number'
        editable={isEditable}
        ref={equipmentCostsRef}
      />
      <Cell type='number' editable={isEditable} ref={overheadsRef} />
      <Cell
        type='number'
        editable={isEditable}
        ref={estimatedProfitRef}
      />
    </tr>
  );
});
