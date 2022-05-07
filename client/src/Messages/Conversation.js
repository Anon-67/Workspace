import React, { useEffect, useContext, useState } from 'react'
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { ActionCableContext } from "../index"
import { fetchMessages, messageReceived } from "./messagesSlice"
import { clearUnreads } from '../Sidebar/logoutSlice';


function Conversation({ user }) {
  const { id } = useParams()
  const cable = useContext(ActionCableContext)
  const [channel, setChannel] = useState(null)
  const [body, setBody] = useState("")
  const messages = useSelector(state => state.messages.messages)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(fetchMessages(id))
    dispatch(clearUnreads(id))
    fetch(`/handshakes/${id}`)

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

  const messageMap = messages.map((message, index) => <div key={index}>{message.body}</div>)





  return (
    <>
      <div>{id}</div>
      <form onSubmit={sendMessage}>
        <input value={body} onChange={e => setBody(e.target.value)}></input>
        <button type="submit">Add Deliverable</button>
      </form>
      <div>
        {messageMap}
      </div>
    </>
  )
}

export default Conversation