import React from "react";
import { useDispatch } from "react-redux";
import {Link} from "react-router-dom"
import { setActiveProject } from "./projectsSlice";


function ProjectItem({ project }) {
    const dispatch = useDispatch()


    function handleClick(){
        dispatch(setActiveProject(project))
    }

    return (
        <Link className="project-title-card" to={`/projects/${project.id}`} onClick={handleClick}>{project.project_name}</Link>
    )

}

export default ProjectItem
