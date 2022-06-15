import React from "react";
import { useSelector } from "react-redux";
import Home from "../Home/Home";
import Login from "../Login/Login";


function LandingPage() {
    const user = useSelector(state => state.state.user)
    return(
        <>
        {user ? <Home  /> : <Login />}
        </>
    )
}

export default LandingPage