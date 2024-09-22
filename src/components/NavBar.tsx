import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'foundation-sites/dist/css/foundation.min.css'; // Import Foundation CSS
import $ from 'jquery';
import 'foundation-sites';
import { FiAlignLeft } from "react-icons/fi";
import drChopperImage from '../assets/drChopper.jpg';
import "./component-css/NavBar.css"
interface NavbarProps {
  isAuthenticated: boolean | null;
}

const NavBar: React.FC<NavbarProps> = (auth) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Initialize Foundation on mount
    $(document).foundation();
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const isLoginPage = location.pathname === '/login';

  return (
    <div>
      {/* Off-canvas Menu for Mobile */}
      <div className="off-canvas position-right" id="offCanvas" data-off-canvas>
            <img src={drChopperImage} alt="Logo" className="logo-mobile" /> {/* Logo on the right for mobile */}
        <ul className="vertical menu" data-off-canvas-menu>
          
          {auth.isAuthenticated && (
            <li>
              <button className="button hollow" onClick={() => handleNavigation('/dashboard')}>DashBoard</button>
            </li>
          )}
          <li>
            <button className="button hollow" onClick={() => handleNavigation('/')}>Home</button>
          </li>
          <li>
            <button className="button hollow" onClick={() => handleNavigation('/about')}>About</button>
          </li>
          <li>
            <button className="button hollow" onClick={() => handleNavigation('/services')}>Services</button>
          </li>
          <li>
            <button className="button hollow" onClick={() => handleNavigation('/contact')}>Contact</button>
          </li>
          {isLoginPage ? (
            <li>
              <button className="button hollow" onClick={() => handleNavigation('/register')}>Register</button>
            </li>
          ) : auth.isAuthenticated ? (
            <li>
              <button className="button hollow" onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <li>
              <button className="button hollow" onClick={() => handleNavigation('/login')}>Login</button>
            </li>
          )}
          <li>
            <button className="button hollow" onClick={() => handleNavigation('/register')}>Register</button>
          </li>
        </ul>
      </div>

      {/* Top Bar for Larger Screens */}
      <div className="top-bar">
        <div className="top-bar-left">
          <button className="button hollow hide-for-medium" data-toggle="offCanvas"><FiAlignLeft /></button>
          <img src={drChopperImage} alt="Logo" className="logo-desktop" /> 
        </div>
        <div className="top-bar-right">
          <ul className="menu">
            {auth.isAuthenticated && (
              <li>
                <button className="button hollow show-for-medium" onClick={() => handleNavigation('/dashboard')}>DashBoard</button>
              </li>
            )}
            <li>
              <button className="button hollow show-for-medium" onClick={() => handleNavigation('/')}>Home</button>
            </li>
            <li>
              <button className="button hollow show-for-medium" onClick={() => handleNavigation('/about')}>About</button>
            </li>
            <li>
              <button className="button hollow show-for-medium" onClick={() => handleNavigation('/services')}>Services</button>
            </li>
            <li>
              <button className="button hollow show-for-medium" onClick={() => handleNavigation('/contact')}>Contact</button>
            </li>
            {isLoginPage ? (
              <li>
                <button className="button hollow show-for-medium" onClick={() => handleNavigation('/register')}>Register</button>
              </li>
            ) : auth.isAuthenticated ? (
              <li>
                <button className="button hollow show-for-medium" onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <li>
                <button className="button hollow show-for-medium" onClick={() => handleNavigation('/login')}>Login</button>
              </li>
            )}
            <li>
              <button className="button hollow show-for-medium" onClick={() => handleNavigation('/register')}>Register</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
