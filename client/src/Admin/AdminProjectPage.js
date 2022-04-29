import React from "react"

function AdminProjectPage({ adminProject }) {


    const users = adminProject.users.map(user => <div>{user.username}</div>)

    return (
        <>
            <div>{adminProject.project_name}</div>
            <div>{users}</div>
            
            <form >
                <div>
                    <input placeholder="Username" type="text" required />
                </div>
                <div>
                    <input placeholder="Password" type="password"  required />
                </div>
                <div>
                    <button type="submit">login</button>
                </div>
            </form>
        </>
    )
}

export default AdminProjectPage