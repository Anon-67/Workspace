import React from "react";
import "../Projects.css"

function Contributors({ project,refresh }) {



    const users = project.users.map((user, index) => <li key={index}>{user.username}</li>)

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