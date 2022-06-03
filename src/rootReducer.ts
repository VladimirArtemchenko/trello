import { combineReducers } from '@reduxjs/toolkit';
import columnReducer from './store/column/reducer';
import userNameReducer from './store/login/reducer';
import todoReducer from './store/todoList/reducer';
import commentReducer from './store/comments/reducer';

const rootReducer = combineReducers({
  columns: columnReducer,
  userName: userNameReducer,
  todoList: todoReducer,
  comments: commentReducer,
});
export default rootReducer;
