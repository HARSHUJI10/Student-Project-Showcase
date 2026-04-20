import React from "react";
import { useNavigate } from "react-router-dom";

function ProjectCard({ project, onDelete, showDelete = false, showEdit = false }) {
  const navigate = useNavigate();

  if (!project) return null;

  return (
    <div className="project-card">
      <div className="badge">Student Project</div>

      <h3>{project.title}</h3>

      <p>{project.description}</p>

      <p>
        <strong>Tech Stack:</strong> {project.techStack}
      </p>

      {/* ✅ AUTHOR (CORRECT PLACE) */}
      {project.createdBy?.name && (
        <p style={{ marginTop: "5px" }}>
          <strong>By:</strong> {project.createdBy.name}
        </p>
      )}

      {/* LINKS */}
      <div className="card-links">
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="card-link"
          >
            GitHub Link
          </a>
        )}

        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            className="card-link"
          >
            Live Demo
          </a>
        )}
      </div>

      {/* BUTTON SECTION */}
      <div
        style={{
          marginTop: "12px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {/* Edit */}
        {showEdit && (
          <button
            className="card-link"
            onClick={() => navigate(`/edit-project/${project?._id}`)}
          >
            ✏️ Edit
          </button>
        )}

        {/* Delete */}
        {showDelete && (
          <button
            className="delete-btn small-btn"
            onClick={() => onDelete && onDelete(project?._id)}
          >
            🗑️ Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;