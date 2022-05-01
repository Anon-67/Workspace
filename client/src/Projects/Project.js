import React, { useEffect, useState } from "react";
import Contributors from "./Contributors/Contributors";
import Deliverables from "./Deliverables/Deliverables";
import "./Projects.css"
import { useParams } from "react-router-dom"

function Project({ admin, project, refresh, setRefresh }) {
    const [deliverable, setDeliverable] = useState("")
    const [allUsers, setAllUsers] = useState([])
    const [userToAdd, setUserToAdd] = useState({})
    const [note, setNote] = useState("")


    const { id } = useParams()

    function handleAddContributor(e) {
        e.preventDefault()

        const projectUser = {
            project: project.id,
            user: userToAdd
        }

        fetch("/project_users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projectUser)
        })
            .then(setRefresh(refresh => !refresh))
            .then(console.log(refresh))


    }

    function handleAddDeliverable(e) {
        e.preventDefault()

        const deliverableToAdd = {
            description: deliverable,
            project: project.id
        }

        fetch('/deliverables', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deliverableToAdd)
        })
    }

    useEffect(() => {
        fetch("/users")
            .then(r => r.json())
            .then(r => setAllUsers(r))
    }, [])


    function handleAddNote(e) {
        e.preventDefault()

        const noteToSend = {

            body: note,
            project: id

        }

        fetch("/notes", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(noteToSend)
        })
            .then(r => {
                if (r.ok) {
                    setNote("")
                }
            })

    }


    const userDropdown = allUsers.map((user, index) => <option key={index} value={user.id}>{user.username}</option>)
    const notesMap = project.notes.map((note, index) => <li key={index}>{note.body}</li>)




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
                <ul>
                    {notesMap}
                </ul>
                {admin ? (
                    <form onSubmit={handleAddDeliverable}>
                        <input value={deliverable} onChange={e => setDeliverable(e.target.value)}></input>
                        <button type="submit">Add Deliverable</button>
                    </form>

                ) : (
                    null
                )}


                <form onSubmit={handleAddNote}>
                    <input value={note} onChange={e => setNote(e.target.value)}></input>
                    <button type="submit">Add Note</button>
                </form>

            </div>
            <div className="right-side">
                <Deliverables project={project} />
                <Contributors project={project} refresh={refresh} />
            </div>
        </>
    )

}

export default Project
