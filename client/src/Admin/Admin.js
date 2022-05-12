import React, { useEffect } from "react";
import ProjectsAdmin from "./ProjectsAdmin";
import { Link } from "react-router-dom"
import { fetchAdminProjects } from "./adminSlice"
import { useSelector, useDispatch } from "react-redux"

function Admin({ setAdminProject }) {
    const adminProjects = useSelector(state => state.admin.adminProjects)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAdminProjects())
    }, [dispatch])

    const adminProjectsMap = adminProjects.map((project, index) => (
        <div className="project-wrapper">
            <ProjectsAdmin project={project} key={index} setAdminProject={setAdminProject} />
        </div>
    ))

    return (
        <>
            <div>ADMIN</div>
            {adminProjectsMap}
            <div>
                <button className="action-button-2">
                    <Link to="/adminnewproject" >New Project</Link>
                </button>
            </div>
        </>
    )
}

export default Admin