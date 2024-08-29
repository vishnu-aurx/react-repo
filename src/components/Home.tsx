import React from 'react';
import { useNavigate } from 'react-router-dom';
import './component-css/Home.css'; // Optional: If you want to style using an external CSS file
import NavBar from './NavBar';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className="home-container">
            {/* <NavBar /> */}
            <div className="content">
                <div className="reg-container">
                <button className="register-button" onClick={handleRegister}>
                    Register
                </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
