import {
  ArrowLeftIcon,
  ChevronDownIcon,
  MenuIcon,
} from '@/components/ui/Icon';
import { TabsContext } from '@/context/tabsContext';
import { COLORS } from '@/utils/constants';
import { useContext } from 'react';
import styles from './Header.module.sass';
import type { HeaderProps } from './Header.types';
import { HeaderLink } from './HeaderLink';
import { HeaderTab } from './HeaderTab';

/**
 * Layout header component including both top and sub header.
 * @param props Header properties
 * @returns Semantically correct header component
 */
export function Header({ links, project }: HeaderProps) {
  const { openedTabs, tabs } = useContext(TabsContext);

  const headerLinks = links.map((link) => (
    <li key={link.href}>
      <HeaderLink {...link} />
    </li>
  ));

  const tabLinks = tabs
    .filter((tab) => openedTabs.includes(tab.id))
    .map((tab) => (
      <li key={tab.id}>
        <HeaderTab {...tab} />
      </li>
    ));

  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.menu}>
          <MenuIcon size={24} fill='currentColor' />
          <ArrowLeftIcon size={24} fill='currentColor' />
        </div>
        <ul className={styles.links}>{headerLinks}</ul>
      </nav>
      <div className={styles.sub}>
        <div className={styles['project-info']}>
          <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
          </div>

          {/** There has to be some sort of dropdown I believe. */}
          <button type='button'>
            <ChevronDownIcon size={24} fill={COLORS.text} />
          </button>
        </div>
        <ul className={styles['opened-tabs']}>{tabLinks}</ul>
      </div>
    </header>
  );
}
