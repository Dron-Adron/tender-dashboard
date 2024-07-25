export interface CardData {
  column1: string;
  column2: string;
  column3: string;
  column4: string;
  column5: string;
  column6: string;
  column7: string;
}

export interface CardProps {
  data: CardData;
  borderColor: string;
  index: number;
}

export interface ColumnData {
  header: string;
  cards: CardData[];
}

export interface CSVRow {
  Index: string;
  NameCustomer: string;
  NameContracts: string;
  DateEndTime: string;
  StartingPrice: string;
  Comments: string;
  ProcurementStatus: string;
  WeSigned: string;
}

export interface CSVResults {
  data: CSVRow[];
  errors: any[];
  meta: {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
    truncated: boolean;
    cursor: number;
  };
}
