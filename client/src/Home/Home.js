import React from "react";
import { useSelector } from "react-redux";
import "./Home.css"


function Home() {
    const user = useSelector(state => state.state.user)
    return (
        <h1 className="welcome">Welcome back, {user.username}!</h1>
    )

}

export default Home