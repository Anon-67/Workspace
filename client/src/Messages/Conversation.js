import React, { useEffect, useContext, useState, useRef } from 'react'
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { ActionCableContext } from "../index"
import { fetchMessages, messageReceived } from "./messagesSlice"
import { clearUnreads } from '../Sidebar/logoutSlice';
import "./Messages.css"


function Conversation({ user }) {
  const { id } = useParams()
  const cable = useContext(ActionCableContext)
  const [channel, setChannel] = useState(null)
  const [body, setBody] = useState("")
  const messages = useSelector(state => state.messages.messages)
  const dispatch = useDispatch()
  const messagesEndRef = useRef(null);

  function classPicker(message) {
    console.log(message.user_id)

    if (message.user_id === user.id) {
      return "sent"
    } else {
      return "recieved"
    }

  }

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({
      behavior: "auto",
      block: "end"
    });
  };

  useEffect(scrollToBottom, [messages]);



  useEffect(() => {
    dispatch(fetchMessages(id))
    dispatch(clearUnreads(id))
    fetch(`/handshakes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        last_read: new Date()
      })
    })

  }, [dispatch, id])



  useEffect(() => {
    const channel = cable.subscriptions.create({
      channel: 'MessagesChannel',
      id: id,
    },
      {
        received: (data) => {
          dispatch(messageReceived(data))
        }
      })

    setChannel(channel)

    return () => {
      channel.unsubscribe()
    }
  }, [id, cable.subscriptions, dispatch])

  function sendMessage(e) {
    e.preventDefault()
    const data = {
      id,
      body,
      user: user.id
    }
    channel.send(data)
    setBody("")
  }

  const messageMap = messages.map((message, index) => {

    return (
      <div className='test'>
        <div key={index} className={classPicker(message)}>{message.body}</div>
      </div>
    )
  })





  return (
    <>
      <div className='user-name-box'>{id}</div>
      <div className='chat-box'>
        {messageMap}

          <div ref={messagesEndRef} className="ref-div" />

      </div>
      <form onSubmit={sendMessage}>
        <input className='message-input' value={body} onChange={e => setBody(e.target.value)} />
      </form>

    </>
  )
}

export default Conversation