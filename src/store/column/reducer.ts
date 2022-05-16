import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";
import {ColumnInterface} from "../../interfaces";


const columns: ColumnInterface[] = [
    {id: uuidv4(), columnName: 'To do'},
    {id: uuidv4(), columnName: 'In Progress'},
    {id: uuidv4(), columnName: 'Testing'},
    {id: uuidv4(), columnName: 'Done'},
]


const columnsSlice = createSlice({
    name: 'columns',
    initialState: {columns},
    reducers: {
        addColumn(state, action) {
            state.columns.push({
                id: uuidv4(),
                columnName: action.payload.columnTitle
            })
        },
        removeColumn(state, action) {
            state.columns = state.columns.filter(column => column.id !== action.payload.columnId);
        },
        editColumn(state, action) {
            state.columns = state.columns.map(column => column.id === action.payload.columnId
                ? {...column, columnName: action.payload.columnTitle} : column)
        }
    },

})

export const {addColumn, removeColumn, editColumn} = columnsSlice.actions;

export default columnsSlice.reducer