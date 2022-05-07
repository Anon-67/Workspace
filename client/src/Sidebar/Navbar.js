import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom"
import "./Navbar.css"
import { useSelector, useDispatch } from "react-redux"
import { ActionCableContext } from "../index"
import { newMessage } from "./logoutSlice"



function NavBar({ user, setUser }) {
    const unreads = useSelector(state => state.logout.unreads)
    const dispatch = useDispatch()
    console.log(unreads)
    const cable = useContext(ActionCableContext)

    useEffect(() => {
        const channel = cable.subscriptions.create({
            channel: 'UserChannel',
            id: user.id,
        },
        {
          received: (data) => {
              console.log("test")
              
            dispatch(newMessage(data))
          }
        })

        return () => {
            channel.unsubscribe()
        }
    }, [])

    function handleLogoutClick() {
        fetch("/logout", {
            method: "DELETE"
        })
            .then((r) => {
                if (r.ok) {
                    setUser(null);
                }
            }).then(window.location.reload());

 

    }

    return (
        <>

            <nav className="side-bar">
                <Link to="/workprojects">Work Projects</Link>
                <Link to="/personalprojects">Personal Projects</Link>
                <Link to="/resources">Resources</Link>
                <Link to="/messages">Messages{unreads.length > 0 ? <div>UNREADS</div> : null}</Link>
                {user.is_admin ? <Link to="/admin">Admin</Link> : null}
                <Link to="/">
                    <button onClick={handleLogoutClick}>logout</button>
                </Link>
            </nav>

        </>
    )
}

export default NavBar
