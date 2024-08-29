import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { auth } from '../services/authService';

const Logout: React.FC = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        localStorage.removeItem('token');
        auth(setIsAuthenticated)
        
        navigate('/');      }, []);


    return (
        <div>logging out</div>
        // <div className="logout-container">
        //     <div className="home-container">
        //     {/* <NavBar /> */}
        //     <div className="content">
        //         <div className="reg-container">
        //         <button className="register-button" onClick={handleLogout}>
        //             Login
        //         </button>
        //         </div>
        //     </div>
        // </div>
        // </div>

        
    );
};

export default Logout;
