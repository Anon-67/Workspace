import React from "react";
import "../Projects.css"
import { useSelector } from "react-redux"

function Contributors() {
    const activeProject = useSelector(state => state.projects.activeProject)



    const users = activeProject.users.map((user, index) => <li key={index}>{user.username}</li>)

    return (
        <div className="contributors">
            <h1>Contributors:</h1>
            <ul>
                {users}
            </ul>
        </div>
    )
}

export default Contributors