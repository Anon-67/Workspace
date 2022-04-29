import React from "react";
import "./Header.css"

function Header({ user }) {
    return (
        <>
        {user ? <header>Header</header> : null }
        </>
    )
}

export default Header