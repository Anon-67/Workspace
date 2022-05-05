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
        clearUnreads(state, id) {
            
        }
    }
})

const { newMessage } = slice.actions

export { newMessage }


export default slice.reducer