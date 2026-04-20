import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api";

function AddProject() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
    githubLink: "",
    liveLink: ""
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post("/projects", form);
      alert("Project added successfully");
      navigate("/my-projects");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add project");
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <form className="form-box" onSubmit={submitHandler}>
          <h2>Add Project</h2>

          <input
            type="text"
            placeholder="Project title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            rows="4"
            placeholder="Project description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            type="text"
            placeholder="Tech stack"
            value={form.techStack}
            onChange={(e) => setForm({ ...form, techStack: e.target.value })}
          />

          <input
            type="text"
            placeholder="GitHub link"
            value={form.githubLink}
            onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
          />

          <input
            type="text"
            placeholder="Live demo link"
            value={form.liveLink}
            onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
          />

          <button type="submit">Add Project</button>
        </form>
      </div>
    </>
  );
}

export default AddProject;