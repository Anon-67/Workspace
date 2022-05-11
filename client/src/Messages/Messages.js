import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchConversations, fetchHandshakes } from "./conversationSlice";

function Messages() {
    const conversations = useSelector(state => state.conversations.conversations)
    const handshakes = useSelector(state => state.conversations.handshakes)
    const unreads = useSelector(state => state.logout.unreads)
    const [users, setUsers] = useState([])
    const [user, setUser] = useState("")
    const dispatch = useDispatch()
    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        dispatch(fetchConversations())
        dispatch(fetchHandshakes())
    }, [dispatch, refresh])


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

        }).then(setRefresh(refresh => !refresh))
    }



    const userDropdown = users.map((user, index) => <option key={index} value={user.id}>{user.username}</option>)
    const conversationMap = handshakes.map((handshake, index) => <Link key={index} to={`/conversation/${handshake.conversation.id}`}>{handshake.conversation.name}
            {unreads.includes(handshake.conversation.id) ? <span class="dot"></span> : null}
    </Link>)


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
        </div>
    )
}

export default Messages