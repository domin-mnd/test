import styles from './Main.module.sass';
import type { MainProps } from './Main.types';

/**
 * Main component for the layout.
 * @param props <Component {...pageProps} />
 * @returns Semantically correct main element with additional styling
 */
export function Main({ children }: MainProps) {
  return <main className={styles.main}>{children}</main>;
}
