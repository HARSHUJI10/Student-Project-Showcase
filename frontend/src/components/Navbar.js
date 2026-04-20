import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to={user ? "/" : "/login"} className="logo">
        Showcase Portal
      </Link>

      <div className="nav-links">
        {user ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/add-project">Add Project</Link>
            <Link to="/my-projects">My Projects</Link>
            <button onClick={logoutHandler}>Logout</button>
          </>
        ) : (
          <>
            {location.pathname !== "/login" && <Link to="/login">Login</Link>}
            {location.pathname !== "/register" && <Link to="/register">Register</Link>}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;