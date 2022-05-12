import React from "react";
import Home from "../Home/Home";
import Login from "../Login/Login";


function LandingPage({setUser, user}) {
    return(
        <>
        {user ? <Home user={user} /> : <Login setUser={setUser} user={user} />}
        </>
    )
}

export default LandingPage