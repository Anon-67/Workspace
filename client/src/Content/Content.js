import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "../Admin/Admin";
import LandingPage from "../LandingPage/LandingPage";
import NewProjectPage from "../Projects/NewProjectPage";
import Project from "../Projects/Project";
import Projects from "../Projects/Projects";
import Resources from "../Resources/Resources";
import NavBar from "../Sidebar/Navbar";
import "./Content.css"



function Content({ user, setUser }) {
    const [project, setProject] = useState({})
    const [adminProject, setAdminProject] = useState([])
    const [refresh, setRefresh] = useState(true)
    


    return (

        <Router>
            <NavBar user={user} setUser={setUser} />
            <div className="center">
                <Routes>
                    {user ? (
                        <>
                            <Route path="/" element={<LandingPage user={user} setUser={setUser} />} />
                            <Route path="workprojects" element={<Projects setProject={setProject} clarification="work" />} />
                            <Route path="personalprojects" element={<Projects setProject={setProject} clarification="personal" />} />
                            <Route path="messages" />
                            <Route path="resources" element={<Resources />} />
                            {user.is_admin ? <Route path="admin" element={<Admin adminProject={adminProject} setAdminProject={setAdminProject} />} /> : null}
                            <Route path="projects/:id" element={<Project project={project} />} />
                            <Route path="admin/projects/:id" element={<Project admin={true} project={adminProject} refresh={refresh} setRefresh={setRefresh}/>} />
                            <Route path="/adminnewproject" element={<NewProjectPage admin={true}/>} />
                            <Route path="/newpersonalproject" element={<NewProjectPage admin={false} />} />
                        </>
                    ) : (
                        <Route path="/" element={<LandingPage user={user} setUser={setUser} />} />

                    )}

                </Routes>
            </div>
        </Router>


    )
}

export default Content