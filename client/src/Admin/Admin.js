import React, { useEffect, useState } from "react";
import ProjectsAdmin from "./ProjectsAdmin";
import { Link } from "react-router-dom" 

function Admin({  setAdminProject, refresh }) {
    const [adminProjects, setAdminProjects] = useState([])




    useEffect(() => {
        fetch("/adminprojects")
            .then(r => r.json())
            .then(r => setAdminProjects(r))
    }, [refresh])

    const adminProjectsMap = adminProjects.map((project, index) => <ProjectsAdmin project={project} key={index} setAdminProject={setAdminProject}/>)

    return (
        <>
            <div>ADMIN</div>
            {adminProjectsMap}
            <Link to="/adminnewproject" >New Project</Link>
        </>
    )
}

export default Admin