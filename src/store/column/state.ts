import { v4 as uuidv4 } from 'uuid';
import { ColumnInterface } from '../../interfaces';

export const columns: ColumnInterface[] = [
  {
    id: uuidv4(),
    columnName: 'To do',
  },
  {
    id: uuidv4(),
    columnName: 'In Progress',
  },
  {
    id: uuidv4(),
    columnName: 'Testing',
  },
  {
    id: uuidv4(),
    columnName: 'Done',
  },
];
