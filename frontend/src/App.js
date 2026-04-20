import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProject from "./pages/AddProject";
import MyProjects from "./pages/MyProjects";
import EditProject from "./pages/EditProject";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/add-project"
        element={
          <PrivateRoute>
            <AddProject />
          </PrivateRoute>
        }
      />
      <Route
  path="/edit-project/:id"
  element={
    <PrivateRoute>
      <EditProject />
    </PrivateRoute>
  }
/>
      <Route
        path="/my-projects"
        element={
          <PrivateRoute>
            <MyProjects />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;