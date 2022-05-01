import React from "react";
import { Link } from "react-router-dom"
import "./Navbar.css"



function NavBar({ user, setUser }) {

    function handleLogoutClick() {
        fetch("/logout", {
            method: "DELETE"
        })
            .then((r) => {
                if (r.ok) {
                    setUser(null);
                }
            });
    }

    return (
        <>
            {user ? (
                <nav className="side-bar">
                    <Link to="/workprojects">Work Projects</Link>
                    <Link to="/personalprojects">Personal Projects</Link>
                    <Link to="/resources">Resources</Link>
                    <Link to="/messages">Messages</Link>
                    {user.is_admin ? <Link to="/admin">Admin</Link> : null}
                    <Link to="/">
                        <button onClick={handleLogoutClick}>logout</button>
                    </Link>
                </nav>
            ) : (null)}
        </>
    )
}

export default NavBar
