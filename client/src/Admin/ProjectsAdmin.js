import React from "react";
import {Link} from "react-router-dom"
import {useDispatch} from "react-redux"
import { setActiveProject } from "../Projects/projectsSlice";




function ProjectsAdmin({project, setAdminProject}) {
    const dispatch = useDispatch()

    function handleClick() {
        setAdminProject(project)
        dispatch(setActiveProject(project))
    }
    
    return (
        <Link className="project-title-card" to={`projects/${project.id}` } onClick={handleClick}>{project.project_name}</Link>
    )
}

export default ProjectsAdmin