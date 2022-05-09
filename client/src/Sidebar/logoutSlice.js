import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchUnreads = createAsyncThunk("logout/fetchUnreads", () => {
    return fetch(`/handshakes/unreads`)
        .then(r => r.json())
        .then(r => r)
})

const initialState = {
    unreads: []
}

const slice = createSlice({
    name: 'logout',
    initialState,
    reducers: {
        newMessage(state, action) {
            const message = action.payload
            state.unreads.push(message.conversation_id)
        },
        clearUnreads(state, action) {
            state.unreads = state.unreads.filter(num => num != action.payload)
            
        }
    },
    extraReducers: {
        [fetchUnreads.pending](state) {
            state.status = "loading"
        },
        [fetchUnreads.fulfilled](state, action) {
            state.unreads.concat(action.payload)
            state.status = "idle"
        }
    }
})

const { newMessage, clearUnreads } = slice.actions

export { newMessage, clearUnreads }


export default slice.reducer