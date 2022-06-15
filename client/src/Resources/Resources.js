import React, { useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResources } from "../util/reducer";
import "./Resources.css"

function Resources() {
    const resources = useSelector(state => state.state.resources)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchResources())
    }, [dispatch])

    const resourceMap = resources.map((resource, index) => <div className="resource"><a className="white" key={index} href={resource.body}>{resource.body}</a></div>)
    return (
        <div>
            {resourceMap}
        </div>
    )

}

export default Resources