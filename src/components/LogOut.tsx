import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    // Handle logout logic
    const handleLogout = () => {
        
        localStorage.removeItem('token');
        
        // Redirect to the login page or home page
        navigate('/login');
    };
    const handleRegister = () =>{
        navigate('/register');
    }

    return (
        <div className="logout-container">
            <div className="home-container">
            <NavBar />
            <div className="content">
                <div className="reg-container">
                <button className="register-button" onClick={handleLogout}>
                    Login
                </button>
                </div>
            </div>
        </div>
        </div>

        
    );
};

export default Logout;
