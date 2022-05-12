import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";



const messagesAdapter = createEntityAdapter()
const initialState = messagesAdapter.getInitialState({
    status: 'idle',
    messages: [],
    unreadMessages: []
}
)


export const fetchMessages = createAsyncThunk("messages/fetchMessages", (id) => {
    return fetch(`/messages/${id}`)
        .then(r => r.json())
        .then(r => r)
})



const slice = createSlice({
    name: 'messages',
    initialState: initialState,
    reducers: {
        messageReceived(state, action) {
            const message = action.payload

            state.messages.push(message)
        }
    },
    extraReducers: {
        [fetchMessages.pending](state) {
            state.status = "loading"
        },
        [fetchMessages.fulfilled](state, action) {
            state.messages = action.payload;
            state.status = "idle"
        }
    }
}
)



const { messageReceived } = slice.actions

export { messageReceived }



export default slice.reducer