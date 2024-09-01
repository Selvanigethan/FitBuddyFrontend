import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Register.css';
import logo from '../assets/images/fitbuddy.png';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', formData);

      if (response.status === 200) {
        navigate('/verification-pending');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage('Registration failed. Please try again!');
    }
  };

  return (
<div className="container verify-container">
  <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
    <div className="col-md-6 register-content" data-aos="fade">
      <form onSubmit={handleSubmit} className="bg-white" style={{ marginTop: '5px' }}>
        
        {/* App Logo */}
        <div className="text-center mb-4">
          <img src={logo} alt="FitBuddy Logo" className="rounded-circle" style={{ width: '180px', height: '180px' }} />
        </div>

        {/* Error Messages */}
        {errorMessage && (
          <div className="error-message">
            <span>{errorMessage}</span>
            <button className="close-btn" onClick={() => setErrorMessage('')}>
              &times;
            </button>
          </div>
        )}
        
        {/* Form Fields */}
        <div className="row form-group">
          <div className="col-md-12">
            <label className="text-black text-left" htmlFor="email">Email Address</label>
            <input type="email" id="email" className="form-control" name="email"
            // autoComplete='off'
              value={formData.email}
              onChange={handleChange}
              required />
          </div>
        </div>

        <div className="row form-group">
          <div className="col-md-12">
            <label className="text-black text-left" htmlFor="username">Username</label>
            <input type="text" id="username" className="form-control" name="username" 
            // autoComplete='off'
              value={formData.username}
              onChange={handleChange}
              required />
          </div>
        </div>

        <div className="row form-group">
          <div className="col-md-6 mb-3 mb-md-0">
            <label className="text-black text-left" htmlFor="password">Password</label>
            <input type="password" id="password" className="form-control" name="password"
              value={formData.password}
              onChange={handleChange}
              required />
          </div>
          <div className="col-md-6">
            <label className="text-black text-left" htmlFor="confirm_password">Confirm Password</label>
            <input type="password" id="confirm_password" className="form-control" name="confirm_password"
              required />
          </div>
        </div>

        {/* Submit Button */}
        <div className="row form-group">
          <div className="col-md-12 text-center">
            <input type="submit" value="CREATE AN ACCOUNT" className="btn btn-pill btn-primary btn-md text-white" style={{ width: '480px' }} />
          </div>
        </div>

        <p>Already have an account? <a href="/login">Login</a></p>

      </form>
    </div>
  </div>
</div>

  );

};

export default Register;
