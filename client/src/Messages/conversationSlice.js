import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const conversationsAdapter = createEntityAdapter()
const initialState = conversationsAdapter.getInitialState({
    status: 'idle',
    conversations: [],
    handshakes: []
  })


export const fetchConversations = createAsyncThunk("messages/fetchConversations", () => {
    return fetch("/conversations")
        .then(r => r.json())
        .then(r => r)
})

export const fetchHandshakes = createAsyncThunk("messages/fetchHandshakes", () => {
    return fetch("/handshakes")
        .then(r => r.json())
        .then(r => r)

})

const slice = createSlice({
    name: 'conversations',
    initialState: initialState,
    reducers: {
    },    
    extraReducers:{
        [fetchConversations.pending](state) {
            state.status = "loading"
        },
        [fetchConversations.fulfilled](state, action){
            state.conversations = action.payload;
            state.status = "idle"
        },
        [fetchHandshakes.pending](state)  {
            state.status = "loading"
        },
        [fetchHandshakes.fulfilled](state, action) {
            state.handshakes = action.payload
            state.status = "idle"
        }
    }
}
)




export default slice.reducer