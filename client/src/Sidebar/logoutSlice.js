import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    unreads: []
}

const slice = createSlice({
    name: 'logout',
    initialState,
    reducers: {
        newMessage(state, action) {
            const message = action.payload
            console.log(message)
            state.unreads.push(message.conversation_id)
        },
        clearUnreads(state, action) {
            console.log(action.payload)
            state.unreads = state.unreads.filter(num => num != action.payload)
            
        }
    }
})

const { newMessage, clearUnreads } = slice.actions

export { newMessage, clearUnreads }


export default slice.reducer