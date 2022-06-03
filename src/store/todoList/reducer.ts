import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { CardType } from '../../interfaces';
import {
  AddTask, EditDescription, EditTask, RemoveTask,
} from './action-types';

const todoList: CardType[] = [];

const todoListSlice = createSlice({
  name: 'todoList',
  initialState: { todoList },
  reducers: {
    addTask(state, action: PayloadAction<AddTask>) {
      state.todoList.push({
        id: uuidv4(),
        text: action.payload.text,
        description: '',
        columnId: action.payload.columnId,
      });
    },
    removeTask(state, action: PayloadAction<RemoveTask>) {
      state.todoList = state.todoList.filter((todo) => todo.id !== action.payload.cardId);
    },
    editTask(state, action: PayloadAction<EditTask>) {
      state.todoList = state.todoList.map((todo) => (todo.id === action.payload.cardId
        ? {
          ...todo,
          text: action.payload.text,
        } : todo));
    },
    editDescription(state, action: PayloadAction<EditDescription>) {
      state.todoList = state.todoList.map((todo) => (todo.id === action.payload.cardId
        ? {
          ...todo,
          description: action.payload.description,
        } : todo));
    },
  },

});

export const {
  addTask,
  removeTask,
  editTask,
  editDescription,
} = todoListSlice.actions;

export default todoListSlice.reducer;
