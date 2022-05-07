import React, { useState } from "react";


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
        }).then(window.location.reload());

    }

    return (
        <>
            <div className="test-parent">

                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div>
                            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div>
                            <button type="submit">login</button>
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