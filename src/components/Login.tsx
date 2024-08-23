import React, { useState } from 'react';
import axios from 'axios';
import './LoginWithOTP.css'; // Import the CSS file for animation

function LoginWithOTP() {
    const [username, setUsername] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    const handleRequestOtp = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            await axios.post('http://192.168.29.47:8080/My/controller/logIn', {
                username
            });
            setOtpSent(true);
        } catch (err) {
            setError('Failed to send OTP');
        }
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                otp
            });
            localStorage.setItem('token', response.data.token);
        } catch (err) {
            setError('Invalid OTP');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form 
                className={`login-form ${otpSent ? 'otp-sent' : ''}`} 
                onSubmit={otpSent ? handleSubmit : handleRequestOtp}
            >
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
