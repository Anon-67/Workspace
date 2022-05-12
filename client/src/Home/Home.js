import React from "react";
import "./Home.css"


function Home({ user }) {
    return (
        <h1 className="welcome">Welcome back, {user.username}!</h1>
    )

}

export default Home