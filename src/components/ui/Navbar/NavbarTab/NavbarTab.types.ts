import type { Tab } from '@/utils/types';

export interface NavbarTabProps extends Tab {
  /** Indicates whether tab is active or not. */
  active: boolean;
}
