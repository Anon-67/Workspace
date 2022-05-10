import React, { useEffect, useState } from "react";
import "../Projects.css"
import { useParams } from "react-router-dom";

function Deliverables() {
    const [deliverables, setDeliverables] = useState([])
    const { id } = useParams()


    useEffect(() => {
        fetch(`/deliverables/${id}`)
            .then(r => r.json())
            .then(r => setDeliverables(r))
    }, [id])


    const deliverablesMap = deliverables.map((deliverable, index) => {
        if (deliverable.is_completed === true) {
            return (
                <li key={index}>
                    <input type="checkbox" id={deliverable.id}  value={deliverable.id} checked="checked" readOnly />
                    <label htmlFor={deliverable.id} >
                        {deliverable.body}
                    </label>
                </li>
            )
        } else {

            return (
                <li key={index}>
                    <input type="checkbox" id={deliverable.id}  value={deliverable.id} />
                    <label htmlFor={deliverable.id} >
                        {deliverable.body}
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
                    {deliverablesMap}
                </ul>
                <button type="submit">Complete</button>
            </form>
        </div>
    )

}

export default Deliverables