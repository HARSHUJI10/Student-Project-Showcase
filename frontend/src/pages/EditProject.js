import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api";
import { useNavigate, useParams } from "react-router-dom";

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
    githubLink: "",
    liveLink: "",
  });

  const [loading, setLoading] = useState(true);

  const fetchProject = async () => {
    try {
      const res = await API.get(`/projects/${id}`);
      console.log("Project data:", res.data);

      setForm({
        title: res.data.title || "",
        description: res.data.description || "",
        techStack: res.data.techStack || "",
        githubLink: res.data.githubLink || "",
        liveLink: res.data.liveLink || "",
      });
    } catch (error) {
      console.log("Fetch project error:", error);
      alert("Failed to load project data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/projects/${id}`, form);
      alert("Project updated successfully");
      navigate("/my-projects");
    } catch (error) {
      console.log("Update error:", error);
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <form className="form-box" onSubmit={submitHandler}>
          <h2>Edit Project</h2>

          {loading ? (
            <p>Loading project data...</p>
          ) : (
            <>
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
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Tech stack"
                value={form.techStack}
                onChange={(e) =>
                  setForm({ ...form, techStack: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="GitHub link"
                value={form.githubLink}
                onChange={(e) =>
                  setForm({ ...form, githubLink: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Live demo link"
                value={form.liveLink}
                onChange={(e) =>
                  setForm({ ...form, liveLink: e.target.value })
                }
              />

              <button type="submit">Update Project</button>
            </>
          )}
        </form>
      </div>
    </>
  );
}

export default EditProject;