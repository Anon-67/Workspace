import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const sliceAdapter = createEntityAdapter()
const initialState = sliceAdapter.getInitialState({
    status: "idle",
    user: null,
    adminProject: null,
    resources: [],
    allUsers: [],
    conversation: null
})

export const fetchResources = createAsyncThunk("slice/fetchResources", () => {
    return fetch("/resources")
        .then(r => r.json())
        .then(r => r)
})

export const fetchAllUsers = createAsyncThunk("slice/fetchAllUsers", () => {
    return fetch("/users")
        .then(r => r.json())
        .then(r => r)
})

export const fetchConversation = createAsyncThunk("slice/fetchConversation", (id) => {
    return fetch(`/conversations/${id}`)
        .then(r => r.json())
        .then(r => r)
})

const slice = createSlice({
    name: 'slice',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        },
        setAdminProject(state, action) {
            state.adminProject = action.payload
        }
    },
    extraReducers: {
        [fetchResources.pending](state) {
            state.status = "loading"
        },
        [fetchResources.fulfilled](state, action) {
            state.resources = action.payload;
            state.status = "idle"
        },
        [fetchAllUsers.pending](state) {
            state.status = "loading"
        },
        [fetchAllUsers.fulfilled](state, action) {
            state.allUsers = action.payload
            state.status = "idle"
        },
        [fetchConversation.pending](state){
            state.status = "loading"
        },
        [fetchConversation.fulfilled](state, action){
            state.conversation = action.payload
            state.status = "idle"
        }

    }
})

const { setUser, setAdminProject } = slice.actions

export { setUser, setAdminProject }


export default slice.reducer