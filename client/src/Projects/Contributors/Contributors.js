import React, { useEffect, useState } from "react";
import "../Projects.css"
import { useParams } from "react-router-dom";

function Contributors() {
    const [users, setUsers] = useState([])
    const { id } = useParams()



    useEffect(() => {
        fetch(`/projects/projectusers/${id}`)
            .then(r => r.json())
            .then(r => setUsers(r))
    }, [id])

    const userMap = users.map((user, index) => <li key={index}>{user.username}</li>)

    return (
        <div className="contributors">
            <h1>Contributors:</h1>
            <ul>
                {userMap}
            </ul>
        </div>
    )
}

export default Contributors