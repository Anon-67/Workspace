import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "../Home/Home";
import { setUser } from "../util/reducer";

import "./Signup.css"

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const user = useSelector(state => state.state.user)
    const dispatch = useDispatch()



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
                    r.json().then(r => dispatch(setUser(r)))
                }
            })
    }


    return (
        <>
            {user ? (
                <Home />
            ) : (
                <div className="card">
                    <div className="card-image">
                        <h2 className="card-heading">
                            Get started
                            <small>Let's create your account!</small>
                        </h2>
                    </div>
                    <form className="card-form" onSubmit={handleSubmit}>
                        <div className="input">
                            <input className="input-field" placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="input">
                            <input className="input-field" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="input">
                            <input className="input-field" placeholder="Confirm Password" type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required />
                        </div>
                        <div className="action">
                            <button className="action-button" type="submit">Get started</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}

export default Signup