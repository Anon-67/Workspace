import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchProjects = createAsyncThunk("messages/fetchProjects", () => {
    return fetch("/projects")
        .then(r => r.json())
        .then(r => r)
})

const slice = createSlice({
    name: 'projects',
    initialState: {
        projects: [],
        status: "idle"
    },
    extraReducers:{
        [fetchProjects.pending](state) {
            state.status = "loading"
        },
        [fetchProjects.fulfilled](state, action){
            state.projects = action.payload;
            state.status = "idle"
        }
    }
}
)


export default slice.reducer