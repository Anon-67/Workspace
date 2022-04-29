import React, { useEffect, useState } from "react";
import Contributors from "./Contributors/Contributors";
import Deliverables from "./Deliverables/Deliverables";
import "./Projects.css"

function Project({ admin, project, refresh, setRefresh }) {
    const [deliverable, setDeliverable] = useState("")
    const [allUsers, setAllUsers] = useState([])
    const [userToAdd, setUserToAdd] = useState({})



    function handleAddContributor(e) {
        e.preventDefault()

        const projectUser = {
            project : project.id,
            user : userToAdd
        }

        fetch("/project_users", {
            method : "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(projectUser)
        })
            .then(setRefresh(refresh => !refresh))
            .then(console.log(refresh))


    }

    function handleAddDeliverable(e) {
        e.preventDefault()

        const deliverableToAdd = {
            description : deliverable,
            project : project.id
        }

        fetch('/deliverables', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(deliverableToAdd)
        })
    }

    useEffect(() => {
        fetch("/users")
            .then(r => r.json())
            .then(r => setAllUsers(r))
    }, [])


    const userDropdown = allUsers.map((user, index) => <option key={index} value={user.id}>{user.username}</option>)

    


    return (
        <>
            <div className="left-side">{project.project_name}
                {admin ? (
                    <form onSubmit={handleAddContributor}>
                        <select onSubmit={handleAddContributor} onChange={(e) => setUserToAdd(e.target.value)} defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled >Add a user...</option>
                            {userDropdown}
                        </select>
                        <button type="submit">Add Contributors</button>
                    </form>

                ) : null}
                {admin ? (
                    <form onSubmit={handleAddDeliverable}>
                        <input value={deliverable} onChange={e => setDeliverable(e.target.value)}></input>
                        <button type="submit">Add Deliverable</button>
                    </form>

                ) : (
                    null
                )}

            </div>
            <div className="right-side">
                <Deliverables project={project} />
                <Contributors project={project} refresh={refresh} />
            </div>
        </>
    )

}

export default Project
