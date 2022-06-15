import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Contributors from "./Contributors/Contributors";
import Deliverables from "./Deliverables/Deliverables";
import "./Projects.css"
import moment from "moment";

function ProjectPage({ admin }) {
    const [deliverable, setDeliverable] = useState("")
    const [allUsers, setAllUsers] = useState([])
    const [userToAdd, setUserToAdd] = useState({})
    const [note, setNote] = useState("")
    const { id } = useParams()
    const [project, setProject] = useState({
        notes: [],
        deliverables: []
    })

    function convert(input) {
        return moment(input, 'CCYY-MM-DDThh:mm:ss[.sss]TZD').valueOf()
    }

    function selectClass(obj) {
        if (typeof obj.is_completed === "undefined") {
            return "note"
        } else {
            return "task"
        }

    }

    useEffect(() => {
        fetch(`/projects/${id}`)
            .then(r => r.json())
            .then(r => setProject(r))
    }, [id])



    function handleAddContributor() {

        const projectUser = {
            project: id,
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

    function handleAddDeliverable() {

        const deliverableToAdd = {
            description: deliverable,
            project: id
        }

        fetch('/deliverables', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deliverableToAdd)
        })
    }

    function handleAddNote() {

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
    }


    let arr = project.deliverables.filter(d => d.is_completed)
    let newArr = arr.concat(project.notes).sort(function (a, b) { return convert(a.updated_at) - convert(b.updated_at) })
    const postMap = newArr.map((post, index) => (
        <li className={selectClass(post)} key={index}><div>{post.body}</div>{post.user ? <div className="note-user">{` - ${post.user.username}`}</div> : null}</li>
    ))



    useEffect(() => {
        fetch("/users")
            .then(r => r.json())
            .then(r => setAllUsers(r))
    }, [])
    const userDropdown = allUsers.map((user, index) => <option key={index} value={user.id}>{user.username}</option>)


    return (
        <div className="center-div">
            <div className="left-side"><h1 className="project-title">{project.project_name}</h1>

                <ul className="posts">
                    {postMap}
                </ul>
                <div className="admin-add">
                    {admin ? (
                        <form className="admin-form" onSubmit={handleAddDeliverable}>
                            <input className="wide" value={deliverable} onChange={e => setDeliverable(e.target.value)}></input>
                            <button className="action-button-2" type="submit">Add Deliverable</button>
                        </form>

                    ) : (
                        null
                    )}
                    {admin ? (
                        <form className="admin-form" onSubmit={handleAddContributor}>
                            <select className="wide" onSubmit={handleAddContributor} onChange={(e) => setUserToAdd(e.target.value)} defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled >Add a user...</option>
                                {userDropdown}
                            </select>
                            <button className="action-button-2" type="submit">Add Contributors</button>
                        </form>

                    ) : null}
                </div>

                <form onSubmit={handleAddNote}>
                    <input className="note-form" value={note} onChange={e => setNote(e.target.value)}></input>

                </form>


            </div>
            <div className="right-side">
                <Deliverables />
                <Contributors />
            </div>
        </div>
    )

}

export default ProjectPage
