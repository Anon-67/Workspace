import React, { useEffect, useState } from "react";
import "./Resources.css"

function Resources() {
    const [resources, setResources] = useState([])
    // const [resource, setResource] = useState("")
    // const [refresh, setRefresh] = useState(true)

    useEffect(() => {
        fetch("/resources")
            .then(r => r.json())
            .then(r => setResources(r))
    }, [])

    // function handleAddResource(e) {
    //     e.preventDefault()

    //     const resourceToSend = {
    //         resource
    //     }

    //     fetch("/resources", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type" : "application/json"
    //         },
    //         body : JSON.stringify(resourceToSend)
    //     }).then(setRefresh(refresh => !refresh))
    //     setResource("")
        

    // }

    const resourceMap = resources.map((resource, index) => <div className="resource"><a key={index} href={resource.body}>{resource.body}</a></div>)
    return (
        <div>
            {resourceMap}
        </div>
    )

}

export default Resources