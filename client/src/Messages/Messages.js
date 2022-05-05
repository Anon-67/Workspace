import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchConversations } from "./conversationSlice";

function Messages() {
    const conversations = useSelector(state => state.conversations.conversations)
    const [users, setUsers] = useState([])
    const [user, setUser] = useState("")
    const dispatch = useDispatch()
    console.log(conversations)

    useEffect(() => {
        dispatch(fetchConversations())
    },[dispatch])


    useEffect(() => {
        fetch('/users')
            .then(r => r.json())
            .then(r => setUsers(r))
    }, [])


    function handleAddConversation(e) {
        e.preventDefault()
        fetch('/conversations', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: user
            })

        })
    }



    const userDropdown = users.map((user, index) => <option key={index} value={user.id}>{user.username}</option>)
    const conversationMap = conversations.map(conversation => <Link to={`/conversation/${conversation.id}`}>{conversation.name}</Link>)


    return (
        <div>

            Messages:
            {conversationMap}
            <form onSubmit={handleAddConversation}>
                <select onChange={(e) => setUser(e.target.value)} defaultValue={"DEFAULT"}>
                    <option value="DEFAULT" disabled >Add a user...</option>
                    {userDropdown}
                </select>
                <button type="submit">Add Contributors</button>
            </form>
            <button onClick={() => console.log(conversations)} >PRESS ME</button>
        </div>
    )
}

export default Messages