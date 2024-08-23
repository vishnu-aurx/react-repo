import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './component-css/Register.css'; // Import the CSS file
import NavBar from './NavBar'; // Import the Navbar component

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [showResendButton, setShowResendButton] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(30);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowResendButton(true);
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOtpSent, timer]);

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/register', { name, phoneNumber });
      if (response.data.success) {
        setIsOtpSent(true);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post('/api/resend-otp', { phoneNumber });
      setTimer(30); // Reset the timer
      setShowResendButton(false);
    } catch (error) {
      console.error('Error during OTP resend:', error);
    }
  };

  return (
    <div>
      <NavBar /> {/* Add the Navbar here */}
      <div className="register-container">
        <h2 className="register-title">Register</h2>
        <form className="register-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <button type="button" className="submit-button" onClick={handleRegister}>
            Register
          </button>
          {isOtpSent && (
            <div className="otp-group">
              <div className="form-group">
                <label>OTP:</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </div>
          )}
          {showResendButton && (
            <button className="resend-button" onClick={handleResendOtp}>
              Resend OTP
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
