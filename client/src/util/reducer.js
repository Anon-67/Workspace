import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    user: null
}

const slice = createSlice({
    name: 'slice',
    initialState,
    reducers: {
        setUser(state, action){
            state.user = action.payload
        }
    }
})

const { setUser } = slice.actions

export { setUser }


export default slice.reducer