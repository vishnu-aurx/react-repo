import React, { useState } from 'react';
import axios from 'axios';
import './LoginWithOTP.css'; 
import NavBar from './NavBar';

function LoginWithOTP() {
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    localStorage.setItem('token', "ksjdbfkbfk skdfskdbkfsjbdkf");
    const handleRequestOtp = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/My/controller/logIn', {
                mobile
            });
            setOtpSent(true);
        } catch (err) {
            setError('Failed to send OTP');
        }
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/My/controller/LoginInUsingOtp', {
                mobile,
                otp
            });
            localStorage.setItem('token', response.data.token);
        } catch (err) {
            setError('Invalid OTP');
        }
    };

    return (
        <div className="login-container">
             {/* <NavBar /> */}
            <h2 className="login-title">Login</h2>
            <form 
                className={`login-form ${otpSent ? 'otp-sent' : ''}`} 
                onSubmit={otpSent ? handleSubmit : handleRequestOtp}
            >
                <div className="form-group">
                    <label>Mobile Number</label>
                    <input
                        type="text"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </div>
                {otpSent && (
                    <div className="form-group otp-group">
                        <label>OTP</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                )}
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-button">
                    {otpSent ? 'Login' : 'Request OTP'}
                </button>
            </form>
        </div>
    );
}

export default LoginWithOTP;
