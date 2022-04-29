import React from "react";
import {Link} from "react-router-dom"

function ProjectItem({ project, setProject }) {

    function handleClick(){
        setProject(project)
    }

    return (
        <Link to={`/projects/${project.id}`} onClick={handleClick}>{project.project_name}</Link>
    )

}

export default ProjectItem
