import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchAdminProjects = createAsyncThunk("messages/fetchAdminProjects", () => {
    return fetch("/adminprojects")
        .then(r => r.json())
        .then(r => r)
})

const slice = createSlice({
    name: 'adminProjects',
    initialState: {
        adminProjects: [],
        status: "idle"
    },
    reducers: {
    },
    extraReducers:{
        [fetchAdminProjects.pending](state) {
            state.status = "loading"
        },
        [fetchAdminProjects.fulfilled](state, action){
            state.adminProjects = action.payload;
            state.status = "idle"
        }
    }
}
)


export default slice.reducer