import React from "react";
import Home from "../Home/Home";
import Login from "../Login/Login";


function LandingPage({setUser, user}) {
    return(
        <>
        {user ? <Home  /> : <Login />}
        </>
    )
}

export default LandingPage