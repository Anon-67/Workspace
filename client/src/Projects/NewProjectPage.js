import React, { useState } from "react";

function NewProjectPage({ admin }){
    const [projectName, setProjectName] = useState("")

    function isPersonal() {
        if (admin === true){
            return false
        } else if (admin === false) {
            return true
        }
    }

    console.log(isPersonal())
    
    function handleAddProject(e) {
        e.preventDefault()

        const projectToAdd = {
            project : projectName,
            personal : isPersonal()
        }


        fetch("/projects", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json" 
            },
            body : JSON.stringify(projectToAdd)
        })

        setProjectName("")

    }


     return(
        <form onSubmit={handleAddProject}>
        <input value={projectName} onChange={e => setProjectName(e.target.value)}></input>
        <button type="submit">Add Project</button>
    </form>
    )
}

export default NewProjectPage