import { configureStore } from "@reduxjs/toolkit"
import conversationsReducer from "./Messages/conversationSlice"
import adminReducer from "./Admin/adminSlice"
import projectsReducer from "./Projects/projectsSlice"
import messagesReducer from "./Messages/messagesSlice"
import logoutReducer from "./Sidebar/logoutSlice"


const store = configureStore({
    reducer: {
        conversations: conversationsReducer,
        admin: adminReducer,
        projects: projectsReducer,
        messages: messagesReducer,
        logout: logoutReducer
    }
})

export default store