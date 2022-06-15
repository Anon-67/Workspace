import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchResources = createAsyncThunk("messages/fetchResources", () => {
    return fetch("/resources")
        .then(r => r.json())
        .then(r => r)
})


const initialState = {
    status: "idle",
    user: null,
    adminProject: null,
    resources: []
}

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
        extraReducers:{
            [fetchResources.pending](state) {
                state.status = "loading"
            },
            [fetchResources.fulfilled](state, action){
                state.resources = action.payload;
                state.status = "idle"
            }
        }
    }
})

const { setUser, setAdminProject } = slice.actions

export { setUser, setAdminProject }


export default slice.reducer