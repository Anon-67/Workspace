import React, { useEffect } from "react";
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchConversations, fetchHandshakes } from "./conversationSlice";
import { fetchAllUsers } from "../util/reducer";

function ConversationsList() {
    const unreads = useSelector(state => state.logout.unreads)
    const allUsers = useSelector(state => state.state.allUsers)
    const user = useSelector(state => state.state.user)
    const dispatch = useDispatch()
    let conversations = user.conversations.map(c => c.id)
    let users = allUsers.filter(filterUser => filterUser.id !== user.id)

    useEffect(() => {
        dispatch(fetchConversations())
        dispatch(fetchHandshakes())
        dispatch(fetchAllUsers())
    }, [dispatch])

    function handleAddConversation(e, userToAdd) {
        e.preventDefault()
        fetch('/conversations', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: userToAdd.id
            })

        })
            .then(r => r.json())
            .then(r => window.location.href = `/conversation/${r.id}`)
    }

    const conversationsMap = users.map((userLink, index) => {
        if (userLink.conversations.length > 0 && userLink.conversations.some(r => conversations.includes(r.id))) {
            let conversation = userLink.conversations.filter(c => conversations.includes(c.id))[0]
            return (
                <Link className="message-card" key={index} to={`/conversation/${conversation.id}`}>{userLink.username}
                    {unreads.includes(conversation.id) ? <span class="dot"></span> : null}
                </Link>

            )
        } else {
            return (
                <Link className="message-card" key={index} onClick={(e) => handleAddConversation(e, userLink)} to={`/`}>{userLink.username}</Link>
            )
        }

    })



    return (
        <div>
            {conversationsMap}
        </div>
    )
}

export default ConversationsList