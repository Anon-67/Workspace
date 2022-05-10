import React, { useState } from "react";
import "./Login.css"


function Login({ setUser }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user));
            }
        });

    }

    return (
        <>
            <div className="test-parent">

                <div className="login-card">
                    <div className="card-image-login">
                        <h2 className="card-heading">
                            Welcome to Workspace!
                            <small>Let's get to work!</small>
                        </h2>
                    </div>
                    <form className="card-form" onSubmit={handleSubmit}>
                        <div>
                            <input className="input-field" placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div>
                            <input className="input-field" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div>
                            <button className="action-button" type="submit">login</button>
                        </div>
                    </form>
                    <div class="card-info">
                        <p>No account?<a href="/submit">Create a new account</a></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login