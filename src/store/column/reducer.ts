import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { columns } from './state';
import { AddColumn, EditColumn, RemoveColumn } from './action-types';

const columnsSlice = createSlice({
  name: 'columns',
  initialState: { columns },
  reducers: {
    addColumn(state, action: PayloadAction<AddColumn>) {
      state.columns.push({
        id: uuidv4(),
        columnName: action.payload.columnTitle,
      });
    },
    removeColumn(state, action: PayloadAction<RemoveColumn>) {
      state.columns = state.columns.filter((column) => column.id !== action.payload.columnId);
    },
    editColumn(state, action: PayloadAction<EditColumn>) {
      state.columns = state.columns.map((column) => (column.id === action.payload.columnId
        ? {
          ...column,
          columnName: action.payload.columnTitle,
        } : column));
    },
  },

});

export const {
  addColumn,
  removeColumn,
  editColumn,
} = columnsSlice.actions;

export default columnsSlice.reducer;
