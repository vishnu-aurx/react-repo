import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './component-css/Register.css';
import NavBar from './NavBar';

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
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
      const response = await axios.post('http://localhost:8080/api/register', { name, mobile });
      if (response.status === 200) {
        setIsOtpSent(true);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post('http://localhost:8080/api/resend-otp', { mobile });
      setTimer(30); // Reset the timer
      setShowResendButton(false);
    } catch (error) {
      console.error('Error during OTP resend:', error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:8080/My/controller/SignUpUsingOtp', { mobile, otp });
      if (response.status === 200) {
        alert('Registration successful');
        // Redirect or perform further actions
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="register-page">
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
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
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
                <button type="button" className="submit-button" onClick={handleVerifyOtp}>
                  Verify OTP
                </button>
              </div>
            )}
            {showResendButton && (
              <button className="resend-button" onClick={handleResendOtp}>
                Resend OTP ({timer}s)
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
