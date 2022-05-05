import {  createSlice } from "@reduxjs/toolkit";



const slice = createSlice({
    name: 'currentUser',
    initialState: {
        currentUser: null
    },
    reducers: {
        setCurrentUser(state, action){
            state.currentUser = action.payload
        }
    },

})

const { setCurrentUser } = slice.actions

export { setCurrentUser }


export default slice.reducer