import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Contributors from "./Contributors/Contributors";
import Deliverables from "./Deliverables/Deliverables";
import "./Projects.css"
import { useSelector } from "react-redux"
import moment from "moment";

function Project({ admin }) {
    const [deliverable, setDeliverable] = useState("")
    const [allUsers, setAllUsers] = useState([])
    const [userToAdd, setUserToAdd] = useState({})
    const [note, setNote] = useState("")
    const activeProject = useSelector(state => state.projects.activeProject)
    const { id } = useParams()
    const [project, setProject] = useState({ 
        notes : [],
        deliverables : []
    })

    function convert(input) {
        return moment(input, 'CCYY-MM-DDThh:mm:ss[.sss]TZD').valueOf()
    }


    useEffect(() => {
        fetch(`/projects/${id}`)
            .then(r => r.json())
            .then(r => setProject(r))
    }, [])


    console.log(project)
    let arr = project.deliverables.filter(d => d.is_completed)
    let newArr = arr.concat(project.notes).sort(function(a, b){return convert(a.updated_at) - convert(b.updated_at)})


    newArr.map(e => console.log(convert(e.updated_at)))


    function handleAddContributor(e) {
        e.preventDefault()

        const projectUser = {
            project: activeProject.id,
            user: userToAdd
        }

        fetch("/project_users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projectUser)
        })


    }

    function handleAddDeliverable(e) {
        e.preventDefault()

        const deliverableToAdd = {
            description: deliverable,
            project: activeProject.id
        }

        fetch('/deliverables', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deliverableToAdd)
        }).then(setDeliverable(""))
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
            project: activeProject.id

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
    const postMap = newArr.map((note, index) => <li key={index}>{note.body}</li>)




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
                    {postMap}
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
                <Deliverables  />
                <Contributors  />
            </div>
        </>
    )

}

export default Project
