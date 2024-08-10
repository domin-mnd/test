import { TreeRowContext } from '@/context/treeRowContext';
import type { ApiRow } from '@/utils/types';
import { useContext } from 'react';
import { Pill } from '../Pill';
import styles from './Tree.module.sass';

/**
 * Tree component for rendering the tree structure taken from TreeRowContext.
 * @returns table row with tree structure
 */
export function Tree() {
  const { tree } = useContext(TreeRowContext);

  const mapNodes = (nodes: ApiRow[]) => (
    <ul>
      {nodes.map((node) => (
        <li
          key={node.id}
          data-create-mode={node.id === -1 ? true : undefined}
        >
          <Pill id={node.id} />
          {node.child.length > 0 && mapNodes(node.child)}
        </li>
      ))}
    </ul>
  );

  return (
    <tr className={styles.tree}>
      <td>{tree && mapNodes(tree)}</td>
    </tr>
  );
}
