import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import API from "../api";

function MyProjects() {
  const [projects, setProjects] = useState([]);

  const fetchMyProjects = async () => {
    try {
      const res = await API.get("/projects/my-projects");
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/projects/${id}`);
      fetchMyProjects();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchMyProjects();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <p className="subtitle">
          Manage and review the projects you have uploaded.
        </p>

        {projects.length === 0 ? (
          <div className="empty-box">You have not added any projects yet.</div>
        ) : (
          <div className="grid">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onDelete={deleteProject}
                showDelete={true}
                showEdit={true}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MyProjects;