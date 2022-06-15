import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "../Admin/Admin";
import LandingPage from "../LandingPage/LandingPage";
import Conversation from "../Messages/Conversation";
import Messages from "../Messages/Messages";
import NewProjectPage from "../Projects/NewProjectPage";
import ProjectPage from "../Projects/ProjectPage";
import ProjectsList from "../Projects/ProjectsList";
import Resources from "../Resources/Resources";
import NavBar from "../Sidebar/Navbar";
import Signup from "../Signup/Signup";
import "./Content.css"



function Content() {
    const user = useSelector(state => state.state.user)

    return (
        <Router>
            {user ? (<NavBar />) : null}
            <div className="center">
                <Routes>
                    {user ? (
                        <>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="workprojects" element={<ProjectsList clarification="work" />} />
                            <Route path="personalprojects" element={<ProjectsList clarification="personal" />} />
                            <Route path="messages" element={<Messages />} />
                            <Route path="resources" element={<Resources />} />
                            {user.is_admin ? <Route path="admin" element={<Admin />} /> : null}
                            <Route path="projects/:id" element={<ProjectPage />} />
                            <Route path="admin/projects/:id" element={<ProjectPage admin={true} />} />
                            <Route path="/adminnewproject" element={<NewProjectPage admin={true} />} />
                            <Route path="/newpersonalproject" element={<NewProjectPage admin={false} />} />
                            <Route path="/conversation/:id" element={<Conversation user={user} />} />

                        </>
                    ) : (
                        <>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="submit" element={<Signup />} />
                        </>
                    )}

                </Routes>
            </div>
        </Router>


    )
}

export default Content