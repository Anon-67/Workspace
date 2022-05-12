import React, { useEffect } from "react";
import ProjectItem from "./ProjectItem";
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchProjects } from "./projectsSlice"


function Projects({ clarification }) {
    const projects = useSelector(state => state.projects.projects)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProjects())
    }, [dispatch])

    const projectMap = projects.map((project, index) => {

        if (clarification === "work") {

            if (project.is_personal === false) {
                return (
                    <div className="project-wrapper">
                        <ProjectItem  project={project} key={index} />
                    </div>
                )
            } else {
                return null
            }
        } else if (clarification === "personal") {
            if (project.is_personal === true) {
                return (
                    <div className="project-wrapper">
                        <ProjectItem  project={project} key={index} />
                    </div>
                )
            } else {
                return null
            }
        } else {
            return null
        }
    })


    return (
        <div className="center-div">
            {projectMap}

            {clarification === "personal" ? <div><button className="action-button-2"><Link className="link-black" to="/newpersonalproject">New Project</Link></button></div> : null}

        </div>

    )
}

export default Projects