import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice(
    {
        name : 'user',
        initialState : null,
        reducers : {
            addUser : () => {},
            removeuser : () => {}
        },
    }
);

export const {addUser , removeuser} = userSlice.actions;
export default userSlice.reducer;