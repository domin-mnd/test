import type { Tab as ITab } from '@/utils/types';
import styles from './HeaderTab.module.sass';

/**
 * Tab component. This component is used to render opened tabs in the subheader.
 * @param tab Tab information
 * @returns Button element with specified name
 */
export function HeaderTab({ name }: ITab) {
  return (
    <button className={styles.button} type='button'>
      {name}
    </button>
  );
}
