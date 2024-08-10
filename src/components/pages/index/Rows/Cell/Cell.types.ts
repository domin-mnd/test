export interface CellProps {
  editable: boolean;
  item?: string | number;
  type: 'string' | 'number';
}

export interface CellRef<T = string | number> {
  payloadValue: T;
  hasValue: boolean;
  clearPayload: () => void;
}
