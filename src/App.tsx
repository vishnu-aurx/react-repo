import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./components/LogOut";
import Contact from "./components/Contact";
import { auth } from "./services/authService";
import NavBar from "./components/NavBar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    auth(setIsAuthenticated);
  }, []);
  return (
    <Router>
      <NavBar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        {!isAuthenticated ? (
          <Route path="/login" element={<Login />} />
        ) : (
          <Route path="/login" element={<Navigate to="/" />} />
        )}
        <Route path="/register" element={<Register />} />
        {isAuthenticated ? (
          <Route path="/logout" element={<Logout />} />
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
