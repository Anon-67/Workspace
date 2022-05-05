import React, { useEffect } from "react";
import ProjectsAdmin from "./ProjectsAdmin";
import { Link } from "react-router-dom" 
import { fetchAdminProjects } from "./adminSlice"
import { useSelector, useDispatch } from "react-redux"

function Admin({  setAdminProject  }) {
    const adminProjects = useSelector(state => state.admin.adminProjects)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAdminProjects())
    }, [dispatch])

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