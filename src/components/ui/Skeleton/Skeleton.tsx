import styles from './Skeleton.module.sass';
import type { SkeletonProps } from './Skeleton.types';

/**
 * Skeleton placeholder component
 * @param props Sizing of skeleton
 * @returns Styled division element
 */
export function Skeleton({ width, height }: SkeletonProps) {
  return (
    <div
      className={styles.skeleton}
      style={{
        width,
        height,
      }}
    />
  );
}
