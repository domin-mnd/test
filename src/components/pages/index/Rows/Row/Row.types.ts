export interface Row {
  id: number;
  rowName: string;
  salary: number;
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
  child: Row[];
}

export interface RowProps {
  row: Row;
}
