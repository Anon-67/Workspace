import React, { useEffect, useState } from "react";
import "./Resources.css"

function Resources() {
    const [resources, setResources] = useState([])

    useEffect(() => {
        fetch("/resources")
            .then(r => r.json())
            .then(r => setResources(r))
    }, [])

    const resourceMap = resources.map((resource, index) => <div className="resource"><a className="white" key={index} href={resource.body}>{resource.body}</a></div>)
    return (
        <div>
            {resourceMap}
        </div>
    )

}

export default Resources