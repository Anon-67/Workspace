import React from "react";
import { useSelector } from "react-redux";
import "./Header.css"

function Header() {
    const user = useSelector(state => state.state.user)
    return (
        <>
        {user ? <header><div className="logo">Workspace</div></header> : null }
        </>
    )
}

export default Header