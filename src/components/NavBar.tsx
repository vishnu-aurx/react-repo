import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './component-css/NavBar.css'; // Optional: If you want to style using an external CSS file
interface NavbarProps {
    isAuthenticated: boolean | null;
  }
const NavBar: React.FC<NavbarProps> = (auth) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(false);
     
    const handleNavigation = (path: string) => {
        navigate(path);
    };
    const handleLogout = () => {
        
        localStorage.removeItem('token');
      setIsAuthenticated(false);
      window.location.reload();
    }; 

    // Determine if the current path is '/login'
    const isLoginPage = location.pathname === '/login';
    const isLogOutPage = location.pathname ==='/logout';
    const isHomePage = location.pathname ==='/';

    return (
        <nav className="navbar">
            <div className="navbar-brand">MyApp</div>
            <div className="navbar-actions">
            {(auth.isAuthenticated) ? (
                    <button className="nav-button" onClick={() => handleNavigation('/dashboard')}>
                        DashBoard
                    </button>
                ) :(<></>)}
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
                ) : ( auth.isAuthenticated ?( <button className="nav-button" onClick={handleLogout}>
                Logout
            </button>) :( isLogOutPage ? (
                    <button className="nav-button" onClick={() => handleNavigation('/register')}>
                        Register
                    </button>):(
                    <button className="nav-button" onClick={() => handleNavigation('/login')}>
                        Login
                    </button>))
                )}
                
               
                
            </div>
        </nav>
    );
};

export default NavBar;
