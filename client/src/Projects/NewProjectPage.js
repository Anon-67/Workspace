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


    
    function handleAddProject(e) {
        e.preventDefault()

        const personal = isPersonal()


        const projectToAdd = {
            project : projectName,
            personal : personal
        }


        fetch("/projects", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json" 
            },
            body : JSON.stringify(projectToAdd)
        })
        .then(r => r.json())
        .then(r => {
            if (personal) {
                fetch('/projectuserspersonal', {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify({
                        project: r.id
                    })
                }).then(r => {
                    if(r.ok) {
                        console.log(e)
                        setProjectName("")
                    }
                })
            } else {
                setProjectName("")
            }
        })

       

    }


     return(
        <form onSubmit={handleAddProject}>
        <input value={projectName} onChange={e => setProjectName(e.target.value)}></input>
        <button type="submit">Add Project</button>
    </form>
    )
}

export default NewProjectPage