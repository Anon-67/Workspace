import React from "react";
import {Link} from "react-router-dom"



function ProjectItem({ project }) {
    return (
        <Link className="project-title-card" to={`/projects/${project.id}`}>{project.project_name}</Link>
    )

}

export default ProjectItem
