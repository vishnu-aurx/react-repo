import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
// import Dashboard from './components/Dashboard';
// import PrivateRoute from './components/PrivateRoute';

function App() {
    const isAuthenticated = localStorage.getItem('token') ? true : false;
    return (
        <Router>
            <Routes>
            
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} /> */}
                 {/* <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} /> */}
                {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
                {/* <Route path="/" element={<Home />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
