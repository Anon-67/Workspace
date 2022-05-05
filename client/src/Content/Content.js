import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom"
import Admin from "../Admin/Admin";
import LandingPage from "../LandingPage/LandingPage";
import Conversation from "../Messages/Conversation";
import Messages from "../Messages/Messages";
import NewProjectPage from "../Projects/NewProjectPage";
import Project from "../Projects/Project";
import Projects from "../Projects/Projects";
import Resources from "../Resources/Resources";
import NavBar from "../Sidebar/Navbar";
import Signup from "../Signup/Signup";
import "./Content.css"



function Content({ user, setUser }) {
    const [adminProject, setAdminProject] = useState([])



    return (

        <Router>
            {user ? (<NavBar user={user} setUser={setUser} />) : null}
            <div className="center">
                <Routes>
                    {user ? (
                        <>
                            <Route path="/" element={<LandingPage user={user} setUser={setUser} />} />
                            <Route path="workprojects" element={<Projects clarification="work" />} />
                            <Route path="personalprojects" element={<Projects clarification="personal" />} />
                            <Route path="messages" element={<Messages />} />
                            <Route path="resources" element={<Resources />} />
                            {user.is_admin ? <Route path="admin" element={<Admin adminProject={adminProject} setAdminProject={setAdminProject} />} /> : null}
                            <Route path="projects/:id" element={<Project />} />
                            <Route path="admin/projects/:id" element={<Project admin={true} project={adminProject} />} />
                            <Route path="/adminnewproject" element={<NewProjectPage admin={true} />} />
                            <Route path="/newpersonalproject" element={<NewProjectPage admin={false} />} />
                            <Route path="/conversation/:id" element={<Conversation user={user} />} />

                        </>
                    ) : (
                        <>
                            <Route path="/" element={<LandingPage user={user} setUser={setUser} />} />
                            <Route path="submit" element={<Signup user={user} setUser={setUser} />} />
                            <Route
                                path="*"
                                element={<Navigate to="/" replace />}
                            />
                        </>
                    )}

                </Routes>
            </div>
        </Router>


    )
}

export default Content