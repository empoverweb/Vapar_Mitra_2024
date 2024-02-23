import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Home } from "./pages/Home";

const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} /> 
          <Route path="/dashboard" element={<Home/>} /> 
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
