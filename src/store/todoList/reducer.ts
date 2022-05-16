import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";
import {CardType} from "../../interfaces";


const todoList:CardType[] = []


const todoListSlice = createSlice({
    name: 'todoList',
    initialState: {todoList},
    reducers: {
        addTask(state, action) {
            state.todoList.push({id: uuidv4(), text: action.payload.text, description: '', columnId: action.payload.columnId})
        },
        removeTask(state, action) {
            state.todoList= state.todoList.filter(todo => todo.id !== action.payload.cardId);
        },
        editTask(state, action) {
            state.todoList = state.todoList.map(todo => todo.id === action.payload.cardId
                ? {...todo, text: action.payload.text} : todo)
        },
        editDescription(state, action) {
            state.todoList = state.todoList.map(todo => todo.id === action.payload.cardId
                ? {...todo, description: action.payload.description} : todo)
        },

    },

})

export const {addTask,removeTask,editTask,editDescription}=todoListSlice.actions;

export default todoListSlice.reducer