import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './component-css/NavBar.css'; // Optional: If you want to style using an external CSS file

const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    // Determine if the current path is '/login'
    const isLoginPage = location.pathname === '/login';

    return (
        <nav className="navbar">
            <div className="navbar-brand">MyApp</div>
            <div className="navbar-actions">
                <button className="nav-button" onClick={() => handleNavigation('/')}>
                    Home
                </button>
                <button className="nav-button" onClick={() => handleNavigation('/about')}>
                    About
                </button>
                <button className="nav-button" onClick={() => handleNavigation('/services')}>
                    Services
                </button>
                <button className="nav-button" onClick={() => handleNavigation('/contact')}>
                    Contact
                </button>
                {isLoginPage ? (
                    <button className="nav-button" onClick={() => handleNavigation('/register')}>
                        Register
                    </button>
                ) : (
                    <button className="nav-button" onClick={() => handleNavigation('/login')}>
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
