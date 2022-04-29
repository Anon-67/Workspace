import React, { useEffect,  useState } from "react";
import ProjectItem from "./ProjectItem";
import { Link } from "react-router-dom"

function Projects({ admin, setProject, clarification, personal }) {
    const [projects, setProjects] = useState([])


    useEffect(() => {
        fetch("/projects")
            .then(r => r.json())
            .then(r => setProjects(r))
    }, [])

    const projectMap = projects.map((project, index) => {

        if (clarification === "work") {

            if (project.is_personal === false) {
                return <ProjectItem project={project} key={index} setProject={setProject} />
            } else {
                return null
            }
        } else if (clarification === "personal") {
            if (project.is_personal === true) {
                return <ProjectItem project={project} key={index} setProject={setProject} />
            } else {
                return null
            }
        } else {
            return null
        }
    })


    return (
        <div>
            {projectMap}
            {clarification === "personal" ? <Link to="/newpersonalproject">tets</Link> : null}

        </div>

    )
}

export default Projects