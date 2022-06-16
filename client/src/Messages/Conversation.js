import React, { useEffect, useContext, useState, useRef } from 'react'
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { ActionCableContext } from "../index"
import { fetchMessages, messageReceived } from "./messagesSlice"
import { clearUnreads } from '../Sidebar/logoutSlice';
import "./Messages.css"
import { fetchConversation } from '../util/reducer';


function Conversation() {
  const { id } = useParams()
  const [channel, setChannel] = useState(null)
  const [body, setBody] = useState("")
  const cable = useContext(ActionCableContext)
  const messages = useSelector(state => state.messages.messages)
  const user = useSelector(state => state.state.user)
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch()




  function classPicker(message) {

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
    dispatch(fetchConversation(id))
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
      user: user
    }
    channel.send(data)
    setBody("")
  }

  const messageMap = messages.map((message, index) => {
    console.log(message.user.username)

    return (
      <div className='test'>
        <div key={index} className={classPicker(message)}>
          <div className='username'>{message.user.username}:</div>
          <span>{message.body}</span>
          </div>
      </div>
    )
  })



  return (
    <>
      <div className='chat-box'>
        {messageMap}

          <div ref={messagesEndRef} className="ref-div" />

      </div>
      <form onSubmit={(e) => sendMessage(e)}>
        <input className='message-input' value={body} onChange={e => setBody(e.target.value)} />
      </form>

    </>
  )
}

export default Conversation