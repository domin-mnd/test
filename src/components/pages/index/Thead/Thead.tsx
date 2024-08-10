import { TreeRowContext } from '@/context/treeRowContext';
import { getDepth } from '@/utils/tree';
import { useContext } from 'react';

/**
 * Table head component.
 * @returns Table head element with dynamically set column width.
 */
export function Thead() {
  const { tree } = useContext(TreeRowContext);

  // 52 is the pill width, 20 is the left padding per each nesting
  const depth = (getDepth(tree) - 1) * 20 + 52;

  return (
    <thead>
      <tr>
        <th
          scope='col'
          // Set the width of level column manually because the tree itself is displayed as absolute
          style={{
            width: tree.length ? depth : 100,
          }}
        >
          Уровень
        </th>
        <th scope='col'>Наименование работ</th>
        <th scope='col'>Основная з/п</th>
        <th scope='col'>Оборудование</th>
        <th scope='col'>Накладные расходы</th>
        <th scope='col'>Сметная прибыль</th>
      </tr>
    </thead>
  );
}
