import { COLORS } from '@/utils/constants';
import styles from './NavbarTab.module.sass';
import type { NavbarTabProps } from './NavbarTab.types';

/**
 * Tab component for the Navbar list
 * @param props Tab information
 * @returns Styled button with icon and label
 */
export function NavbarTab({ icon: Icon, ...tab }: NavbarTabProps) {
  return (
    <button
      type='button'
      data-active={tab.active}
      className={styles.button}
    >
      <Icon size={22} fill={COLORS.text} />
      <span>{tab.label}</span>
    </button>
  );
}
