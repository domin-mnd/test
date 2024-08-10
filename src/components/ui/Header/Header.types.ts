import type { Link } from '@/utils/types';

export interface Project {
  name: string;
  description: string;
}

export interface HeaderProps {
  /** Top header list of labeled links. */
  links: Link[];
  /** Project dropdown information. */
  project: Project;
}
