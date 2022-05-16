import {createSlice} from "@reduxjs/toolkit";


const userNameSlice = createSlice({
    name: 'userName',
    initialState: {userName: ''},
    reducers: {
        addUserName(state, action) {
            state.userName = action.payload
        },
    },
})

export const {addUserName} = userNameSlice.actions;

export default userNameSlice.reducer