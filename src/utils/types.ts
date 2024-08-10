import type { IconComponent } from '@/components/ui/Icon';

/** Return body of a fetch request. Not sure what most properties are meant for. */
export interface ApiRow {
  id: number;
  rowName: string;
  total: number;
  salary: number;
  mimExploitation: number;
  machineOperatorSalary: number;
  materials: number;
  mainCosts: number;
  supportCosts: number;
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
  child: ApiRow[];
}

export interface ParsedApiRow extends Omit<ApiRow, 'child'> {
  createMode?: {
    originRowId: number;
  };
  child: ParsedApiRow[];
}

export interface CreateApiRow
  extends Omit<ApiRow, 'id' | 'child' | 'total'> {
  parentId: number | null;
}

export type GetTreeRowsResponse = ApiRow[];
export interface PostTreeRowResponse {
  changed: Omit<ApiRow, 'child'>[];
  current: Omit<ApiRow, 'child'>;
}

export interface ApiRequest {
  /** API endpoint. */
  // biome-ignore lint/suspicious/noExplicitAny: Any payload possible
  endpoint: string | ((...args: any[]) => string);
  /** HTTP method. */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

/** <Link />-like specific type. Used within header links but can be reused somewhere else. */
export interface Link {
  /** Inner link. */
  href: `/${string}`;
  /** Link's label. */
  label: string;
  /** Icon representing certain link. Optional. */
  icon?: string;
}

/** <HeaderTab /> & <NavbarTab> specific type. */
export interface Tab {
  /** Tab's full name. Used in the list of open tabs. */
  name: string;
  /** Tab's navbar label. Usually a shortened version of name to fit the navbar. */
  label: string;
  /** Icon representing certain tab. */
  icon: IconComponent;
  /** Made up key to fetch tab. */
  id: string;
}
