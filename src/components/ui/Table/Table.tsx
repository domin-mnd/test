import styles from './Table.module.sass';
import type { TableProps } from './Table.types';

/**
 * Custom table component with styling.
 * @param props Table's children
 * @returns Table element with styling
 */
export function Table({ children }: TableProps) {
  return <table className={styles.table}>{children}</table>;
}
