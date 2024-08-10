import { OPENED_TABS, TABS } from '@/utils/constants';
import type { Tab } from '@/utils/types';
import { type PropsWithChildren, createContext } from 'react';

export interface ITabsContext {
  /** All tabs. */
  tabs: Tab[];
  /** List of ids (keys) of open tabs. */
  openedTabs: string[];
}

// Using native context API instead of redux/mobx/zustand/jotai etc. to avoid boilerplate & dependency pollution.
export const TabsContext = createContext<ITabsContext>({
  tabs: TABS,
  openedTabs: OPENED_TABS,
});

export function TabsProvider({ children }: PropsWithChildren) {
  return (
    <TabsContext.Provider
      value={{
        tabs: TABS,
        openedTabs: OPENED_TABS,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
}
