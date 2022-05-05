import React from "react";
import "../Projects.css"
import { useSelector } from "react-redux"

function Deliverables() {
    const activeProject = useSelector(state => state.projects.activeProject)


    const deliverables = activeProject.deliverables.map((deliverable, index) => {
        if (deliverable.is_completed === true) {
            return (
                <li>
                    <input type="checkbox" id={deliverable.id} key={index} value={deliverable.id} checked="checked" readOnly />
                    <label for={deliverable.id} >
                        {deliverable.description}
                    </label>
                </li>
            )
        } else {

            return (
                <li>
                    <input type="checkbox" id={deliverable.id} key={index} value={deliverable.id} />
                    <label for={deliverable.id} >
                        {deliverable.description}
                    </label>
                </li>
            )
        }
    })



    function handleSubmit(e) {
        e.preventDefault()
        let elements = Array.from(e.target.elements)
        elements.map(e => {
            if (e.checked && e.readOnly === false) {
                fetch(`/deliverables/${e.value}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        is_completed: true
                    })

                })
                return null
            } else {
                return null
            }
        })
    }






    return (
        <div className="deliverables">
            <h1>Deliverables:</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {deliverables}
                </ul>
                <button type="submit">Complete</button>
            </form>
        </div>
    )

}

export default Deliverables