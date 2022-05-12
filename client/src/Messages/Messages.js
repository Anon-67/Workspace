import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchConversations, fetchHandshakes } from "./conversationSlice";

function Messages() {
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
    }, [refresh])


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
    const conversationMap = handshakes.map((handshake, index) => <Link className="message-card" key={index}  to={`/conversation/${handshake.conversation.id}`}>{handshake.conversation.name.replace(`${handshake.user.username}`, "")}
        {unreads.includes(handshake.conversation.id) ? <span class="dot"></span> : null}
    </Link>)


    return (
        <div>

            Messages:
            {conversationMap}
            <div className="dropdown-div">
                <form onSubmit={handleAddConversation}>
                    <select className="green" onChange={(e) => setUser(e.target.value)} defaultValue={"DEFAULT"}>
                        <option value="DEFAULT" disabled >New Conversation</option>
                        {userDropdown}
                    </select>
                    <div>
                        <button className="action-button-2" type="submit">Start Conversation</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Messages