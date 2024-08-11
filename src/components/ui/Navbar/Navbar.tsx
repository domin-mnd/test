import { TabsContext } from '@/context/tabsContext';
import { useContext } from 'react';
import styles from './Navbar.module.sass';
import { NavbarTab } from './NavbarTab';

/**
 * Sidebar component with tabs retrieved using tabs context.
 * @returns Aside element with list of tabs
 */
export function Navbar() {
  const { openedTabs, tabs } = useContext(TabsContext);

  const navbarTabs = tabs.map((tab) => (
    <li key={tab.id}>
      <NavbarTab active={openedTabs.includes(tab.id)} {...tab} />
    </li>
  ));

  return (
    <aside className={styles.sidebar}>
      <ul>{navbarTabs}</ul>
    </aside>
  );
}
