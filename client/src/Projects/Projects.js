import React, { useEffect } from "react";
import ProjectItem from "./ProjectItem";
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchProjects } from "./projectsSlice"


function Projects({  clarification }) {
    const projects = useSelector(state => state.projects.projects)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProjects())
    }, [dispatch])

    const projectMap = projects.map((project, index) => {

        if (clarification === "work") {

            if (project.is_personal === false) {
                return <ProjectItem project={project} key={index} />
            } else {
                return null
            }
        } else if (clarification === "personal") {
            if (project.is_personal === true) {
                return <ProjectItem project={project} key={index} />
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