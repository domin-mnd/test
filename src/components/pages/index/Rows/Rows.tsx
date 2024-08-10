import { Row, SkeletonRow } from '@/components/pages/index';
import { TreeRowContext } from '@/context/treeRowContext';
import { flattenTree } from '@/utils/tree';
import { useContext } from 'react';
import { CreateRow } from './CreateRow';

/**
 * Rows component for rendering the rows taken from TreeRowContext using <Row />.
 * @returns table rows without tree structure
 */
export function Rows() {
  const { tree, loaded } = useContext(TreeRowContext);

  if (!loaded) {
    return (
      <>
        {Array.from({ length: 4 }, (_, index) => (
          // Using index as a key is not recommended but it's fine for a skeleton
          <SkeletonRow key={index} />
        ))}
      </>
    );
  }

  const flatData = flattenTree(tree);

  // Using fragments isn't recommended for a component but it's fine for modularity reasons.
  return (
    <>
      {!flatData.length && <CreateRow originRowId={null} />}
      {/**
       * Could use <Suspense /> but it's not recommended
       * @see {@link https://swr.vercel.app/docs/suspense}
       */}
      {flatData?.map((row) =>
        row.createMode ? (
          <CreateRow
            key={row.id}
            originRowId={row.createMode.originRowId}
          />
        ) : (
          <Row key={row.id} row={row} />
        ),
      )}
    </>
  );
}
