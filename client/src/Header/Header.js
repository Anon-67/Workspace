import React from "react";
import "./Header.css"

function Header({ user }) {
    return (
        <>
        {user ? <header><div className="logo">Workspace</div></header> : null }
        </>
    )
}

export default Header