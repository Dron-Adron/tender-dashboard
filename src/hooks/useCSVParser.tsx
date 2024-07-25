import { useEffect, useState } from 'react';
import { parse } from 'papaparse';
import { ColumnData, CSVRow, CardData } from '../types';

interface UseCSVParserProps {
  fileName: string;
  columns: (keyof CSVRow)[];
  forFooter?: boolean;
}

const predefinedColumns: ColumnData[] = [
  { header: "К ОБСУЖДЕНИЮ", cards: [] },
  { header: "ТРЕБУЕТ ФИНАЛИЗАЦИИ", cards: [] },
  { header: "ПОДАЁМСЯ", cards: [] },
  { header: "ПОДАНО", cards: [] },
  { header: "ЗАКЛЮЧАЕМ КОНТРАКТ", cards: [] },
];

const initializeColumns = (): ColumnData[] => {
  return predefinedColumns.map(column => ({
    header: column.header,
    cards: []
  }));
};

const useCSVParser = ({ fileName, columns, forFooter }: UseCSVParserProps) => {
  const [data, setData] = useState<ColumnData[] | CardData[]>(forFooter ? [] : initializeColumns());

  useEffect(() => {
    const fetchAndParseCSV = async () => {
      const response = await fetch(`/${fileName}`, {
        headers: {
          'Content-Type': 'text/csv'
        }
      });
      const csvText = await response.text();
      parse<CSVRow>(csvText, {
        header: true,
        delimiter: ';',
        skipEmptyLines: true,
        complete: (results) => {
          if (forFooter) {
            const footerData: CardData[] = results.data.map(row => {
              const cardData: CardData = {
                column1: row[columns[0]] || '',
                column2: row[columns[1]] || '',
                column3: row[columns[2]] || '',
                column4: row[columns[3]] || '',
                column5: row[columns[4]] || '',
                column6: row[columns[5]] || '',
                column7: row[columns[6]] || '',
              };
              return cardData;
            });
            setData(footerData);
          } else {
            const dashboardColumns = initializeColumns();
            results.data.forEach(row => {
              const columnIndex = predefinedColumns.findIndex(column => column.header === row['ProcurementStatus']);
              if (columnIndex !== -1) {
                dashboardColumns[columnIndex].cards.push({
                  column1: row['Index'],
                  column2: row['NameCustomer'],
                  column3: row['NameContracts'],
                  column4: row['DateEndTime'],
                  column5: row['StartingPrice'],
                  column6: row['Comments'],
                  column7: row['WeSigned'],
                });
              }
            });
            setData(dashboardColumns);
          }
        }
      });
    };

    fetchAndParseCSV();
    const intervalId = setInterval(fetchAndParseCSV, 600000);
    return () => clearInterval(intervalId);
  }, [fileName, forFooter]); // remove columns from dependency list if they are constant

  return data;
};

export default useCSVParser;
