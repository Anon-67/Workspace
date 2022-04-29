import React, { useEffect, useState } from "react";

function Resources() {
    const [resources, setResources] = useState([])
    const [resource, setResource] = useState("")
    const [refresh, setRefresh] = useState(true)

    useEffect(() => {
        fetch("/resources")
            .then(r => r.json())
            .then(r => setResources(r))
    }, [refresh])

    function handleAddResource(e) {
        e.preventDefault()

        const resourceToSend = {
            resource
        }

        fetch("/resources", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(resourceToSend)
        }).then(setRefresh(refresh => !refresh))
        setResource("")
        

    }

    const resourceMap = resources.map((resource, index) => <a key={index} href={resource.body}>{resource.body}</a>)
    return (
        <div>
            {resourceMap}
            <form onSubmit={handleAddResource}>
                <input value={resource} onChange={e => setResource(e.target.value)}></input>
                <button type="submit">Add Deliverable</button>
            </form>
        </div>
    )

}

export default Resources