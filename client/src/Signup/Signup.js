import React, { useState } from "react";
import Home from "../Home/Home";

function Signup({ setUser, user }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("")



    function handleSubmit(e) {
        const newUser = {
            username,
            password,
            password_confirmation: passwordConfirm
        }


        e.preventDefault()
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-type": " application/json"
            },
            body: JSON.stringify(newUser)
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(r => setUser(r))
                } else {
                    r.json().then(r => console.log(r))
                }
            })
    }


    return (
        <>
            {user ? (
                <Home />
            ) : (
                <div>
                    <div>
                        {/* <h2>
                            Get started
                            <small>Let's create your account!</small>
                        </h2> */}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div>
                            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div>
                            <input placeholder="Confirm Password" type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required />
                        </div>
                        <div >
                            <button type="submit">Get started</button>
                        </div>
                    </form>
                    <div >
                        <p></p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Signup