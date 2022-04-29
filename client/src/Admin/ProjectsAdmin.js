import React from "react";
import {Link} from "react-router-dom"



function ProjectsAdmin({project, setAdminProject}) {

    function handleClick() {
        setAdminProject(project)
    }
    
    return (
        <Link to={`projects/${project.id}` } onClick={handleClick}>{project.project_name}</Link>
    )
}

export default ProjectsAdmin