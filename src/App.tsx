import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                {/* <Route path="/" element={<Home />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
