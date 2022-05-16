import {combineReducers} from "@reduxjs/toolkit";
import columnReducer from "../column/reducer";
import userNameReducer from "../login/reducer";
import todoReducer from "../todoList/reducer";
import commentReducer from "../comments/reducer";

const rootReducer = combineReducers({
    columns: columnReducer,
    userName: userNameReducer,
    todoList: todoReducer,
    comments: commentReducer
})
export default rootReducer