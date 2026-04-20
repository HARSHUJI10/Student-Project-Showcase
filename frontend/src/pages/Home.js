import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import API from "../api";

function Home() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="hero">
          <h1>🚀 Student Project Showcase</h1>
          <p>
            Share your projects, explore ideas, and build your portfolio with style.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="empty-box">No projects added yet.</div>
        ) : (
          <div className="grid">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home; 